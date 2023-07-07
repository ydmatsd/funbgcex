#!/usr/bin/env python3

import logging
import os
from pathlib import Path
import pandas as pd
from natsort import natsorted
import shutil
import glob
import sys
import time
from funbgcex.GeneralCommands import *
from funbgcex.SeqHandling import *
from funbgcex.BGfinder import *
from funbgcex.HTMLgenerator import HTMLgenerator
from funbgcex.SimilarBGCfinder import MakeProtBGCidDict


def BGCeXtractor(gbk_dir,results_dir,mode,query,gap_allowed,max_bgc_gap,min_prot_len,num_of_genes_checked,min_identity):
    current_dir = os.path.dirname(os.path.abspath(__file__))

    """
    Create dictionaries
    """
    IDdict = {}
    GeneNumDict = {}
    MetabDict = {}
    protCSV = f"{current_dir}/data/proteins.csv"
    MakeProtBGCidDict(IDdict,GeneNumDict,MetabDict,protCSV)

    """
    Create output directory
    """
    os.makedirs(results_dir,exist_ok=True)
    all_BGC_dir = f"{results_dir}/all_clusters"
    os.makedirs(all_BGC_dir,exist_ok=True)

    """
    Generate log file
    """
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.DEBUG)
    formatter = logging.Formatter('%(asctime)s - %(levelname)s:%(name)s - %(message)s')
    log = logging.FileHandler(f'{results_dir}/{Path(gbk_dir).stem}.log')
    log.setFormatter(formatter)
    logger.addHandler(log)

    logger.info("BGC extraction started")


    """
    Collect GenBank files
    """
    input_gbk_files = glob.glob(f"{gbk_dir}/*")
    input_gbk_files.sort()


    """
    Make a file to which the information of all clusters will be saved
    """
    columns = ["Fungus","BGC no.","Scaffold","Start position","End position","Locus tag start","Locus tag end",
                "Number of genes","Core enzymes","Similar BGC","Similarity score","Metabolite from similar BGC","Pfam domains"]

    logger.info(f"mode: {mode}")
    logger.info(f"query: {query}")
    logger.info(f"gap_allowed: {gap_allowed}")
    logger.info(f"max_bgc_gap: {max_bgc_gap}")
    logger.info(f"min_prot_len: {min_prot_len}")
    logger.info(f"num_of_genes_checked: {num_of_genes_checked}")
    logger.info(f"min_identity: {min_identity}")

    allBGCdf = pd.DataFrame(columns=columns)
    all_cluster_csv = f"{results_dir}/allBGCs.csv"
    allBGCdf.to_csv(all_cluster_csv)

    results_dir2 = f"{results_dir}/results"
    os.makedirs(results_dir2,exist_ok=True)


    """
    Start analysis
    """
    for file in input_gbk_files:
        time_start = time.time()

        file_name = Path(file).stem
        output_dir = f"{results_dir2}/{file_name}_results"
        temp_dir = f"{output_dir}/temp"
        temp_dir_ = f"{temp_dir}/temp"
        os.makedirs(output_dir,exist_ok=True)
        os.makedirs(temp_dir,exist_ok=True)
        df = pd.DataFrame()

        print(f"{file_name}: BGC extraction started")
        logger.info(f"{file_name}: BGC extraction started")


        """
        Make a file to which the information of all clusters will be saved
        """
        columns = ["BGC no.","Scaffold","Start position","End position","Locus tag start","Locus tag end",
                    "Number of genes","Core enzymes","Similar BGC","Similarity score","Metabolite from similar BGC","Pfam domains"]

        logger.info(f"{mode} mode was selected")

        BGCdf = pd.DataFrame(columns=columns)
        cluster_csv = f"{output_dir}/BGCs.csv"
        BGCdf.to_csv(cluster_csv)

        """
        Check the input file. If locus tags are not given for CDSs, they are added as PROTEINXXXXXX.
        """
        gbk_file = SeqHandling(file,df)
        gbk_file.AddLocusTag(temp_dir)
        modified_gbk_file = glob.glob(f"{temp_dir}/*.gbk")[0]
        modified_gbk = SeqHandling(modified_gbk_file,df)

        logger.debug("Processed the input GenBank file")

        """
        Make necessary directories
        """
        CDS_dir = f"{temp_dir}/extracted_CDS"
        GBK_dir = f"{temp_dir}/scaffolds"

        os.makedirs(CDS_dir,exist_ok=True)
        os.makedirs(GBK_dir,exist_ok=True)

        
        """
        Obtain the fungus's name
        """ 
        fungus_name = modified_gbk.name() # Special symbols that might cause errors removed
        fungus_name_original = modified_gbk.name_o() # Original fungus's name

        logger.debug(f"Original fungus's name: {fungus_name_original}")
        logger.debug(f"Modified version of fungus's name: {fungus_name}")


        """
        Extract all CDSs as a single fasta file and each scaffold as a gbk file
        """
        modified_gbk.CDS_extractor(CDS_dir)
        modified_gbk.GBK_extractor(GBK_dir)
        fasta_file = f"{CDS_dir}/{file_name}.fasta"

        logger.debug("All protein sequences were extracted")
        logger.debug("All scaffolds were extracted")

        if os.stat(fasta_file).st_size != 0:
                    
            dmnd_db_dir = f"{temp_dir}/BLASTdb"
            os.makedirs(dmnd_db_dir,exist_ok=True)

            if mode == "all":
                """
                hmmscan to detect core enzymes
                """
                hmmscan_output_dir = f"{temp_dir}/hmmscan"
                os.makedirs(hmmscan_output_dir,exist_ok=True)
                hmmscan_result = f"{hmmscan_output_dir}/hmm_core.txt"
                hmmscan_core_database = f"{current_dir}/data/hmm/core/core_UstY.hmm"
                
                logger.debug("Running hmmscan to detect core enzymes")
                runHMMscan(fasta_file,hmmscan_result,hmmscan_core_database,"1e-5")
                
                logger.debug("Finding core enzymes")
                Core_extractor(hmmscan_result,df,temp_dir_)

            if mode == "target":
                """
                Create DIAMOND database
                """
                target_dmnd_db = f"{dmnd_db_dir}/target"
                logger.debug("Creating DIAMOND database using the input fasta file")
                makeDIAMONDdb(query,target_dmnd_db)

                """
                Perform blastp to find target homologues
                """   
                blastp_result_dir = f"{temp_dir}/blastp_results"
                os.makedirs(blastp_result_dir,exist_ok=True)

                target_blastp_result = f"{blastp_result_dir}/target_blastp_result.xml"
                logger.debug("Running DIAMOND to find target proteins")
                RunDIAMOND(fasta_file,target_dmnd_db,target_blastp_result,1,1)

                """
                Add target homologue information to the csv file
                """
                logger.debug("Adding the information of the closest homologue of each target")
                AddTargetHomologue(target_blastp_result,df)

            if mode == "pfam":
                """
                Extract the target Pfam HMM file
                """
                funSMhmm = f"{current_dir}/data/hmm/fungalSM/fungalSM.hmm"
                hmm_dir = f"{temp_dir}/hmm"
                os.makedirs(hmm_dir,exist_ok=True)
                target_hmm = f"{hmm_dir}/{query}.hmm"

                logger.debug("Fetching the required HMM file")
                runHMMfetch(funSMhmm,query,target_hmm)

                if os.stat(target_hmm).st_size == 0:
                    logger.error("The given protein family name was not found in the database.")
                    sys.exit("The given protein family name was not found in the database.")
                
                logger.debug("Running hmmpress")
                runHMMpress(target_hmm)

                """
                hmmscan to detect target proteins
                """
                hmmscan_output_dir = f"{temp_dir}/hmmscan"
                os.makedirs(hmmscan_output_dir,exist_ok=True)
                hmmscan_result = f"{hmmscan_output_dir}/hmm_target.txt"
                hmmscan_target_database = f"{temp_dir}/hmm/{query}.hmm"

                logger.debug("Running hmmscan to detect target proteins")
                runHMMscan(fasta_file,hmmscan_result,hmmscan_target_database,"1e-5")

                logger.debug("Adding target information")
                AddTargetPfam(hmmscan_result,df)

            """
            Extract protein sequences around core/target proteins
            """
            extract_CDS_target_dir = f"{temp_dir}/extracted_CDS_target"
            os.makedirs(extract_CDS_target_dir,exist_ok=True)

            logger.debug("Extracting protein sequences around core/target proteins")
            ExtractCDS4Check(mode,num_of_genes_checked,extract_CDS_target_dir,df)

            """
            Combine all extracted fasta files as a single file
            """
            fasta_files = glob.glob(f"{extract_CDS_target_dir}/*.fasta")
            if len(fasta_files) != 0:
                logger.debug("Combining all fasta files")
                combineFASTA(extract_CDS_target_dir,temp_dir)
                combined_fasta = f"{temp_dir}/combined.fasta"

                if mode == "target" or mode == "pfam":
                    """
                    hmmscan to detect core enzymes
                    """
                    hmmscan_output_dir = f"{temp_dir}/hmmscan"
                    os.makedirs(hmmscan_output_dir,exist_ok=True)
                    hmmscan_result = f"{hmmscan_output_dir}/hmm_core.txt"
                    hmmscan_core_database = f"{current_dir}/data/hmm/core/core.hmm"

                    logger.debug("Running hmmscan to detect core enzymes")
                    runHMMscan(combined_fasta,hmmscan_result,hmmscan_core_database,"1e-5")

                    logger.debug("Finding core enzymes")
                    Core_extractor(hmmscan_result,df,temp_dir_)

                logger.debug("Finding potential RiPP precursor proteins")
                aa_len, unique_aa, min_repeat, min_match = 10, 3, 3, 9
                RiPPppFinder(aa_len,unique_aa,min_repeat,min_match,combined_fasta,df)

                """
                Perform hmmscan using the fungal SM protein domain database
                """        
                hmmscan_result_ = f"{hmmscan_output_dir}/hmmscan_result.txt"
                hmmscan_SM_database = f"{current_dir}/data/hmm/fungalSM/fungalSM.hmm"

                logger.debug("Running hmmscan to detect potential fungal SM proteins")
                runHMMscan(combined_fasta,hmmscan_result_,hmmscan_SM_database,"1e-5")

                """
                Add Pfam domain information to the csv file
                """
                SMhmm = f"{current_dir}/data/hmm/fungalSM/fungalSM.hmm"

                logger.debug("Adding Pfam information")
                AddPfam(hmmscan_result_,df,SMhmm)

                """
                Find the closest homologue in the fungal biosynthetic proteins
                """
                dmnd_db_SM = f"{current_dir}/data/DIAMOND/fungal_SM_proteins"
                blastp_result_dir = f"{temp_dir}/blastp_results"
                os.makedirs(blastp_result_dir,exist_ok=True)
                blastp_result = f"{blastp_result_dir}/blastp_result.xml"

                logger.debug("Running DIAMOND to find homologues in FunBGCs")
                RunDIAMOND(combined_fasta,dmnd_db_SM,blastp_result,1,1)

                logger.debug("Adding homologue information")
                AddHomologue(blastp_result,df)

                """
                Duplication check
                """
                dmnd_db_all = f"{dmnd_db_dir}/allCDS"

                logger.debug("Creating DIAMOND database containing all proteins from the input")
                makeDIAMONDdb(fasta_file,dmnd_db_all)      
                blastp_result2 = f"{blastp_result_dir}/blastp_result2.xml"

                logger.debug("Running DIAMOND to find duplicated proteins")
                RunDIAMOND(combined_fasta,dmnd_db_all,blastp_result2,2,1)

                logger.debug("Checking duplications")
                DuplicationChecker(blastp_result2,min_identity,min_prot_len,df)

                """
                Remove small non-biosynthetic proteins from the dataframe
                """        
                logger.debug("Removing small non-biosynthetic proteins")
                
                ToBeDeletedRows = []
                deletedProt = []
                for i in range(len(df)):
                    if df.at[i,"BP"] == 0 and df.at[i,"length"] < min_prot_len:
                        ToBeDeletedRows.append(i)
                        deletedProt.append(df.at[i,"locus_tag"])

                df_ = df.drop(index=ToBeDeletedRows).reset_index()
                original_df = df

                """
                Find clustered proteins
                """
                logger.debug("Finding clustered proteins")
                database = f"{current_dir}/data/DIAMOND/fungal_SM_proteins"
                ClusteredProteinFinder(extract_CDS_target_dir,database,IDdict,deletedProt,max_bgc_gap,df_,temp_dir_)

                """
                Extract BGCs
                """
                BGC_dir = f"{temp_dir}/../BGCs"
                os.makedirs(BGC_dir,exist_ok=True)
                logger.debug("Extracting BGCs")
                DefineBoundary(mode,GBK_dir,BGC_dir,gap_allowed,min_prot_len,fungus_name,df_,original_df,cluster_csv,all_cluster_csv,IDdict,GeneNumDict,MetabDict,temp_dir_,log)

                """
                Copy BGC gbk files
                """
                if len(glob.glob(f"{BGC_dir}/*")) != 0:
                    fungus_name_ = fungus_name.replace(" ","_")
                    logger.debug("Copying BGC files")
                    shutil.copytree(BGC_dir,f"{all_BGC_dir}/{fungus_name_}_BGCs",dirs_exist_ok=True)

            else:
                shutil.rmtree(output_dir)
                logger.warning("No core/target protein was extracted")
                print("No core/target protein was extracted")
                continue

        else:
            shutil.rmtree(output_dir)
            logger.warning("The given input file does not contain any protein sequence.")
            print("The given input file does not contain any protein sequence.")
            continue

        csv_dir = f"{output_dir}/CSVs"
        os.makedirs(csv_dir,exist_ok=True)
        analysis_csv = f"{csv_dir}/{file_name}_analysis.csv"
        analysis_csv2 = f"{csv_dir}/{file_name}_analysis_modified.csv"
        df.to_csv(analysis_csv)
        df_.to_csv(analysis_csv2)

        BGCdf = pd.read_csv(cluster_csv)
        BGCnum = len(BGCdf)
        if BGCnum > 0:
            logger.debug("Creating HTML files")
            HTMLgenerator(cluster_csv,fungus_name_original,output_dir)
        else:
            shutil.rmtree(output_dir)
            logger.warning("No BGC was extracted.")
            print("No BGC was extracted.")
            continue

        time_end = time.time()
        total_time = "{:.2f}".format((time_end - time_start)/60)

        """
        Delete directories
        """
        shutil.rmtree(temp_dir)


        """
        Message for BGC extraction completion
        """    
        if BGCnum == 1:
            message = f"{BGCnum} BGC was"
        else:
            message = f"{BGCnum} BGCs were"

        logger.info(f"{file_name}: BGC extraction finished in {total_time} min. {message} extracted.")
        print(f"{file_name}: BGC extraction finished in {total_time} min. {message} extracted.")


    logger.info("All BGC extractions completed")

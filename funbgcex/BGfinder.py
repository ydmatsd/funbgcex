#!/usr/bin/env python3

import logging
import os
from pathlib import Path
import pandas as pd
import subprocess
import random, string
from natsort import natsorted
import shutil
import glob
import warnings
from Bio import BiopythonWarning
warnings.simplefilter('ignore', BiopythonWarning)
from Bio import SeqIO
from Bio import SearchIO
from Bio.Blast import NCBIXML
from funbgcex.GeneralCommands import RunDIAMOND
from funbgcex.CoreAnnotation import Annotation
from funbgcex.SimilarBGCfinder import *



def LinkChecker(seq1,seq2,database,protCSV,temp_dir):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    isLinked = False

    """
    Make a fasta file containing the two sequences
    """
    fasta = f"{temp_dir}/proteins.fasta"
    with open(fasta,"w") as fa:
        fa.write(f">seq1\n{seq1}\n")
        fa.write(f">seq2\n{seq2}\n")
    
    """
    Run DIAMOND search
    """
    dmnd_result = f"{temp_dir}/dmnd_result.xml"
    RunDIAMOND(fasta,database,dmnd_result,50,1)
    
    """
    Analyze DIAMOND result
    """
    BGClist = []
    df = pd.read_csv(protCSV,index_col=[1])
    blast_records = NCBIXML.parse(open(dmnd_result))
    for blast_record in blast_records:
        BGCsublist = []
        for alignment in blast_record.alignments:
            for hsp in alignment.hsps:
                query = blast_record.query
                blast_hit = alignment.title.replace(" ","")
                BGCno = df.at[blast_hit,"FBGC or FPROT ID"]
            BGCsublist.append(BGCno)
        BGClist.append(BGCsublist)
    if len(BGClist[0]) > len(BGClist[1]):
        for i in range(len(BGClist[1])):
            if BGClist[1][i] in BGClist[0]:
                isLinked = True
                break
    else:
        for i in range(len(BGClist[0])):
            if BGClist[0][i] in BGClist[1]:
                isLinked = True
                break  
                
    shutil.rmtree(temp_dir)

    if isLinked:
        return True
    else:
        return False


def Core_extractor(hmmscan_result,df,temp_dir,mode="normal"):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    hmmscan_core_database = f"{current_dir}/data/hmm/core/core.hmm"

    Corefam_list = ["Terpene_syn_C_2","Terpene_synth_C","TRI5","SQHop_cyclase_C","SQHop_cyclase_N",
    "Trp_DMAT","Pyr4","PbcA","AstC","ABA3","AsR6","SalTPS","UbiA_PT","UbiA_TC","CosA","PaxC","GGPS",
    "Chal_sti_synt_N","Chal_sti_synt_C","AnkA","DIT1_PvcA","PEP_mutase"]
    UstY_list = ["UstYa","VicY"]

    # To make a list in which each locus_tag can be linked with a Pfam hit
    df["core"] = "none"
    df["UstY"] = "none"
    df["domain_organization"] = "none"

    hmm_list = []
    for qresult in SearchIO.parse(hmmscan_result, 'hmmscan3-domtab'):
        for i in range(len(qresult.hits)):
            hit_list = []
            newList = True
            for item in hmm_list:
                if item[0] == qresult.id:
                    if qresult.hits[i].id not in item:
                        item.append(qresult.hits[i].id)
                        newList = False
                        break
            if newList == True:
                hit_list.append(qresult.id) # To obtain the name of the query
                hit_list.append(qresult.hits[i].id) # To obtain the name of the hit
                hmm_list.append(hit_list)

    for prot in hmm_list:
        isCore = False
        withUstY = False

        for item in prot:
            if item in Corefam_list:
                isCore = True
            if item in UstY_list:
                withUstY = True
        if 'AA-adenyl-dom' in prot:
            if 'PKS_KS' in prot or 'NRPS_C' in prot or 'NRPS_CT' in prot or 'fPKS_R' in prot or "Thioesterase" in prot or "Abhydrolase_3" in prot:
                isCore = True
        elif 'PKS_KS' in prot:
            if 'PKS_AT' in prot:
                isCore = True

        for i in range(len(df)):
            if df.at[i,"locus_tag"] == prot[0]:
                if isCore:
                    seq = df.at[i,"sequence"]
                    seq_info = Annotation(seq,hmmscan_core_database,temp_dir)
                    core_type = seq_info.type()
                    domain_organization = seq_info.domain()
                    df.at[i,"core"] = core_type
                    df.at[i,"domain_organization"] = domain_organization
                    df.at[i,"BP"] = 1
                    break
                if withUstY:
                    df.at[i,"UstY"] = "UstY"
                    df.at[i,"BP"] = 1
                    break



def RiPPppFinder(aa_len,unique_aa,min_repeat,min_match,fasta,df):
    with open(fasta,"r") as fa:
        protList = [line.rstrip() for line in fa]

    RiPPppCandList = []
    i = 0
    while i < len(protList) - 1:
        if protList[i].startswith(">"):
            seq = protList[i+1]
            isRiPPpp = False
            seq_list = [seq[j:j + aa_len] for j in range(len(seq) - aa_len + 1)]

            repeated_seq_list = []
            for item in seq_list:
                uniqueAA = len(set(item)) #The number of unique amino acids in a given sequence fragment

                if uniqueAA >= unique_aa and item not in repeated_seq_list and any(x in item for x in ["KR", "KK", "RK", "RR"]):
                    hitNumber = sum(1 for item2 in seq_list if sum(1 for k in range(aa_len) if item[k] == item2[k]) >= min_match)
                    if hitNumber >= min_repeat:
                        isRiPPpp = True

            if isRiPPpp:
                protName = protList[i].replace(">","")
                RiPPppCandList.append(protName)
        i += 1

    df.loc[df["locus_tag"].isin(RiPPppCandList) & (df["core"] == "none"), "core"] = "RiPP_PP_cand"
    df.loc[df["locus_tag"].isin(RiPPppCandList), "BP"] = 1


def AddTargetHomologue(blastp_result,df):
    df["target_homologue"] = "none"
    df["target_homologue_identity"] = "none"
    
    blast_records = NCBIXML.parse(open(blastp_result))

    for blast_record in blast_records:
        try:
            for alignment in blast_record.alignments:
                for hsp in alignment.hsps:
                    query = blast_record.query
                    blast_hit = alignment.title
                    identity = "{:.1f}".format(100*hsp.identities/len(hsp.match)) # value of %identity

                    for i in range(len(df)):
                        if df.at[i,"locus_tag"] == query:
                            df.at[i,"BP"] = 1
                            df.at[i,"target_homologue"] = blast_hit
                            df.at[i,"target_homologue_identity"] = identity
                            break
                    break
        except:
            pass


def AddTargetPfam(hmmscan_result,df):
    df["withTarget"] = 0
 
    hit_set = set()

    for qresult in SearchIO.parse(hmmscan_result, 'hmmscan3-domtab'):
        hit_set.add(qresult.id)

    df.loc[df['locus_tag'].isin(hit_set),'withTarget'] = 1
    df.loc[df['locus_tag'].isin(hit_set),'BP'] = 1


def ExtractCDS4Check(mode,num_of_genes_checked,output_dir,df):
    if mode == "all":
        target = "core"
    elif mode == "target":
        target = "target_homologue"
    elif mode == "pfam":
        target = "withTarget"

    for i in range(len(df)):
        if mode == "all":
            if df.at[i,target] != "none" or df.at[i,"UstY"] != "none":
                pass
            else:
                continue
        else:
            if df.at[i,target] != "none" and df.at[i,target] != 0:
                pass
            else:
                continue

        if i < num_of_genes_checked:
            check_start_point = 0
        else:
            check_start_point = i - num_of_genes_checked
        if len(df) - i < num_of_genes_checked + 1:
            check_end_point = len(df) - 1
        else:
            check_end_point = i + num_of_genes_checked

        # Determine the start position for sequence extraction
        if i == 0:
            extract_start_point = 0
        elif i > 0 and (df.at[i,"scaffold"] != df.at[i-1,"scaffold"]):
            extract_start_point = i
        else:
            for j in range(i-1,check_start_point-1,-1):
                if j == 0:
                    extract_start_point = 0
                    break
                if df.at[j,"scaffold"] != df.at[j-1,"scaffold"]:
                    extract_start_point = j
                    break
                else:
                    extract_start_point = check_start_point

        # Determine the end position for sequence extraction
        if i == len(df) - 1:
            extract_end_point = len(df) - 1
        elif i < len(df) - 1 and (df.at[i,"scaffold"] != df.at[i+1,"scaffold"]):
            extract_end_point = i
        else:
            for j in range(i+1,check_end_point+1):
                if j == len(df)-1:
                    extract_end_point = len(df)-1
                    break
                if df.at[j,"scaffold"] != df.at[j+1,"scaffold"]:
                    extract_end_point = j
                    break
                else:
                    extract_end_point = check_end_point

        scaffold = df.at[extract_start_point,"scaffold"]
        locus_tag_start = df.at[extract_start_point,"locus_tag"]
        locus_tag_end = df.at[extract_end_point,"locus_tag"]
        fasta = f"{output_dir}/{scaffold}_{locus_tag_start}_{locus_tag_end}.fasta"
        with open(fasta,"w") as fa:
            for i in range(extract_start_point,extract_end_point+1):
                fa.write(">"+df.at[i,"locus_tag"]+"\n")
                fa.write(df.at[i,"sequence"]+"\n")


def AddPfam(hmmscan_result,df,SMhmm):
    pfamLength = {} #Make a dictiory that contains the name and length of each Pfam entry
    addDict = False
    with open(SMhmm,"r") as h:
        for line in h:
            if line.startswith("NAME"):
                name = line.split(" ")[-1].replace("\n","")
                addDict = True
            if line.startswith("LENG"):
                length = int(line.split(" ")[-1].replace("\n",""))
                if addDict:
                    pfamLength[name] = length
                    addDict = False

    with open(hmmscan_result) as hmm:
        hmm_hits = hmm.readlines()

    prot_hmm_list = []
    for i in range(3,len(hmm_hits)-10):
        split_list = hmm_hits[i].split()
        query = split_list[3]
        if [query] not in prot_hmm_list:
            prot_hmm_list.append([query])

    for i in range(3,len(hmm_hits)-10):
        split_list = hmm_hits[i].split()
        query = split_list[3]
        domName = split_list[0]
        score = float(split_list[13])
        startPos = int(split_list[19])
        endPos = int(split_list[20])
        centerPos = (startPos+endPos)/2
        pfam_list = [domName,score,startPos,endPos,centerPos]
        for item in prot_hmm_list:
            if query == item[0]:
                item.append(pfam_list)

    sorted_prot_hmm_list = []

    for hmm_list in prot_hmm_list:
        if len(hmm_list) == 2:
            sorted_prot_hmm_list.append(hmm_list)
        else:
            position_list = []
            sorted_list = [hmm_list[0]]

            for i in range(1,len(hmm_list)):
                sublist = [hmm_list[i][2],hmm_list[i][0]]
                position_list.append(sublist)

            position_list = natsorted(position_list)
            for position in position_list:
                for i in range(1,len(hmm_list)):
                    if position[0] == hmm_list[i][2] and position[1] == hmm_list[i][0]:
                        sorted_list.append(hmm_list[i])

            ToBeDeletedList = []
            for i in range(1,len(sorted_list)-1):
                for j in range(i+1,len(sorted_list)):
                    if sorted_list[i][0] == sorted_list[j][0]:
                        length = sorted_list[j][3] - sorted_list[i][2]
                        domainName = sorted_list[i][0]
                        if length < pfamLength[domainName]*1.1: #The maximum length allowed is 1.1 fold of the domain length.
                            combinedScore = sorted_list[i][1] + sorted_list[j][1]
                            sorted_list[j][1] = combinedScore
                            newStartPoint = sorted_list[i][2]
                            sorted_list[j][2] = newStartPoint
                            newCenterPoint = (sorted_list[i][2] + sorted_list[j][3])/2
                            sorted_list[j][4] = newCenterPoint
                            ToBeDeletedList.append(sorted_list[i])
                            break
                    
            for item in ToBeDeletedList:
                sorted_list.remove(item)
               
            ToBeDeletedList = []
            for i in range(1,len(sorted_list)):
                score = sorted_list[i][1]
                startPos = sorted_list[i][2]
                endPos = sorted_list[i][3]
                centerPos = sorted_list[i][4]
                for j in range(1,len(sorted_list)):
                    if sorted_list[j][2] < centerPos < sorted_list[j][3] and score < sorted_list[j][1]:
                        if sorted_list[i] not in ToBeDeletedList:
                            ToBeDeletedList.append(sorted_list[i])

            for item in ToBeDeletedList:
                sorted_list.remove(item)
            
            sorted_prot_hmm_list.append(sorted_list)

    df["Pfam"] = "none"

    for item in sorted_prot_hmm_list:
        sublist = []
        for i in range(1,len(item)):
            if item[i][0] not in sublist:
                sublist.append(item[i][0])

        pfam = ", ".join(sublist)
        df.loc[df["locus_tag"] == item[0], "Pfam"] = pfam
        df.loc[df["locus_tag"] == item[0], "BP"] = 1


def AddHomologue(blastp_result,df):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    prot_csv = f"{current_dir}/data/proteins.csv"
    prot_df = pd.read_csv(prot_csv,index_col=[1])
    df["known_homologue"] = "none"
    df["known_homologue_identity"] = "none"
    df["known_homologue full name"] = "none"
    df["known_homologue source"] = "none"
    df["known_homologue metabolite"] = "none"
    df["known_homologue FBGC or FPROT ID"] = "none"
    
    blast_records = NCBIXML.parse(open(blastp_result))

    for blast_record in blast_records:
        try:
            for alignment in blast_record.alignments:
                for hsp in alignment.hsps:
                    query = blast_record.query
                    blast_hit = alignment.title.replace(" ","")
                    identity = "{:.1f}".format(100*hsp.identities/len(hsp.match)) # value of %identity

                    query_indices = df.index[df["locus_tag"] == query]
                    i = query_indices[0]
                    df.at[i,"BP"] = 1
                    df.at[i,"known_homologue"] = prot_df.at[blast_hit,"protein"].split(" ")[-1]
                    df.at[i,"known_homologue_identity"] = identity
                    df.at[i,"known_homologue full name"] = prot_df.at[blast_hit,"protein"]
                    df.at[i,"known_homologue source"] = prot_df.at[blast_hit,"source"]
                    df.at[i,"known_homologue metabolite"] = prot_df.at[blast_hit,"metabolite"]
                    df.at[i,"known_homologue FBGC or FPROT ID"] = prot_df.at[blast_hit,"FBGC or FPROT ID"]
                    break
        except:
            pass


def DuplicationChecker(blastp_result,min_identity,min_prot_len,df):
    df["duplicated_protein"] = "none"
    df["duplicated_protein_identity"] = "none"
    df["duplicated"] = 0

    blast_records = NCBIXML.parse(open(blastp_result))

    for blast_record in blast_records:
        try:
            for alignment in blast_record.alignments:
                if blast_record.query != alignment.title.replace(" ",""):
                    for hsp in alignment.hsps:
                        query = blast_record.query
                        blast_hit = alignment.title.replace(" ","")
                        identity = 100*hsp.identities/len(hsp.match) # value of %identity
                        identity_ = "{:.1f}".format(100*hsp.identities/len(hsp.match)) 

                        if identity > min_identity:
                            for i in range(len(df)):
                                if df.at[i,"locus_tag"] == query:
                                    if df.at[i,"length"] >= min_prot_len:
                                        df.at[i,"BP"] = 1
                                        df.at[i,"duplicated"] = 1
                                        df.at[i,"duplicated_protein"] = blast_hit
                                        df.at[i,"duplicated_protein_identity"] = identity_
                                        break
                                    else:
                                        break
                        break
        except:
            pass

def DefineBoundary(mode,GBK_dir,BGC_dir,gap_allowed,min_prot_len,fungus_name,df,df_original,cluster_csv,all_cluster_csv,IDdict,GeneNumDict,MetabDict,temp_dir,log):
    current_dir = os.path.dirname(os.path.abspath(__file__))

    logger = logging.getLogger(__name__)
    logger.setLevel(logging.DEBUG)
    formatter = logging.Formatter('%(asctime)s - %(levelname)s:%(name)s - %(message)s')
    log.setFormatter(formatter)
    logger.addHandler(log)

    hmmscan_core_database = f"{current_dir}/data/hmm/core/core.hmm"

    #For LinkChecker/SimilarBGCfinder
    database = f"{current_dir}/data/DIAMOND/fungal_SM_proteins"
    protCSV = f"{current_dir}/data/proteins.csv"


    BGCdf = pd.read_csv(cluster_csv,index_col=[0])
    allBGCdf = pd.read_csv(all_cluster_csv,index_col=[0])

    counter = 0
    BGC_num = 1

    while counter < len(df):

        withCore = False
        withTarget = False
        withRiPPpp = False
        withUstY = False
        ToBeExtracted = False
        ToBeReset = False

        if df.at[counter,"BP"] == 1:
            counter_start = counter
            core_list = []
            RiPPppList = []
            RippPosList = []
            scaffold = df.at[counter,"scaffold"]
            start_pos = df.at[counter,"start"]
            locus_tag_start = df.at[counter,"locus_tag"]

            DupProtNum = 0
            allowedDupNum = 2
            for j in range(counter,len(df)):
                if df.at[j,"core"] != "none" and df.at[j,"core"] != "RiPP_PP_cand":
                    withCore = True

                if df.at[j,"core"] == "RiPP_PP_cand":
                    withRiPPpp = True
                    RiPPppList.append(df.at[j,"locus_tag"])
                    RippPosList.append(j)
                    # df.at[j,"core"] == "RiPP PP"

                if "UstYa" in df.at[j,"Pfam"] or "VicY" in df.at[j,"Pfam"]:
                    withUstY = True

                if df.at[j,"core"] == "none" and df.at[j,"Pfam"] == "none" and df.at[j,"known_homologue"] == "none"\
                    and df.at[j,"duplicated_protein"] != "none":
                    DupProtNum += 1
                    if DupProtNum > allowedDupNum:
                        end_pos = df.at[j,"end"]
                        locus_tag_end = df.at[j,"locus_tag"]
                        break

                if mode == "target":
                    if df.at[j,"target_homologue"] != "none":
                        withTarget = True
                        target_homologue = df.at[j,"target_homologue"]
                        target_homologue_identity = df.at[j,"target_homologue_identity"]
                        target_homologue_tag = df.at[j,"locus_tag"]
                        target_homologue_seq = df.at[j,"sequence"]

                if mode == "pfam":
                    if df.at[j,"withTarget"] == 1:
                        withTarget = True

                if j == len(df) - 1:
                    end_pos = df.at[j,"end"]
                    locus_tag_end = df.at[j,"locus_tag"]
                    break

                if df.at[j,"BP"] == 1:                          
                    if df.at[j,"scaffold"] == df.at[j+1,"scaffold"]:
                        if df.at[j+1,"start"] - df.at[j,"end"] <= gap_allowed or (df.at[j,"clustered"] == 1 and df.at[j+1,"clustered"] == 1):
                            end_pos = df.at[j,"end"]
                            locus_tag_end = df.at[j,"locus_tag"]
                            counter += 1
                        else:
                            end_pos = df.at[j,"end"]
                            locus_tag_end = df.at[j,"locus_tag"]
                            break                           
                    else:
                        end_pos = df.at[j,"end"]
                        locus_tag_end = df.at[j,"locus_tag"]
                        break
                else:
                    break

            if mode == "all":
                if withRiPPpp and withUstY:
                    ToBeExtracted = True
                if withCore:
                    ToBeExtracted = True
                #in case RiPP PP candidate is found but no UstY homologue is found, the candidate is considered as nonBP, and BGC extraction process will be repeated
                if withRiPPpp and withUstY == False:
                    ToBeReset = True

            if mode == "target" or mode == "pfam":
                if withRiPPpp and withUstY and withTarget:
                    ToBeExtracted = True
                if withCore and withTarget:
                    ToBeExtracted = True
                if withRiPPpp and withUstY == False:
                    ToBeReset = True

            if ToBeReset:
                for i in RippPosList:
                    df.at[i,"core"] = "none"
                    if df.at[i,"Pfam"] == "none" and df.at[i,"known_homologue"] == "none" and df.at[i,"duplicated_protein"] == "none":
                        df.at[i,"BP"] = 0
                    for j in range(len(df_original)):
                        if df.at[i,"locus_tag"] == df_original.at[j,"locus_tag"]:
                            df_original.at[j,"core"] = "none"
                ToBeExtracted = False
            

            if ToBeExtracted:
                gbk = f"{GBK_dir}/{scaffold}.gbk"
                seq_record = SeqIO.read(open(gbk),"genbank")
                subrecord = seq_record[start_pos:end_pos]
                subrecord.annotations["molecule_type"] = "DNA"
                subrecord.annotations['topology'] = 'linear'
                subrecord.annotations['source'] = fungus_name
                subrecord.annotations['organism'] = fungus_name
                bgc = f"{BGC_dir}/BGC{BGC_num}_{scaffold}_{locus_tag_start}_{locus_tag_end}.gbk"
                
                Pfam_list = []

                for feature in subrecord.features:
                    if feature.type == "CDS":
                        for i in range(len(df_original)):
                            if feature.qualifiers["locus_tag"][0] == df_original.at[i,"locus_tag"]:
                                if df_original.at[i,"core"] != "none" and df_original.at[i,"core"] != "RiPP_PP_cand" and df_original.at[i,"core"] != "UstY":
                                    core_type = df_original.at[i,"core"]
                                    domain_organization = df_original.at[i,"domain_organization"]
                                    for core in core_type.split(","):
                                        core_list.append(core)
                                    if domain_organization != "none":
                                        core_info = core_type + "; " + domain_organization
                                    else:
                                        core_info = core_type
                                    feature.qualifiers["core"] = core_info
                                elif df_original.at[i,"core"] == "RiPP_PP_cand":
                                    df_original.at[i,"core"] == "RiPP PP"
                                    core_list.append("RiPP PP")
                                    feature.qualifiers["core"] = "RiPP PP"
                                if df_original.at[i,"Pfam"] != "none":
                                    feature.qualifiers["Pfam"] = df_original.at[i,"Pfam"]
                                if df_original.at[i,"known_homologue"] != "none":
                                    homologue = df_original.at[i,"known_homologue full name"] + "|" + df_original.at[i,"known_homologue FBGC or FPROT ID"] + "; " + df_original.at[i,"known_homologue_identity"] + "%"
                                    feature.qualifiers["homologue"] = homologue
                                if df_original.at[i,"duplicated"] == 1:
                                    duplicated = df_original.at[i,"duplicated_protein"] + "; " + df_original.at[i,"duplicated_protein_identity"] + "%"
                                    feature.qualifiers["duplicated_protein"] = duplicated
                                if mode == "target":
                                    if df_original.at[i,"target_homologue"] != "none":
                                        target_homologue_info = df_original.at[i,"target_homologue"].replace(" ","") + "; " + df_original.at[i,"target_homologue_identity"] + "%"
                                        feature.qualifiers["target_homologue"] = target_homologue_info
                                locus_tag = df_original.at[i,"locus_tag"]
                                Pfams = df_original.at[i,"Pfam"]
                                PfamInfo = f"[{locus_tag}: {Pfams}]"
                                Pfam_list.append(PfamInfo)

                SeqIO.write([subrecord],open(bgc,"w"),"genbank")

                logger.debug(f"BGC{BGC_num} extracted. Scaffold: {scaffold}; Locus tag start: {locus_tag_start}; Locus tag end: {locus_tag_end}; Start: {start_pos}; End: {end_pos}.")

                preference = {"PKS-NRPS":1,"NRPS-PKS":2,"NR-PKS":3,"PR-PKS":4,"HR-PKS":5,"T3PKS":6,"NRPS":7,"chimeric TS":8,"TC (Class1)":9,
                                    "TC (SHC/OSC)":10,"TC (Tri5)":11,"TC (Pyr4)":12,"TC (UbiA)":13,"TC (PbcA)":14,"TC (AstC)":15,"TC (ABA3)":16,
                                    "TC (AsR6)":17,"TC (SalTPS)":18,"PT (UbiA)":19,"PT (PaxC)":20,"PT (DMATS)":21,"PT (CosA)":22,"PPPS":23,"RiPP PP":24,
                                    "RCDPS":25,"ICS":26,"PEPM":27,"NRPS-like":28,"PKS-like":29,"ePLS":30}

                core_list_sorted = sorted(core_list, key=lambda x: preference[x])
                core_enz = ", ".join(core_list_sorted)

                
                for i in range(len(df_original)):
                    if df_original.at[i,"locus_tag"] == locus_tag_start:
                        gene_num_start = i
                    if df_original.at[i,"locus_tag"] == locus_tag_end:
                        gene_num_end = i
                        break
                total_genes = gene_num_end - gene_num_start + 1

                pfam = ",".join(Pfam_list)


                """
                Similarity check
                """
                logger.debug(f"Finding a similar BGC")
                similarBGC = SimilarBGCfinder(bgc,database,protCSV,IDdict,GeneNumDict,MetabDict,temp_dir)
                similarBGCid = similarBGC.bgc()
                similarityScore = similarBGC.score()
                similarMetab = similarBGC.metab()


                BGC_list = [[f"BGC{BGC_num}",scaffold,start_pos+1,end_pos,locus_tag_start,locus_tag_end,total_genes,core_enz,similarBGCid,similarityScore,similarMetab,pfam]]
                columns = ["BGC no.","Scaffold","Start position","End position","Locus tag start","Locus tag end",
                            "Number of genes","Core enzymes","Similar BGC","Similarity score","Metabolite from similar BGC","Pfam domains"]
                BGC_list_ = [[fungus_name,f"BGC{BGC_num}",scaffold,start_pos+1,end_pos,locus_tag_start,locus_tag_end,total_genes,core_enz,similarBGCid,similarityScore,similarMetab,pfam]]
                columns_ = ["Fungus","BGC no.","Scaffold","Start position","End position","Locus tag start","Locus tag end",
                            "Number of genes","Core enzymes","Similar BGC","Similarity score","Metabolite from similar BGC","Pfam domains"]


                BGCdf_ = pd.DataFrame(BGC_list,columns=columns)
                BGCdf = pd.concat([BGCdf,BGCdf_])
                
                allBGCdf_ = pd.DataFrame(BGC_list_,columns=columns_)
                allBGCdf = pd.concat([allBGCdf,allBGCdf_])

                BGC_num += 1
    
        if ToBeReset:
            counter = counter_start
        else:
            counter += 1

    BGCdf = BGCdf.reset_index(drop=True).fillna("none")
    BGCdf.to_csv(cluster_csv)
    allBGCdf = allBGCdf.reset_index(drop=True).fillna("none")
    allBGCdf.to_csv(all_cluster_csv)



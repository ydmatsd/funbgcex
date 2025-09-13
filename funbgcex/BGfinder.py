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
warnings.simplefilter('ignore',BiopythonWarning)
from Bio import SeqIO
from Bio import SearchIO
from Bio.Blast import NCBIXML
import numpy as np
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import re
from collections import Counter
from difflib import SequenceMatcher
from funbgcex.GeneralCommands import RunDIAMOND
from funbgcex.CoreAnnotation import Annotation
from funbgcex.SimilarBGCfinder import *



def Core_extractor(mode,hmmscan_result,df,temp_dir):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    hmmscan_core_database = f"{current_dir}/data/hmm/core/core.hmm"

    Corefam_list = ["Terpene_syn_C_2","Terpene_synth_C","TRI5","SQHop_cyclase_C","SQHop_cyclase_N",
    "Trp_DMAT","Pyr4","PbcA","AstC","ABA3","AsR6","SalTPS","VniA","UbiA_PT","UbiA_TC","CosA","PaxC","GGPS",
    "Chal_sti_synt_N","Chal_sti_synt_C","AnkA","DIT1_PvcA","PEP_mutase"]

    # To make a list in which each locus_tag can be linked with a Pfam hit
    if mode != "ripps":
        df["core"] = "none"
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

        for item in prot:
            if item in Corefam_list:
                isCore = True
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


def predict_signal_peptide(sequences):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    model = load_model(f"{current_dir}/data/signal_peptide_model.keras")
    amino_acid_map = {
    'A': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5,
    'G': 6, 'H': 7, 'I': 8, 'K': 9, 'L': 10,
    'M': 11, 'N': 12, 'P': 13, 'Q': 14, 'R': 15,
    'S': 16, 'T': 17, 'V': 18, 'W': 19, 'Y': 20
    }
    # Treatment of the input sequence
    numerical_sequences = [[amino_acid_map.get(aa, 0) for aa in sequence] for sequence in sequences]  # convert amino acids to values
    padded_sequences = pad_sequences(numerical_sequences, maxlen=40)  # padding

    # Prediction by the model
    predictions = model.predict(padded_sequences, verbose=0)

    # Check the presence of a signal peptide
    results = ["Y" if prediction[0] > 0.5 else "N" for prediction in predictions]
    return results


def similarity_ratio(seq1,seq2):
    s = SequenceMatcher(None,seq1,seq2)
    similarity = s.ratio()
    return similarity

    
def RepeatSeqFinder(seq,cleavage_sites,aa_len,unique_aa,min_repeat,threshold):
    isRepeated = False
    fragment_list = []
    for site in cleavage_sites:
        fragment_list.append(seq.replace("*","").split(site))
    
    list_lengths = [len(lst) for lst in fragment_list]
    max_index = list_lengths.index(max(list_lengths))
    best_list = fragment_list[max_index]
    cleavage_site = cleavage_sites[max_index]

    repeat_num_list = []
    for fragment in best_list:
        repeat_num = 0
        if len(fragment) >= aa_len and len(set(fragment)) >= unique_aa:
            for frag in best_list:
                if similarity_ratio(fragment,frag) > threshold:
                    repeat_num += 1
        repeat_num_list.append(repeat_num)
    max_index = repeat_num_list.index(max(repeat_num_list))
    if repeat_num_list[max_index] >= min_repeat:
        repeat_seq = best_list[max_index]
        repeat_seq_list = [fragment for fragment in best_list if similarity_ratio(repeat_seq,fragment) > threshold]
        repeat_seq_updated = Counter(repeat_seq_list).most_common(1)[0][0]           
        repeat_num = repeat_num_list[max_index]
        representative_repeat = f"{repeat_seq_updated}{cleavage_site}"
        isRepeated = True
    
    if isRepeated:
        return representative_repeat, repeat_num
    else:
        return None, None


def RiPPppFinder(mode,aa_len,unique_aa,min_repeat,threshold,noKexB,fasta,df):
    if mode == "ripps":
        df["core"] = "none"
        df["domain_organization"] = "none"
    df["repeated_sequence"] = "none"
    df["repeat_count"] = "none"
    locus_tag_list = []
    seq_list = []

    cleavage_sites = ["KR","KK","RK","RR"]
    aa_letters = "ACDEFGHIKLMNPQRSTVWY"
    dipeptide_list = [f"{aa}{amino_acid}" for aa in aa_letters for amino_acid in aa_letters]
    
    for record in SeqIO.parse(fasta, "fasta"):
        locus_tag_list.append(record.id)
        seq_list.append(record.seq)
        
    truncated_sequences = [sequence[0:40] for sequence in seq_list]
    is_signal_list = predict_signal_peptide(truncated_sequences)
    
    for i in range(len(is_signal_list)):
        if is_signal_list[i] == "Y":
            isRepeated = False
            seq = str(seq_list[i])
            truncated_seq = seq[0:299]
            repeat_seq,count = RepeatSeqFinder(truncated_seq,cleavage_sites,aa_len,unique_aa,min_repeat,threshold)
            if repeat_seq:
                isRepeated = True
            if isRepeated == False and noKexB:
                repeat_seq,count = RepeatSeqFinder(truncated_seq,dipeptide_list,aa_len,unique_aa,min_repeat,threshold)
                if repeat_seq:
                    isRepeated = True
            if isRepeated:
                df.loc[(df["locus_tag"] == locus_tag_list[i]) & (df["core"] == "none"), "core"] = "RiPP PP"
                df.loc[df["locus_tag"] == locus_tag_list[i], "BP"] = 1
                df.loc[df["locus_tag"] == locus_tag_list[i], "repeated_sequence"] = repeat_seq
                df.loc[df["locus_tag"] == locus_tag_list[i], "repeat_count"] = count


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
                    identity = str(round(100*hsp.identities/len(hsp.match),1)) # value of %identity

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
    if mode == "all" or mode == "ripps" or mode == "sre" or mode == "human":
        target = "core"
    elif mode == "target":
        target = "target_homologue"
    elif mode == "pfam":
        target = "withTarget"

    for i in range(len(df)):
        if mode == "all" or mode == "ripps" or mode == "sre" or mode == "human":
            # if df.at[i,target] != "none" or df.at[i,"UstY"] != "none":
            if df.at[i,target] != "none":
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
                name = line.split(" ")[-1].rstrip()
                addDict = True
            if line.startswith("LENG"):
                length = int(line.split(" ")[-1].rstrip())
                if addDict:
                    pfamLength[name] = length
                    addDict = False

    with open(hmmscan_result) as hmm:
        # hmm_hits = hmm.readlines()
        hmm_hits = [line for line in hmm if line.startswith("#")==False]

    prot_hmm_list = []
    for i in range(len(hmm_hits)):
        split_list = hmm_hits[i].split()
        query = split_list[3]
        if [query] not in prot_hmm_list:
            prot_hmm_list.append([query])

    for i in range(len(hmm_hits)):
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
                    identity = str(round(100*hsp.identities/len(hsp.match),1)) # value of %identity
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


def HKGfinder(blastp_result,df):
    current_dir = os.path.dirname(os.path.abspath(__file__))

    min_identity = 50
    min_coverage = 50

    df["conserved_protein"] = 0
    df["other_conserved_protein"] = 0
    df["hkg_homologue"] = "none"
    df["hkg_homologue_product"] = "none"
    df["hkg_homologue_identity"] = "none"

    # Make a dictionary to link locus tags with their corresponding products
    hkgDict = {}
    hkg_csv = f"{current_dir}/data/Aspfum_proteins.csv"
    df_ = pd.read_csv(hkg_csv)
    for i in range(len(df_)):
        locus_tag = df_.at[i,"locus_tag"]
        product = df_.at[i,"product"]
        hkgDict[locus_tag] = product

    blast_records = NCBIXML.parse(open(blastp_result))

    for blast_record in blast_records:
        query = blast_record.query 
        try:
            for alignment in blast_record.alignments:
                if blast_record.query != alignment.title.replace(" ",""):
                    for hsp in alignment.hsps:                                    
                        identity = 100*hsp.identities/len(hsp.match) # value of %identity
                        identity_ = str(round(identity,1))
                        alignLen = hsp.align_length
                        hitLen = alignment.length
                        coverage = alignLen/hitLen*100
                        
                        if identity > min_identity and coverage > min_coverage:
                            blast_hit = alignment.title.replace(" ","")
                            blast_hit_product = hkgDict[blast_hit]
                            query_indices = df.index[df["locus_tag"] == query]
                            i = query_indices[0]
                            df.at[i,"conserved_protein"] = 1
                            df.at[i,"hkg_homologue"] = blast_hit
                            df.at[i,"hkg_homologue_product"] = blast_hit_product
                            df.at[i,"hkg_homologue_identity"] = identity_
                        break
        except:
            pass


def HumanProteinFinder(blastp_result,df):
    current_dir = os.path.dirname(os.path.abspath(__file__))

    min_identity = 40
    min_coverage = 40

    df["human_protein_like"] = 0
    df["human_homologue"] = "none"
    df["human_homologue_product"] = "none"
    df["human_homologue_identity"] = "none"

    # Make a dictionary to link locus tags with their corresponding products
    HumanProtDict = {}
    HumanProt_csv = f"{current_dir}/data/human_proteins.csv"
    df_ = pd.read_csv(HumanProt_csv)
    for i in range(len(df_)):
        gene = df_.at[i,"gene"]
        product = df_.at[i,"product"]
        HumanProtDict[gene] = product

    blast_records = NCBIXML.parse(open(blastp_result))

    for blast_record in blast_records:
        query = blast_record.query 
        try:
            for alignment in blast_record.alignments:
                if blast_record.query != alignment.title.replace(" ",""):
                    for hsp in alignment.hsps:                                    
                        identity = 100*hsp.identities/len(hsp.match) # value of %identity
                        identity_ = str(round(identity,1))
                        alignLen = hsp.align_length
                        hitLen = alignment.length
                        coverage = alignLen/hitLen*100

                        if identity > min_identity and coverage > min_coverage:
                            blast_hit = alignment.title.replace(" ","")
                            blast_hit_product = HumanProtDict[blast_hit]
                            query_indices = df.index[df["locus_tag"] == query]
                            i = query_indices[0]
                            df.at[i,"human_protein_like"] = 1
                            df.at[i,"human_homologue"] = blast_hit
                            df.at[i,"human_homologue_product"] = blast_hit_product
                            df.at[i,"human_homologue_identity"] = identity_
                        break
        except:
            pass


def DuplicationChecker(blastp_result,min_identity,df):
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
                        identity_ = str(round(identity,1))

                        if identity > min_identity:
                            query_indices = df.index[df["locus_tag"] == query]
                            i = query_indices[0]
                            if df.at[i,"conserved_protein"] == 1 and (float(df.at[i,"hkg_homologue_identity"]) - identity < 12) and identity < 85: #If a protein is much more similar to the HKG protein than to the duplicated protein, it suggests the protein is not a duplicated protein but that it has the same function as the HKG protein. Also, if the identity is too high (>85%), the protein might not be a self-resistance protein.
                                df.at[i,"BP"] = 1
                                df.at[i,"duplicated"] = 1
                                df.at[i,"duplicated_protein"] = blast_hit
                                df.at[i,"duplicated_protein_identity"] = identity_
                                break
                            elif df.at[i,"other_conserved_protein"] == 1:
                                df.at[i,"duplicated"] = 1
                                df.at[i,"duplicated_protein"] = blast_hit
                                df.at[i,"duplicated_protein_identity"] = identity_
                                break
                            elif df.at[i,"conserved_protein"] == 0 and df.at[i,"human_protein_like"] == 1 and identity < 85:
                                df.at[i,"BP"] = 1
                                df.at[i,"duplicated"] = 1
                                df.at[i,"duplicated_protein"] = blast_hit
                                df.at[i,"duplicated_protein_identity"] = identity_
                                break                                

        except:
            pass


def HousekeepingGeneFinder(df):
    df["housekeeping"] = 0
    min_identity = 70
    for i in range(len(df)):
        if (df.at[i,"conserved_protein"] == 1 or df.at[i,"other_conserved_protein"] == 1) and df.at[i,"duplicated"] == 0 and float(df.at[i,"hkg_homologue_identity"]) > min_identity:
            df.at[i,"core"] = "none"
            df.at[i,"housekeeping"] = 1
            df.at[i,"BP"] = 0


def DefineBoundary(mode,GBK_dir,BGC_dir,gap_allowed,min_prot_len,fungus_name,df,df_original,cluster_csv,IDdict,GeneNumDict,MetabDict,additional_genes,temp_dir,noCore,noUstY,file_name,log):
    current_dir = os.path.dirname(os.path.abspath(__file__))

    logger = logging.getLogger(file_name)
    logger.setLevel(logging.DEBUG)
    formatter = logging.Formatter('%(asctime)s - %(levelname)s:%(name)s - %(message)s')
    log.setFormatter(formatter)
    logger.addHandler(log)

    hmmscan_core_database = f"{current_dir}/data/hmm/core/core.hmm"

    #For LinkChecker/SimilarBGCfinder
    database = f"{current_dir}/data/DIAMOND/fungal_SM_proteins"
    protCSV = f"{current_dir}/data/proteins.csv"

    BGCdf = pd.read_csv(cluster_csv,index_col=[0])

    counter = 0
    BGC_num = 1

    while counter < len(df):

        withCore = False
        withTarget = False
        withRiPPpp = False
        withUstY = False
        withPPPS = False
        withSRE = False
        withHumanP = False
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

            geneNum = -1
            for j in range(counter,len(df)):
                geneNum += 1
                if df.at[j,"core"] != "none" and df.at[j,"core"] != "RiPP_PP":
                    withCore = True

                if df.at[j,"core"] == "RiPP PP":
                    withRiPPpp = True
                    RiPPppList.append(df.at[j,"locus_tag"])
                    RippPosList.append(j)

                if "UstYa" in df.at[j,"Pfam"] or "PhomB" in df.at[j,"Pfam"] or "VicY" in df.at[j,"Pfam"]:
                    withUstY = True

                if df.at[j,"core"] == "PPPS":
                    withPPPS = True

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

                if mode == "sre":
                    if df.at[j,"conserved_protein"] == 1 and df.at[j,"duplicated"] == 1 and df.at[j,"core"] == "none":
                        withSRE = True

                if mode == "human":
                    if df.at[j,"human_protein_like"] == 1 and df.at[j,"duplicated"] == 1 and df.at[j,"core"] == "none":
                        withHumanP = True

                if j == len(df) - 1:
                    if df.at[j,"BP"] == 1:
                        end_pos = df.at[j,"end"]
                        locus_tag_end = df.at[j,"locus_tag"]
                        geneNum += 1
                        break
                    else:
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
                            geneNum += 1
                            break                           
                    else:
                        end_pos = df.at[j,"end"]
                        locus_tag_end = df.at[j,"locus_tag"]
                        geneNum += 1
                        break
                else:
                    break

            if mode == "all":
                if noUstY:
                    if withRiPPpp:
                        ToBeExtracted = True
                else:
                    if withRiPPpp and withUstY:
                        ToBeExtracted = True
                if withCore:
                    ToBeExtracted = True

            if mode == "ripps":
                if noUstY:
                    if withRiPPpp:
                        ToBeExtracted = True
                else:
                    if withRiPPpp and withUstY:
                        ToBeExtracted = True
                
            if mode == "target" or mode == "pfam":
                if noUstY:
                    if withRiPPpp and withTarget:
                        ToBeExtracted = True
                else:
                    if withRiPPpp and withUstY and withTarget:
                        ToBeExtracted = True
                if withCore and withTarget:
                    ToBeExtracted = True
                if noCore and withTarget:
                    ToBeExtracted = True

            if mode == "sre":
                if noUstY:
                    if withRiPPpp and withSRE:
                        ToBeExtracted = True
                else:
                    if withRiPPpp and withUstY and withSRE:
                        ToBeExtracted = True
                if withCore and withSRE:
                    ToBeExtracted = True

            if mode == "human":
                if noUstY:
                    if withRiPPpp and withHumanP:
                        ToBeExtracted = True
                else:
                    if withRiPPpp and withUstY and withHumanP:
                        ToBeExtracted = True
                if withCore and withHumanP:
                    ToBeExtracted = True
            
            #in case RiPP PP candidate is found but no UstY homologue is found, the candidate is considered as nonBP, and BGC extraction process will be repeated
            if noUstY == False and withRiPPpp and withUstY == False:
                ToBeReset = True
            #in case only a PPPS is found in a BGC, the BGC will not be included
            if withPPPS and geneNum == 1:
                ToBeExtracted = False
            #in case only a RiPP PP is found in a BGC, the BGC will not be included
            if mode != "ripps" and withRiPPpp and geneNum == 1:
                ToBeExtracted = False


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
                if additional_genes > 0:
                    #Adjusting the start point
                    if counter_start - additional_genes >= 0:
                        for i in range(counter_start-1,counter_start-additional_genes-1,-1):
                            scaffold = df.at[counter_start,"scaffold"]
                            if df.at[i,"scaffold"] == scaffold:
                                start_pos = df.at[i,"start"]
                                locus_tag_start = df.at[i,"locus_tag"]
                            else:
                                break
                    else:
                        for i in range(counter_start-1,-1,-1):
                            scaffold = df.at[counter_start,"scaffold"]
                            if df.at[i,"scaffold"] == scaffold:
                                start_pos = df.at[i,"start"]
                                locus_tag_start = df.at[i,"locus_tag"]
                            else:
                                break

                    #Adjusting the end point
                    for i in range(len(df)):
                        if df.at[i,"locus_tag"] == locus_tag_end:
                            counter_end = i
                            break
                    if counter_end + additional_genes <= len(df) - 1:
                        for i in range(counter_end+1,counter_end+additional_genes+1):
                            scaffold = df.at[counter_end,"scaffold"]
                            if df.at[i,"scaffold"] == scaffold:
                                end_pos = df.at[i,"end"]
                                locus_tag_end = df.at[i,"locus_tag"]
                            else:
                                break
                    else:
                        for i in range(counter_end+1,len(df)):
                            scaffold = df.at[counter_end,"scaffold"]
                            if df.at[i,"scaffold"] == scaffold:
                                end_pos = df.at[i,"end"]
                                locus_tag_end = df.at[i,"locus_tag"]
                            else:
                                break                        

                gbk = f"{GBK_dir}/{scaffold}.gbk"
                seq_record = SeqIO.read(open(gbk),"genbank")
                subrecord = seq_record[start_pos:end_pos]
                subrecord.annotations["molecule_type"] = "DNA"
                subrecord.annotations['topology'] = 'linear'
                subrecord.annotations['source'] = fungus_name
                subrecord.annotations['organism'] = fungus_name
                bgc = f"{BGC_dir}/BGC{BGC_num}_{scaffold}_{locus_tag_start}_{locus_tag_end}.gbk"
                
                Pfam_list = []
                conserved_duplicated_list = []
                human_prot_list = []

                for feature in subrecord.features:
                    if feature.type == "CDS":
                        for i in range(len(df_original)):
                            if feature.qualifiers["locus_tag"][0] == df_original.at[i,"locus_tag"]:
                                if df_original.at[i,"core"] != "none":
                                    core_type = df_original.at[i,"core"]
                                    domain_organization = df_original.at[i,"domain_organization"]
                                    for core in core_type.split(","):
                                        core_list.append(core)
                                    if domain_organization != "none":
                                        core_info = core_type + "; " + domain_organization
                                    else:
                                        core_info = core_type
                                    feature.qualifiers["core"] = core_info
                                if df_original.at[i,"core"] == "RiPP PP":
                                    feature.qualifiers["repeated_seq"] = df_original.at[i,"repeated_sequence"] + " (" + str(df_original.at[i,"repeat_count"]) + " repeats)"
                                if df_original.at[i,"Pfam"] != "none":
                                    feature.qualifiers["Pfam"] = df_original.at[i,"Pfam"]
                                if df_original.at[i,"known_homologue"] != "none":
                                    homologue = df_original.at[i,"known_homologue full name"] + "|" + df_original.at[i,"known_homologue FBGC or FPROT ID"] + "; " + df_original.at[i,"known_homologue_identity"] + "%"
                                    feature.qualifiers["homologue"] = homologue
                                if df_original.at[i,"conserved_protein"] == 1 or df_original.at[i,"other_conserved_protein"] == 1:
                                    if df_original.at[i,"conserved_protein"] == 1 and df_original.at[i,"duplicated"] == 1:
                                        duplicated = df_original.at[i,"duplicated_protein"] + "; " + df_original.at[i,"duplicated_protein_identity"] + "%"
                                        feature.qualifiers["duplicated_protein"] = duplicated
                                        hkg_homologue = df_original.at[i,"hkg_homologue"] + "; " + df_original.at[i,"hkg_homologue_product"] + "; " + df_original.at[i,"hkg_homologue_identity"] + "%" + " (duplicated)"
                                        conserved_prot = df_original.at[i,"hkg_homologue_product"]
                                        if df_original.at[i,"core"] == "none":
                                            conserved_duplicated_list.append(conserved_prot)
                                    else:
                                        hkg_homologue = df_original.at[i,"hkg_homologue"] + "; " + df_original.at[i,"hkg_homologue_product"] + "; " + df_original.at[i,"hkg_homologue_identity"] + "%"
                                    feature.qualifiers["hkg_homologue"] = hkg_homologue
                                

                                if df_original.at[i,"human_protein_like"] == 1:
                                    if df_original.at[i,"duplicated"] == 1:
                                        human_prot = df_original.at[i,"human_homologue_product"] + "; " + df_original.at[i,"human_homologue_identity"] + "%" + " (duplicated)"
                                        feature.qualifiers["human_homologue"] = human_prot
                                        human_product = df_original.at[i,"human_homologue_product"]
                                        if df_original.at[i,"core"] == "none":
                                            human_prot_list.append(human_product)
                                    else:
                                        human_prot = df_original.at[i,"human_homologue_product"] + "; " + df_original.at[i,"human_homologue_identity"] + "%"
                                

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
                                    "TC (AsR6)":17,"TC (SalTPS)":18,"TC (VniA)":19,"PT (UbiA)":20,"PT (PaxC)":21,"PT (DMATS)":22,"PT (CosA)":23,"PPPS":24,
                                    "RiPP PP":25,"RCDPS":26,"ICS":27,"PEPM":28,"NRPS-like":29,"PKS-like":30,"ePLS":31}

                core_list_sorted = sorted(core_list, key=lambda x: preference[x])
                core_enz = ", ".join(core_list_sorted)
                if len(conserved_duplicated_list) > 0:
                    conserved_duplicated_prot = "; ".join(conserved_duplicated_list)
                else:
                    conserved_duplicated_prot = "-"

                if len(human_prot_list) > 0:
                    human_duplicated_prot = "; ".join(human_prot_list)
                else:
                    human_duplicated_prot = "-"
                
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


                BGC_list = [[fungus_name,f"BGC{BGC_num}",scaffold,start_pos+1,end_pos,locus_tag_start,locus_tag_end,total_genes,core_enz,conserved_duplicated_prot,human_duplicated_prot,similarBGCid,similarityScore,similarMetab,pfam]]
                columns = ["Fungus","BGC no.","Scaffold","Start position","End position","Locus tag start","Locus tag end",
                            "Number of genes","Core enzymes","Duplicated fungal proteins","Duplicated human homologues","Similar BGC","Similarity score","Metabolite from similar BGC","Pfam domains"]


                BGCdf_ = pd.DataFrame(BGC_list,columns=columns)

                if BGCdf.empty:
                    BGCdf = BGCdf_.copy()
                else:
                    BGCdf = pd.concat([BGCdf,BGCdf_])

                BGC_num += 1
    
        if ToBeReset:
            counter = counter_start
        else:
            counter += 1

    BGCdf = BGCdf.reset_index(drop=True).fillna("none")
    BGCdf.to_csv(cluster_csv)

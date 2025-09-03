#!/usr/bin/env python3
# coding: utf-8

import argparse
import os
import sys
from funbgcex.BGCeXtractor import BGCeXtractorMain


def get_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("gbk_dir",help="Directory of input GenBank files")
    parser.add_argument("output_dir",help="Output directory")
    parser.add_argument("-m","--mode",default="all",help="Search mode: all, ripps, target, pfam, sre, or human")
    parser.add_argument("-f","--fasta",default="none",help="This is required when 'target' mode is used. Please provide a FASTA file containing sequence(s) whose homologue should be found in extracted BGCs.")
    parser.add_argument("-p","--pfam",default="none",help="This is required when 'pfam' mode is used. Please provide a name of a protein family that should be included in extracted BGCs.")
    parser.add_argument("-g","--gap",default=2500,help="Maximum allowed gap (in bp) between two adjacent genes in a cluster, if no correlation is detected between the two genes (Default: 2500)",type=int)
    parser.add_argument("-bg","--bgc_gap",default=15000,help="Maximum allowed gap (in bp) between two adjacent genes, if they only have a weak correlation (Default: 15000)",type=int)
    parser.add_argument("-ml","--min_length",default=200,help="Minimum protein length considered for biosynthetic protein detection (Default: 200)",type=int)
    parser.add_argument("-n","--num_checked",default=20,help="Number of genes around the core/target genes to be checked (Default: 20)",type=int)
    parser.add_argument("-mi","--min_identity",default=50,help="Minimum identity required to be considered as a duplicated protein (Default: 50)",type=int)
    parser.add_argument("-ag","--additional_genes",default=0,help="Number of additional genes to be included outside a predicted BGC (Default: 0)",type=int)
    parser.add_argument("--no_core",action="store_true",help="Use if you wish to extract BGCs without a core protein as well.")
    parser.add_argument("--no_usty",action="store_true",help="Extract RiPP BGCs without a UstY homologue(s)")
    parser.add_argument("--no_kexb",action="store_true",help="Extract RiPP BGCs without a precursor peptide with KexB cleavage sites.")
    parser.add_argument("-w","--workers",default=1,help="Number of cuncurrently analyzed genomes (Default: 1)",type=int)
    parser.add_argument("--csv",action="store_true",help="To include analysis CSV files in the output.")
    parser.add_argument("-v","--version",action="version",version='%(prog)s 1.0.0')
    args = parser.parse_args()
    return(args)


def main():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    """
    Accept input file
    """
    args = get_args()
    gbk_dir = args.gbk_dir
    results_dir = args.output_dir
    mode = args.mode
    gap_allowed = args.gap
    max_bgc_gap = args.bgc_gap
    min_prot_len = args.min_length
    num_of_genes_checked = args.num_checked
    min_identity = args.min_identity
    additional_genes = args.additional_genes
    noCore = args.no_core
    noUstY = args.no_usty
    noKexB = args.no_kexb
    workers = args.workers
    NeedCSV = args.csv

    if os.path.isdir(gbk_dir) == False:
        sys.exit("The input directory does not exist.")
    if (mode == "all" or mode == "ripps" or mode == "sre" or mode == "human") and noCore:
        sys.exit("'no_core' can only be used with the target or pfam mode.")
    if additional_genes < 0:
        sys.exit("Please provide a non-negative int value for additional_genes.")
    if mode == "all" or mode == "ripps" or mode == "sre" or mode == "human":
        query = "none"
    elif mode == "target":
        query = args.fasta
        if query == "none":
            sys.exit("Please provide a fasta file.")
        if os.path.isfile(query) == False:
            sys.exit("The fasta file does not exist.")        
    elif mode == "pfam":
        PfamList = []
        allHMM = f"{current_dir}/data/hmm/fungalSM/fungalSM.hmm"
        with open(allHMM,"r") as hmm:
            for line in hmm:
                if line.startswith("NAME"):
                    name = line.split(" ")[-1].replace("\n","")
                    PfamList.append(name)
        query = args.pfam
        if query not in PfamList:
            if query != "none":
                print(f"{query} does not exist in the database.")
                ToBeContinued = True
                while ToBeContinued:
                    answer = input("Do you want to check the available protein family names? y/n: ")
                    if answer == "Y" or answer == "y":
                        print(PfamList)
                        ToBeContinued = False
                        sys.exit()
                    elif answer == "N" or answer == "n":
                        ToBeContinued = False
                    else:
                        pass    
                sys.exit()
            else:
                sys.exit("Please provide the name of a protein family to be used for BGC extraction.")
    else:
        sys.exit("Please choose 'all', 'ripps', 'target', 'pfam', 'sre', or 'human' as an extraction mode.")

    """
    Start BGC extraction
    """
    BGCeXtractorMain(gbk_dir,results_dir,mode,query,gap_allowed,max_bgc_gap,min_prot_len,num_of_genes_checked,min_identity,additional_genes,noCore,noUstY,noKexB,workers,NeedCSV)


if __name__ == "__main__":
    main()

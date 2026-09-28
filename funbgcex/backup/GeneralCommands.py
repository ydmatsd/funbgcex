#!/usr/bin/env python3

import subprocess
import glob
import concurrent.futures
# from pyhmmer.easel import SequenceFile
# from pyhmmer.plan7 import HMMFile
# from pyhmmer.hmmer import hmmscan


def runHMMscan(input_file,output_file,database,Evalue):
    subprocess.run(["hmmscan","--domtblout",output_file,"-E",str(Evalue),"--domE",
                    str(Evalue),database,input_file],stdout=subprocess.DEVNULL)

def runHMMfetch(HMMdatabase,target_name,output_file):
    subprocess.run(["hmmfetch","-o",output_file,HMMdatabase,target_name],stdout=subprocess.DEVNULL)

def runHMMpress(input_file):
    subprocess.run(["hmmpress",input_file],stdout=subprocess.DEVNULL)

def makeDIAMONDdb(fasta,database):
    subprocess.run(["diamond","makedb","--in",fasta,"--db",database],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)

def RunDIAMOND(fasta,database,output_file,max_target_seqs,max_hsps):
    max_target_seqs = str(max_target_seqs)
    max_hsps = str(max_hsps)
    subprocess.run(["diamond","blastp","--query",fasta,"--db",database,
                    "--out",output_file,"--outfmt","5","--max-target-seqs",max_target_seqs,
                    "--max-hsps",max_hsps],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)

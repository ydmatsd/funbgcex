#!/usr/bin/env python3

import glob
from pathlib import Path
import pandas as pd
import warnings
from Bio import BiopythonWarning
warnings.simplefilter('ignore', BiopythonWarning)
from Bio import SeqIO


class SeqHandling:
    def __init__(self,gbk_file,df):
        self.gbk_file = gbk_file
        self.df = df
        seq_records = SeqIO.parse(open(gbk_file),"genbank")
        fungus_name = ""
        for record in seq_records:
            self.fungus_name = record.annotations["source"].replace("\'","").replace("#","").replace("(","").replace(")","").replace(":","").replace("/","")
            self.fungus_name_original = record.annotations["source"]
            break

        self.file_name = Path(gbk_file).stem

    def name(self):
        return self.fungus_name

    def name_o(self):
        return self.fungus_name_original

    def AddLocusTag(self,output_dir):
        LTcounter = 1
        seq_records = list(SeqIO.parse(open(self.gbk_file),"genbank"))
        for record in seq_records:
            record.annotations["molecule_type"] = "DNA" # To define the molecule_type; otherwise, an error will occur.
            record.annotations['topology'] = 'linear'
            for feature in record.features:
                if feature.type == "CDS":
                    try:
                        if feature.qualifiers["locus_tag"][0] != "none":
                            pass
                    except:
                        locus_tag = f"PROTEIN{str(LTcounter).zfill(6)}"
                        feature.qualifiers["locus_tag"] = locus_tag
                        LTcounter += 1
        output_file = f"{output_dir}/{self.file_name}.gbk"
        SeqIO.write(seq_records, open(output_file, "w"), "genbank")

    def CDS_extractor(self,output_dir):
        seq_records = SeqIO.parse(open(self.gbk_file),"genbank")

        locus_tag_list = []
        scaffold_list = []
        start_list = []
        end_list = []
        seq_list = []
        seq_len_list = []
        
        fasta_file = f"{output_dir}/{self.file_name}.fasta"
        output_handle = open(fasta_file,"w")

        for record in seq_records:
            for feature in record.features:
                if feature.type == "CDS":
                    try:
                        if feature.qualifiers["locus_tag"][0] not in locus_tag_list: # Include each CDS only once; otherwise, hmmscan will cause an error.
                            try:
                                scaffold_name = record.name
                                feature_name = feature.qualifiers["locus_tag"][0]
                                feature_seq = feature.qualifiers["translation"][0].replace("-","")
                                output_handle.write(">"+feature_name+"\n"+feature_seq+"\n")

                                # To obtain the start/end locations of each CDS
                                start = feature.location.start
                                end = feature.location.end

                                locus_tag_list.append(feature_name)
                                scaffold_list.append(scaffold_name)
                                start_list.append(start)
                                end_list.append(end)
                                seq_list.append(feature_seq)
                                seq_len_list.append(len(feature_seq))
                            # When no translation is provided for the CDS
                            except:
                                continue
                    except:
                        continue

        output_handle.close()

        locus_tags = pd.Series(locus_tag_list)
        scaffolds = pd.Series(scaffold_list)
        starts = pd.Series(start_list)
        ends = pd.Series(end_list)
        seqs = pd.Series(seq_list)
        seq_lens = pd.Series(seq_len_list)
        self.df.insert(0,"locus_tag",locus_tags)
        self.df.insert(1,"scaffold",scaffolds)
        self.df.insert(2,"start",starts)
        self.df.insert(3,"end",ends)
        self.df.insert(4,"sequence",seqs)
        self.df.insert(5,"length",seq_lens)
        self.df["BP"] = 0


    def GBK_extractor(self,output_dir):
        seq_records = SeqIO.parse(open(self.gbk_file),"genbank")
        for record in seq_records:
            record.annotations["molecule_type"] = "DNA" # To define the molecule_type; otherwise, an error will occur.
            record.annotations['topology'] = 'linear'
            output_file = f"{output_dir}/{record.name}.gbk"
            SeqIO.write([record], open(output_file, "w"), "genbank")


def combineFASTA(fasta_dir,output_dir):
    fasta_files = glob.glob(f"{fasta_dir}/*.fasta")
    ALLlist = []

    for fasta in fasta_files:
        with open(fasta,"r") as fa:
            for line in fa:
                ALLlist.append(line)

    locus_tag_list = []
    combined = open(f"{output_dir}/combined.fasta","w")

    for i in range(len(ALLlist)-1):
        if ALLlist[i].startswith(">") and ALLlist[i] not in locus_tag_list:            
            locus_tag = ALLlist[i]
            seq = ALLlist[i+1]
            combined.write(locus_tag)
            combined.write(seq)
            locus_tag_list.append(locus_tag)
    combined.close()


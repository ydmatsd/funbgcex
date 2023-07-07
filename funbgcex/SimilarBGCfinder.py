#!/usr/bin/env python3


import os
import glob
import pandas as pd
import shutil
import random, string
from Bio.Blast import NCBIXML
from Bio import SeqIO
from funbgcex.GeneralCommands import *


def MakeProtBGCidDict(IDdict,GeneNumDict,MetabDict,proteinCSV):
	BGClist = []
	df = pd.read_csv(proteinCSV,index_col=[0])
	for i in range(len(df)):
		PROTid = df.at[i,"protein ID"]
		BGCid = df.at[i,"FBGC or FPROT ID"]
		IDdict[PROTid] = BGCid
		if BGCid not in BGClist:
			GeneNumDict[BGCid] = int(df.at[i,"gene number"])
			MetabDict[BGCid] = df.at[i,"metabolite"]
			BGClist.append(BGCid)


def ClusteredProteinFinder(fasta_dir,database,IDdict,deletedProtDict,max_bgc_gap,analysis_df,temp_dir):
	os.makedirs(temp_dir,exist_ok=True)

	DistanceDict = {}
	for i in range(len(analysis_df)-1):
		locus_tag = analysis_df.at[i,"locus_tag"]
		if analysis_df.at[i,"scaffold"] == analysis_df.at[i+1,"scaffold"]:
			distance = analysis_df.at[i+1,"start"] - analysis_df.at[i,"end"]
			DistanceDict[locus_tag] = distance

	clusteredProtList = []

	fasta_files = glob.glob(f"{fasta_dir}/*.fasta")
	for fasta in fasta_files:
		prot_list = []
		link_list = []
		with open(fasta) as fa:
			for line in fa:
				if line.startswith(">"):
					protName = line.replace(">","").replace("\n","")
					if protName not in deletedProtDict:
						prot_list.append(protName)
						link_list.append([protName,[],[]])

		df = pd.DataFrame(columns=prot_list,index=prot_list).fillna(0)

		"""
		Run DIAMOND
		"""
		blastp_result = f"{temp_dir}/blastp_result.xml"
		RunDIAMOND(fasta,database,blastp_result,100,1)

		"""
		Analyze BLASTp result
		"""
		blast_records = NCBIXML.parse(open(blastp_result))

		BLASTlist = []

		for blast_record in blast_records:
			try:
				for alignment in blast_record.alignments:
					for hsp in alignment.hsps:
						query = blast_record.query
						blast_hit = alignment.title.replace(" ","")
						identity = hsp.identities/len(hsp.match)*100
						alignLen = hsp.align_length
						hitLen = alignment.length
						coverage = alignLen/hitLen*100
						if identity > 25 and coverage > 50:
							BLASTlist.append([query,IDdict[blast_hit],identity])
			except:
				pass

		for item in BLASTlist:
			for prot in link_list:
				if item[0] == prot[0]:
					prot[1].append(item[1])
					prot[2].append(item[2])


		for i in range(len(link_list)-1):
			if len(link_list[i][1]) != 0:
				for j in range(i+1,len(link_list)):
					for k in range(len(link_list[i][1])):
						if link_list[i][1][k] in link_list[j][1]:
							position = link_list[j][1].index(link_list[i][1][k])
							if link_list[i][2][k] > 50 and link_list[j][2][position] > 50: #Strong correlation
								df.at[link_list[i][0],link_list[j][0]] = 2
								df.at[link_list[j][0],link_list[i][0]] = 2
								break
							else:
								df.at[link_list[i][0],link_list[j][0]] = 1
								df.at[link_list[j][0],link_list[i][0]] = 1

		for i in range(len(analysis_df)):
			locus_tag = analysis_df.at[i,"locus_tag"]
			if locus_tag in prot_list:
				df.at[locus_tag,locus_tag] = analysis_df.at[i,"BP"]

		clusterList = []
		
		for i in range(len(prot_list)-1):
			ToBeContinued = False
			locus_tag = prot_list[i]
			if df.at[locus_tag,locus_tag] == 1:
				if df.at[locus_tag,prot_list[i+1]] == 2: # If a strong correlation is found between the two adjacent genes, the two genes are included regardless of the distance between the two genes.
					ToBeContinued = True
				if DistanceDict[locus_tag] <= max_bgc_gap and ToBeContinued == False:					
					if df.at[locus_tag,prot_list[i+1]] != 0:
						ToBeContinued = True
					if i < len(prot_list)-2 and ToBeContinued == False:
						if df.at[locus_tag,prot_list[i+2]] != 0 and DistanceDict[prot_list[i+1]] <= max_bgc_gap:
							ToBeContinued = True
					if i < len(prot_list)-3 and ToBeContinued == False:
						if df.at[locus_tag,prot_list[i+3]] != 0 and DistanceDict[prot_list[i+1]] <= max_bgc_gap and DistanceDict[prot_list[i+2]] <= max_bgc_gap:
							ToBeContinued = True
				
			if ToBeContinued:
				clusterStart = locus_tag
				clusterEnd = prot_list[i+1]
				zeroNum = 0
				if i == len(prot_list)-2:
					break
				else:
					for j in range(i+2,len(prot_list)):
						if DistanceDict[prot_list[j-1]] > max_bgc_gap and df.at[locus_tag,prot_list[j]] != 2:
							break
						if df.at[locus_tag,prot_list[j]] == 0:
							zeroNum += 1
						else:
							zeroNum = 0
							clusterEnd = prot_list[j]
						if zeroNum == 3:
							break

					clusterList.append([clusterStart,clusterEnd])


		for i in range(len(prot_list)-1,0,-1):
			ToBeContinued = False
			locus_tag = prot_list[i]
			if df.at[locus_tag,locus_tag] == 1:
				if df.at[locus_tag,prot_list[i-1]] == 2: # If a strong correlation is found between the two adjacent genes, the two genes are included regardless of the distance between the two genes.
					ToBeContinued = True
				if DistanceDict[prot_list[i-1]] <= max_bgc_gap and ToBeContinued == False:			
					if df.at[locus_tag,prot_list[i-1]] != 0:
						ToBeContinued = True
					if i > 1 and ToBeContinued == False:
						if df.at[locus_tag,prot_list[i-2]] != 0 and DistanceDict[prot_list[i-2]] <= max_bgc_gap:
							ToBeContinued = True
					if i > 2 and ToBeContinued == False:
						if df.at[locus_tag,prot_list[i-3]] != 0 and DistanceDict[prot_list[i-2]] <= max_bgc_gap and DistanceDict[prot_list[i-3]] <= max_bgc_gap:
							ToBeContinued = True

			if ToBeContinued:
				clusterEnd = locus_tag
				clusterStart = prot_list[i-1]
				zeroNum = 0
				if i == 1:
					break
				else:
					for j in range(i-2,-1,-1):
						if DistanceDict[prot_list[j]] > max_bgc_gap and df.at[locus_tag,prot_list[j]] != 2:
							break
						if df.at[locus_tag,prot_list[j]] == 0:
							zeroNum += 1
						else:
							zeroNum = 0
							clusterStart = prot_list[j]
						if zeroNum == 3:
							break

					if [clusterStart,clusterEnd] not in clusterList:
						clusterList.append([clusterStart,clusterEnd])


		for item in clusterList:
			ToBeAdded = False
			for i in range(len(prot_list)):
				if prot_list[i] == item[0]:
					ToBeAdded = True
				if ToBeAdded and prot_list[i] not in clusteredProtList:
					clusteredProtList.append(prot_list[i])
				if prot_list[i] == item[1]:
					break

	analysis_df["clustered"] = 0

	for i in range(len(analysis_df)):
		if analysis_df.at[i,"locus_tag"] in clusteredProtList:
			analysis_df.at[i,"clustered"] = 1
			analysis_df.at[i,"BP"] = 1

	shutil.rmtree(temp_dir)


class SimilarBGCfinder:
	def __init__(self,inputGBK,database,proteinCSV,IDdict,GeneNumDict,MetabDict,temp_dir):
		os.makedirs(temp_dir,exist_ok=True)

		self.inputGBK = inputGBK
		self.database = database
		self.proteinCSV = proteinCSV

		"""
		Extract CDSs
		"""
		fasta_file = f"{temp_dir}/proteins.fasta"
		output_handle = open(fasta_file,"w")

		seq_record = SeqIO.read(open(inputGBK),"genbank")

		counter = 1
		for feature in seq_record.features:
			if feature.type == "CDS":
				try:
					feature_name = f"PROTEIN{str(counter).zfill(6)}"
					feature_seq = feature.qualifiers["translation"][0].replace("-","")
					output_handle.write(">"+feature_name+"\n"+feature_seq+"\n")
					counter += 1
				except:
					pass

		output_handle.close()

		"""
		Run DIAMOND
		"""
		blastp_result = f"{temp_dir}/blastp_result.xml"
		RunDIAMOND(fasta_file,database,blastp_result,500,1)

		"""
		Analyze BLASTp result
		"""
		blast_records = NCBIXML.parse(open(blastp_result))

		BLASTlist = []

		for blast_record in blast_records:
			try:
				for alignment in blast_record.alignments:
					for hsp in alignment.hsps:
						query = blast_record.query
						blast_hit = alignment.title.replace(" ","")
						identity = 100*hsp.identities/len(hsp.match) # value of %identity
						evalue = hsp.expect
						alignLen = hsp.align_length
						hitLen = alignment.length
						coverage = alignLen/hitLen*100
						if identity >= 45 and coverage > 50:
							BLASTlist.append([query,blast_hit,IDdict[blast_hit],evalue,identity])
			except:
				pass

		BGClist = []
		for item in BLASTlist:
			if [item[2],[]] not in BGClist:
				BGClist.append([item[2],[]])

		for bgc in BGClist:
			for item in BLASTlist:
				if bgc[0] == item[2]:
					if [item[1]] not in bgc[1]:
						bgc[1].append([item[1]])

		for bgc in BGClist:
			for prot in bgc[1]:
				for item in BLASTlist:
					if prot[0] == item[1]:
						prot.append([item[3],item[4]]) 

		for bgc in BGClist:
			for prot in bgc[1]:
				if len(prot) > 2:
					evalueList = []
					for i in range(1,len(prot)):
						evalueList.append(prot[i][0])
						minEvalue = min(evalueList)
					ToBeDeletedList = []
					for i in range(1,len(prot)):
						if prot[i][0] != minEvalue:
							ToBeDeletedList.append(prot[i])
					for item in ToBeDeletedList:
						prot.remove(item)

		"""
		Calculate the similarity score
		"""
		scoreList = []
		BGCscoreList = []
		for bgc in BGClist:
			HitGeneNum = len(bgc[1])
			TargetGeneNum = GeneNumDict[bgc[0]]
			identityList = []
			for item in bgc[1]:
				identity = item[1][1]
				identityList.append(identity)
			AvgIdentity = sum(identityList)/len(identityList)

			SimilarityScore = AvgIdentity * (HitGeneNum/TargetGeneNum)
			scoreList.append(SimilarityScore)
			BGCscoreList.append([bgc[0],SimilarityScore])


		if len(scoreList) != 0:
			maxScore = max(scoreList)
			for item in BGCscoreList:
				if item[1] == maxScore:
					self.similarBGC = item[0]
					self.simlarity_score = "{:.1f}".format(item[1])
					self.metabolite = MetabDict[item[0]]

		else:
			self.similarBGC = "-"
			self.simlarity_score = "-"
			self.metabolite = "-"

		shutil.rmtree(temp_dir)

	def bgc(self):
	    return self.similarBGC

	def score(self):
	    return self.simlarity_score

	def metab(self):
	    return self.metabolite


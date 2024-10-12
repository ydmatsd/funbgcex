#!/usr/bin/env python3

import os
import random, string
from natsort import natsorted
import shutil
from funbgcex.GeneralCommands import runHMMscan

class Annotation:
    def __init__(self,seq,hmm_file,temp_dir):
        current_dir = os.path.dirname(os.path.abspath(__file__))
        self.seq = seq
        self.hmm_file = hmm_file

        DomainLength = {'PKS_AT': 382, 'NRPS_C': 432, 'fPKS_PT': 303, 'PaxC': 331, 'Pyr4': 243, 
        'ACP_PCP': 69, 'AnkA': 531, 'SQHop_cyclase_N': 291, 'NRPS_E': 438, 'fPKS_ER': 314, 
        'TRI5': 362, 'AsR6': 430, 'GGPS': 347, 'fPKS_TH': 278, 'fPKS_R': 231, 'Chal_sti_synt_N': 225, 
        'PKS_NRPS_MT': 202, 'UbiA_PT': 309, 'PKS_KS': 535, 'AstC': 520, 'SAT2': 386, 'Trp_DMAT': 363, 
        'NRPS_term_dom': 695, 'NRPS_CT': 416, 'PbcA': 972, 'ABA3': 446, 'Chal_sti_synt_C': 151, 
        'UbiA_TC': 292, 'Thioesterase': 230, 'SQHop_cyclase_C': 319, 'Carn_acyltransf': 568, 
        'fPKS_DH': 306, 'Terpene_syn_C_2': 199, 'Terpene_synth_C':267,'Abhydrolase_3': 211, 'fPKS_KR': 175,
        'AA-adenyl-dom': 409, 'DIT1_PvcA': 277, 'PEP_mutase': 241, 'SalTPC': 606, 'CosA': 319}

        os.makedirs(temp_dir,exist_ok=True)
        fasta = f"{temp_dir}/seq.fasta"
        with open(fasta,"w") as f:
            f.write(">seq\n")
            f.write(self.seq)

        hmmscan_output = f"{temp_dir}/hmmscan_results"
        os.makedirs(hmmscan_output,exist_ok=True)
        hmmscan_result =  f"{hmmscan_output}/hmmscan_results.txt"

        runHMMscan(fasta,hmmscan_result,hmm_file,"1e-3")

        with open(hmmscan_result) as hmm:
            hmm_hits = hmm.readlines()

        hmm_list = []

        for i in range(3,len(hmm_hits)-10):
            split_list = hmm_hits[i].split()
            domName = split_list[0]
            score = float(split_list[13])
            startPos = int(split_list[19])
            endPos = int(split_list[20])
            centerPos = (startPos+endPos)/2
            pfam_list = [domName,score,startPos,endPos,centerPos]
            hmm_list.append(pfam_list)


        position_list = []
        sorted_list = []

        for domain in hmm_list:
            sublist = [domain[2],domain[0]]
            position_list.append(sublist)

        position_list = natsorted(position_list)

        for position in position_list:
            for domain in hmm_list:
                if position[0] == domain[2] and position[1] == domain[0]:
                    sorted_list.append(domain)

        ToBeDeletedList = []
        for i in range(len(sorted_list)-1):
            for j in range(i+1,len(sorted_list)):
                if sorted_list[i][0] == sorted_list[j][0]:
                    length = sorted_list[j][3] - sorted_list[i][2]
                    domainName = sorted_list[i][0]
                    if length < DomainLength[domainName]*1.5: #The maximum length allowed is 1.5 fold of the domain length.
                        combinedScore = sorted_list[i][1] + sorted_list[j][1]
                        sorted_list[i][1] = combinedScore
                        newStartPoint = sorted_list[i][2]
                        sorted_list[i][2] = newStartPoint
                        newEndPoint = sorted_list[j][3]
                        sorted_list[i][3] = newEndPoint
                        newCenterPoint = (sorted_list[i][2] + sorted_list[j][3])/2
                        sorted_list[i][4] = newCenterPoint
                        ToBeDeletedList.append(sorted_list[j])
                        break
                        
        for item in ToBeDeletedList:
            sorted_list.remove(item)
                   
        ToBeDeletedList = []
        for item in sorted_list:
            score = item[1]
            startPos = item[2]
            endPos = item[3]
            centerPos = item[4]
            for item2 in sorted_list:
                if item2[2] < centerPos < item2[3] and score < item2[1]:
                    if item not in ToBeDeletedList:
                        ToBeDeletedList.append(item)

        for item in ToBeDeletedList:
            sorted_list.remove(item)

        classification = "none"
        self.domain_org = "none"
        coreList = []
        withA = False
        withKS = False
        withClassOneTC = False
        withPbcA = False
        withGGPS = False
        domains_list = []

        for item in sorted_list:

            if "AA-adenyl-dom" in item and float(item[1]) > 50:
                withA = True
                domains_list.append(["A",item[2]])
            if "NRPS_C" in item and float(item[1]) > 50:
                domains_list.append(["C",item[2]])
            if "NRPS_E" in item and float(item[1]) > 50:
                domains_list.append(["E",item[2]])
            if "NRPS_CT" in item and float(item[1]) > 50:
                domains_list.append(["CT",item[2]])
            if "fPKS_R" in item:
                domains_list.append(["R",item[2]])
            if "Thioesterase" in item or "Abhydrolase_3" in item:
                domains_list.append(["TE",item[2]])
            if "PKS_KS" in item and float(item[1]) > 50:
                withKS = True
                domains_list.append(["KS",item[2]])
            if "PKS_AT" in item and float(item[1]) > 50:
                domains_list.append(["AT",item[2]])
            if "SAT2" in item and float(item[1]) > 10:
                domains_list.append(["SAT",item[2]])
            if "fPKS_KR" in item and float(item[1]) > 30:
                domains_list.append(["KR",item[2]])
            if "fPKS_PT" in item and float(item[1]) > 30:
                domains_list.append(["PT",item[2]])
            if "fPKS_DH" in item and float(item[1]) > 30:
                domains_list.append(["DH",item[2]])
            if "fPKS_TH" in item and float(item[1]) > 30:
                domains_list.append(["TH",item[2]])
            if "fPKS_ER" in item and float(item[1]) > 30:
                domains_list.append(["ER",item[2]])            
            if "PKS_NRPS_MT" in item:
                domains_list.append(["MT",item[2]])
            if "ACP_PCP" in item:
                domains_list.append(["ACP",item[2]])            
            if "Carn_acyltransf" in item:
                domains_list.append(["cAT",item[2]])
            if "NRPS_term_dom" in item:
                domains_list.append(["C-C-C",item[2]])

        if withKS or withA:
            domain_org_list = []

            for domain in domains_list:
                domain_org_list.append(domain[0])


            #Classification of the enzyme
            if "KS" in domain_org_list:
                if "A" in domain_org_list:
                    if domain_org_list.index("A") > domain_org_list.index("KS"):
                        classification = "PKS-NRPS"
                        coreList.append(classification)
                    else:
                        classification = "NRPS-PKS"
                        coreList.append(classification)
                elif "AT" in domain_org_list:
                    if "PT" in domain_org_list and "KR" not in domain_org_list:
                        classification = "NR-PKS"
                        coreList.append(classification)
                    elif "DH" in domain_org_list:
                        classification = "HR-PKS"
                        coreList.append(classification)
                    elif "TH" in domain_org_list:
                        classification = "PR-PKS"
                        coreList.append(classification)
                    else:
                        classification = "PKS-like"
                        coreList.append(classification)
                else:
                    classification = "none"
            elif "A" in domain_org_list:
                if "C" in domain_org_list or "CT" in domain_org_list:
                    classification = "NRPS"
                    coreList.append(classification)
                elif "R" in domain_org_list or "TE" in domain_org_list or "ACP" in domain_org_list:
                    classification = "NRPS-like"
                    coreList.append(classification)
                elif "C-C-C" in domain_org_list:
                    classification = "ePLS"
                    coreList.append(classification)
                else:
                    classification = "none"
            else:
                classification = "none"

            if classification == "PKS-NRPS" or classification == "NRPS-PKS":
                for i in range(len(domain_org_list)):
                    if domain_org_list[i] == "ACP":
                        if (domain_org_list.index("A") < i < domain_org_list.index("KS")) or\
                        (domain_org_list.index("KS") < domain_org_list.index("A") < i):
                            domain_org_list[i] = "T"
            if classification == "PKS-NRPS":
                if domain_org_list[-1] == "R":
                    domain_org_list[-1] = "R/DKC"
            if classification == "NRPS" or classification == "NRPS-like":
                for i in range(len(domain_org_list)):
                    if domain_org_list[i] == "ACP":
                        domain_org_list[i] = "T"

            if classification != "none":
                domain_org = "-".join(domain_org_list)
            else:
                domain_org = "none"

            self.classification = classification
            self.domain_org = domain_org          

            
        for item in sorted_list:
            if 'Chal_sti_synt_N' in item or 'Chal_sti_synt_C' in item:
                classification = "T3PKS"
                if classification not in coreList:
                    coreList.append(classification)
            elif 'Terpene_syn_C_2' in item or 'Terpene_synth_C' in item:
                classification = "TC (Class1)"
                if classification not in coreList:
                    coreList.append(classification)
                withClassOneTC = True
            elif 'SQHop_cyclase_C' in item or 'SQHop_cyclase_N' in item:
                classification = "TC (SHC/OSC)"
                if classification not in coreList:
                    coreList.append(classification)
            elif 'TRI5' in item:
                classification = "TC (Tri5)"
                if classification not in coreList:
                    coreList.append(classification)
            elif "Trp_DMAT" in item:
                classification = "PT (DMATS)"
                if classification not in coreList:
                    coreList.append(classification)
            elif "Pyr4" in item:
                classification = "TC (Pyr4)"
                if classification not in coreList:
                    coreList.append(classification)
            elif "PbcA" in item:
                classification = "TC (PbcA)"
                if classification not in coreList:
                    coreList.append(classification)
                withPbcA = True
            elif "AstC" in item and float(item[1]) > 250:
                classification = "TC (AstC)"
                if classification not in coreList:
                    coreList.append(classification)
            elif "ABA3" in item:
                classification = "TC (ABA3)"
                if classification not in coreList:
                    coreList.append(classification)
            elif "AsR6" in item:
                classification = "TC (AsR6)"
                if classification not in coreList:
                    coreList.append(classification)
            elif "SalTPS" in item:
                classification = "TC (SalTPS)"
                if classification not in coreList:
                    coreList.append(classification)
            elif "UbiA_PT" in item:
                classification = "PT (UbiA)"
                if classification not in coreList:
                    coreList.append(classification)
            elif "UbiA_TC" in item:
                classification = "TC (UbiA)"
                if classification not in coreList:
                    coreList.append(classification)
            elif "CosA" in item:
                classification = "PT (CosA)"
                if classification not in coreList:
                    coreList.append(classification)
            elif "GGPS" in item:
                classification = "PPPS"
                if classification not in coreList:
                    coreList.append(classification)
                withGGPS = True
            elif "PaxC" in item:
                classification = "PT (PaxC)"
                if classification not in coreList:
                    coreList.append(classification)
            elif "AnkA" in item:
                classification = "RCDPS"
                if classification not in coreList:
                    coreList.append(classification)
            elif "DIT1_PvcA" in item:
                classification = "ICS"
                if classification not in coreList:
                    coreList.append(classification)
            elif "PEP_mutase" in item and float(item[1]) > 100:
                classification = "PEPM"
                if classification not in coreList:
                    coreList.append(classification)
        if (withClassOneTC and withGGPS) or (withPbcA and withGGPS):
            if "TC (Class1)" in coreList:
                coreList.remove("TC (Class1)")
            if "TC (PbcA)" in coreList:
                coreList.remove("TC (PbcA)")
            if "PPPS" in coreList:
                coreList.remove("PPPS")
            coreList.append("chimeric TS")
            classification = "chimeric TS"


        preference = {"PKS-NRPS":1,"NRPS-PKS":2,"NR-PKS":3,"PR-PKS":4,"HR-PKS":5,"T3PKS":6,"NRPS":7,"chimeric TS":8,"TC (Class1)":9,
                            "TC (SHC/OSC)":10,"TC (Tri5)":11,"TC (Pyr4)":12,"TC (UbiA)":13,"TC (PbcA)":14,"TC (AstC)":15,"TC (ABA3)":16,
                            "TC (AsR6)":17,"TC (SalTPS)":18,"PT (UbiA)":19,"PT (PaxC)":20,"PT (DMATS)":21,"PT (CosA)":22,"PPPS":23,"RiPP PP":24,
                            "RCDPS":25,"ICS":26,"PEPM":27,"NRPS-like":28,"PKS-like":29,"ePLS":30}

        coreList = sorted(coreList, key=lambda x: preference[x])

        if len(coreList) == 0:
            classification_ = "none"
        else:
            classification_ = ",".join(coreList)
        self.classification = classification_
        
        shutil.rmtree(temp_dir)

    def type(self):
        return self.classification
    
    def domain(self):
        return self.domain_org


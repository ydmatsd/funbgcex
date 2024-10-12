#!/usr/bin/env python3

import os
import shutil
import pandas as pd
from pathlib import Path
import glob
from natsort import natsorted
import warnings
from Bio import BiopythonWarning
warnings.simplefilter('ignore', BiopythonWarning)
from Bio import SeqIO


coreDict = {"PKS-NRPS":"polyketide synthase-nonribosomal peptide synthetase",
            "NRPS-PKS":"nonribosomal peptide synthetase-polyketide synthase",
            "NR-PKS":"non-reducing polyketide synthase",
            "PR-PKS":"partially reducing polyketide synthase",
            "HR-PKS":"highly reducing polyketide synthase",
            "T3PKS":"type III polyketide synthase",
            "NRPS":"nonribosomal peptide synthetase",
            "chimeric TS":"bifunctional prenyltransferase/terpene cyclase",
            "TC (Class1)":"canonical class I terpene cyclase",
            "TC (SHC/OSC)":"squalene-hopene cyclase/oxidosqualene cyclase",
            "TC (Tri5)":"Tri5-like terpene synthase",
            "TC (Pyr4)":"Pyr4-like terpene cyclase",
            "TC (UbiA)":"UbiA-like terpene synthase",
            "TC (PbcA)":"PbcA-like terpene synthase",
            "TC (AstC)":"AstC-like terpene synthase",
            "TC (ABA3)":"ABA3-like terpene synthase",
            "TC (AsR6)":"AsR6-like terpene synthase",
            "TC (SalTPS)":"SalTPS-like terpene synthase",
            "PT (UbiA)":"UbiA-like prenyltransferase",
            "PT (PaxC)":"IPPS-type prenyltransferase",
            "PT (DMATS)":"DMATS-type prenyltransferase",
            "PT (CosA)":"CosA-like prenyltransferase",
            "PPPS":"polyprenyl pyrophosphate synthase",
            "RiPP PP":"RiPP precursor peptide",
            "RCDPS":"arginine-containing cyclodipeptide synthase",
            "ICS":"isocyanide synthase",
            "PEPM":"phosphoenolpyruvate mutase",
            "NRPS-like":"NRPS-like enzyme",
            "PKS-like":"PKS-like enzyme",
            "ePLS":"epsilon-poly-L-lysine synthetase"}


coreColorDict = {"PKS-NRPS":"#802A4A",
                "NRPS-PKS":"#802A4A",
                "NR-PKS":"#FF0000",
                "PR-PKS":"#FF0000",
                "HR-PKS":"#FF0000",
                "T3PKS":"#FF6464",
                "NRPS":"#005493",
                "chimeric TS":"#945200",
                "TC (Class1)":"#945200",
                "TC (SHC/OSC)":"#945200",
                "TC (Tri5)":"#945200",
                "TC (Pyr4)":"#945200",
                "TC (UbiA)":"#945200",
                "TC (PbcA)":"#945200",
                "TC (AstC)":"#945200",
                "TC (ABA3)":"#945200",
                "TC (AsR6)":"#945200",
                "TC (SalTPS)":"#945200",
                "PT (UbiA)":"#0000FF",
                "PT (PaxC)":"#0000FF",
                "PT (DMATS)":"#0000FF",
                "PT (CosA)":"#0000FF",
                "PPPS":"#0000FF",
                "RiPP PP":"#FF6BA0",
                "RCDPS":"#941751",
                "ICS":"#83194C",
                "PEPM":"#C7E280",
                "NRPS-like":"#005493",
                "PKS-like":"#FF0000",
                "ePLS":"#005493"}


def HTMLgenerator(BGCcsv,fungus_name,output_dir):
    current_dir = os.path.dirname(os.path.abspath(__file__))

    html_dir = f"{output_dir}/HTMLs"
    os.makedirs(html_dir,exist_ok=True)

    css = f"{current_dir}/data/HTML/css/style.css"
    main_css = f"{current_dir}/data/HTML/css/main_style.css"
    pfam_css = f"{current_dir}/data/HTML/css/protfam_style.css"
    copied_css_dir = f"{output_dir}/HTMLs/css"
    os.makedirs(copied_css_dir,exist_ok=True)
    shutil.copy2(css,copied_css_dir)
    shutil.copy2(main_css,copied_css_dir)
    shutil.copy2(pfam_css,copied_css_dir)

    logo = f"{current_dir}/data/HTML/img/logo.png"
    link = f"{current_dir}/data/HTML/img/link.png"
    copied_img_dir = f"{html_dir}/img"
    os.makedirs(copied_img_dir,exist_ok=True)
    shutil.copy2(logo,copied_img_dir)
    shutil.copy2(link,copied_img_dir)

    js_dir = f"{html_dir}/js"
    os.makedirs(js_dir,exist_ok=True)
    filter_js = f"{current_dir}/data/HTML/js/filter.js"
    filter_js2 = f"{current_dir}/data/HTML/js/filter2.js"
    shutil.copy2(filter_js,js_dir)
    shutil.copy2(filter_js2,js_dir)

    pfamHTML = f"{current_dir}/data/HTML/protfam.html"
    classHTML = f"{current_dir}/data/HTML/classification.html"
    shutil.copy2(pfamHTML,html_dir)
    shutil.copy2(classHTML,html_dir)

    BGCcsv = f"{output_dir}/BGCs.csv"
    BGCdir = f"{output_dir}/BGCs"

    gbk_files = glob.glob(f"{BGCdir}/*.gbk")
    gbk_files = natsorted(gbk_files)


    #Make the main page
    codeList = []
    df = pd.read_csv(BGCcsv,index_col=[0]).fillna("-")
    for i in range(len(df)):
        BGCno = df.at[i,"BGC no."]
        scaffold = df.at[i,"Scaffold"]
        start = df.at[i,"Start position"]
        end = df.at[i,"End position"]
        position = f"{scaffold} / {start}...{end}"
        core = df.at[i,"Core enzymes"]
        geneNum = df.at[i,"Number of genes"]
        similarBGCid = df.at[i,"Similar BGC"]
        if similarBGCid != "-":
            similarity = str(df.at[i,"Similarity score"])
            similarMetab = df.at[i,"Metabolite from similar BGC"]
            similarBGC = f"<a class='link' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/{similarBGCid}.html' target='_blank'>{similarBGCid}</a> ({similarMetab})"
        else:
            similarBGC = "–"
            similarity = "–"

        code = f'\t\t\t<tr>\n\t\t\t\t<td><a class="link" href="HTMLs/{BGCno}.html#top">{BGCno}</a></td>\n\t\t\t\t<td>{position}</td>\n</td>\n\t\t\t\t<td>{geneNum}</td>\n\t\t\t\t<td>{core}</td>\n\t\t\t\t<td>{similarBGC}</td>\n\t\t\t\t<td>{similarity}</td>\n'
        codeList.append(code)

    tableCode = "".join(codeList)

    templateHTML = open(f"{current_dir}/data/HTML/MAINtemplate.html","r")
    newHTML = open(f"{output_dir}/results.html","w")

    for line in templateHTML:
        newLine = line.replace("BGCsTABLE",tableCode)
        newHTML.write(newLine)

    templateHTML.close()
    newHTML.close()


    #Make the top part of the HTML file
    BGClist = []
    df = pd.read_csv(BGCcsv,index_col=[0]).fillna("-")
    for i in range(len(df)):
        BGCno = df.at[i,"BGC no."]
        coreList = df.at[i,"Core enzymes"]

        BGCtype = "none" #for an unexpected situation
        
        withPKSNRPS = False
        withPKS = False
        withT3PKS = False
        withNRPS = False
        withTC = False
        withPT = False
        withPiPPpp = False
        withRCDPS = False
        withICS = False
        withPEPM = False

        if "PKS-NRPS" in coreList or "PKS-NRPS" in coreList:
            withPKSNRPS = True
        if "PKS" in coreList:
            withPKS = True
        if "T3PKS" in coreList:
            withT3PKS = True
        if "NRPS" in coreList:
            withNRPS = True
        if "TC " in coreList or " TS" in coreList:
            withTC = True
        if "PT" in coreList or "PPPS" in coreList:
            withPT = True
        if "RiPP PP" in coreList:
            withPiPPpp = True
        if "RCDPS" in coreList:
            withRCDPS = True
        if "ICS" in coreList:
            withICS = True
        if "PEPM" in coreList:
            withPEPM = True
            
        if withPKSNRPS:
            BGCtype = "pks-nrps"
        elif withPKS and withT3PKS == False:
            if withNRPS:
                BGCtype = "pks-nrps"
            elif withTC or withPT:
                BGCtype = "pks-terpene"
            else:
                BGCtype = "pks"
        elif withT3PKS:
            BGCtype = "t3pks"
        elif withNRPS:
            BGCtype = "nrps"
        elif withTC:
            BGCtype = "terpene"
        elif withPiPPpp:
            BGCtype = "ripp"
        elif withRCDPS:
            BGCtype = "rcdps"
        elif withICS:
            BGCtype = "ics"
        elif withPEPM:
            BGCtype = "pepm"
        elif withPT:
            BGCtype = "pt-only"
        
        if "PT (PaxC)" in coreList and "TC (Pyr4)" in coreList:
            BGCtype = "idt"

        bgcLink = f'\t\t\t<li><a href="{BGCno}.html#top"><span class="circle {BGCtype}">{str(i+1)}</span></a></li>\n'
        BGClist.append(bgcLink)


    df = pd.read_csv(BGCcsv,index_col=[1]).fillna("-")
    for gbk in gbk_files:
        #Obtain BGC information
        BGCno = Path(gbk).stem.split("_")[0]
        BGCtitle = f"{BGCno} - {fungus_name}"
        scaffold = df.at[BGCno,"Scaffold"]
        start = df.at[BGCno,"Start position"]
        end = df.at[BGCno,"End position"]
        position = f"{scaffold} / {start}...{end}"
        core = df.at[BGCno,"Core enzymes"]
        seq_record = SeqIO.read(open(gbk),"genbank")
        length = len(seq_record.seq)
        similarBGCid = df.at[BGCno,"Similar BGC"]
        if similarBGCid != "-":
            similarity = str(df.at[BGCno,"Similarity score"])
            similarMetab = df.at[BGCno,"Metabolite from similar BGC"]
            similarBGC = f"<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/{similarBGCid}.html' target='_blank'>{similarBGCid}</a> ({similarMetab}) / {similarity}"
        else:
            similarBGC = "–"

        templateHTML = open(f"{current_dir}/data/HTML/BGCtemplate.html","r")
        newHTML = open(f"{html_dir}/{BGCno}.html","w")

        BGClist2 = []
        for item in BGClist:
            if f"{BGCno}.html" in item:
                item = item.replace("circle ","circle current_")
            BGClist2.append(item)
        BGClinks = "".join(BGClist2)
        
        for line in templateHTML:
            newLine = line.replace("BGClist",BGClinks).replace("bgcNUMBER",BGCno).replace("bgcTITLE",BGCtitle).replace("POSITION",position).replace("CORE",core).replace("bgcLENGTH",str(length)).replace("similarBGC",similarBGC).replace("bgcGENBANK",gbk.split("/")[-1])
            newHTML.write(newLine)
                
        templateHTML.close()
        newHTML.close()


    #Create an JavaScript file
    df = pd.read_csv(f"{current_dir}/data/HTML/hmm.csv",index_col=[0]).fillna("none")

    for gbk in gbk_files:
        BGCno = Path(gbk).stem.split("_")[0]
        templateJS = open(f"{current_dir}/data/HTML/template.js","r")
        newJS = open(f"{js_dir}/{BGCno}.js","w")

        gene_list = []
        locus_tag_list = []

        seq_record = SeqIO.read(open(gbk),"genbank")
        length = len(seq_record.seq)
        for feature in seq_record.features:
            if feature.type == "CDS":            
                try:
                    if feature.qualifiers["locus_tag"][0] not in locus_tag_list: # Include each CDS only once.                        
                        try:
                            colorCode = "#BBBBBB"
                            protTypeList = []
                            coreList = []
                            locus_tag = feature.qualifiers["locus_tag"][0]
                            protein_type = "–"
                            start = str(feature.location.start + 1)
                            end = str(feature.location.end)
                            
                            if feature.location.strand == 1:
                                strand = "+"
                            else:
                                strand = "-"
                            locus_tag_pos = f'{locus_tag} / {start.replace("<","")}...{end.replace(">","")} ({strand})'

                            aaseq = feature.qualifiers["translation"][0]
                            aalen = len(aaseq)

                            try:
                                coreInfo = feature.qualifiers["core"][0]
                                if "PKS" in coreInfo or "NRPS" in coreInfo or "ePLS" in coreInfo:
                                    if "T3PKS" not in coreInfo:
                                        domain = feature.qualifiers["core"][0].split(";")[-1].replace(" ","")
                                    else:
                                        domain = "–"
                                else:
                                    domain = "–"
                                cores = coreInfo.split(";")[0].split(",")
                                for core in cores:
                                    protTypeList.append(coreDict[core])
                                    coreList.append(core)
                            except:
                                domain = "–"
                                core = "–"
                                
                            try:
                                pfamList = feature.qualifiers["Pfam"][0].split(", ")
                                for pfam in pfamList:
                                    try:
                                        if df.at[pfam,"function"] != "none":
                                            if core not in df.at[pfam,"exception"]:
                                                if df.at[pfam,"function"] not in protTypeList:
                                                    protTypeList.append(df.at[pfam,"function"])
                                                    if colorCode == "#BBBBBB" and df.at[pfam,"color"] != "none":
                                                        colorCode = df.at[pfam,"color"]
                                    except:
                                        pass
                            except:
                                pass
                            
                            try:
                                homologueInfo = feature.qualifiers["homologue"][0]
                                homologueProt = homologueInfo.split("|")[0]
                                FBGCnum = homologueInfo.split("|")[1].split(";")[0]
                                identity = homologueInfo.split(" ")[-1]
                                homologue = f"{homologueProt} (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/{FBGCnum}.html' target='_blank'>{FBGCnum}</a>); identity: {identity}"
                            except:
                                homologue = "–"
                            
                            try:
                                if feature.qualifiers["Pfam"][0] != "SKIPPED":
                                    pfamList = feature.qualifiers["Pfam"][0].split(", ")
                                    pfamList_link = []
                                    for hmm in pfamList:
                                        if df.at[hmm,"source"] == "Pfam":
                                            accession = df.at[hmm,"accession"].split(".")[0]
                                            linkedPfam = f"<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/{accession}' target='_blank'>{hmm}</a>"
                                            pfamList_link.append(linkedPfam)
                                        elif df.at[hmm,"source"] == "SMART":
                                            accession = df.at[hmm,"accession"]
                                            linkedPfam = f"<a class='funbgcs' href='http://smart.embl.de/smart/do_annotation.pl?DOMAIN={accession}' target='_blank'>{hmm}</a>"
                                            pfamList_link.append(linkedPfam)
                                        elif df.at[hmm,"source"] == "TIGRFAMs":
                                            accession = df.at[hmm,"accession"]
                                            linkedPfam = f"<a class='funbgcs' href='https://www.ncbi.nlm.nih.gov/genome/annotation_prok/evidence/{accession}' target='_blank'>{hmm}</a>"
                                            pfamList_link.append(linkedPfam)
                                        else:
                                            linkedPfam = f"<a class='funbgcs' href='protfam.html#{hmm}' target='_blank'>{hmm}</a>"
                                            pfamList_link.append(linkedPfam)
                                    pfam = ", ".join(pfamList_link)
                                else:
                                    pfam = "–"
                            except:
                                pfam = "–"
                            
                            #Deal with some exceptions
                            if "starter-unit acyltransferase" in protTypeList and "fatty acid synthase" in protTypeList:
                                protTypeList.remove("starter-unit acyltransferase")
                                colorCode = "#FF8059"
                                    
                            if len(protTypeList) != 0:
                                protein_type = ", ".join(protTypeList)
                            
                            if core != "–":
                                colorCode = coreColorDict[cores[0]]
                            
                            gene_info = '{locus_tag: "' + locus_tag_pos + '", protein_type: "' + protein_type + '", start: ' + str(start).replace("<","") + ', end: ' + str(end).replace(">","") + ', strand: "' + strand + '", aaseq: "' + aaseq + '", aalen: "' + str(aalen) + '", color: "' + colorCode + '", domain: "' + domain + '", homologue: "' + homologue + '", pfam: "' + pfam + '",}'
                            gene_list.append(gene_info)
                
                        except:
                            continue
                except:
                    continue

        newGeneList = "geneList = ["
        for item in gene_list:
            newGeneList += item
            newGeneList += ","
        newGeneList += "];\n"

        for line in templateJS:
            newLine = line.replace("bgcLENGTH",str(length)).replace("geneList = [];",newGeneList)
            newJS.write(newLine)
            
        templateJS.close()
        newJS.close()

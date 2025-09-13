const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const height = canvas.height;
const center = height/2;
const canvasWidth = 800;

BGClen = 17759;

geneList = [{locus_tag: "ATEG_09616 / 1...1691 (+)", protein_type: "ATP synthase", start: 1, end: 1691, strand: "+", aaseq: "MFRLSSGLLKGGACASRSRIPQLGRSLYSTATSAGADKTQGKIHTVIGAVVDVQFNHGRLPPILNALETTNQGKKLVLEVAQHLGEHTVRCIAMDGTEGLVRGTAVADTGNPIMVPVGPATLGRIMNVTGDPIDERGPIEGVRLMPIHTEPPAYTEQSTHAEILVTGIKVVDLLAPYARGGKIGLFGGAGNNIAKAHGGYSVFTGVGERTREGNDLYHEMQETGVIKLDGDSKVALVFGQMNEPPGARARVALTGLTIAEYFRDEGQDVLLFIDNIFRFTQAGSEVSALLGRIPSAVGYQPTLAVDMGAMQERITTTTKGSITSVQAVYVPADDLTDPAPATTFIHLDATTELSRGISELGIYPAVDPLGSKSRLMDPRIVGEEHYDTAMRVQRTLQEYKSLQDIIAILAGVA", aalen: "413", color: "#BBBBBB", domain: "–", homologue: "ATP synthase subunit beta CtvE (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00285.html' target='_blank'>FBGC00285</a>); identity: 97.4%", hkg_homologue: "AFUA_5G10550; ATP synthase subunit beta, mitochondrial; 80.6% (duplicated)", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF02874' target='_blank'>ATP-synt_ab_N</a>, <a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00006' target='_blank'>ATP-synt_ab</a>",},{locus_tag: "ATEG_09617 / 2203...9727 (-)", protein_type: "highly reducing polyketide synthase", start: 2203, end: 9727, strand: "-", aaseq: "MAHMEPIAIVGTACRFAGSSSSPSKLWELLQNPRDVASEPPADRFNIDAFYDPEGSNPMATNARQGVSCAAPQYGSVGVARNNLANRISYFFDWQGPSMSIDTACSASMVALYEAVSALTRHDCNLAAALGANLMLSPQMFIAASNLQMLSPTSRSRMWDAQADGYARGEGVASVLLKRLSDAVADGDPIECVIRAVGVNHDGRSMGFTMPSSDAQVQLIRSTYAKAGLDPRSAEDRPQYVEAHGTGTLAGDPQEASALHQAFFSSSDEDTVLHVGSIKTVVGHAEGTAGLAGLIKASQCIQHGIIPPNLLFNRLNPALEPYARQLRVPVDVVPWPPLSPGVPRRVSVNSFGFGGTNAHVILESYEPAEGLIKVDCNQNAVLPFVFSAESDFSLGSVLEQYSRYLSRNPDVEVHDLAWTLLERRSALMHRVGFWAPDIAHLKRSIQDELAVRKGGAPSTLICRPHGKTRKHILGVFTGQGAQWAQMGLELITTSNTARGWLDELQQSLDALPEPYRPGFSLFQELAADSATSRLSEALLSQTLCTAMQVIWVKMLWALNIHFDAVVGHSSGEIAAGFAAGFLTAEDAIRIAYLRGVFCSAPGSSGEGAMLAAGLSMDEATALCEDVSSSEGRINVAASNSPESVTVSGDRDAILRAEQLLKDRGIFVRLLRVSTAYHSHHMQACSQPYQDALRGCNIQIQTPMSTTTWYSSVYAGRPMEEGSVTETLGTGEYWAENLVSPVLFSQALSAAMSATNPSLIVEVGPHPALKGPALQTLSGITPAEIPYIGVSVRNNSAIESMATAIGAFWAHLGPQAINPRGYLALFQPNTKPSVVRGLPLYPFDHRQEHGYQTRKANGWLYRRNTPHPLLGSLSEDLGEGELRWNHYLSPRRIRWLDGHRVQGQIVVPATAYIVMALEAALALAVVKEKSLHLIRIDDLIIGQAISFQDERDEVETLFHLPPMLENRDDNTAVGRFRCQMAASGGHIKTCAEGILTVTWGSPQDDVLPCPVFPSPAGLADVTDMEEYYASLRTLGYEYTGVFQGIHSLSRKMGIATGQVYNPALTGFLIHPAVLDTGLQGLLAAAGEGQLTTLHVPTRIDTVSVNPAVCSIDSLSFEAAVTRTGADGIVGDVELYTAANGPGAVFFEGVHVSSLVPPSAADDPSVFWVQHWTPLVLDVNRSESRLSPEWMTVLEGYERRAFLALKDILQEVTPELRATFDWHRESVVSWIEHIMEETRMGQRASCKPEWLGQNLENLGHIWGRPDASIEDRMMYRVYQNLLPFLRGEAKMLDALRQDELLTQFYRDEHELRDVNRRLGQLVGDLAVRFPRMKLLEVGAGTGSATREVLKHVSRAYHSYTFTDISVGFFEDMLETLPEHADRLIFQKLDVGQDPLEQGFTENAYDVIIAANVLHATPALHETLRNVRRLLKPGGYLIALEITNIDAIRIGYLMCAFDGWWLGREDGRPWGPVVSASQWDSLLRETGFGGIDSITDRAADELTMYSVFAAQAVDDQITRIREPLTPLPPQPPFCRGVIIGGSPNLVTGVRAIIHPFFSDVEHVSAIENLTEGAPAVVLMVADLSDTPCFQSLTESRLAGLKALVKMAEKTLWVTMGSEAENPFLCLSKGFLTSMNYEHPNVFQYLNIIDPADVQPVVLSEHLLRLAHTTQNNDFTLTSCVHSTELELRLYPGGILKFPRINASNVLNRRYAAARRPVTSPVTDMQESVVVLGQGPDGKLQLLLGEERLLGDRTGVTINVRYSTNRAVRINGAGYLVLVLGQDKVTKTRLVALAGQSASVISTSCYWEIPADISEEQEAAYLYATATALLAASLIQSNGTTILVHGADAILRHAIAIEAASRVVQPIFTTTSPSAASSTGFGKSILVHQNESRRQLAHLLPRYFTAAVNFDSNDHRLFDRMMAIGHQSGVTQEHLLTTLTAVLPRPSASSLPAHPQAVIDALRKAALTAYQLTVQSTAPGHIATSIADIQSCSQELAVADWTPPCGSVPVHLQPASQLVRLSAQKTYLLVGMTGALGQSITQWLIARGARNIVLTSRNPSVDPAWILEMQSTTGARVLVTSMDVTSRASILAVAHALKAGWPPLGGVVNGAMVLWDQLFVDAPLSVLTGQLAPKVQGSLLLDEIFGQEPGLDFFILFGSAIATIGNLGQSAYTAASNFMVALAARRRARGLVASVLQPAQVAGTMGYLRDKDDSFWARMFDMIGRHLVSEPDLHELFAHAILSGRGPPSDVGFGPGEGECVIGGLSVQDPAVYPNILWFRTPKVWPFIHYHHEGTGPSSAATGSVPLVEQLKCATSLAQVGEVVEAGVAAKLHHRLHLPGEVGSGNVTGDTRLTELGVDSLIAVDLRRWFAQELEVDIPVLQMLSGCSVKELAAAATALLQPKFYPGVVGDSDVGSEKDGSSDSRGDTSSSSYQVITPEESD", aalen: "2438", color: "#FF0000", domain: "KS-AT-DH-MT-KR-ACP", homologue: "polyketide synthase CtvA (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00285.html' target='_blank'>FBGC00285</a>); identity: 100.0%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://smart.embl.de/smart/do_annotation.pl?DOMAIN=SM00825' target='_blank'>PKS_KS</a>, <a class='funbgcs' href='http://smart.embl.de/smart/do_annotation.pl?DOMAIN=SM00827' target='_blank'>PKS_AT</a>, <a class='funbgcs' href='protfam.html#fPKS_DH' target='_blank'>fPKS_DH</a>, <a class='funbgcs' href='protfam.html#PKS_NRPS_MT' target='_blank'>PKS_NRPS_MT</a>, <a class='funbgcs' href='protfam.html#fPKS_KR' target='_blank'>fPKS_KR</a>, <a class='funbgcs' href='protfam.html#ACP_PCP' target='_blank'>ACP_PCP</a>",},{locus_tag: "ATEG_09618 / 10257...10946 (+)", protein_type: "methyltransferase", start: 10257, end: 10946, strand: "+", aaseq: "MTFYQLSDAEGADNYYNPLLLWWYDFWVHWVSALFAWKCSSKNILLPFFLSNIGSRHCDVGVGTGYYLSAVRKRQPSWPQDKLTLVDFHIRCLRKAANRVGIADRTECVLANILEPIPIQPERQFDSISLMYVLHCLPGASKDKGRVFANLKPLLKDSGTLFGSTLLCRGVRQNWFNWLLQRIYNAVDMFQNRADFPDDFVRALEEEFEEVESVIIGTVLMFKARKPRR", aalen: "229", color: "#FF9300", domain: "–", homologue: "methyltransferase CtvB (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00285.html' target='_blank'>FBGC00285</a>); identity: 100.0%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='protfam.html#VrtF' target='_blank'>VrtF</a>",},{locus_tag: "ATEG_09619 / 11154...12267 (+)", protein_type: "epoxide hydrolase", start: 11154, end: 12267, strand: "+", aaseq: "MALSAYFLLCLSVLGLDAIYGFGFRNGFLELMANSYRERKLSGTAEPLQGNITGTGLDELLGNLIVFYWPVLDGNHPGLSLQAFHFLGAIVAVWVAIQVQSWRSPNRNSLLRSPTLFAMLSQVVAIAVIVPLWCAISIWSSSSPRPITRAVSASAAHSIRLIPISMVLGFGIPTIGMLLPESTHQNLFSKQIAIAVWQIWPIYVALWHWGLRVLFRSRLKEGISVRTACRTACSFAFVCAIIPHAVSWGLSLTLIPTNLLADVLPWQFAGGGTVQVQSMAQGGLWFLQWDHLIGMGSFLLWAMHMRWTVEQQSSFLQTCYLALKVGVLCLISGPCGAAVWLLWEESQF", aalen: "348", color: "#0096FF", domain: "–", homologue: "epoxide hydrolase CtvD (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00285.html' target='_blank'>FBGC00285</a>); identity: 100.0%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='protfam.html#CtvD' target='_blank'>CtvD</a>",},{locus_tag: "ATEG_09620 / 13797...15406 (+)", protein_type: "FAD-dependent monooxygenase", start: 13797, end: 15406, strand: "+", aaseq: "MEGKGPSFKVIIVGASVTGLTLAHCLHRAGIDYVVLEKHHEVHPPIGAAVAILPNGGRIMEQLGIFRHIEDRCQPFQRVHLCFQDGFYYDSLSPSVVLKRFGLKFAALERTQLLEILYTHLPDKSRVLTSKGVVRITPHGNKMSVTTADGDEFQGDLVVGADGVHSVTRREMWRIANIEQPGLIPFKEQASMSVEFSCIFGMSNPIPGRKHWQHIIRIGPGFTFLIFPAAGDSLFWVLIEKLPHKYIYPDVPRFSQEDAVTRCEAAASQPVWQEVRFRDIWAQRRGFRMVALEENLFRTWHHGRIICIGDSISKMTPNIGQGANTAIEAAAGLANVIYAITQNHHQPSDDTIHRALANFSERHRKRLDAIHLESRWITRLEACQGWVVTAFTRYVAPHCGDLFALGVVRNSYNGEVLQFLPLTERSGKHWPKLEWWNTWGLSKWQEFGERLVYCFGVVILLWISWAVFNVNQL", aalen: "473", color: "#008F00", domain: "–", homologue: "FAD-dependent monooxygenase CtvC (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00285.html' target='_blank'>FBGC00285</a>); identity: 100.0%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF01494' target='_blank'>FAD_binding_3</a>",},{locus_tag: "ATEG_09621 / 16059...16451 (+)", protein_type: "sulfotransferase", start: 16059, end: 16451, strand: "+", aaseq: "MGQQASTSQPGTKIQVIGAGLSRTGTASFSSALSILLEGPVYHGGTQATMGSPSEIRSWMKILRHRLTREPRDREEALKLIAKNLDGYAAVTDAPLRAADPRALGALSRRNGHLHSPGPGSLGKESQAAP", aalen: "130", color: "#24424F", domain: "–", homologue: "–", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF17784' target='_blank'>Sulfotransfer_4</a>",},{locus_tag: "ATEG_09622 / 17082...17759 (+)", protein_type: "–", start: 17082, end: 17759, strand: "+", aaseq: "MDESPPPSRLSLCTLPLESRQAILGHLDDLHALKAAILTHSSLYSAFVSHQNVIVYRILSSIIPSGLMNEAICVLNASVLESEPWTRERVISIIEQYRNPQPPMSLNLSVRQAFQIQDLHHDIEFFSSDFISAAQSIKGTGWVRPASSLEWSRIVRTFYRFQIHRHLFRKRDRRRAKNKPSPDFSRREQWNIWYIDCPVWELEQLACVSEYLYRKIAIRMTTLFM", aalen: "225", color: "#BBBBBB", domain: "–", homologue: "–", hkg_homologue: "–", human_homologue: "–", pfam: "–",},];



// Draw a background line
ctx.beginPath();
ctx.moveTo(0, center);
ctx.lineTo(canvasWidth, center);
ctx.stroke();


function DrawArrow(start_ori, end_ori, BGClen, strand, center, height, color, locus_tag, protein_type, aalen, aaseq, domain, homologue, hkg_homologue, human_homologue, pfam) {
  const start = start_ori * canvasWidth / BGClen;
  const end = end_ori * canvasWidth / BGClen;
  const arrowHeadSize = Math.log(end - start) * 3;
  if (strand === "+") {
    const arrowHeadStart = end - arrowHeadSize;
    ctx.beginPath();
    ctx.moveTo(start, center - height / 4);
    ctx.lineTo(arrowHeadStart, center - height / 4);
    ctx.lineTo(arrowHeadStart, center - height / 2);
    ctx.lineTo(end, center);
    ctx.lineTo(arrowHeadStart, center + height / 2);
    ctx.lineTo(arrowHeadStart, center + height / 4);
    ctx.lineTo(start, center + height / 4);
    ctx.fillStyle = color;
    ctx.closePath();
    ctx.fill();
    if (
      (hkg_homologue !== "–" && hkg_homologue.includes("duplicated")) ||
      (human_homologue !== "–" && human_homologue.includes("duplicated"))
    ) {
      ctx.fillStyle = "#CCFFFF";
      ctx.fill();
      ctx.strokeStyle = "#005493";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

  } else if (strand === "-") {
    const arrowHeadStart = start + arrowHeadSize;
    ctx.beginPath();
    ctx.moveTo(end, center - height / 4);
    ctx.lineTo(arrowHeadStart, center - height / 4);
    ctx.lineTo(arrowHeadStart, center - height / 2);
    ctx.lineTo(start, center);
    ctx.lineTo(arrowHeadStart, center + height / 2);
    ctx.lineTo(arrowHeadStart, center + height / 4);
    ctx.lineTo(end, center + height / 4);
    ctx.fillStyle = color;
    ctx.closePath();
    ctx.fill()
    if (
      (hkg_homologue !== "–" && hkg_homologue.includes("duplicated")) ||
      (human_homologue !== "–" && human_homologue.includes("duplicated"))
    ) {
      ctx.fillStyle = "#CCFFFF";
      ctx.fill();
      ctx.strokeStyle = "#005493";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };
    
  // Add click event listener to canvas
  canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (x >= start && x <= end && y >= center - height / 2 && y <= center + height / 2) {
      // Perform action when arrow is clicked
      document.querySelector('#position').textContent = locus_tag;
      document.querySelector('#function').textContent = protein_type;
      if (domain.includes("CT")) {
      domain = domain.replace("CT", "C<sub>T</sub>");
      }
      document.querySelector('#domain').innerHTML = domain;
      document.querySelector('#homologue').innerHTML = homologue;
      document.querySelector('#hkg_homologue').innerHTML = hkg_homologue;
      document.querySelector('#human_homologue').innerHTML = human_homologue;
      document.querySelector('#aalen').textContent = aalen;
      document.querySelector('#aaseq').textContent = aaseq;
      document.querySelector('#pfam').innerHTML = pfam;
      const blastURL = document.querySelector('#blast');
      const newURL = `https://blast.ncbi.nlm.nih.gov/Blast.cgi?PAGE_TYPE=BlastSearch&CMD=Web&LAYOUT=OneWindow&PROGRAM=blastp&PAGE=Proteins&FORMAT_TYPE=HTML&NCBI_GI=on&SHOW_OVERVIEW=on&QUERY=${aaseq}`;
      const msg = document.getElementById("message");
      if (newURL.length < 8214) {
        blastURL.href = newURL;
        msg.style.display = "none";
      } else {
        blast.href = "https://blast.ncbi.nlm.nih.gov/Blast.cgi?PAGE_TYPE=BlastSearch&CMD=Web&LAYOUT=OneWindow&PROGRAM=blastp&PAGE=Proteins&FORMAT_TYPE=HTML&NCBI_GI=on&SHOW_OVERVIEW=on";        
        msg.style.display = "block";
      }      
    }
  });
}


for(let i = 0; i < geneList.length; i++) {
  const start = geneList[i].start;
  const end = geneList[i].end;
  const strand = geneList[i].strand;
  const color = geneList[i].color
  const locus_tag = geneList[i].locus_tag
  const protein_type = geneList[i].protein_type
  const aalen = geneList[i].aalen
  const aaseq = geneList[i].aaseq
  const domain = geneList[i].domain
  const homologue = geneList[i].homologue
  const hkg_homologue = geneList[i].hkg_homologue
  const human_homologue = geneList[i].human_homologue
  const pfam = geneList[i].pfam
  DrawArrow(start,end,BGClen,strand,center,50,color,locus_tag,protein_type,aalen,aaseq,domain,homologue,hkg_homologue,human_homologue,pfam)
}

function copyToClipboard() {
  const text = document.getElementById("aaseq").innerText;
  if (text.length !== 0) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => {
          window.alert("AA sequence copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      window.alert("AA sequence copied to clipboard");
    }
  } else {
    window.alert("No gene selected!");
  }
}
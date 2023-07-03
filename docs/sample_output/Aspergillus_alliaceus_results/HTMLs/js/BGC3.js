const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const height = canvas.height;
const center = height/2;
const canvasWidth = 800;

BGClen = 15278;

geneList = [{locus_tag: "BDW43DRAFT_139745 / 1...1757 (+)", protein_type: "major facilitator superfamily transporter", start: 1, end: 1757, strand: "+", aaseq: "MGFKLMGSKRAYNWYISCVAAACMVLYGYDASVYNSVQGSKNWVAYFNNPDENMIGAVNTAYTVGAIFGGFFLGGPTADFLGRKFGMGIGCVMVIAATFMQTWAPRGNIACFLAGRCIIGIGQGIALTAGPIYIGELAPAEIRGKIMTFWQMFYSVGSFICFWVNYGCTEHKENLGEWDWKMVVIFQLLVPCLILALLPTIPGSPRWYIQRGNNVEKARAALQKVREPDEVEEELLKIREAIEYEKEAISGSYSALWKDRSLRKRMALALVVNAGQQVTGQGTLNTYSTKIYQKVFPSAGQIALINALNATFGIIFTLNAVWIIDRFGRKFLLIVGGIGMGICMIIVAAVETETPSPNGSKSTPVGISIVFLLFLFIFFYKPSWGATVWIWTSEIFSMNVRAQAVGMASQTQNVANAIFQQFFPIFLKNCGFYAFYMFAGINFLLAVFVFFFIPETKQVPLEEIDALFGGANHATHGEDLIAREKQMQATQSNVGNEKAEAITIENAPARQRQ", aalen: "513", color: "#000000", domain: "–", homologue: "major facilitator superfamily transporter OryC (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00517.html' target='_blank'>FBGC00517</a>); identity: 23.4%", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00083' target='_blank'>Sugar_tr</a>",},{locus_tag: "BDW43DRAFT_320748 / 2631...4312 (-)", protein_type: "–", start: 2631, end: 4312, strand: "-", aaseq: "MPDSAHPGGAGLPDESQASRILAATTITTAFALLTVLARMYVRIFVIRNVGLDDYTMMLTMALSLAGWAIIIPEVVYGAGRHTAYVQETATTAMHLNFVTQGIYMWAIGLVKISIGLFLLRFAPRKGYKIFIWVVIVLMFLYTAICFLTLIFQCKDIRTIWDHSVKSECFTPTQLLELSYTNTALNILTDLIFAFLPAFMLRHLQVNRRVKASLVCILGLGIFACAAAFVKLSVLPNYGRTGDFLWDYSTLTIWVVVESNMGIIAGSLPTLKPLFKQVLGSYGSRSKTRPYTYGSKQYRLRSLSRSRQGQSQTLHSGPRSRMEAEADQKLPSHHFATTTTSTTTTTYPGPDSSNSSEEHILSPHDPEGIMCTREVMVSHTSEARNSAWNKKPAHFGQDEVV", aalen: "401", color: "#BBBBBB", domain: "–", homologue: "–", pfam: "<a class='funbgcs' href='protfam.html#TwmC' target='_blank'>TwmC</a>",},{locus_tag: "BDW43DRAFT_282498 / 5048...5355 (+)", protein_type: "–", start: 5048, end: 5355, strand: "+", aaseq: "MTGENGPHLAECLNLRRWSAFHLLLIRRRLSPVRLGHDSGWDSWPRNKGPAQKRVQGSTSAILGLYGAIVAHNNGHADPFQS", aalen: "82", color: "#BBBBBB", domain: "–", homologue: "–", pfam: "–",},{locus_tag: "BDW43DRAFT_282502 / 6408...7756 (+)", protein_type: "tyrosinase", start: 6408, end: 7756, strand: "+", aaseq: "MVALQTLSLGLLVSQAWAIPAAPQQTATTTLPTTASSSTTVASSQLDQLADFAYNITTDNIAGGSENKRGGCTLQNLRVRRDWRTFSTLQKKAYINSVLCLQNLPSRTPAHVAPGAKTRYDDFVATHINQTQIIHYTGTFLAWHRYFIYEFEQALRDECGYTGDYPYWNWGADAENLEKSQVFDGSETSMSGNGEYIPNQPDVKLYLGNYPAIDLPPGSGGGCVTSGPFKDYKVSMGPAALSLPGGNMSAVANPLEYNPRCMKRSLTTEIVKKYANFPKIVELILESEDVWDFQMTMQGVPGSGSIGVHGGGHYSMGGDPGRDVYTSPGDVAFWHHHGMIDRTWWIWQNLDLKKRQNAISGTGTFMNNPASPNTTLDTVIDIGYANGSPIAMRDLMSTTAGPFCYVYI", aalen: "408", color: "#009193", domain: "–", homologue: "tyrosinase Hkm6 (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00392.html' target='_blank'>FBGC00392</a>); identity: 38.4%", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00264' target='_blank'>Tyrosinase</a>",},{locus_tag: "BDW43DRAFT_301709 / 8615...9447 (-)", protein_type: "Pyr4-like terpene cyclase", start: 8615, end: 9447, strand: "-", aaseq: "MEAFDLSKAPPEFQAWGTTIWTLNGYSNLTWLYVYYGMIYRSMKDKSYAMPLISQCLNIAWEITFGYIYVDHWVVYSTFLIAFRHLLTYYIVGTLVALAGHLCATAELGPTKACFVNAIVLQVIISVGYLGMLFVRGSTRGFSMDLGFFRFIGSLALVPEFYLRVKYWPENFAFLGKPFMLWCCACFLGFDLIYGVCFWYMRQQERERERQIHMQKGAAAGTEEKRK", aalen: "227", color: "#945200", domain: "–", homologue: "terpene cyclase JanB (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00472.html' target='_blank'>FBGC00472</a>); identity: 37.1%", pfam: "<a class='funbgcs' href='protfam.html#Pyr4' target='_blank'>Pyr4</a>",},{locus_tag: "BDW43DRAFT_313036 / 10518...12319 (-)", protein_type: "major facilitator superfamily transporter", start: 10518, end: 12319, strand: "-", aaseq: "MSLDSEKPEECTIEDLNPTSETQDIVSDRDAEKRLLRKCDLHVVPILTLLFMFAFLDRINIGNARLMGLEKDLGMSGHQYNIALFVFFIPYILFEVPSNMILKKVKPSWWLSGIMFGWGIITTCQGITGSFTGLVVCRVLIGFFEAGFMPGSVYLINMYYRRHELQWRLNLFFSASIIAGAVSGLLAYAINNMSGIAGYKGWRWIFIIEGLATVVIAAFSKFIVVDWPETAKFLTEDERSLLLARLKQDRGEARMNRIDKKSVRRTLTDPKIYLGPVMYFGIVNTGYAVSFFTPTILHQLGWTAVRAQVMSIPVYIVATSTTLSAALLSDLLRHRYLFTLTGCLVATTGYVILLAQYSVPVGARYFAIFAITSGGYLTQPILMGWLSNNMAGHYKQSIASAMQIGFGNCGGLVASNIFFQEEAPGYRTGYGVSLGMTWVCGIACLLFLGYLIRENQLVRFHLRV", aalen: "464", color: "#000000", domain: "–", homologue: "major facilitator superfamily transporter CnsO (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00301.html' target='_blank'>FBGC00301</a>); identity: 36.4%", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF07690' target='_blank'>MFS_1</a>",},{locus_tag: "BDW43DRAFT_313037 / 12792...15278 (-)", protein_type: "FAD-dependent monooxygenase", start: 12792, end: 15278, strand: "-", aaseq: "MFRPKKVAIIGAGPSGLVAAKTLLHNFPKGTFSPTIFEKSHEIGGLWPIDPPATAQGDANPGRSRRDGFVDPSMRTNQSRFTVAFSDLAWESVFDGPDIPMFPQAWQAGRYLQKYFERYIPKEVLRLGHEVVGSVRETRVGSTPSWTINMNNTTGESSANQKLESETFDYLIVASGYFSRPYAPYIPGLADFAEKTIHSSAIHTKEDICLMLENCGATKDGSGKLVVIGGSMSGVETATALALYLSSMRSTLSYFQGYEVHHICSRPFWTVPTYLPHAVSKDDTQERSVHFLPLDLVLNDLARRPHGPVQYNFGPVSREQAAKVNRYFISLLGKQYADSGHMVADPRDGTSDTQPSWVAIGDDYAGYVQSGLVQPMMGRVLAVNCPQSGLASIDIKRSDGNVVSLQDVTAVILATGFTPFASLSFLQEDVLSKLEFSGEDPYVPLILDGKGISNAEIPDIGFVGLYRGPFWGVVEMQARRLAESWYRADSEQGIRFSAEELEDKAQERQNMRDYRNVSPSSRGQFPMGDYVGLMETFARDLGIDRVPLSETGERLGPVVPARYMASGQKEPSMLAESRIVMASLRDTLTPGTDTSSIGLTRAIFRALLGNWNFSRVSSRYEAEVTGTASFSSTYPANPKYEKEYIYSEGKRIDGVLRSSDPLTYRLGGTGANGGDEVQISVLNRDLGIDLEEVPQISHELKLEGPPRPTPRVSGYEEYVVRARGCISSERDHLGREYSYEYVFRLTGAAISSWECRMEYRKIWNDGGENLVGETEWRRTVYWQ", aalen: "783", color: "#008F01", domain: "–", homologue: "FAD-dependent monooxygenase MgcG (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00546.html' target='_blank'>FBGC00546</a>); identity: 24.6%", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF07992' target='_blank'>Pyr_redox_2</a>",},];



// Draw a background line
ctx.beginPath();
ctx.moveTo(0, center);
ctx.lineTo(canvasWidth, center);
ctx.stroke();


function DrawArrow(start_ori, end_ori, BGClen, strand, center, height, color, locus_tag, protein_type, aalen, aaseq, domain, homologue, pfam) {
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
    ctx.fill();

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
    ctx.fill()
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
      document.querySelector('#aalen').textContent = aalen;
      document.querySelector('#aaseq').textContent = aaseq;
      document.querySelector('#pfam').innerHTML = pfam;
      const blastURL = document.querySelector('#blast');
      const newURL = `https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Web&LAYOUT=OneWindow&PROGRAM=blastp&PAGE=Proteins&FORMAT_TYPE=HTML&NCBI_GI=on&SHOW_OVERVIEW=on&QUERY=${aaseq}`;
      const msg = document.getElementById("message");
      if (newURL.length < 8214) {
        blastURL.href = newURL;
        msg.style.display = "none";
      } else {
        blast.href = "https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Web&LAYOUT=OneWindow&PROGRAM=blastp&PAGE=Proteins&FORMAT_TYPE=HTML&NCBI_GI=on&SHOW_OVERVIEW=on";        
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
  const pfam = geneList[i].pfam
  DrawArrow(start,end,BGClen,strand,center,50,color,locus_tag,protein_type,aalen,aaseq,domain,homologue,pfam)
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
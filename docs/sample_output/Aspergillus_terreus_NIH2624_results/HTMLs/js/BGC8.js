const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const height = canvas.height;
const center = height/2;
const canvasWidth = 800;

BGClen = 20340;

geneList = [{locus_tag: "ATEG_04412 / 1...1215 (+)", protein_type: "aldo-keto reductase", start: 1, end: 1215, strand: "+", aaseq: "MSLSSRSVGQHGPKVPAVGLGFGSLAGFYGAPGTLDERLALLDHAHATGLRFWDLADIYGDSEDVVGEWFKRSGKRDDIFLGTKFGLQRQPDGKHAFRSDPEYVKEACEKSLQRLGVDSIDLYYCHRVDGVTPIEKTIEAMVELKNQGKIRYIGLSEVSVATLRRAHAVHPIAALQMEYSLFCLDIEESTSGILKTCRELGITVVAFSPIGRGVLTGQFQSYADIPEGDLRRMYPKYAETNFPKIMELVQGLKKVADAHGSTPAQVALAWLLAQGEDIIPIPGTKSTARMDENAASAQIRLSDQEVQEIRTLAEQTKVEGTRYPAAVMATLCDDTPPFNTS", aalen: "341", color: "#531B93", domain: "–", homologue: "aldo-keto reductase Str7 (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00337.html' target='_blank'>FBGC00337</a>); identity: 51.9%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00248' target='_blank'>Aldo_ket_red</a>",},{locus_tag: "ATEG_04413 / 1906...3165 (+)", protein_type: "peptidase", start: 1906, end: 3165, strand: "+", aaseq: "MSQPNLSDLLRTASVDLAPYEDLYKYFHAHPELSRQEQTTSETLAAHLARLNVYELHTHIGGYGLAGVFRNGTGKTVLLRADMDALPVKELTGLPYASTATMRDADGTVKPVMHACGHDMHITCLLAAAETLAQLRHAWRGTLIVLFQPDEERGGGAQAMVADGLYDRVPVPDYVLGQHVMRMRAGSVGSRAGAIMAAADSMKITVFGRGGHGSQPHQTVDPVLLAAHIVVRLQGIVSREIDPGELAVVTVGSLQAGQTENVIADRAEIGVDFRSVRGEVREQIVAAIRRIVEAECVASGSPRPPVFTPTRRFPPTVNDGDVASRVAATFATHFDDFDADVPRTNVSEDFSTLATCRGIPSCFWLLGGIDPELWDRAQAESRMEDIPGNHSALFAPVIQPTMRAGVDALCLAALTFLEK", aalen: "419", color: "#0096FF", domain: "–", homologue: "–", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF01546' target='_blank'>Peptidase_M20</a>",},{locus_tag: "ATEG_04414 / 3543...4964 (-)", protein_type: "transporter", start: 3543, end: 4964, strand: "-", aaseq: "MFGRTEQDLEKGPQTAKSIVDDNSDGAVPGESFVYGNSLYARIQRLAGKLHIEQRGIERVPADEQTDTSYFNIGSMWLAANMVVSSFAIGVLAKSLFYLGFVDAILVDLFFNLLGVMTVGFFSCFGPAFGLRQMVLSRFWFGWWPTKFIAILNILACVGWSSANSIVGAQLLNAVNSDVPGFAGILIIVFCTMLVTFAGYKVVHMYEYWSWIPTFIVFMIVFGQFAHSGDFMNLPMEVGTSEMGGVLSFGATVYGFATGWTSYAADYTVYQPATRSRRKVFFSTWLGLIIPLLFCQMLGIAVMTATDLNGGNNKYIEGYNTSGNGGLLWAVLEPLGGFGKFCLVILALSIIANNCPNIYSVAPTVQVLNRHFQRRHRAF", aalen: "379", color: "#000000", domain: "–", homologue: "–", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF02133' target='_blank'>Transp_cyt_pur</a>",},{locus_tag: "ATEG_04415 / 8908...10781 (+)", protein_type: "dihydroxyacid dehydratase", start: 8908, end: 10781, strand: "+", aaseq: "MFASRIRSRALGLHPRARFENTRLPASTTGRRYKSDETLNRVSSKITQPKSQGASQAMLYATGLTEEDMSKPQVGISSVWFEGNPCNMHLHDLSAIVRDSVHRAGLVPMRFNSVGVSDGISMGTKGMRYSLQSRELIADGIETVMNAQWYDANVSLPGCDKNMPGVLMAMGRTNRPSIMVYGGSIKPGCSAKGQKLDLVSAFQSYGQFITGQIDEKERFDIIRNACPGRGACGGMYTANTLATAIETMGMTVPGSSSCPADDPKKLVECENIGEVVKTMLREDIKPRDVLTRQAFENAMIVVNILGGSTNAVLHLIAIADSVGIKLTIDDFQAVSDKTPFLADLKPSGKYLMNDLYNIGGTPALLKYLLKEGLIDGSGITVTGKTMKENVASWPDFPADQDIIRPLSNPIKPSGHLQILRGSLAPGGSVGKITGKEGLRFEGTAKCYDYEDAFIESLERGEIKKGEKTVVIIRYEGPKGGPGMPEMLKPSAAIMGAGLGQDVALLTDGRFSGGSHGFLIGHIVPEAMEGGPIALARDGDRIVIDAEERVVDLDIPTEELEKRRKEWKAPPLRYQKGTLKKYCTLVSDASHGCVTDGPI", aalen: "598", color: "#BBBBBB", domain: "–", homologue: "dihydroxyacid dehydratase AstD (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00438.html' target='_blank'>FBGC00438</a>); identity: 100.0%", hkg_homologue: "AFUA_2G14210; Dihydroxy-acid dehydratase, mitochondrial; 72.8% (duplicated)", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00920' target='_blank'>ILVD_EDD</a>",},{locus_tag: "ATEG_04416 / 12059...13288 (-)", protein_type: "Tri5-like terpene synthase", start: 12059, end: 13288, strand: "-", aaseq: "MDMNTFPASTYCESIVRFLDAIEYHDDNLTHEERVEGLRHVHSKTAQYFTEPLPRSILKGVAPRRIAAVTRTISHFIVYCWSKLPREAQVDVSIYLSIINVLDDEISSEPSTQMTSFWSDLIQGKQPKHPFWVLFNSHLPRLLRHYGSFCAFNIMRCTFDYFEGCWIEQHNFQGYPGADCYPSFLRRLNCLGGAVAGTIFPAAKFDEQKLFAQMSCVMAQIDGPVALMNDLFSFYKEYDQDEANLVSNWCTVDGITMDQALTRLTDDTIHACVRILDILKDKDPDMLATIRGFIHGYATWHICDFRYRLREIYDREDLQESGARFREYFDKAIDVGWVDVEEWTCQVQGFEVEGPAPSGSEVQAYQANAFGFSVDTQRHHNIDYVGSSILGLFEWATRYLRGKLPLGNA", aalen: "409", color: "#945200", domain: "–", homologue: "terpene synthase AstA (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00438.html' target='_blank'>FBGC00438</a>); identity: 100.0%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF06330' target='_blank'>TRI5</a>",},{locus_tag: "ATEG_04417 / 14389...16148 (+)", protein_type: "cytochrome P450 monooxygenase", start: 14389, end: 16148, strand: "+", aaseq: "MLFQDLSFPAAIGAVFGAVAISVAARCIYDLFFHPLRNFPGPKRAAIWSFYEFYYDVIRDGTYLWEIEKMHQKYGPIVRINSRSLHIHDPEYFNTIYAGSGRKVNKELSAVSGYTFPHSTISTLDHDLHRKRRAIVSPYFSKRAIAEIEPVIHERLNVLISRLAEAKGSIVDLTSAFSAYTADVVTYHFYGTHANYIGSKDFKYGLKDALTVLLNLYNLTRFLPVPANTLKNLPLPILGLINPNFPLVVSAREANKKMVLGYLNKPDEDKKAMKDARSKSVIVSALTDPNVPDAEKTLDRLLDEGETIIFAGIDTTARTLGVALFHLLNNKDVLMKLRKELQAVAKPDGQQWTTTELEAVPYMRGVVQEAIRLAYGLVVRIPRISPHEALRYNGFVIPPGTPVSQSTYLVNNDPSVFPNPQVFDPERWVKAAQDGVSLDKYMVSFSKGSRGCLGINLAYAKLYLGIARVATSLDMELFETTAKAISVYHTRGFAFPKEGDGAVKARVMGLCK", aalen: "512", color: "#FF8AD8", domain: "–", homologue: "cytochrome P450 monooxygenase AstB (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00438.html' target='_blank'>FBGC00438</a>); identity: 100.0%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00067' target='_blank'>p450</a>",},{locus_tag: "ATEG_04418 / 16805...18520 (+)", protein_type: "cytochrome P450 monooxygenase", start: 16805, end: 18520, strand: "+", aaseq: "MGASTFSQSFAEGYAAWALMLPALVGCALLIYRAFFAIRYPANLPLAGEPDGKRTFSWRTRWRYYIDCEALYKETYDNYTKHGKTVLLPGLGFRHDIVLPQSAMRDIMARPEKELSHADAVLELVQLKYSLGHEKYKADPWPCMLVKSDINSKLEAVCDGMNEELKYAFDKYVGCDTESWKEVDLLETIRMIIMAAASRFTVGFPLCRSEAYLRACWKVNDGIMMNGGLTGATPRLLRPIVGPLVTMKLRQSIEQVKKHVEPIYRQRVQALSQQNSAEKPASDETQDLFQQMLRYAQRERPGELHDLPSMCRRLCFANFAAVHQTTLLVTNMVLNIVSSDPQHNTISVLRDEVKDVIGPDSNAKWTKYKVAQMIKSDSVARETMRLYSNTNRGVFRKVLVEGIKTEDGIELPKGAYVSFLGRPLQCDPETFEDPFEYNPFRFSRIREQAPRDTKGRSSASHLSFVSTSPEHLPFGHGGHSCPGRFLVDFEVKMIVAYLLMNYDVEFPAEYKGQRPANRWMAEALMPPSGARIRIKRRS", aalen: "538", color: "#FF8AD8", domain: "–", homologue: "cytochrome P450 monooxygenase AstC (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00438.html' target='_blank'>FBGC00438</a>); identity: 100.0%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00067' target='_blank'>p450</a>",},{locus_tag: "ATEG_04419 / 19076...20340 (-)", protein_type: "–", start: 19076, end: 20340, strand: "-", aaseq: "MASPQKIRTTLTDLLKINHPVLLAGMNVAAGPKLAAAVTNAGGLGVIGGVGYTPEMLREQVDELKSYLTDKNAPFGVDLLLPQVGGSARKTNYDYTKGKLNELVDIIIESGAKLFVSAVGVPPKHVVERLHKAGILYMNMIGHPKHVQKALDAGADIICAQGGEGGGHTGDVPTTVLIPTVAKLCAGKKSPMTGQPVQVVAAGGLFNGNSLAAALMLGASGVWVGTRFILSDEAGAPKAHQEAVRTAGYEDNIRTIIFTGRPLRVRNNAYITNWEENRKDEIKQLTAKGIIPVEHDFENLPDDVDDETLDNARPFLMGKVAAVVNEKKPAKAIVDEFVDDAAVLLAKGHKMLAKL", aalen: "355", color: "#BBBBBB", domain: "–", homologue: "–", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF03060' target='_blank'>NMO</a>",},];



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
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const height = canvas.height;
const center = height/2;
const canvasWidth = 800;

BGClen = 17196;

geneList = [{locus_tag: "ATEG_07297 / 1...451 (+)", protein_type: "–", start: 1, end: 451, strand: "+", aaseq: "MFDGFMENVPETVSTAVYHMGIFRDQASLQPVEYYNKLPLKPSYIKQAYVLDPLIATGGTAGAVVSILKDWGVEKVTFLSMLSAPSGLSHAASVWPEGTEFVVGHVDSEVDGKGYIKPGVGDIGDRLFGTAL", aalen: "132", color: "#BBBBBB", domain: "–", homologue: "–", hkg_homologue: "AFUA_2G16200; Uracil phosphoribosyltransferase; 50.4% (duplicated)", human_homologue: "–", pfam: "–",},{locus_tag: "ATEG_07298 / 1095...1649 (-)", protein_type: "–", start: 1095, end: 1649, strand: "-", aaseq: "MANFNGDDVHAPPNAPDTITILDQDAPLLHLMTIIRNVNTDHRDFCSAVEKVARRLVSTALNHVPIEPYTITTPINTTYQGVRFTKGVCGVSILRAGTSMEQVLRETWMGPLSFGKLLIQRDETTCRAEIYYSKLPPQITKDGKGNSLSS", aalen: "150", color: "#BBBBBB", domain: "–", homologue: "–", hkg_homologue: "–", human_homologue: "–", pfam: "–",},{locus_tag: "ATEG_07299 / 2433...4511 (+)", protein_type: "aldehyde dehydrogenase", start: 2433, end: 4511, strand: "+", aaseq: "MPPVGRAPVPSRRARFTPYSSLSPKGSEALVSDERTRRWSEDIQNGRSVRASISREREESVETVTDEDSGEPDARPTVTHLFINNTHVMSKAKDWTSVLDPVSQGLLCRVPSSTLSEIQSAVAAAQDAHPEWASLGFQKRREYLLRLIDILREMSPAIVTCLSREVGKTLADADAEVFRGLDCIHAACSIGPEMAGMYLGGDATLLQTLYEPLGVCVTISPFSFPFMIPLWSIPYALITGNTVVLKPSEKTPTTSSLLAKAFIKTGFPPGVFNILHGGPSVVHSLITQPDVQAVSFVGSEAAAKEVHDVARRAGKRIQAECGGKNHGVILEDSNMMSTLFAIAGSAFGAAGQRCMALSVAVFVGSTREWIPKLVELAQSMVVGCGGDQESKVGPLIDASAKNKVCGAIQRAIEERATVLLDGRDVKVPDYPDGNFVGPTILTGVETYMECYQTEIFGPVLICMEVETLDEAIDLINQNKYGNACSIFTTSGKHANTFQRRVNVGQIGVNIPLIDRHAPGKTYWPFFTTTKTVSSRWDQ", aalen: "538", color: "#531B93", domain: "–", homologue: "–", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00171' target='_blank'>Aldedh</a>",},{locus_tag: "ATEG_07300 / 5419...7236 (+)", protein_type: "short-chain dehydrogenase/reductase", start: 5419, end: 7236, strand: "+", aaseq: "MEKTTGDEGRSIYTDMAQFGSIIYDIVNPLEWEFGSHGLINVWLGCSQGASAHCDLIVTHLILCLVNLGVYFVEIDHVEMDDIIRAFRGDRSIGCFRPFVSLRTPGRTVFNLLILRQRPGSAVVNHKYLHHPGLLIHTFSPAKPSMVGLTQVRSSNSALNSRNPHFVAVFVGGTSGIGEYTAKQLANSVKQPTIHLVGRNPAAGSRIVEELKAANPNGSFNFIQSDLSLLRNVDDVCAVIKNKEESIDLLFMTTGHLATSKKDTTEGLENNHALRYYSRMRFVHNLLPLLSASKTPGRVVTVLGAGQEGQISEDNLDLQKSWSFFKSVTYAATMNSLAIEHLASQYPTISFAHVFPGIVRTPLMNSTVGSFAGSILGFLSRPFSISEQESGERNLFISTSAAYPPATPSDPSKIGVPLPDGVQTSMASNGKVGGGSYILNYDGANATNEKVMNEYRQKDFARKVWEHTEATFKKVLGTA", aalen: "479", color: "#531B93", domain: "–", homologue: "short-chain dehydrogenase/reductase AndH (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00006.html' target='_blank'>FBGC00006</a>); identity: 48.8%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='protfam.html#SmbD' target='_blank'>SmbD</a>",},{locus_tag: "ATEG_07301 / 7632...8822 (-)", protein_type: "short-chain dehydrogenase/reductase", start: 7632, end: 8822, strand: "-", aaseq: "MTKSSASNNHALVFGASGITGWAIVNAILNGYPSPDAFSKVTALTNRPLSAEQALWPSSSKLQLVSGIDLQSDPETLQRELRTHVKDIETVSTVYFFAYIMDMAPANEIEINVRILGIAMTAIEKLSPNLRFVALPTGTKRYGVHLVDEFPWKNDLPLRETLPRIPEPHASQVFYYNQIDLLKSMSEGKPWTYCTVMPDVIVGFVPNNNVYCLAQWLAIYLSLYREINGEGAEVVFPGTMESWTIKSNDSSQDIIARFTIYASLHPEVSGGQDFNAADHSQPSSWSAKWAIICDYFGLKGVAPVKGPGPDPARYITENQAKWGEMESKYGLREGHVGKNERSFQFFPYFIMTMLSFDRQLDMTKMHAAWGDAKEELTTLQAWYTAFDRFREAQIIP", aalen: "396", color: "#531B93", domain: "–", homologue: "short-chain dehydrogenase/reductase FncF (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00026.html' target='_blank'>FBGC00026</a>); identity: 60.7%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='protfam.html#FncF' target='_blank'>FncF</a>",},{locus_tag: "ATEG_07302 / 9017...9497 (-)", protein_type: "short-chain dehydrogenase/reductase", start: 9017, end: 9497, strand: "-", aaseq: "MSDLADFPNSFNLNGKAALVTGANSCRCYQNSGGLGLHAATAFLRAGAKIVFITARKQTGVDEAVNELNKLPGISVRAIGIAANVANTEAIQRLVDQVKQYESKLDILVANAGATWGGPFEPTPDWASQKVLDLNVRGLFNLAMDE", aalen: "146", color: "#531B93", domain: "–", homologue: "short-chain dehydrogenase/reductase BeklG (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FPROT00001.html' target='_blank'>FPROT00001</a>); identity: 43.2%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00106' target='_blank'>adh_short</a>",},{locus_tag: "ATEG_07303 / 9753...11467 (+)", protein_type: "adenylation domain", start: 9753, end: 11467, strand: "+", aaseq: "MSYKSVFPPLNIPSTNILSYIYPSNEPLSDKPIWIDAENPAHCLSPRQMLSWVRRLGFGLDRLRIQKGEVVLILTPNHLFVPIAYQGIVGAGRIFSGANPAYTPSELEYQIRNTDAKLLLAHPSLIDNAIEASRRAGLSKDRIFLFTDEAPIGPLHGVHDWRTMIGTEEEGASWKWDEMADTAQSAVATINYSSGTTGLPKGVCISHRNLIANVEQTIFIRDQATSYAAVDAPRPEERWVGFLPLYHAYGQGQLYACLMAPKLGFPIYIMRKFVFEDFLRTIQQYRIAHLQVAPPILIMLDKRPETSTYDLSSVRNILCGAAPLSRELQNNIQERFKVRVVQGWGMTEVTCGAILVPGGMMDETGSVGMLIPNCECRLIGDDGLIVEPGHPGEMYVRGPNVCLRYWRNEKATAESLDWDGWLKTGDVAVAKDNWFWIVDRKKELIKVNALQVAPAELEAVLLEHDAVEDAGVIGVQVAEGEERPRAYVRLKEGRQLTVDNIQAYMKERVAKHKQLVGGVKLVDDIPRLASGKIQRGVLKQWAKQEVEASRARL", aalen: "553", color: "#011993", domain: "–", homologue: "CoA ligase azaF (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00206.html' target='_blank'>FBGC00206</a>); identity: 35.1%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='https://www.ncbi.nlm.nih.gov/genome/annotation_prok/evidence/TIGR01733' target='_blank'>AA-adenyl-dom</a>",},{locus_tag: "ATEG_07304 / 13455...14707 (+)", protein_type: "transcription factor", start: 13455, end: 14707, strand: "+", aaseq: "MSRRRTHRKSRGGCHECKRRRVKCDEVRPECSNCQKREECCSYPAPSFLEWGKERPKNNKKSHPSPSSLSEENPFSAFEKLGSAHHATGLTTELNMTQLELVAHWCHVAYKSLSRNEETDPVWSQYVMEEAVAWPFLMHGILSLSALHLARLRPDNRAAYLSLSVAHQDPGLSSFREQVLQITPANAKAMFVFSSIVVAFAFGYSVTASPQDQGLEIHTTSLEELLRVLLLARGVIHISKVASEWIQESNLAPIFNFKHPDVAVPDDVAHALDTLDALNLHCQSDSLTDTREAYQKAIGELRVLSYTVFSGHPTLTLAVGWAIRLSKEVLKDLQTHEPLALVILAHYCVFLHLERGHWCLDGWGAAVMRDIWQSLDDSWKPHVRWAMSKIFESS", aalen: "394", color: "#929000", domain: "–", homologue: "transcription factor Abl7 (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00436.html' target='_blank'>FBGC00436</a>); identity: 50.0%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00172' target='_blank'>Zn_clus</a>",},{locus_tag: "ATEG_07305 / 16159...17196 (+)", protein_type: "UbiA-like terpene synthase", start: 16159, end: 17196, strand: "+", aaseq: "MALLHGDPLNVPDKKDSRVERFISACYLWLCHELLITSRMLKSNAGASLAVWMVGVFARLIANPQPILTTLAIITESLFDSFIFAYVFDILNQVTSVEEDALNKPHRPIPAGLLTMRGARIRLILSWLLSFPVISAVTGREASHLLFLWELWTLFCYVWPRINHPFFRNAFAGVGTYMMYRWIDLIICNHVSNASIWHGFDALFAVWVFLTCQLQEFHDVDGDRKAGRRTLPVILSADARLKLRRYTATFMLYAAFICLRWVDLGQYSGATYVKLFVSACLLLYTCIVIALRVWVPRSKEYDEHTYKVYYIIASCLFSLYLRIVGSS", aalen: "327", color: "#945200", domain: "–", homologue: "UbiA-like terpene synthase EriF (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FPROT00002.html' target='_blank'>FPROT00002</a>); identity: 31.2%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='protfam.html#UbiA_TC' target='_blank'>UbiA_TC</a>",},];



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
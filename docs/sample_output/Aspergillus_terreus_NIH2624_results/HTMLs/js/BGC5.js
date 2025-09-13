const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const height = canvas.height;
const center = height/2;
const canvasWidth = 800;

BGClen = 29503;

geneList = [{locus_tag: "ATEG_08912 / 1...1017 (-)", protein_type: "phosphoenolpyruvate mutase", start: 1, end: 1017, strand: "-", aaseq: "MSSSVARLRALLANETKIVVCPGVYDGLTARIALKAGFDALYMTGAGTTASRLGQPDLGVITLTEMRQNAEMIASLDRSVSLIADADTGFGGSTPDIPHLNGSLMVHRTVTEYIRAGVAALHLEDQPTSKRCGHLRNKQVVSEGEYLSRIRAAVNARQRSDGDIVLIARTDALQSLGYQAAVSRLKGAIKLGADVAFLEGITSKEQARLVCEELKPTPVLFNAVSGGVSPDLSVQEAQELGFRLIIFPGLALGAVYEAVEKAAQGLKLHGTHMGDARVSPRDLFNVLGLQDAVALDMAAGGGLYEGV", aalen: "307", color: "#C7E280", domain: "–", homologue: "–", hkg_homologue: "AFUA_2G03820; Carboxyvinyl-carboxyphosphonate phosphorylmutase; 51.0% (duplicated)", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF13714' target='_blank'>PEP_mutase</a>",},{locus_tag: "ATEG_08913 / 1204...4004 (+)", protein_type: "aconitase", start: 1204, end: 4004, strand: "+", aaseq: "MSYINQVLETLHKTRNIPVSSAHFEQAPSTNILDQIASISTWLKSEGYDREATALGDVLVICKEPKDLGGLGLADSTGDESIAPEKEAEILFLISAWLESLNSIDRAKSRPACLTIRPAGRRGMTLSEKIFALHDINGKGWVAPGELIRVDVDWVIASEASWAGMERTYNDLGKPGIFRNDRFWIAGDHVVDPRVNSLPKVQALIDASERAKRVFKMTNYQGLNYTILHTEFYRERAQPGMIVIGSDSHTCSSGAVGCLAIGLGAADVTMPLVTGETWIKVPECVNIRLTGKLRTGISGKDTILYILQQLKRNTVAADRIVEFTGPGAKHLSSDARFAICNMTTEFGGITGVFVPDHVTSDFIQKRKLPRHRDASIYFRPDDDAQYVETHEIDLSKVCSFMARYPNPDDVVPVTDHEGMPLDGCFIGACTTAEEDLILAALVLEQGLKKGMKPVSRGKRKVVPGSMPILRRLRALGLAGVYETAGFEIGVPGCSYCVGMSADQAAPGEVWLSSQNRNFENRMGKGSFGNLASAATVAASSFEMKLRDPGVLLDQMDLERWHDLRDISAECAEGRHTDGPTYVEPSSYSAVEMHNTAPSSSSSESQNMVSMCKDGNVMTGKIQRLGDFIDTDALAPAEFLIEMKNNEIAGQHCLQYTHPNFRQRVKEGFNIVVAGKAFGCGSSREQAVMALLGCGVQCVIAKSFAFIFQRNMPNLGLLGITMTDEEFYEAAQDSTKISIHFDNRVVSVGDKRYGFELSQMEQKLFQYGGIASAFQKFGKRLFERMMSHRAVRTRDISLGFSESGPGQKQDLEW", aalen: "812", color: "#656401", domain: "–", homologue: "aconitase HtyD (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00154.html' target='_blank'>FBGC00154</a>); identity: 51.2%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00330' target='_blank'>Aconitase</a>, <a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00694' target='_blank'>Aconitase_C</a>",},{locus_tag: "ATEG_08914 / 4230...6484 (-)", protein_type: "–", start: 4230, end: 6484, strand: "-", aaseq: "MCETAAKSEDGLHATKTAHVEANHDTKRTDDEDDPDLGELYRDAMREQDRFREAMEAYEKTTAGSKFKTDVTSKSMHTWEEVLEEVNKASETYHSRATVWGKIRAGLHKLGDNSRVFDAWAGLLPSGSDCATVISGGLKLILACGSLRVYTCAATPYRVVDLRTQSERFDKAARLCSYEAIEQTRQISIQNQQTLNDHVDRSITQWDSFQNEIRSGQASTQQEIHAMQQYLFGVVERFLGSHDSVDPKTGNVRGPMLPSDKAATERRALQMYLRSRDHAFAALGYTSSTLEADLTTNLDSVWKLPLPSQDRIIAAMQSPKLPTWITTPTSSTLFINMNTPGTSPFSSFLPARLVQSITTQPSGNNIYILAFFCSAHTRSTDPDAGPSGMMRNLIGQLLQSHPGFDLSAVTKLRQLRRDDVHGLCGVFHELIQQLPDDVIVFCIVDGVTEFEDRMALKETGEEVVRALVLAVEMCIQRRGSGGGCIFKLLLTSQRNSRRFWRLVTSEVGEVVWIPERVPSLGGFTVGKWKESIGGKMDWLGKT", aalen: "542", color: "#BBBBBB", domain: "–", homologue: "–", hkg_homologue: "–", human_homologue: "–", pfam: "–",},{locus_tag: "ATEG_08915 / 7065...10241 (+)", protein_type: "ABC transporter", start: 7065, end: 10241, strand: "+", aaseq: "MRDATQITTVQEVSSTAFSVTAGIVDTVQTTLDMKSSSGEKAMEPPSAESSESSPSHRVFKPILTELLEADQPQPISSTPSDDKTTKPAPPQEIKITRVPPENWREVKKKRLVDPEQSILLTSSKGGSSLVLRHAQRKRQISMSGSGHSIEPLESDHQYAPYRLAINSKFLLNFLEACTSTLFTEEQNVLVRPFKYLVEFESDIKNFLQLTETLCEQAEQQMNRFAERNPGPRIDIQHQAVQQDFQRAKAEAAQAKRERDELRCLVEFMTCDMRDIFDIKRQIMSRTLEEIAFEHLWQLYKPGDLVYRNFHDDPSRRQAYRVLHVTGGRVCFDTKKMSYFDPVSDRAWETESDDDRKCRDTMKRSGMQMTNFIIDCFYLESDGVRLAPRPKRFTITPYTGTRPITSLALRPLQFDPHREMVEKELVARGARFMQLAHRKHMMYHGTTIEEAMHSQYKYRNYRIEAIEIHGEVIVDQEAGVMHFQDEYSSFSLRTGGGIIIAHTEADRREVSDFFPQKTDGDWVTDVMDDSIFEEYRQSEYVMNTDLLTTRMIAGTDLPDDQLLLLPPRVYGYSLLDRRWVAFNVSLLQEISPEDSQRKRNKMEELVLPNEHKMVLQALITNQVRIPHPSSSHHAYVQEQFSMDVVPAKGKGLIILLHGAPGVGKTSTAECIAIELNRPLLPITCGHIGTTAPEAEAKLEEFCKLAHRWRCVLLLDEADVFLAKRERGDVKRNSLVSVFLRVLEYFSGVIILTTNRVGEFDEAFRSRIHVCLYYPKLEERQTKEIWEKNIQRIRDSGLKIDLEEKKIRKFADNHWRQNLERPTRRWNGRQIKNAFQTAIALANWDYYDNGNVEKLDRPLLKAKHFRHVAQITAHFDDYISDIYGTHDEDTYGFLAARDSLRMDNNRDIFGSRGMMPEGSGGFTRGIVRRGTDFRGQPANSSKPQGSSYDRYESESDHESTEDDEPEESDTAEDEDEDKATQIKKLELELELAKLKGKQGSSKGHKKR", aalen: "1006", color: "#000000", domain: "–", homologue: "hypothetical protein UncB  (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00808.html' target='_blank'>FBGC00808</a>); identity: 31.3%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF13191' target='_blank'>AAA_16</a>",},{locus_tag: "ATEG_08916 / 12097...15728 (-)", protein_type: "major facilitator superfamily transporter, FAD-dependent monooxygenase", start: 12097, end: 15728, strand: "-", aaseq: "MPEDTKKIDLPSPGDSQPVFSKDCQTVNPIPVDEVGLRRVPDRIPWVVMLVLIVELGERFTYFGLSGPLQNYIKNPYDPSAELPGALAKGQSIATALGNFFKFWAYASTVIGAIVADQYIGKFKAILVACGVYIVGLVVLVATATPASIKGGAAFGGLVTSMVIIGLGTGGIKANVTPFCAEQYQKVHAYVKTLKSGERVVVDPNLTVERMFMWFYWAVNIGALSPLITVNVEAKASFWLAFLIPLIVIVIVGVLFVGSSKLFLKTRPQGSPIVDAARTVRIALAEKSFENAKPSHLREHGKLDRYPFANRAEYTDYTVEKVKTGITACKLFLLFPFYFICWTQIWNNLISQAGQMALHGTPNDLLQNLDPIALIIFIPLLDFIVYPVLRRYKINFRPELRVTAGFILASLSMVYASVLQHYIYNSPPNSIHVWLQAPAYVLVGFSEAFVIITGLEIAYTKAPESLRSLVSALFWLTIGIAAAICIALAPVSQDPYLVWMYGSLGIVGFVAECNRHMTCLRGTEPIPFVIGDAAPQISGWTRMRQSEGSSAAIVLHPCRPRVPGKPKAPMARDSIVILGAGIIGLNVALELSKRGYGRHITVIAKHLPGDVHVDYTSPWAGANFSGISGNDPNALRWDKAGYLSLMQLIDSGAEEAKYLSKTQSIEYWDEQPSPEKIQSVTEYLRDVETIPKAELPPNVAFGLRFTTITLNAPAHCMHLKSLLSQDRYGSIKFVRHTVQSLQDAFISPDTKIVFNCIGNAAITLPGVQDPKCYPTRGQIVLVQAPSLKQNVMRHGKDYETYIIPRPDSDSTVILGGYLQKGDSDSNVREHERQSILQRTGDLLPVLKNGETKILNVAVGFRPSRQDGARVEREEIHAGKTVVHNYGAGGTGYQAGMGMAQDAVNLVKGILDSLPLRSTL", aalen: "919", color: "#000000", domain: "–", homologue: "major facilitator superfamily transporter ImqI (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00190.html' target='_blank'>FBGC00190</a>); identity: 37.9%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00854' target='_blank'>PTR2</a>, <a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF01266' target='_blank'>DAO</a>",},{locus_tag: "ATEG_08917 / 17102...18152 (+)", protein_type: "–", start: 17102, end: 18152, strand: "+", aaseq: "METRKVFPQFQQLHIEIRLMIWRECLPSRVIEIDFPADRNRPYKCTLVWPNRQTRLPPALTKVVTIHATRAAAAESGLFGLLLDAPIQLVDATDTSKIAKFHELWASNSALDTTPSSFFRDQVSFQVRVRQWLKELVALWVYYPWMKAWKDKWQGVIDPEGIWLGPRIDEDAFLRDMLIPGCLESDPGPPFCVDYNLFSPNMDHPFAQEALIVMPQFRPRVMFRYCPLDCHLQKQGGMGSR", aalen: "241", color: "#BBBBBB", domain: "–", homologue: "–", hkg_homologue: "–", human_homologue: "–", pfam: "–",},{locus_tag: "ATEG_08918 / 19067...20921 (+)", protein_type: "amidotransferase", start: 19067, end: 20921, strand: "+", aaseq: "MKYVLVSGGVISGVGKGIIASSTGLLLKTTGLTVTSIKIDPYINIDAGTMAPTEHGEVYVTDDGGEMDLDLGNYERYLLTSLTRDHNITTGKIYQNVITNERVGHYLGKTVQVVPHVTDAIQEWIERVAKIPVDESRAEPDVCIIELGGTVGDIESAPFIHALSQLQRKAGKGNFIQIHVSYVPVIPPGPGGEQKTKPTQRAISDVRSAGLNPDLIACRCEQPLEQATIQKIANMCSVEQHQVIAVHDVTTTYHVPLLLEKQKLIHTMTEMLNLKQHTPARIEEGSRMWKDWVDLARGQDFLHDTVSIALVGKYTTLHDAYISVSKALEHAAMYCHKKLKMIWVDSSHLEEETASPADFHKAWHAVCTADGILVPGGFGVRGTKGMMKAIKWARTNKTPFLGVCLGMQLAVLEYCENVVGIEDVGSEELHPHAENHAIVYMPEVDKGKLGGTMRLGKHPCIFQENTEWSRLRALYGQSVSQVEERHRHRYEVNPAMIDQIEKAGLTFIGKDIKGERMEVVEIKDHPWFVGVQFHPEYLSRVLSPARAFLGFFAAAAGCLDEATKALNQGQRSIGRKQ", aalen: "577", color: "#941100", domain: "–", homologue: "–", hkg_homologue: "AFUA_7G05210; CTP synthase; 69.5%", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00117' target='_blank'>GATase</a>",},{locus_tag: "ATEG_08919 / 21992...24190 (-)", protein_type: "cytochrome P450 monooxygenase", start: 21992, end: 24190, strand: "-", aaseq: "MKEILLLYAQAAGLVGAAYFLVLAIYRLWLSPIAHFPGPKLAALTLWYEFYYDTILHGQFTFEIARMHRRYGLIPASGPIVRISPYELHIDDPEYYEVLYSRDSPRNKYEYYVRQFGQPKAAFSAVEHSRHRLLRASMNPFFSLTRIRRHESRIKALADKLTQRLNEFQNTGRPMVIQHAYTCFTTDIVSEYVAGQDFHYLDSPDFMPQWCETLSGIAKAGVFFKPFPWLHSVMKCLPQSWVSRVDAGMGLFFSFQQRCASLIQSITDSENNQPGKSANNTRAHTAFFHEVLKSDLPPSEKSAERLAQEMLIVVAAGAETTAKALTWITFHLLNKPELLQRLLDELQRLDPNQTASLLQLEQMPYLNGVILEGLRMDHSTGNSHRFMPERWLDLQTRKHLEKYMVAFSKGSRQCIGMNLAKSEMLLAVSKVFREVKFELFETTVEDVTMAHELFLPFPKVGSKESFNIESLILVLKSFKLT", aalen: "481", color: "#FF8AD8", domain: "–", homologue: "cytochrome P450 monooxygenase OtaC (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00127.html' target='_blank'>FBGC00127</a>); identity: 38.8%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00067' target='_blank'>p450</a>",},{locus_tag: "ATEG_08920 / 24974...26324 (+)", protein_type: "canonical class I terpene cyclase", start: 24974, end: 26324, strand: "+", aaseq: "MSPSIQMSSLANNLKTNFFMPISHIYDPIQTSNSSAFDSGPFDFVEATNGDDYSNSIPLCPSVMGIPWPSKLPGCRQCKHWETAERMTKELLYAIYKKAPQDDGKLPVDLQETSTDKRSQKEKELIATAVKSTVYMFPDASPVRAGMIAQSMLLIFLHDGKALQSQMQSWLPGLAPKDNRVQHPLHGFLKAIIDEEPILGKGLLTGAFAWIKHTKGYQSIPPTVFDSLRNYLDYRSLDIGRELLLSQAAFASNAHLSEPEMKVFDRLIGLYSDHISLTNDLYSFDKEYGDHCRTGAVLINAVDVVRNVHRVSRPIAKQLVRESILDMETDFSKEFKRLKVSGELSDRQQRFVEALALCLVGHIFYSATSGRYGGANAALESLSDTV", aalen: "386", color: "#945200", domain: "–", homologue: "terpene synthase ThmB (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00551.html' target='_blank'>FBGC00551</a>); identity: 26.6%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF19086' target='_blank'>Terpene_syn_C_2</a>",},{locus_tag: "ATEG_08921 / 27385...28481 (-)", protein_type: "methyltransferase", start: 27385, end: 28481, strand: "-", aaseq: "MEERQLVLPIDVLDPQDADVYVHPSIYHSYEQHRGRYSRVSASVRAGTVVFADAPYALIPTVDPTSKGSLICSNLMCRRQVKWDLECVTCPNDCIRDVVWCNSACRIQDQARHDFECSWLKKHGVTLRQREGEYDFCMLWLVVRLVAARRLEMEYDPTSHERYGWEDRFKRGWQAIEEFSTNRHLWPDATIQHWEYLIQTYLRNFPGFPGPTELLGLICREEINSFGLYPGITGTLPPGQQRKRGQQYGLGCYPRATMLNHSCVPNLNRASDDRGRMVITANQDIAADKECTISYFDLVEHADLEDRQRLTHEMFLFSCTCQRCLVEADKGSMPTTGRYDTLVCNGERQ", aalen: "349", color: "#FF9300", domain: "–", homologue: "–", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00856' target='_blank'>SET</a>",},{locus_tag: "ATEG_08922 / 28999...29503 (+)", protein_type: "major facilitator superfamily transporter", start: 28999, end: 29503, strand: "+", aaseq: "MAGATTTPALGRHWTVLAMVCSMMWAIYFIYSLPASLSVPLSAHLALAESQYAYLISALYTTYAVPNTVLPAFSGPLVQRCGSKAVLLTTATSVAMGQLLFALAVQVRSQLWMILGRVFIGLGAEVIGVLGSEIIARWFKYGSLMTIPV", aalen: "149", color: "#000000", domain: "–", homologue: "–", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF07690' target='_blank'>MFS_1</a>",},];



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
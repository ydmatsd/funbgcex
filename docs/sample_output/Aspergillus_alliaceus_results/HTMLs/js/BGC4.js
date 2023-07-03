const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const height = canvas.height;
const center = height/2;
const canvasWidth = 800;

BGClen = 29853;

geneList = [{locus_tag: "BDW43DRAFT_321736 / 1...1995 (+)", protein_type: "peptidase", start: 1, end: 1995, strand: "+", aaseq: "MPGHYLEQNTTITLKKNSGQIRCNIYRHKDVNRSPILVNYGPYGKDIQYKEPAPGVLDIASRATSEVFVDDVDWAAQRSWSMEVGLLGISYYAGGQWRVASSQPKGLACMIPWGLIQITTVTGVAMKAILPNTFIKWWWDRQVIGNQYERTGRAGDLSEKGLLANHNDQIIDNVKNRLRDEPYYASREYNMEHIQVPLLSYLRFITGRHDLPFYYHEEVELQRSFLDAFLWGEDRAGWSTGNVGFDNAKAERFFLTLDFRLQTQAPQSGLVKHIYRADGGYWPHRRSSLNVFVCPDEGGPLSSETDLFLTLRYVSPSGEEIYYTSTVGDPTPLTKGWTRVSMRKVNEKHLRHREYLPYRDYYSTGVLPVMPGEVYPVDVEIWLSNVVVEKGGTQASEIFRHNYPTDRSAEKLQGENHIHFRPVYENYVTLPLISSL", aalen: "436", color: "#0096FF", domain: "–", homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF02129' target='_blank'>Peptidase_S15</a>",},{locus_tag: "BDW43DRAFT_314508 / 3005...3775 (+)", protein_type: "short-chain dehydrogenase/reductase", start: 3005, end: 3775, strand: "+", aaseq: "MRFLVIGGSGRTGQLTIAELLRRGHKVTALVRKPSSMEDKTGLKLVQGTPTKIDDVRVAFQFDVPDGVIVTLSAPRASDSPFAAPTSPPRLMADCNANVVAVMKEYGVKKVVILQAFGVGESWKNMNCALQLLMKKSNMIYQYDDHNLTDREVRASGVDFVLVRPSRLVDTDVQEVKLWPHDGKGVPMMASTSRVSVARWLVDAAERNKWDNTAPVITN", aalen: "219", color: "#531B93", domain: "–", homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF13460' target='_blank'>NAD_binding_10</a>",},{locus_tag: "BDW43DRAFT_287231 / 3995...5317 (-)", protein_type: "beta-lactamase-like enzyme, beta-lactamase-like hydrolase", start: 3995, end: 5317, strand: "-", aaseq: "MSLVIDDRKSNRTDNDRNTTRIDWTTPLASIIPEDFVLPDDYATTHVTIEDALSHRTGMPDHIRHFGGNGPSSRTVREEVRLLRHLPSTAELRTKYMYNNLMYTAVSHTIETLTGEDLGAFLSHRIWTPLQMTDTYWTPEEAQASDKVLAQGYAWNTDKGEYIPEPPPDIIGSSGAGAIISNVLDYAKWIRCMMTREGPLSAEAHEALVQPRTIITDDPTILFPPPHLYALGWTQAIYRGEHIVWHPGGVAGYGATVMFLPAQQWGLVMAGNTTLTSNFVQVVLYMYLLDELLKTPPNERLDWSRLIWERVNLHREQQMHARELLYPQLPTVPLPPAHLVHEYAGLYIHPAYGRLDLFVDAGGSGLVADRTTCEVPMMVVLEHVSGEFWLATLQEKNQDPRDYEKVRAEFKTGVDSRVNEVGVDLEAEMAGEKIWFRRVY", aalen: "440", color: "#0096FF", domain: "–", homologue: "metallo-beta-lactamase-like hydrolase UngD' (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00039.html' target='_blank'>FBGC00039</a>); identity: 37.5%", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00144' target='_blank'>Beta-lactamase</a>, <a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF11954' target='_blank'>DUF3471</a>",},{locus_tag: "BDW43DRAFT_287236 / 6540...9020 (+)", protein_type: "transcription factor", start: 6540, end: 9020, strand: "+", aaseq: "MSDMTSVDASTDALQLRKRQRPVVSCLRCREKKLKCDRVTPCENCIKAGCPGGCTYNQCPNAFPKVKRIHLSPNDAGRNHEQRSEAEKAPGIGVIEDLQQRVIRLEERLGLGPQVANPPLASHAPALQINIDARPHDSAPETSDSQPFIGTLVVKGTRTRYHGQNNRISLLNHFAEAKEFIAQCTRDPTIVSLAKEVQFLQGKLQGPMDSPASSLEVGSSSELAQLRASLPPQSICDRLLNSYTTNFEKTFRIIHVPSFFQEYTQFWANPDHERYQSSSAFLPLLTAVCTASLALEGQRLKENDITLWEYLNGPALVLIQLWLQKLSRKQRTELAPLQIETLLHLSRRVRLVPTEEVWRATGSIVRSAMVMGLHLNLRNCAELSAFQAEIRRRLWITIVELDLQASISSGMPMMVSPYDVGPPPANLNDSDFDETTMELPPSKSLSEWTDSIYQVSLAMSLAERIRALSLVRIAYTRADLSEVVQQGRKIVECLRQIPSHLKLNENLTNGVNPTVLLSRVLLDIYTRRPLLFLYRPIVLGHPRDDPAFQEVCQACLESSLAILSYQDHFDPNVADLEVFNSGAYWELFQVICNGDILWAALSVCGYIKHSSLPGLAAQWNSTHSKASLTRIVENTLDSLTLRISEAGSNLKDVLLLAVVLQSVRARGSTHMQEQRMSQGAKRALAACRQQLLPAVAEDSLALNLTDFAQMLQTTQPIFNSTGPGSYTPSTELHLPDDFLAQSSALAMEFNNFQGDPFIIENGAFAWNL", aalen: "768", color: "#929000", domain: "–", homologue: "transcription factor OpdR (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00279.html' target='_blank'>FBGC00279</a>); identity: 26.8%", pfam: "<a class='funbgcs' href='protfam.html#CghF' target='_blank'>CghF</a>",},{locus_tag: "BDW43DRAFT_321737 / 9464...10705 (+)", protein_type: "FAD-dependent monooxygenase", start: 9464, end: 10705, strand: "+", aaseq: "MSTLHNVAIIGAGLSGLALALALHRRSIPCTIYEARFAPLDIGGAIMLSPNSLRILDSLGAYQRIRPEAYEFDNLYFRSPDDELIDTYEFGHERYGYHGLRVYRHVLIRVLSALAAEANIPVQYNRKFLEVISETESDVTWRFDDGTTASATCLVGADGIHSRVRKYLYPDLEPKFTNTVGVTAAVPASQLMAPDGYEMPVTIMNKTHCAFVIAPQLSDGSEVLIGRQKRAPQLDRQGWDRLLRDKQWCVDFLRDGAGDFPVIVQRAVWQTTPDKINLWPFYVVPKLDRWISHYCRVIILGDAAHAIPPSAGQGINQAFEDVYTFSLIVAGGRNDISLEQGLKVWQQGRQERVDKVLQLNEQIDRRRMPKQSEDEQSDAHQAFDLDWLYRPDFDAMVEEWLQMPNPALGWSST", aalen: "413", color: "#008F01", domain: "–", homologue: "FAD-dependent monooxygenase H3H (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00335.html' target='_blank'>FBGC00335</a>); identity: 29.2%", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF01494' target='_blank'>FAD_binding_3</a>",},{locus_tag: "BDW43DRAFT_321740 / 10851...11736 (-)", protein_type: "hydrolase", start: 10851, end: 11736, strand: "-", aaseq: "MSTEHSKACCERPVPKPFSYTAKGQWIELDGMDTYITGDTKAQRAVLWVYDIFGFSSQILRGADILAHSSKEPILVIIPDWFRGSTAELSWVPPVTEEQQQKLGTFIQTKASAAIVVPHVRTFAKCVKAVYPRIQRLGIFGFCWGGKLVSLACQGDALFDVAAQTSPARVDPEEAKHVTVPMALLVSGDEDAGLVARYAENIRAETHVEMFPSQIHGWMSARGDLNRLVVWNEYQRGYQVIVQFFDKYL", aalen: "249", color: "#0096FF", domain: "–", homologue: "dienelactone hydrolase PvL11 (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00516.html' target='_blank'>FBGC00516</a>); identity: 36.9%", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF01738' target='_blank'>DLH</a>",},{locus_tag: "BDW43DRAFT_314513 / 12122...13323 (-)", protein_type: "–", start: 12122, end: 13323, strand: "-", aaseq: "MQDTQLVSNMMYFYSNSARSSNGRQSWILLLPDLITQSRQQTRVAVLATSMLLLAIQSREERIFVESLGYYCQALISLRRQLPLVTDPQNPDFLPLTCVAIVLSFFEALCGTLFNGYYQHVQGAVVLLQIQGPRNCALVPYHSLFYAVRNHAICASLMTGKISPLAGEPWLTIPFSLSKKSSSDLVNDILLAMPRYLSALNADETASETSRLSREDIVQDLMNHLQNLAGIWSQISQHEHPIAESTQPTIPQSVELTQRYTYDNPYHAKVIANYRTAHLLAFSLLSIILPCHDWDVAPFLDDSASILSAAGYLEECDIGCAYFQMVFPLRLVAQHSPCATRRRVAIDMLKRWCGEKPVRGLANSALEAIYRGQCVIPQMLIL", aalen: "382", color: "#BBBBBB", domain: "–", homologue: "–", pfam: "–",},{locus_tag: "BDW43DRAFT_302819 / 16750...19771 (-)", protein_type: "IPPS-type prenyltransferase, polyprenyl pyrophosphate synthase", start: 16750, end: 19771, strand: "-", aaseq: "MSFVDYFLTHPASYAILAALVIPVTALAWDRLPDLLPSGKSLLVGKRNPFEITALECPYSYIRQIYGTHHWAPFVDKLSPGLKAEEPAKYHMILEIMDGIHLCLMLVDDISDNSDYRKGHPAAHRIYGVSETANRAYYRVTQLLNRTVQEFPELAPWLMQCLEEILEGQDLSLVWRRDGLSVFPVQPEKRLVAYRRMAYLKTGALFRLLGQLVLQNRSYDDTLSTIAWYSQLQNDCKNVYSSDYAKAKGAIAEDLRNGELTHPIVVALNTAEGHLVARALEVRSPHNIRQALRVIQSDEIIRGPLDYLLMYPGKDIRRKFMQAFNEWLKVSEDKLNIIAEIVGLLHTASLLIDDIQDSSKLRRGIPVVHSIFGVAQTINSANYAYFLAQERLRELNRPKAYEIYTEELLRLHRGQGMDLYWRDSLTCPTEEEYIEMIANKTGGLFRLAIKLMQLESEVSSDFLKLAELLGVIFQIRDDYQNLRSDLYSKNKGFCEDLTEGKFSFLIIHSINSNPDNHQLLNILRQKSEDESIKKYAVEYIQSTGSFEYCQDRLASLLHEAKVMVGELEENVGFSKGIYDILGFLM", aalen: "585", color: "#0000FF", domain: "–", homologue: "prenyltransferase NomC (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00484.html' target='_blank'>FBGC00484</a>); identity: 84.0%", pfam: "<a class='funbgcs' href='protfam.html#PaxC' target='_blank'>PaxC</a>, <a class='funbgcs' href='protfam.html#GGPS' target='_blank'>GGPS</a>",},{locus_tag: "BDW43DRAFT_302821 / 20340...21135 (+)", protein_type: "Pyr4-like terpene cyclase", start: 20340, end: 21135, strand: "+", aaseq: "MDGFDTSSAPAEYQDIAWMAHGLIFGMGIGWVINYVGMVYKSFQDRTYGMAIMPLCSNIAWEVVYGLIYPSKTLVEQAVILSGLAINLAVMYAAIKFAPNEWVHAPLVMRNLPLIFLLGIIGSITGHVALAVEIGPGLAYSWGAAFCQLLLSIGGLCQLLTRGRTRGGSYTLWLSRFLGSCCTVGVAWVRCTYWPEAFSWLKSSLVLWCLAVFFFVDASYGVFFYYIQKLERTNGIDSTRKDV", aalen: "243", color: "#945200", domain: "–", homologue: "terpene cyclase AtmB (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00477.html' target='_blank'>FBGC00477</a>); identity: 69.5%", pfam: "<a class='funbgcs' href='protfam.html#Pyr4' target='_blank'>Pyr4</a>",},{locus_tag: "BDW43DRAFT_321743 / 21900...23524 (+)", protein_type: "FAD-dependent monooxygenase", start: 21900, end: 23524, strand: "+", aaseq: "MGGQGQFRVIIVGGSIAGLTLAHCLRRAGIDHVVLEKGADLSPQIGASIGIMPNGARILDQLGLIDAVAAITEPVNTAFISYPDGFAFRSDYPRIITERFGYPIAFLDRQKFLEILHTSYPNPSNIHTKHRVIRIQQLDSHAEVLTDSGQKYTGDLVVGADGVHSVTRSEIWRSGQVSKREKRRMRVEYACVFGISSPVVGLNPGDQVNAFYDRLTIITMHGKGGRVFWFVIKKMDKIYVYPDTVRFSNEDAIRTCQQIAHLQLMNDITFGHVWEKKEIASMTALEENIFHTWHADRLVCLGDSIHKLRITMSQMTPNIGQGANIAIEDAAVLANLLHGTLSKNEPGKLSQPALNQVLREFQRIRFNRVNRIYQDSRFVARLHARDGFLKTLLGRYYVPYFPSLPADIASKIIADSPVITFLPTSQRTGPGWLQYSQRARGLAPSWVLVLLLISISLLLHRYKVALIDLWRDSFISNPS", aalen: "479", color: "#008F01", domain: "–", homologue: "FAD-dependent monooxygenase AtmM (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00476.html' target='_blank'>FBGC00476</a>); identity: 67.7%", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF01494' target='_blank'>FAD_binding_3</a>",},{locus_tag: "BDW43DRAFT_314517 / 25683...27092 (-)", protein_type: "–", start: 25683, end: 27092, strand: "-", aaseq: "MAENRILEVRTVAEVFLALATVATALRCYVRVVTVKAFGWDDAIMLLALGFFAMFSDCMIGGSRYGTGKHLTALSDHEKITAMEYWFLCDVAYCLSSIMCKISVGTFLLHVTVNKIHRVVIYAVIALAVTFGMMFWILLLAQCTPVKFFCLRLSATNKVSIDMTVVIVALVLPVFVVRNLQMRRDLKYAVASVLGMARIASVAVLVRLAYVKTLRNPDFLYATVGIAVWSNVETGLGILAGSLATLRHLPRMLRPGTGRSYHNDHTLNLRSRIWHRASGQRNNALPLSSLTSPEERQHRLKGNLCANHELIRPKDSKVYQYQINVRHDFQVTASDSPV", aalen: "338", color: "#BBBBBB", domain: "–", homologue: "–", pfam: "<a class='funbgcs' href='protfam.html#TwmC' target='_blank'>TwmC</a>",},{locus_tag: "BDW43DRAFT_321747 / 28197...29853 (+)", protein_type: "cytochrome P450 monooxygenase", start: 28197, end: 29853, strand: "+", aaseq: "MSESSLAVGLSLGAALLATLLFFTARRKLDPREPPLVSSAIPIVGHLAFFMYYGLEYFATISRKTRLPAFTMDMLSAKVYIIASPELVPAVRRSRSAVSLGPIFANVTEHAGGIRGRGLQLLRDKESGGQGIGQQTADSMHPALLGDGLDQMNGKMVSLLQTVIDTLASRPGVVLDLYEWCCHAVTVASTEAVYGPLNPYRLESNRRAFWHIESNLSLLMMDILPWITARKAWQGREQLTQEFIRYYQAGGHLDSSQLAYSRWKVQHDAGAAMEDIARLEALNALGILSNTVPTCFWVLFDILSRPDHLNIIRNEILTGALSVDSAGIHTLDVADIRVNCPTLVSTLQETLRMRSNSAQLRVVRQDILLDDRLLVKAGSIILMPAATINKHTSVWGSNADAFDPQRFKETDQAEKRRRAAGFLSFGTSPHICPGRHFASGEILALAAMLLVRFDIQPAKGAWVEPKVNTKAVAASLAPAAERVEVTCSEIPKFAGVEWRFRLTPGKGTFGLITG", aalen: "514", color: "#FF8AD8", domain: "–", homologue: "cytochrome P450 monooxygenase NodJ (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00475.html' target='_blank'>FBGC00475</a>); identity: 41.1%", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00067' target='_blank'>p450</a>",},];



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
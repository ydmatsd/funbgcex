const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const height = canvas.height;
const center = height/2;
const canvasWidth = 800;

BGClen = 29176;

geneList = [{locus_tag: "ATEG_08167 / 1...1266 (-)", protein_type: "cytochrome P450 monooxygenase", start: 1, end: 1266, strand: "-", aaseq: "MMLGEAGQFPHMGALLLTALFIVYLCRQWTTRQKILRLGGYAPRIPSYVPLGIDHQPPSAIRNGRRNKSLETWRGWHSCAPNNGTVEAKVLFERYLLTGDPENIKAILATQFDDFAKGQLFHDTWSQLLGDGIFSTDGAPWRGSRQLMRPLFAKDRVSDLDVLERHVQKLLRNVAAKSGQRLDLCDLLFRYTLDAATDFLLGEPVGSLDNDTQEFATAFDHAQYIQMMIARSGRAHVLIPRASLNKSISTINAFIRPYIDSALRLQDSTKLVERSEPDYTFLHALAHYTRDPKLIRDQLVNILIAGRDTAASSLSWVFFELAKQPRVTTKLREEILAQVGFERPTYSQLKDMKYLQVSIGQGTTPPHQKLTTAPQERDP", aalen: "379", color: "#FF8AD8", domain: "–", homologue: "cytochrome P450 monooxygenase PvhE (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00139.html' target='_blank'>FBGC00139</a>); identity: 42.6%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00067' target='_blank'>p450</a>",},{locus_tag: "ATEG_08168 / 2074...3961 (+)", protein_type: "cytochrome P450 monooxygenase", start: 2074, end: 3961, strand: "+", aaseq: "MRCVYELATHGFHEYVRDILATKPGRTIEFHILDKRMIVTDNPENIKEMMSVQFDTFGKGDLTHHIFRNCFRGSIFGSEGAEWAAHRAQLKPHVGTMRPSDPEKLEKHFLQMLKKNIPDDGSPVEVYDMLDMMLLETVIDIFVDPSKDPEYKHIDPRPFVNGVNALLKINTFRVLLGNVSRLVSDTLVARASTQALHEYLGSHVRWIRKLQSSNYGEKPKKEWTLMETFASEPLPDSDPVGMIVVWVIYELGRRPEIVDKLREEIIATIGDDINTLPTDAQLRSMKYLQNIIKEAMRMYHPFVNIMGLHRRADIVGADTDVFRPERWDTFKPGPWEYMPFHRGPRNCLGMAFGQYAMAYLIVRLYQLYDILPADNIVQRIKVEMNTKVSHPVNMRFYPRQSVSSPRLQKDEVLL", aalen: "414", color: "#FF8AD8", domain: "–", homologue: "cytochrome P450 monooxygenase MilC (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00292.html' target='_blank'>FBGC00292</a>); identity: 32.9%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00067' target='_blank'>p450</a>",},{locus_tag: "ATEG_08169 / 4467...6089 (-)", protein_type: "aminotransferase", start: 4467, end: 6089, strand: "-", aaseq: "MSFKSIMVQRLAAQEPRAHRFQNAPVFYRNLEAIMDERRKANRLHVLMDASRKKADFSSNDFLSLASSGLLKTEFLNELARNPDFQVGQSGSRLMDGNTQYLENLEREMAEFFRADTSLIFNSGYDANSAIFAVLPQSGDAIVYDELVHASIIDGMEQSRATIRKPFVHNDLNSLREVLLSLRKSEPQLAQGKSTVILAIESVYSMDGDISPVEDIMKIAQELFPLGNTEVFFDEAHSTGLMGPLGRGMACELGIEKKLACRLHTFGKALGCNGAIVLGSETVRNMLVNYAKGFIFTAGPAFPFAACMRAAVNLLRNGQAEPMRQKLQFNVRYFLRTLLQHPVWKEAQDTKLLAIPVAEDYESKELLTQIVPVWTQARDNHHLASHLHLADYKAYPVSYPVVPKDQGRIRLVFHAGNTTDEIDTLIQIICDWAREMIDLRIKQVPLSCTWSKIILAGEVRKKQRLEEEAKRRDRAQKVAEVKRDLQPLIVESKARGYVEKSLL", aalen: "503", color: "#73FCD6", domain: "–", homologue: "aminotransferase SphA (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00555.html' target='_blank'>FBGC00555</a>); identity: 46.6%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00155' target='_blank'>Aminotran_1_2</a>",},{locus_tag: "ATEG_08170 / 6727...7923 (+)", protein_type: "fatty acid hydroxylase", start: 6727, end: 7923, strand: "+", aaseq: "MASSNTTIDMGEWLPPLPSYTLTPRPSLIPNIPDELLKTFMVPTLYWISSGLFHLIDTLDLFPQYRLHVPEELETRNRVTIWQCIRQLLIQQAMQISLGLWVALKQPTMPVDYIGKEDYDIAVWAQRLRLAQRMIPSLLAVLGVDSLSLATKLPASHSLSGLLQGGKYPWLTQTIMLDDMLQSVPAFAQWELFLAKLVYWVISPAIRMFIAIAAIDFWQYAVHRILHTNKWLYSRVHAVHHRLYVPFAFGALYNHPVEGFLLDTVGAVIAQALVKQSIRERMFFYSLTTVKTVDDHSGYAFPFDPLQKLTSNNTIFHDIHHQSWGIKHNFSQPFLIFWDRYLGTEWKGDTTKLYEKSVERAKAEVRERRQQEKEL", aalen: "375", color: "#FF8AD8", domain: "–", homologue: "–", hkg_homologue: "AFUA_1G16850; Sphingolipid C4-hydroxylase SUR2; 52.8% (duplicated)", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF04116' target='_blank'>FA_hydroxylase</a>",},{locus_tag: "ATEG_08171 / 8950...13161 (+)", protein_type: "ABC transporter", start: 8950, end: 13161, strand: "+", aaseq: "MSKERQGTRYQMARTPTTDTPSSAGPVTPKSVSLSNSTEVTALPICGSAVSEIQVREDEPASARTVNDAVHRNSEDSDAQDPFSHFPPRERQILRDQVCLTEIKTGYFTLFRYATKWDLVIIVLSGCCAVVAGVGLPLMTVLFGTVTNTFRDFFLGSVTRPVFDNKLSSVVLYYVYLSVVVFVSSYVQTVGFLYTGEHLTAKIRTRYLTACTGEITTRITADTSLIQEGISEKLGMSLTAMATFVTALVIGFATLWKLTLIMIGGVVAIIIIMAICGLWIAKYQKQTLNAYAEGGTFVEETLNSIQAVTAFNTQEKLALHYDRYLKTAQRWDKRAKFTIALNIGAMFGTIYLNYALAFWMGGRFVTTAETTVGHVLTILMSTMNGAFALGSIAPNLQAFTTASSAGLKIFSMIDRSPPIDSGSVARRTISNVSGDIEFRGIRHVYPSRPDVVVLPDFNLKFPAGKMTALVGSSGSGKSTIVALLERFYNPIRGQILLDGVDITELNVKWLRSQIALVSQEPTLFGTTVYDNIRMGLIGTEFESVDEEKTTELVYNAARLASAHHFITKLPEGYQTNVGERGFLLSGGQKQRIAIARALVRNPRILLLDEPTSALDLESEAAFNKALEAGSAGRTTIVIAHRLTTVRNADNIVLMDRGRIVEQGTHEGLLESPNSTYRGMVEAQRIARRKRIRLSALEDPFWREQHGDKAELDLGVNILASAVEPALLEGMPSPEHYSIWELVKLILSFNRTDWHLMLLGFVTAAFCGIGNPVQSVFFAKEVVSLALPLSETATILSDSRFWSLMYVVLAAVVLVAYCVQGLAFAICSARLIRRVRDMAFRSLLRQSIEYFDKSEIGTLTSLLSTEATFVAGLSGTTLGTILTVLTTLVSSIVVSCVVGWKLALVCTATIPVLLGCGFLRFEVLFQLSKRAKRASQSSASFACEAIAAIRTVASLTGENAIVAQYQEQLHTQGRRSLRLYYKAAVLFAFSQSAVLLVIGLGFWYGGQLIGYGEYNLLHFFICFSAIIFGTQSAGSLFSFAPDMGKARAAAAILKQLFDIVPSIDSWSTSGERLTSIKGEIKFRDVHFAYATRPHRKVLRGLSLTIKPGQWVALVGTSGSGKSTVISLLERFYDPQSGGIYVDGRDIRRLNVSNYRSFLTLVGQEPTLFHGSIRENILQGTSRTEVTEEEILSVCKQANIYDFVMSLPKGDMLSGGQKQRVAIARALIRDPRILLLDEATSALDADSETAVQRALETAAKGRTTITVAHRLSTIQKADVIYVFHDGRVVETGTHQELMDRGGRYSDLVSLQH", aalen: "1310", color: "#000000", domain: "–", homologue: "ABC transporter AstW (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00620.html' target='_blank'>FBGC00620</a>); identity: 48.5%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00664' target='_blank'>ABC_membrane</a>, <a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00005' target='_blank'>ABC_tran</a>",},{locus_tag: "ATEG_08172 / 13923...22372 (-)", protein_type: "highly reducing polyketide synthase", start: 13923, end: 22372, strand: "-", aaseq: "MTTNDCVDESHSIAGPGSTNGDSHTNGGNHSNGVTNGANHNSNGNHSNGFSNGATNGAVNGAAAEGIAIVGMAMRLPGGVKDASDFWNLLVEKRDGRVRVPADRYNVDAFYDESGKPGTVRTQYGNFLQEDLSHVDTSFFSMTRAETEKLDPQARLLLEVSREVLENAGETDWRGQRIGCYVGVFGEDWQDIHLKDSQDAGMYRVTGYGDFLLANRISYEYDMKGPSVTIKTGCSSSLISLHMACEAIANNECNAAIVAGSNLIMSPTMTIAMSEQGVLSPDAASINAIYVKRLSDAVRDGNPIQAVIRATASNCDGRTPGISHPSLESHEALMRAAYTAAGLENHAEMGFVECHGTGTSIGDPLEAQAVANVFGERGIYIGSCKPNVGHSEGASGVTGVIKGVLALQHQTIPPNINFQTPNPKLPFDKLKVPTEAIPWPQDRAQRVCVNSFGLGGANATVILDSAASHGFGRQPVAAQKKEELLVLSANHTKSLQQLVANTKEYLENNPDATVDLAYTLGVRREHLPFRTFLVTGDSFTEASPGVKPNVEQTLNFVFTGQGAQWVGMGRELLSHYPLVLHTIQQLDNTLQQLPARPSWSIEEELLAGGSTTEDEASAKIRTARFAKAEFAQPLCTAVQIAVVDLLQSWGITPSAVVGHSSGEIAAAYAANAITREEAIIAAFYRGLNTKLQTKQGAMAAIGLGKDGVLPFLIEGVVVACENSPESVTLSGDKEAVQKVVERIKQDLPGTFARELKVEMAYHSHHMEAIGGDYEASIDQLINAKKPEAKFYSSVTGELVNQKGFLGPAYWRANLESPVKFSTAVSALLKDSSGDQVFIEIGPHSALQGPLRQIFKACNASSSTYCSALVRNTRSTQSILQCVGQLFIRGVPVDFSAMAPGSVLTDLKPYPWHHEAAYWDESRISKEWRLRKFPHHEILGSRITDGSGLEPIWRNMLRTEECPWVRDHQISSDIIFPGAGYIAMAGEAIRQLTGAEDFTVREVTFASAMVISESQATEIITSVRPLRLTDSADSVWHEFSITSYNGASWTKHCSGQVRPGPDHELKAPALQALPRVVSSAKWYQAMRNVGLNYGPSFQGLDDICTGTTDMVAHASVSNAAHSGKGLYALHPSTIDMCVQLFSAAASYGQPRNLKLLSVPRAIDSLYIGRPEGQLDVEVQATATPRGMIMGTGVATSGGKVVLEINGLKLHPLEDSRSSRGSDPHAACRIHWQPHVDFLKPSDLIRQSEAGSQRQWYLPVERLALLCTIESSTQLKSLQPSETHLTKFQSWLERELDRTARGDNVLVEGPREIAAMTSDDRVAEINRLTEQILSTPTKAAAIALRRIFDALGAIFQGEKDPLELLLADDILAQLYNMGDRWDYADFLKAHCHAKPWLRILEIGAGTGGTTAKVLDLLSSHGERMYGLYSYTDISAGFFVEAKQRFANYSNIEYCVLDITKDPVEQGFEPGSYDIIIAANVLHATPKLSETLANVKSLLRPDGCLFLEELCSTANWLNYIMGTLPGWWLGEEDDRAWEPYVSPERWAQEMAAVGFGAPTVVYDDVAPYQASALLVSSPVATEDKQTRKTISLLCSNADQSPFVSEVETKLRNEGYIVERSTLAEMPKPRQDIVSVLDLQEPYLENISEERFQELVRFLQAIDAESGVLWVTRAIQMHCKDPRWAQSLGLTRTVRNELGVDMASLELDNLGGEASTAVVKVLQNFQRRVKSDDYDPDYEWALDNGKVHVGRFHWFSVNDTLSLTSADSKVPKRLEVAKRGFLETLGWVQQPTRVPDSDLVEIEVRAVGMNFKDVLIAQGIVDGHPSEGNGLGCECAGIVRQVGPEVQNVAVGDRVMTILIHSACGGIGIAAIQISQMIGATIYASVGTEEKIQHLVNTYGIPRSHIFSSRDASFLPDVLKATNGRGVDLVLNSLSGDLLHASWKCVASYGSMVEIGKRDFIGHGRLNMDTFEANRAFFGVDFAQICAERPDITQEILEECVRYYSEGSIRPITPVTYFPAEKIQDAFRFMQRGSHIGKIVVCMPEDSDALPTIGKQKQLDLRSDASYLLVGGLGGLGRAVSTWLVENGARNLVYLSRSAGQSTQDQLFFRELEAQGCSVQAFPGNVSVLSDVERAVQGARLPIAGILQMSMVLRDGKLDEMSISDWEAAVKPKVDGTWNLHKATQSIPLDFMVMFSSFSGLVGQRGQANYASANTFLDAFVQYRHANGLAASVLDIGPIEDIGYVSTNRMVLDQFKATNLHVLQETDLLETLHVAILSSMPGSSADGFVNDSQIGIGLRMTVPSQAPNNRCIWKRDRRMSVYRNIEQVEEVEDSGAAGLGLRQFLSEAQANPAMLKDDSSAEFLATELGRTLHGFLLIPVEDVDISRSITSMGVDSLVAIELRNWCRHKMGLEFTVLEILDLPNLKAFGQAAAQRLFSKYGGGEEHVRESFLTMKAP", aalen: "2453", color: "#FF0000", domain: "KS-AT-DH-MT-ER-KR-ACP", homologue: "polyketide synthase g433 (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00123.html' target='_blank'>FBGC00123</a>); identity: 51.2%", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://smart.embl.de/smart/do_annotation.pl?DOMAIN=SM00825' target='_blank'>PKS_KS</a>, <a class='funbgcs' href='http://smart.embl.de/smart/do_annotation.pl?DOMAIN=SM00827' target='_blank'>PKS_AT</a>, <a class='funbgcs' href='protfam.html#fPKS_DH' target='_blank'>fPKS_DH</a>, <a class='funbgcs' href='protfam.html#PKS_NRPS_MT' target='_blank'>PKS_NRPS_MT</a>, <a class='funbgcs' href='protfam.html#fPKS_ER' target='_blank'>fPKS_ER</a>, <a class='funbgcs' href='protfam.html#fPKS_KR' target='_blank'>fPKS_KR</a>, <a class='funbgcs' href='protfam.html#ACP_PCP' target='_blank'>ACP_PCP</a>",},{locus_tag: "ATEG_08173 / 24036...24927 (-)", protein_type: "transcription factor", start: 24036, end: 24927, strand: "-", aaseq: "MPLYSPPPIPVTTANQLATPQSLLETNRGFSPVANRAWVAGSNGAGHRISNTESPTTVDSDSLSLRYQYVLDHVRRAGFESFDAMVSGYYTSSFSKNSTAECAQKVSRAKRLRSVLRSLHKHSQEWTRWEARGFQEQVVEAAEDIYVAELDRVQRDSGLSMHGTMGKGQSLGELQRLYQNKAPNLWALFTELAGASSPQTEDATVLALTLLHSMKTNPESDIRETIIDLLDRLF", aalen: "234", color: "#929000", domain: "–", homologue: "–", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='protfam.html#TqaK' target='_blank'>TqaK</a>",},{locus_tag: "ATEG_08174 / 27376...29176 (-)", protein_type: "transcription factor", start: 27376, end: 29176, strand: "-", aaseq: "MVYCGPPSKACIACRRRKIGCDQNPRGCRQCARSRKPCPGYRDYIDCLFKDQTQWARRKVVAASNRSQSIPDTPNGDRPVKNDTPPAIGGDGPSIAAGKLRRSDSTSRCTSRDRDPVDMPHALALVPSIPTKLQDLGTTVFFRLYAQFRHADDSGVPCPAFFDYAGTVLSGDSANRIVSTCIEAVGLASVANMQQDTHIMARARRGYIAALRGVHNALRIPSEASNDTTLLAVMLLNLFEHINCSDSGFLDVWTQHVNGAALLVQLRGRRQLTYQTGLQLFEQFCQTLTSNCIQNGIPVPQYIVDLREQCAQYLDTKSIFWQISDATIKVAQLRSMVVLKRIDNPAQVLRKALDIDQELKVIEARLWIEMPYTTCSDSLDPRFHRGTYHLYPGVGALHAWNSLRIGRCLLHQLIRAQMLKGFSSIPPLFLTSYCTGLFETSLGTLLQAIDDILCSAPQPLGWTQGSPSMPKGSEQVSKSTLAGSKLLIWPFYVVIHISIKIGLFDHVDGIDGCMINVLEDAGRQTGILAATLLAKLLRQNQLRARFPDIIQNGFDMGELGSP", aalen: "562", color: "#929000", domain: "–", homologue: "–", hkg_homologue: "–", human_homologue: "–", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00172' target='_blank'>Zn_clus</a>, <a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF11951' target='_blank'>Fungal_trans_2</a>",},];



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
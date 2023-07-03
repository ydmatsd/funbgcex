const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const height = canvas.height;
const center = height/2;
const canvasWidth = 800;

BGClen = 10781;

geneList = [{locus_tag: "BDW43DRAFT_308692 / 1...1319 (-)", protein_type: "cytochrome P450 monooxygenase", start: 1, end: 1319, strand: "-", aaseq: "MFTLMQQTVDSVVGCDYSWRQVRLSDVVEEVVHTTALSMLLGSKLGHDNGFGIALKRFSISFGVAAVVIGLTPGPLKQIVAWPARTIVDFFRRRAYNYLTPLIHERFKVEERRRGDPDLDSRGPQDFITSVVRAILDDEKGTMEHIREIETLFTIIIMTLVTTTSLTLTNTLLDLLSSDPSLEYYQALRKEADSAFTSLDWSNVASPPKLDCIDSAIRESLRLHPTHTRGLFRTVVAEEGLALPDKHHIPQGCMMSIPVYWIHRDERFYKDPNTYIPFRFLLTDASDQRKPRGLVDTSDTFLSFSHGVYSCDGRFFAAQLMKMFLAYITMHYDVKPLDTRPPNVLLSDFCIPPRSVKLWIRRRNPETDLDLRP", aalen: "373", color: "#FF8AD8", domain: "–", homologue: "cytochrome P450 monooxygenase InaD (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00403.html' target='_blank'>FBGC00403</a>); identity: 35.0%", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF00067' target='_blank'>p450</a>",},{locus_tag: "BDW43DRAFT_308693 / 2740...4842 (+)", protein_type: "squalene-hopene cyclase/oxidosqualene cyclase", start: 2740, end: 4842, strand: "+", aaseq: "MSQTNETKTIRTTVYGSTATAPLLRKVQQALFLSAEYSKELMKPDGHWCGENKGNATITAEYVFLFQALGLDLDPNRQALISWLQSVQRSDGSWSLAPHYPGDISVTVEAYLALKILGVPAESRAMRKAKGFALRAGGVAKVRILTRITLAMFGLLPWAAVPEMPAELILAPANSPIGIYRLSSWARATVVPLLVVCHHRPIYGLPNGRSDSNTYLDELWCNPTEKTVPYSDTLWNLWAKDCVSFVFGVTDCILHSLNGLRRLNPLRGYAIRECIDWILKHQEKQGDLAGIMPPLYGALYALTLQGYALDSDPVRRGLKAIERFAFHDERGRRIQTTVSPVWDTIWMSVSLMDAGMAPDSPWIQRAMQWLRNRQNLTQPGDWQVYNPRLEPGAFSFEYFNTWYPDLDDTAVAVIAMIRQDTRLSHLPSITRALNWLVGMQNSDGGFGAFDKGNDKLFLNKCPFSDMNGLCDPSTADITGHVLEAFGQFIELNRKQRLKGMDAELLDRLMWASNRAINYLSRTQEPSGAWYGRWGCNYIYGTSGVLCGLAYFIGYREEHGQWRERDDGIADNVSDAIHWLMTIQNADGGWGETLHSYQDPLRAGSGSSTASQTAWALMALLSYLAPSANVIQRGIQYLIRTQTQCTTNGATWPEKYFTGTALPGYFYQGYALYPHYFPTLALGRYAQSLGQQPLREYNTQR", aalen: "700", color: "#945200", domain: "–", homologue: "oxidosqualene cyclase AfumA (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00466.html' target='_blank'>FBGC00466</a>); identity: 46.5%", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF13249' target='_blank'>SQHop_cyclase_N</a>, <a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF13243' target='_blank'>SQHop_cyclase_C</a>",},{locus_tag: "BDW43DRAFT_298489 / 5744...6638 (+)", protein_type: "Pyr4-like terpene cyclase", start: 5744, end: 6638, strand: "+", aaseq: "MDPTDANGQVTFESREAPLSVAVLGTGIAVCWLANYVGMLCKSYQDRTYAMALMPLCCNFAWELVHGFITPEKNGMWPAVYVCWSGLNVAVIYTAMKFAPNEWEHAPLVQRNIRYIFAISIVGWITVHLALVIHMGPHLAQGWGAMVCQLLLSAGALCQLLVRGSTRGTSFFLWATRFIGTSLCLPHEILRYHYGYTDVIFNSPLGWWGTAAFFILDVSYGICLWNIYKYEETHQIKGGGRQKTCMSGKD", aalen: "250", color: "#945200", domain: "–", homologue: "terpene cyclase DpmpB (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00204.html' target='_blank'>FBGC00204</a>); identity: 53.0%", pfam: "<a class='funbgcs' href='protfam.html#Pyr4' target='_blank'>Pyr4</a>",},{locus_tag: "BDW43DRAFT_298490 / 7292...9002 (+)", protein_type: "FAD-dependent monooxygenase", start: 7292, end: 9002, strand: "+", aaseq: "MEVPRFKVIVVGGSIAGLTLAHCLYKAGIDCIVLEKRHEIAPQEGASVAILPNGGRILAQLGLYDAVAGLIEPLYLSHVRYPDGFYFTSDYPTTLQQRFGFGLAFVERQQLLQILYSFFPQKASIHTNKAVVRLTQLEGGAVAVYTQDGSCYAGDMVVGADGIHSCVRTEMWRLADLRRPGLVTKQEKSGLTAEYACIFGISSTIPGLKVGHQITSVDKGRSIIVVPARHGRLFWFVVLKLDTAYRYDSAPRFSPPDAAKLCEQLKDLLITENIDFGRLWLARETYSVTLLEENVFQTWHFGRIVCIGDNMHKMTPNLGQGANCAIEDAAALANELHRALGCASLDHQLSDMEIDGLLDRFSKMQFARVRRIFQASRIVVRMHTSDNPLYRLVLRYYVPYAGKKPMELMLKLLADATALCFIPLPQRCGAGWPKLTYGGMQQKNFK", aalen: "446", color: "#008F01", domain: "–", homologue: "FAD-dependent monooxygenase SetG (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FBGC00030.html' target='_blank'>FBGC00030</a>); identity: 52.8%", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF01494' target='_blank'>FAD_binding_3</a>",},{locus_tag: "BDW43DRAFT_308695 / 9549...10781 (-)", protein_type: "acetyltransferase", start: 9549, end: 10781, strand: "-", aaseq: "MTYTQGTSPWRRLYFILALCLVYLQTKSLAPLIADPPIKAVVYMHAFLHAFHILNLLLILKVDNLDYQKKILAQPCESRGKNLLSALYLLLSYRGIQTKWQAKNTPMFPLYFSGRATICSLRFCLRQCVISLWQLVVFGHLVLASQQLVPAKTTCGYILAALVDHSGLNIGLWVVMWVTLARIVIDSTYRLASVVFVATGICAPETWPPFFNSVFDAWTLRRFWGRYWHQLLRWPFTAAATIFVENICRLSKPGLLERYLRVFCVFTLSGVLHSIFDICIGVPLQESGAFRFFCGFTLGFMIEDGVQSLWAHMLGKSKGLALESEERIEAEVDGGKTATPLWQKVVGYIWVCTWLSMTTGPYIQPLFSRLCQHGVADDFVRFIELVNHSASMKDVSIAALCIWLTFGPFM", aalen: "410", color: "#76D6FF", domain: "–", homologue: "acetyltransferase AtnC (<a class='funbgcs' href='http://staffweb1.cityu.edu.hk/ymatsuda/funbgcs/funbgcs/FPROT00019.html' target='_blank'>FPROT00019</a>); identity: 35.2%", pfam: "<a class='funbgcs' href='http://www.ebi.ac.uk/interpro/entry/pfam/PF13813' target='_blank'>MBOAT_2</a>",},];



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
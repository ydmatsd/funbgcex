const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const height = canvas.height;
const center = height/2;
const canvasWidth = 800;

BGClen = bgcLENGTH;

geneList = [];


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
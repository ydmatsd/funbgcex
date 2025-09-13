function Filter() {
  const input = document.getElementById("search");
  const filter = input.value.toUpperCase();
  const table = document.getElementById("bgcTable");
  const tr = table.getElementsByTagName("tr");
  let count = 0; // Initialize count variable
  for (i = 0; i < tr.length; i++) {
    if (i === 0) {
      continue; // Skip the header row
    }
    let display = false;
    for (j = 0; j < tr[i].cells.length; j++) {
      let td = tr[i].cells[j];
      if (td) {
        let txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          display = true;
          break;
        }
      }
    }
    if (display) {
      tr[i].style.display = "";
      count++; // Increment count variable
    } else {
      tr[i].style.display = "none";
    }
  }
}
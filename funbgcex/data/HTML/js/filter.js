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
  document.getElementById("count").innerHTML = count + " BGCs found"; // Display count
}


window.addEventListener('load', function () {
  let column_no = 0;
  let column_no_prev = 0;
  
  document.querySelectorAll('#bgcTable th').forEach(elm => {
    elm.onclick = function () {
      column_no = this.cellIndex;
      let table = this.parentNode.parentNode.parentNode;
      let sortType = 0;
      let sortArray = [];

      for (let r = 1; r < table.rows.length; r++) {
        let column = {};
        column.row = table.rows[r];
        column.value = table.rows[r].cells[column_no].textContent;

        if (column_no == 5) {
          if (column.value == "–") {
            column.value = 0;
          }
        }

        sortArray.push(column);

        if (isNaN(Number(column.value))) {
          sortType = 1;
        }
      }

      if (column_no === 0) {
        if (column_no_prev == column_no) {
          sortArray.sort(compareBGCDesc);
        } else {
          sortArray.sort(compareBGC);
        }
      } else {
        if (sortType == 0) {
          if (column_no_prev == column_no) {
            sortArray.sort(compareNumberDesc);
          } else {
            sortArray.sort(compareNumber);
          }
        } else {
          if (column_no_prev == column_no) {
            sortArray.sort(compareStringDesc);
          } else {
            sortArray.sort(compareString);
          }
        }
      }

      let tbody = this.parentNode.parentNode;
      for (let i = 0; i < sortArray.length; i++) {
        tbody.appendChild(sortArray[i].row);
      }

      column_no_prev = (column_no_prev == column_no) ? -1 : column_no;
    };
  });
});

function compareBGC(a, b) {
  const numA = parseInt(a.value.replace('BGC', ''), 10);
  const numB = parseInt(b.value.replace('BGC', ''), 10);
  
  return numA - numB;
}

function compareBGCDesc(a, b) {
  const numA = parseInt(a.value.replace('BGC', ''), 10);
  const numB = parseInt(b.value.replace('BGC', ''), 10);

  return numB - numA;
}

function compareNumber(a, b) {
  return a.value - b.value;
}

function compareNumberDesc(a, b) {
  return b.value - a.value;
}

function compareString(a, b) {
  return a.value.localeCompare(b.value);
}

function compareStringDesc(a, b) {
  return b.value.localeCompare(a.value);
}
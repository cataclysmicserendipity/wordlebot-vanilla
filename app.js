document.getElementById("rows").addEventListener("click", (e) => {
  console.log(e);
  const box = e.target;
  if (box.classList.contains("invalid")) {
    box.classList.remove("invalid");
    box.classList.add("valid");
  } else if (box.classList.contains("valid")) {
    box.classList.remove("valid");
    box.classList.add("possible");
  } else if (box.classList.contains("possible")) {
    box.classList.remove("possible");
    box.classList.add("invalid");
  }
});

function makeRow() {
  let rows = document.getElementById("rows");
  let row = document.createElement("div");
  row.className = "row";
  for (let i = 0; i < 5; i++) {
    let box = document.createElement("input");
    box.className = "box invalid";
    box.type = "text";
    box.dataset.column = i;
    row.appendChild(box);
  }
  rows.appendChild(row);
}
document.getElementById("rowbutton").addEventListener("click", (e) => {
  e.preventDefault();
  makeRow();
});
makeRow();

let possible = [];

document.getElementById("go").addEventListener("click", (e) => {
  e.preventDefault();

  const boxArray = document.getElementsByClassName("box");

  possible = words;

  for (let i = 0; i < boxArray.length; i++) {
    console.log(`testing box ${i}`);
    if (boxArray[i].classList.contains("valid")) {
      let letter = boxArray[i].value.toLowerCase();
      let column = boxArray[i].dataset.column;
      possible = possible.filter((word) => letter === word[column]);
    }
  }
  for (let i = 0; i < boxArray.length; i++) {
    if (boxArray[i].classList.contains("invalid")) {
      let letter = boxArray[i].value.toLowerCase();
      for (let j = 0; j < possible.length; j++) {
        if (contains(possible[j], letter)) {
          possible.splice([j], 1);
          j--;
        }
      }
    }
  }
  for (let i = 0; i < boxArray.length; i++) {
    if (boxArray[i].classList.contains("possible")) {
      let letter = boxArray[i].value.toLowerCase();
      for (let j = 0; j < possible.length; j++) {
        if (contains(possible[j], letter) === false) {
          possible.splice([j], 1);
          j--;
        }
      }
      let column = boxArray[i].dataset.column;
      possible = possible.filter((word) => letter !== word[column]);
    }
  }

  let resultDiv = document.getElementById("possible");
  while (resultDiv.firstChild) {
    resultDiv.removeChild(resultDiv.firstChild);
  }
  textNode = document.createTextNode(possible);
  resultDiv.appendChild(textNode);
});

function contains(word, letter) {
  for (let i = 0; i < word.length; i++) {
    if (letter === word[i]) {
      return true;
    }
  }
  return false;
}

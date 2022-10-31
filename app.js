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

document.getElementById("rowbutton").addEventListener("click", (e) => {
  e.preventDefault();
  let rows = document.getElementById("rows");
  let row = document.createElement("div");
  row.className = "row";
  for (let i = 0; i < 5; i++) {
    let box = document.createElement("input");
    box.className = "box invalid";
    box.type = "text";
    row.appendChild(box);
  }

  rows.appendChild(row);
});

let possible = [];

document.getElementById("go").addEventListener("click", (e) => {
  e.preventDefault();

  let box1 = document.getElementById("box1");
  let box2 = document.getElementById("box2");
  let box3 = document.getElementById("box3");
  let box4 = document.getElementById("box4");
  let box5 = document.getElementById("box5");

  let boxArray = [box1, box2, box3, box4, box5];

  possible = words;

  for (let i = 0; i < boxArray.length; i++) {
    console.log(`testing box ${i}`);
    if (boxArray[i].classList.contains("valid")) {
      console.log(`this box is valid`);
      let letter = boxArray[i].value.toLowerCase();
      possible = possible.filter((word) => letter === word[i]);
    }
  }
  for (let i = 0; i < boxArray.length; i++) {
    if (boxArray[i].classList.contains("invalid")) {
      let letter = boxArray[i].value.toLowerCase();
      console.log(`${i} is invalid`);
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
    }
  }
  console.log(possible);

  let resultDiv = document.getElementById("possible");
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

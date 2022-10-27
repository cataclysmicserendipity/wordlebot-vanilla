const boxes = document.getElementsByClassName('box')
  for (let i = 0; i < boxes.length; i++){
      boxes[i].addEventListener('click', (e) => {
          console.log(e)
          const box = e.target;
          if (box.classList.contains('invalid')) {
              box.classList.remove('invalid');
              box.classList.add('valid')
          } else if (box.classList.contains('valid')) {
              box.classList.remove('valid');
              box.classList.add('possible');
          } else if (box.classList.contains('possible')) {
              box.classList.remove('possible');
              box.classList.add('invalid');
          }
      })
  }

const possible = [];

document.getElementById('go').addEventListener('click', (e) => {
    e.preventDefault()

    let box1 = document.getElementById('box1')
    let box2 = document.getElementById('box2')
    let box3 = document.getElementById('box3')
    let box4 = document.getElementById('box4')
    let box5 = document.getElementById('box5')

    let boxArray = [box1, box2, box3, box4, box5];

    for (let i = 0; i < boxArray.length; i++) {
        if (boxArray[i].classList.contains('valid') && possible.length === 0) {
            for (let j = 0; j < words.length; j++) {
                if (words[j][i] === boxArray[i].value) {
                    possible.push(words[j]);
                }
            }
        } else if (boxArray[i].classList.contains('valid') && possible.length > 0) {
            for (let j = 0; j < possible.length; j++) {
                if (possible[j][i] !== boxArray[i].value) {
                    possible.splice(j,1);
                }
            }
        } 
    }
    for (let i = 0; i < boxArray.length; i++) {
        if (boxArray[i].classList.contains('invalid') && possible.length === 0) {
            for (let j = 0; j < words.length; j++) {
                if (contains(words[j], boxArray[i].value) === false) {
                    possible.push(words[j]);
                } 
                }

            } else if (boxArray[i].classList.contains('invalid') && possible.length > 0) {
            for (let j = 0; j < possible.length; j++) {
                if (contains(possible[j], boxArray[i].value)) {
                    possible.splice([j],1);
                }

            }
        }
    } 
    console.log(possible)

});



function contains(word, letter) {
    for (let i = 0; i < word.length; i++) {
        if (letter === word[i]) {
            return true;
        } else {
            return false;
        }
        
    }
}








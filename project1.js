
//CONSTANTS
const images = {
    bear: 'imgs/bear.png',
    beaver: 'imgs/beaver.png',
    crow: 'imgs/crow.png',
    frog: 'imgs/frog.png', 
    hedgehog: 'imgs/hedgehog.png',
    owl: 'imgs/owl.png',
    rabbit: 'imgs/rabbit.png',
    squirrel: 'imgs/squirrel.png',
    wolf: 'imgs/wolf.png',
    fox: 'imgs/fox.png',
}


const cardDeck = [];


//STATE
let board, turn = 0, winner;
let timer = false;
let announcementDefault = "Pick a Card";
let matchMessage = "It's a match!";
let lossMessage = "Game over";
let loss = null;
// let announcementDefault



//CACHED ELEMENTS
const imgEls = document.querySelectorAll('img');
const announcementEl = document.querySelector('h1');
const guessLogEl = document.querySelector('h3');



//EVENT LISTENERS
imgEls.forEach(function(imgEl) {
  imgEl.addEventListener('click', handleMove)
})




//FUNCTIONS

init();

//Initialise all state variables, then call render
function init() {
    board = [];
    const originalDeck = animalKeysToArray(images);
    // const originalDeck = buildOriginalDeck(animals);
    const shuffledDeck = getNewShuffledDeck(originalDeck);
    const srcValues = getSrcValues(board);
    // setdivElAttributes(srcValues);
    const allocatedImgClasses = allocateImgClasses(imgEls)
    // console.log(board); // Log the shuffled deck
    // console.log(srcValues);
    displayMessage();
    displayIncorrectGuessCounter();
 }



function animalKeysToArray(arr) {
    const originalDeck = [];
    for (const key in arr) {
        const animal1 = key; 
        const animal2 = key; 
        originalDeck.push(animal1, animal2)
    } 
    return originalDeck
} 





// Example usage:

function getNewShuffledDeck(originalDeck) {
  // Create a copy of the originalDeck (leave originalDeck untouched!)
  const tempDeck = [...originalDeck];
  
  while (tempDeck.length) {
    
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    
    board.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return board;
  
}

function allocateImgClasses(imgEls, idx) {
   imgEls.forEach(function(imgEl, idx) {
   imgEl.className = board[idx];
    
   });
   console.log(imgEls)
}


function getSrcValues(arr) { 
  return arr.map(function(animal) {
        return images[animal]
  });
}  


let matchedCardClasses = [];
let firstImgClass = null;
let previousImgId = null;


function handleMove(evt, srcValues) {
       
  if (timer === true) {
        return;
    } 

    if (loss) {
      displayLoss();
      return; 
    }
       
  const clickedImg = evt.target;
  console.log(clickedImg)
  // if (previousImgId === clickedImg.id) {
  //   return;
  // }  
  // previousImgId = clickedImg.id;

  clickedImg.src = images[clickedImg.className];
  const clickedImgClass = clickedImg.className;
  clickedImg.classList.add('animate__animated', 'animate__flipInY');
  
  if (firstImgClass === null) {
    firstImgClass = clickedImgClass;
      } else if (firstImgClass === clickedImgClass) {
    matchedCardClasses.push(firstImgClass);
    displayMatch();
    firstImgClass = null;
    
  } else {
    timer = true;
    setTimeout(function() {
      timer = false;
      imgEls.forEach(function(imgEl) {
        if (!matchedCardClasses.includes(imgEl.className.toLowerCase()) ) {
          imgEl.classList.remove('animate__animated', 'animate__flipInY');
          console.log(imgEl.src)
          if(imgEl.src = images[imgEl.className]) {
            imgEl.src = "imgs/Card_default.png";
            imgEl.classList.add('animate__animated', 'animate__flipInY');
          } 
        }
      });
    }, 1000)
    firstImgClass = null;
    turn++;
    console.log("turncounter: "+turn);
    displayIncorrectGuessCounter();
    loss = lossChecker();
    console.log(loss);
    }
  console.log(matchedCardClasses);
  }
        
  function displayMessage() {
    announcementEl.innerHTML = announcementDefault;
   }  

  //  function displayGuesses() {
  //   guessLogEl.innerHTML = ;
  //  }

  function displayMatch() {
    announcementEl.innerHTML = matchMessage;
    setTimeout(function() {
      announcementEl.innerHTML = announcementDefault;
    
  }, 1500)
  }

  function displayLoss() {
    if (loss) {
      announcementEl.innerHTML = lossMessage;
    } return;
    }

    function lossChecker() {
      if (turn > 20) {
        return true;
      } else {
        return null;
      }
    }

    function displayIncorrectGuessCounter() {
      guessLogEl.innerHTML = `Incorrect guesses: ${turn}`;
    }

    
  
  function setImgElAttributes(srcValues) { 
  imgEls.forEach(function(imgEl, idx) {
    imgEl.src = srcValues[idx];
    console.log(imgEl);
 });
}

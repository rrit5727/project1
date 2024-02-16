
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
let board, incorrectGuesses = 0;
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
    const shuffledDeck = getNewShuffledDeck(originalDeck);
    
    const allocatedImgClasses = allocateImgClasses(imgEls)
    displayMessage();
    displayIncorrectGuessCounter();
  }
  console.log("board: " + board)
  
//take animals from image array, duplicate, allocate to array for original deck
function animalKeysToArray(arr) {
    const originalDeck = [];
    for (const key in arr) {
        const animal1 = key; 
        const animal2 = key; 
        originalDeck.push(animal1, animal2)
    } 
    return originalDeck
} 

//copy the original deck, shuffle, push each random selection to the board
function getNewShuffledDeck(originalDeck) {
    // Create a copy of the originalDeck 
      const tempDeck = [...originalDeck];
      
      while (tempDeck.length) {
          const rndIdx = Math.floor(Math.random() * tempDeck.length);
          board.push(tempDeck.splice(rndIdx, 1)[0]);
      }
      return board;
      
      }


//Allocates animal-specific class name based on the board to 
//the image elements - used in checking matches and allocating 
//image src attributes later on - this effectively 'renders' the animal positions in the 
// board to the image elements in HTML - doersn't actually render though
function allocateImgClasses(imgEls, idx) {
   imgEls.forEach(function(imgEl, idx) {
   imgEl.className = board[idx];
    
   });
   console.log(imgEls)
}


//initialise variables for the event handler 
//could be put in the function but it aint broke so...
let matchedCardClasses = [];
let firstImgClass = null;
let previousImgId = null;


//////////event handler//////////
function handleMove(evt) {
  //guard against selecting 3 cards in a row  
    if (timer === true) {
        return;
    } 

  //guard preventing further play if loss condition is true
    if (loss) {
        displayLoss();
        return; 
    }
      
  const clickedImg = evt.target;

  //guard against selecting the same card twice
  if (previousImgId === clickedImg.id) {
    return;
  }
  
  previousImgId = clickedImg.id;

  const clickedImgClass = clickedImg.className;
  //this changes the clicked image's src attribute 
  //by looking up its classname in the images array
  clickedImg.src = images[clickedImgClass];
  //1st click branch of the handler - stores the 1st click's class 
      if (firstImgClass === null) {
          firstImgClass = clickedImgClass;
  //match branch of the handler code block
      } else if (firstImgClass === clickedImgClass) {
          matchedCardClasses.push(firstImgClass);
          displayMatch();
          firstImgClass = null;
  
  //'Not a match' branch of the code block
      } else {
          timer = true;
          setTimeout(function() {
              timer = false;
              previousImgId = null;
              imgEls.forEach(function(imgEl) {
    //this ensures that matched cards stay face-up
                  if (!matchedCardClasses.includes(imgEl.className.toLowerCase()) ) {
                      imgEl.src = "imgs/Card_default.png";
                  }
              });
          }, 1000)
          firstImgClass = null;
          incorrectGuesses++;
          console.log("incorrectGuessescounter: "+incorrectGuesses);
          displayIncorrectGuessCounter();
          loss = lossChecker();
          console.log(loss);
        }
  console.log("matchedCardClasses " + matchedCardClasses);
  }
        
  function displayMessage() {
      announcementEl.innerHTML = announcementDefault;
    }  

  
  function displayMatch() {
    announcementEl.innerHTML = matchMessage;
    setTimeout(function() {
      announcementEl.innerHTML = announcementDefault;
    
  }, 1500)
  }

  //checks if the loss value is true, 
  //if so, logs a loss message to the h1 element
  function displayLoss() {
    if (loss) {
      announcementEl.innerHTML = lossMessage;
    } return;
    }

  //checks if the number of guesses > 10 
  //if so, update loss variable to true
    function lossChecker() {
      if (incorrectGuesses > 4) {
        return true;
      } else {
        return null;
      }
    }

    function displayIncorrectGuessCounter() {
      guessLogEl.innerHTML = `Incorrect guesses: ${incorrectGuesses}`;
    }

    
  
  


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
let board, turn, winner;




//CACHED ELEMENTS
const imgEls = document.querySelectorAll('main > img')
// console.log(imgEls)



//EVENT LISTENERS
document.querySelector('main').addEventListener('click', handleMove);




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





// function buildOriginalDeck(animals) {
//     const originalDeck = {};
//     animals.forEach(function(animal, index) {
//         const card1 = 'card' + (index * 2 + 1); // Generate 'card1', 'card3', 'card5', ...
//         const card2 = 'card' + (index * 2 + 2); // Generate 'card2', 'card4', 'card6', ...
//         originalDeck[card1] = animal + '1';
//         originalDeck[card2] = animal + '2';
//     });
//     return originalDeck;
// }


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
  const clickedImg = evt.target;

  if (previousImgId === clickedImg.id) {
    return;
  }  
   previousImgId = clickedImg.id;

  clickedImg.src = images[clickedImg.className];
  const clickedImgClass = clickedImg.className;
  if (firstImgClass === null) {
    firstImgClass = clickedImgClass;
  } else if (firstImgClass === clickedImgClass) {
    matchedCardClasses.push(firstImgClass);
    console.log("Classes Match!");
    firstImgClass = null;
  } else {
    setTimeout(function() {
      imgEls.forEach(function(imgEl) {
        if (!matchedCardClasses.includes(imgEl.className.toLowerCase()) ) {
        imgEl.src = "imgs/Card_default.png";
        }
      });
    }, 1000)
    firstImgClass = null;
    }
  console.log(matchedCardClasses);
}


    
    




function setImgElAttributes(srcValues) { 
  imgEls.forEach(function(imgEl, idx) {
    imgEl.src = srcValues[idx];
    console.log(imgEl);
 });
}

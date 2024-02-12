
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
}


const cardDeck = [];


//STATE
let board, turn, winner;




//CACHED ELEMENTS
const divEls = document.querySelectorAll('main > div')
console.log(divEls)



//EVENT LISTENERS





//FUNCTIONS

init();

//Initialise all state variables, then call render
function init() {
    board = [];
    const originalDeck = animalKeysToArray(images);
    // const originalDeck = buildOriginalDeck(animals);
    const shuffledDeck = getNewShuffledDeck(originalDeck);
    const srcValues = getSrcValues(board);
    setdivElAttributes(srcValues);
    console.log(originalDeck); // Log the original deck
    console.log(board); // Log the shuffled deck
    console.log(srcValues);
    console.log(divEls)
 }


// function buildOriginalDeck() {
//     const deck = []
//     images.forEach(animal){
//         deck.push({
//             animal: `${animal}`
//         })
//     }

// }

function animalKeysToArray(arr) {
    const originalDeck = [];
    for (const key in arr) {
        const animal1 = key + '1';
        const animal2 = key + '2';
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

function getSrcValues(arr) { 
  return arr.map(function(animal) {
    const animalWithoutIdentifier = animal.slice(0, -1);
        return images[animalWithoutIdentifier]
  });
}  


function setdivElAttributes(srcValues) { 
    divEls.forEach(function(divEl, idx) {
     divEl.src = srcValues[idx]
});
}



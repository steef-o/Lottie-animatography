"use strict";

// Get users input from input-field in DOM.
const userInput = document.querySelector('#input');

// Array for storing user input
let characterArray = [];

// Dynamic delete index.
let deleteIndex = 1;

// Get parentNode of characters (Character wrapper div)
const parentNode = document.querySelector(".character-wrapper");

// Listen for user input.
userInput.addEventListener('keydown', matchCharacter);


function matchCharacter(e) {
    switch (e.key) {
        // Special case.
        case 'Shift':
            break;
        case 'Space':
            // Adds Empty div to DOM and space (' ') to array.
            createSpace();
            break;
        case 'Backspace':
                //Check If Input field is empty
               if(characterArray.length !== 0)
                   removeCharacter();
            break;
        default:
            // Adds new character to DOM and array.
            createNewCharacter(e.key);
    }
}

/*Loads animation*/
function loadAnimation(character, targetDiv) {
    // create instance of lottie animation object.
    const animation = lottie.loadAnimation({
            container: targetDiv,
            render: 'svg',
            loop: false,
            autoplay: false,
            // checks if character is uppercase or lowercase and selects correct files from external .json files.
            //@TODO create separate function for this logic.
            path: character.toString() === character.toString().toUpperCase() ?`./alphabet/Uppercase/${character}.json` : `./alphabet/Lowercase/${character}.json`
    });
    // add character object to characterArray.
    characterArray.push({
        text: character,
        animationReference: animation
    });
    // wait for animation to be loaded from external .json
    animation.addEventListener('data_ready',function(){
        // plays animation from frame to frame.
        animation.playSegments([[0,72]],true);
    });
}

// Adds new Character to dom and loads animation
function createNewCharacter(character) {
    let newDiv = document.createElement("div");
    newDiv.className = "character";
    parentNode.appendChild(newDiv);
    loadAnimation(character, newDiv);
}


// Adds Empty div to DOM and push object with text set to(' ') to array.
function createSpace() {
    characterArray.push({
        text:' ',
        animationReference: null
    });
    let emptyDiv = document.createElement("div");
    emptyDiv.className = "space";
    parentNode.appendChild(emptyDiv);
}

/*
 * Removes character and plays out-animation.
 * DeleteIndex changes dynamically, to support user backspacing past characters that have not yet
 * completed their out-animation.
 * */
function removeCharacter() {
    // Get Animation reference
    let animation = characterArray[characterArray.length - deleteIndex].animationReference;

    // Update dynamic deleteIndex, increases when user press backspace.
    deleteIndex < (characterArray.length - 1)? deleteIndex++: deleteIndex;

    //Check if out-animation is completed.
    animation.addEventListener('complete', () => {

        // Remove object from array.
        characterArray.splice(-1,1);

        //Remove object from DOM.
        parentNode.lastElementChild.remove();

        // Update dynamic deleteIndex, decreases when object have finished out animation.
        deleteIndex > 1? deleteIndex--: deleteIndex;
    });
    // Play out-animation.
    animation.playSegments([[73,100]],true);
}

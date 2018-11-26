"use strict";

// Get users input from input-field in DOM.
const userInput = document.querySelector('#input');

// Array for storing user input.
const characterArray = [];

// Array for Utility animations.
const utilArray = [];

/* Dynamic delete index.
* Increases when users press backspace
* Decreases when out-animation is finished.
* Default: 1*/
let deleteIndex = 1;

// Get parentNode of characters (character-wrapper div).
const parentNode = document.querySelector(".character-wrapper");

// Listen for user input.
userInput.addEventListener('keydown', matchCharacter);

// Initialize caret animation.
const caret = new Caret();

// Set animation to Idle animation state.
caret.idleCaret();

function matchCharacter(e) {
    switch (e.key) {
        // Special case.
        case 'Shift':
            // This case is supposed to be empty.
            break;

        //Space
        case ' ':
            // Adds Empty div to DOM and space (' ') to array.
            createSpace();
            break;

        case 'Backspace':
                //Check if input field is empty.
               if(characterArray.length !== 0)
                   removeCharacter();
                   caret.moveCaretBackwards();
            break;

        // Add character.
        default:
            // RegEx check that users are inputing valid characters that have a corresponding animation.
            let regex = new RegExp("^([a-zA-z0-9])$");
            if(regex.test(e.key)){
                createNewCharacter(e.key);
                caret.moveCaretForward();
            } else {
            // Do nothing, give user feedback in console.
            console.log(e.key,"was entered and is an invalid input value, please enter a valid input value within the range: (A-Z, a-z ,0-9, 'Spacebar')");
            }
    } // End switch
}

// Adds empty div to DOM and push object with text set to (' ') to array.
function createSpace() {
    let emptyDiv = document.createElement("div");
    characterArray.push({
        text:' ',
        animationReference: null
    });
    emptyDiv.className = "character space";
    parentNode.insertBefore(emptyDiv, document.querySelector('.caret-wrapper'));
}

// Adds new Character to DOM and runs loadCharacterAnimation function.
function createNewCharacter(character) {
    let newDiv = document.createElement("div");
    // newDiv.className = "character " + RandomColor.createRandomColor();
    newDiv.className = "character ";
    parentNode.insertBefore( newDiv, document.querySelector('.caret-wrapper'));
    loadCharacterAnimation(character, newDiv);
}

function loadCharacterAnimation(character, targetDiv) {
    // create instance of lottie animation object.
    const animation = lottie.loadAnimation({
            container: targetDiv,
            render: 'svg',
            loop: false,
            autoplay: false,
            path: _findJSONPath(character)
    });
    // add character object to characterArray.
    characterArray.push({
        text: character,
        animationReference: animation
    });
    // wait for animation to be loaded from external .JSON
    animation.addEventListener('data_ready',function(){
        // plays animation from frame to frame.
        animation.playSegments([[0,72]],true);
    });

    // Listen for animation to finish.
    animation.addEventListener('complete', function(){
        caret.idleCaret();
    });
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
    deleteIndex <= (characterArray.length) ? deleteIndex++ : deleteIndex;

    if(animation === null) {
        _remove();
    } else {
        //Check if out-animation is completed.
        animation.addEventListener('complete', _remove);

        // Play out-animation.
        animation.playSegments([73,100],true);

        // Set custom speed for out-animation.
        animation.setSpeed(2.5);
    }
}

// help method: removes object from array and DOM
function _remove() {
    // Gets nodelist of all nodes with class .character
    let childNodes = parentNode.querySelectorAll('.character');

    // Finds last node in nodelist.
    let lastChild = childNodes[childNodes.length - 1];

    // Remove object from array.
    characterArray.splice(-1, 1);

    //Remove object from DOM.
    parentNode.removeChild(lastChild);

    // Update dynamic deleteIndex, decreases when object have finished out animation.
    deleteIndex > 1 ? deleteIndex-- : deleteIndex;

    // Set caret to idle animation state.
    caret.idleCaret();
}

// Help function for finding correct character animation .JSON path.
// Note: Numbers are included in Uppercase Character path.
function _findJSONPath(character) {
    if(character.toString() === character.toString().toUpperCase()){
        return `./alphabet/Uppercase/${character}.json`
    }else{
        return `./alphabet/Lowercase/${character}.json`
    }
}

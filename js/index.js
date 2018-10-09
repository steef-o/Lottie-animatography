
const userInput = document.querySelector('#input');
let textInputArray = [];
userInput.addEventListener('keydown', matchCharacter);

function matchCharacter(e) {
    let userInputValue = e.key;
    const currentDiv = document.querySelector(".character-wrapper");
    let lastChar = userInputValue.length - 1;
     console.log("e",e);

    switch (e.key) {
        case 'Shift':
            break;
        case 'Space':
            textInputArray.push(" ");
            let emptyDiv = document.createElement("div");
            emptyDiv.className = "space";
            currentDiv.appendChild(emptyDiv);
            break;
        case 'Backspace':
            console.log("backspace");
            textInputArray.splice(-1,1);
            currentDiv.lastElementChild.remove();
            break;
        default:
            textInputArray.push(userInputValue[lastChar]);
            let newDiv = document.createElement("div");
            newDiv.className = "character";
            currentDiv.appendChild(newDiv);
            console.log("textInput array last element",textInputArray.slice(-1));
            loadAnimation(textInputArray.slice(-1), newDiv, false);
    }

    console.log("textInputArray: ",textInputArray);
}

function loadAnimation(character, targetDiv, remove) {
    const animation = bodymovin.loadAnimation({
            container: targetDiv,
            render: 'svg',
            loop: false,
            autoplay: false,
            // @todo: handle space in path
            path: character.toString() === character.toString().toUpperCase() ?`./alphabet/Uppercase/${character}.json` : `./alphabet/Lowercase/${character}.json`
            });

    if(remove){
        animation.goToAndPlay(72,isFrame);
        //@todo - fix outro animation and keep animation reference.
    } else{
        animation.addEventListener('data_ready',function(){
            animation.playSegments([0,72],true);
        });
    }
}




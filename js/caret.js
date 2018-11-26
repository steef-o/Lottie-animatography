
class Caret {
    constructor() {
        const caret = lottie.loadAnimation({
            container: document.querySelector('.caret-wrapper'),
            render: 'svg',
            loop: false,
            autoplay: true,
            path: `./alphabet/caret.json`
        });
        caret.addEventListener('data_ready', function () {
            // plays animation from frame to frame.
            caret.playSegments([0, 30], true);
        });

        utilArray.push({
            animationReference: caret,
        })
    }

     idleCaret(){
        let animation = utilArray[0].animationReference;
        animation.playSegments([0,30],true);
        animation.loop = true;
    }

     moveCaretForward(){
        let animation = utilArray[0].animationReference;
        animation.playSegments([30,52],true);
    }

     moveCaretBackwards(){
        let animation = utilArray[0].animationReference;
        animation.playSegments([[51,73],[0,1]],true);
    }
}
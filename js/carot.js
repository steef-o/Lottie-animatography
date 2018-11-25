
class Carot {
    constructor() {
        const carot = lottie.loadAnimation({
            container: document.querySelector('.carot-wrapper'),
            render: 'svg',
            loop: false,
            autoplay: true,
            path: `./alphabet/carot.json`
        });
        carot.addEventListener('data_ready', function () {
            // plays animation from frame to frame.
            carot.playSegments([0, 30], true);
        });

        utilArray.push({
            animationReference: carot,
        })
    }

     idleCarot(){
        let animation = utilArray[0].animationReference;
        animation.playSegments([0,30],true);
        animation.loop = true;
    }

     moveCarotForward(){
        let animation = utilArray[0].animationReference;
        animation.playSegments([30,52],true);
    }

     moveCarotBackwards(){
        let animation = utilArray[0].animationReference;
        animation.playSegments([[51,73],[0,1]],true);
    }
}
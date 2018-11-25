
class RandomColor {

static createRandomColor(){
let randomNumber = Math.floor((Math.random() * 10) + 1);
        switch (randomNumber) {
            case 1:
                return "red";
            case 2:
                return "green";
            case 3:
                return "blue";
            case 4:
                return "yellow";
            case 5:
                return "brown";
            case 6:
                return "orange";
            case 7:
                return "cyan";
            case 8:
                return "magenta";
            case 9:
                return "turquoise";
            default:
                return "pink";
        }
    }
}



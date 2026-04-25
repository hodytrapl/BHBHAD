class Methods{
    constructor(){}

    randomInt(max=10){
        return Math.floor(Math.random()*max)
    }
    sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }
}
console.log("Methods loaded")
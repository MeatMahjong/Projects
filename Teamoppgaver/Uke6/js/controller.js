function buyCoke() {
    cokesInStore--;
    isCokeInDelivery = true;
    updateView();
}

function insertCoin(value){
    const index = 
        value == 1 ? 0 : 
        value == 5 ? 1 : 
        value == 10 ? 2 : 
        value == 20 ? 3 : 
        null;
    coinsInserted[index]++;
    updateView();
}

function returnCoins(){
    coinsReturned = [...coinsInserted];
    coinsInserted = [0,0,0,0];
    updateView();
}
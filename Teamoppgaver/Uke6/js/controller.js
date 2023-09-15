function buyCoke() {
    let sum = valueFromCoinCounts(coinsInserted);
    if(sum >= 25) {
        let returned = [0,0,0,0];
        for(let i = 3; i >= 0; i--) {
            let x = Math.floor((sum-25)/coinValue(i));
            returned[i] += x;
            coinsInMachine[i] -= x;
            sum -= coinValue(i) * x;
        }
        if(sum != 25) {
            coinsInMachine = coinsInMachine.map((v, i) => v + returned[i]);
            coinsReturned = [...coinsInserted];
            coinsInserted = [0,0,0,0];
            updateView();
            return;
        }
        coinsInserted = [0,0,0,0];
        coinsReturned = coinsReturned.map((v, i) => v + returned[i]);
        cokesInStore--;
        isCokeInDelivery = true;
        updateView();
    }
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
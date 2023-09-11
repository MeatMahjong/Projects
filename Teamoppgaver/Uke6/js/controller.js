function buyCoke() {
    let sum = valueFromCoinCounts(coinsInserted);
    if(sum >= 25) {
        let returned = [0,0,0,0];
        for(let i = 3; i >= 0; i--) {
            while(sum - coinValue(i) >= 25 && coinsInMachine[i]) {
                returned[i]++;
                coinsInMachine[i]--;
                sum -= coinValue(i);
            }
        }
        if(sum != 25) {
            coinsInMachine = coinsInMachine.map((v,i) => v + returned[i]);
            coinsReturned = [...coinsInserted];
            coinsInserted = [0,0,0,0];
            updateView();
            return;
        }
        coinsInserted = [0,0,0,0];
        coinsReturned = coinsReturned.map((v, i) => v+returned[i]);
        cokesInStore--;
        isCokeInDelivery = true;
        cokeInHandCount ++;
        updateView();
    }
}

function emptyCoke(){
    // må sette isCokeInDelivery = false 
         // a) Hvordan introdusere cokeIsEmpty med tom flaske...
         //b)  og palssere denne ved strekmannen? coke-empty.png har jeg lagt i mappen
    isCokeInDelivery = false;
    cokeIsEmpty ++;
    cokeInHandCount --;
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
    // hvordan endre denne slik at Angre-knappen bare virker på insertedCoin med returnCoins ikke tømmer Mynt- og cola-utkast?
    // Må få coinsReturned += -> funker ikke. 
    // Markus 1: coinsReturned = coinsReturned.map((v, i) => v + coinsInserted[i]);
    // 
   coinsReturned = [...coinsInserted]; 
   coinsInserted = [0,0,0,0];
    updateView();
}
function takeCoins(){
    coinsReturned = [0,0,0,0];
      updateView();
}
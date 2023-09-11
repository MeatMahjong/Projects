function valueFromCoinCounts(coinCounts) {
    return coinCounts[0]
        + coinCounts[1] * 5
        + coinCounts[2] * 10
        + coinCounts[3] * 20;
}

function coinValue(coinIndex) {
    return coinIndex == 0 ? 1
         : coinIndex == 1 ? 5
         : coinIndex == 2 ? 10
         : coinIndex == 3 ? 20
         : null
}
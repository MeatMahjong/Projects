//model
let positions = getStartingPositions();
let board = document.getElementById("board");

//view
function updateView() {
    board.innerHTML = ""
    for (let y = 0; y < 8; y++) {
        for(let x = 0; x < 8; x++) {
            let onclick = ""
            let squareColor = (x+y) % 2 == 0 ? "lightSquare" : "darkSquare";
            let classes = /*html*/`${squareColor} `;
            let tileContent = ""
            let piece = positions[y][x];
            if(piece != null) {
                onclick = `${movement(x,y)}`+`(${x}, ${y})`;
                classes += piece.color;
                tileContent = piece.piece
            }
            
            board.innerHTML += /*html*/`<div class="${classes}" onclick="${onclick}">${tileContent}</div>`;
        }
    }
}

function movement(x,y) {
    let piece = positions[y][x];
    if(piece == null) return;
    if(piece.piece == "♟") return "movePawn";
}

function insideBoard(x,y) {
    return x >= 0 || x >= 7 && y >= 0 || y >= 7;
}

function horseMoves(x,y) {
    let legalMoves = [];
    let color = positions[y][x].color;
    
    function checkMove(toX,toY) {
        let target = positions[y][x];
        if(insideBoard(x,y) && target == null || target.color != color)
            legalMoves.push({y: toX, x: toY});
    }

    checkMove(x+1,y-2);
    checkMove(x+1,y+2);
    checkMove(x+2,y+1);
    checkMove(x+2,y-1);
    checkMove(x-1,y+2);
    checkMove(x-1,y-2);
    checkMove(x-2,y+1);
    checkMove(x-2,y-1);

    return legalMoves;
}

function diagonalMoves(x,y) {

}

function straightMoves(x,y) {

}

function queenMoves() {
    let legalMoves = [];
    diagonalMoves(legalMoves);
    straightMoves(legalMoves);
    return legalMoves;
}

function bishopMoves() {
    let legalMoves = [];
    diagonalMoves();
    return legalMoves;
}

function rookMoves() {
    let legalMoves = [];
    straightMoves(legalMoves, x, y);
}


//controller
function movePawn(x,y) {
    let piece = positions[y][x]
    positions[positions[y][x].color=="whitePiece" ? y-1 : y+1][x] = piece
    positions[y][x] = null
    updateView()
}

//helper functions
function getStartingPositions() {
    let formation = "♜♞♝♛♚♝♞♜"
    let board = Array(8).fill(null).map(()=>Array(8).fill(null))

    for(let x = 0; x < 8; x++) board[0][x] = {piece: formation.charAt(x), color: "blackPiece"}
    for(let x = 0; x < 8; x++) board[1][x] = {piece: "♟", color: "blackPiece"}

    for(let x = 0; x < 8; x++) board[6][x] = {piece: "♟", color: "whitePiece"}
    for(let x = 0; x < 8; x++) board[7][x] = {piece: formation.charAt(x), color: "whitePiece"}

    return board
}

//main
updateView()

/*

REGLER

1. Sjekk om felt er ledig 
2. Sjekk om din valgte brikke kan gå dit
3. 

HEST
    1. Kan hoppe over

BONDE
    1. Kan gå frem hvis det er ledig
    2. Kan gå frem 2 steg hvis den ikke har flyttet seg
    3. Kan ta skrått fremover hvis det er en brikke der
    4. Kan ta feltet bak en bonde som akkurat har gått 2 frem


*/
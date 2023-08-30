//model
const pieces = {
    rook: "♜",
    knight: "♞",
    bishop: "♝",
    queen: "♛",
    king: "♚",
    pawn: "♟"
}
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
                onclick = movement()+`(${x}, ${y})`;
                classes += piece.color;
                tileContent = piece.piece
            }
            
            board.innerHTML += /*html*/`<div class="${classes}" onclick="${onclick}">${tileContent}</div>`;
        }
    }
}

function movement(piece) {
    if(piece == "♟") return "movePawn"
}

//controller
function movePawn(x,y) {
    piece = positions[y][x]
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
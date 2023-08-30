//model
let positions = getStartingPositions();
const pieces = {
    0: "black_rook_a",
    1: "black_kight_a",
}
// const pieces = "♜♞♝♛♚♝♞♜";
const pieceRook = "♜";
let board = document.getElementById("board");

//view
function updateView() {
    updateBoardView();
    updatePieceView();
}
function updateBoardView() {
    for (let y = 0; y < 8; y++) {
        for(let x = 0; x < 8; x++) {
            let squareColor = (x+y) % 2 == 0 ? "lightSquare" : "darkSquare";
            board.innerHTML += /*html*/`<div id="square_${y*8+x}" class="${squareColor}"></div>`;
        }
    }
}
function updatePieceView(pieceId, ) {
    for (let y = 0; y < 8; y++) {
        for(let x = 0; x < 8; x++) {
            let piece = document.getElementById("square_0")
            piece.innerHTML = pieceRook
        }
    }
}

//controller

//helper functions
function getStartingPositions() {
    
//     const pieces = "♜♞♝♛♚♝♞♜"
//     let positions = [[]]
//     for(let y = 0; y < 8; y++) {
//         let row = []
//         for(let x = 0; x < 8; x++) {
//             let piece = y == 0 || y == 7 ? pieces.charAt(x) : y == 1 || y == 6 ? "♟" : ""
//             let pieceColor = y >= 4 ? "whitePiece" : "blackPiece"
//             row.push(`<div class=${pieceColor}>${piece}</div>`)
//         }
//         positions.push(row)
//     }
//     return positions
}



//main
updateView()
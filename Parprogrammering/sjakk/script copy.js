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
    updateBoardView();
}
function updateBoardView() {
    for (let y = 0; y < 8; y++) {
        for(let x = 0; x < 8; x++) {
            let squareColor = (x+y) % 2 == 0 ? "lightSquare" : "darkSquare";
            let classes = /*html*/`${squareColor} `;
            let tileContent = ""
            let piece = positions[y][x];
            if(piece != null) {
                classes += piece.color;
                tileContent = piece.piece
            }
            
            
            board.innerHTML += /*html*/`<div class="${classes}">${tileContent}</div>`;
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
    let positions = []

    for(let y = 0; y < 8; y++) {
        let formation = [pieces.rook, pieces.knight, pieces.bishop, pieces.queen, pieces.king, pieces.bishop, pieces.knight, pieces.rook]
        let row = []
        for(let x = 0; x < 8; x++) {
            let piece = y == 0 || y == 7 ? formation[x] : y == 1 || y == 6 ? pieces.pawn : null
            let pieceColor = y >= 4 ? "whitePiece" : "blackPiece"
            if(piece != null) {
                row.push({piece: piece, color: pieceColor, position: {x: x, y: y}})
            }
            else row.push(null)
        }
        positions.push(row)
    }
    return positions
}



//main
updateView()
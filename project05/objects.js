"use strict";
/*    JavaScript 7th Edition
      Chapter 8
      Project 08-05

      Chess Objects used for Chess Games
      Author: adithya and pranay
      Date:   11/15/2024

      Filename: project08-05.js
*/
function piece(color, rank) {
   this.color = color;
   this.rank = rank;
   this.square = null;
   this.image = null;
}

function chessSet(game) {
   this.pieces = [];

   for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
         if (game.board[i][j].length === 2) {
            let color = (game.board[i][j].charAt(0) === "B") ? "Black" : "White";
            let rank = "";
            switch (game.board[i][j].charAt(1)) {
               case "P": rank = "Pawn"; break;
               case "N": rank = "Knight"; break;
               case "B": rank = "Bishop"; break;
               case "R": rank = "Rook"; break;
               case "Q": rank = "Queen"; break;
               case "K": rank = "King"; break;
            }

            let chessPiece = new piece(color, rank);
            chessPiece.square = String.fromCharCode(j + 97) + (8 - i);

            let image = "";
            switch (game.board[i][j]) {
               case "BP": image = "&#9823;"; break;
               case "BN": image = "&#9822;"; break;
               case "BB": image = "&#9821;"; break;
               case "BR": image = "&#9820;"; break;
               case "BQ": image = "&#9819;"; break;
               case "BK": image = "&#9818;"; break;
               case "WP": image = "&#9817;"; break;
               case "WN": image = "&#9816;"; break;
               case "WB": image = "&#9815;"; break;
               case "WR": image = "&#9814;"; break;
               case "WQ": image = "&#9813;"; break;
               case "WK": image = "&#9812;"; break;
            }
            chessPiece.image = image;
            this.pieces.push(chessPiece);
         }
      }
   }
}

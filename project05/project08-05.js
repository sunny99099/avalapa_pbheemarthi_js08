"use strict";
/*    JavaScript 7th Edition
      Chapter 8
      Project 08-05

      Interface to replay a chess game stored in a JSON file
      Author: adithya and pranay
      Date:   11/15/2024

      Filename: project08-05.js
*/
let moveLog = document.getElementById("moveLog");
let moveSpans = moveLog.getElementsByTagName("span");
let nextButton = document.getElementById("nextButton");
let prevButton = document.getElementById("prevButton");
let getLogButton = document.getElementById("getLog");
let blackBox = document.getElementById("blackBox");
let whiteBox = document.getElementById("whiteBox");
let titleBox = document.getElementById("title");
let descBox = document.getElementById("description");

getLogButton.onchange = function() {
   let JSONfile = this.files[0];
   let fr = new FileReader();
   fr.readAsText(JSONfile); 
   fr.onload=function(){ 
      let game = JSON.parse(fr.result);
      titleBox.textContent = game.title;
      descBox.textContent = game.description;
      writeMoveLog(game.moves);
      let mySet = new chessSet(game);
      setupBoard(mySet);
      nextButton.onclick = function() {
         if (game.move < game.moves.length - 1) {
            showNextBoard(game);           
         }
      }
      prevButton.onclick = function() {
         if (game.move > -1) {
            showPrevBoard(game);           
         }
      }   
   }
};

function writeMoveLog(moves) {
   for (let i = 0; i < moves.length; i+=2) {
      let newLI = document.createElement("li");
      let whiteMove = document.createElement("span");
      whiteMove.textContent = moves[i];
      newLI.appendChild(whiteMove);
      let blackMove = document.createElement("span");
      blackMove.textContent = moves[i+1];   
      newLI.appendChild(blackMove); 
      moveLog.appendChild(newLI);
   }   
}

function setupBoard(set) {
   let piecesOnBoard = document.querySelectorAll("table#chessboard tr td span");
   for (let i = 0; i < piecesOnBoard.length; i++) {
      let parentCell = piecesOnBoard[i].parentElement;
      parentCell.removeChild(parentCell.lastElementChild);
   }
   for (let i = 0; i < set.pieces.length; i++) {
      let pieceImage = document.createElement("span");
      pieceImage.innerHTML = set.pieces[i].image;
      pieceImage.className = set.pieces[i].color;
      let chessSquare = document.getElementById(set.pieces[i].square);
      chessSquare.appendChild(pieceImage);
   } 
}

function showNextBoard(game) {
   game.move++;
   moveSpans[game.move].className = "highlight";
   let moveStr = game.moves[game.move];
   if (moveStr === "1-0") {
      window.alert("Black Resigns");
   } else if (moveStr === "0-1") {
      window.alert("White Resigns");
   } else if (moveStr === "1/2-1/2") {
      window.alert("Draw Accepted");
   } else if (moveStr === "0-0") {
      kingSideCastle();
   } else if (moveStr === "0-0-0") {
      queenSideCastle();
   } else if (moveStr.includes("=")) {
      pawnPromotion();
   } else if (moveStr.includes("x")) {
      capturePiece();
   } else if (moveStr.includes("-")) {
      movePiece();
   }
   function moveCell(start, end) {    
      document.getElementById(end).appendChild(document.getElementById(start).firstElementChild);      
   }
   function removeCell(cell) {
      if (game.move % 2 === 0) {
         blackBox.appendChild(document.getElementById(cell).firstElementChild);
      } else {
         whiteBox.appendChild(document.getElementById(cell).firstElementChild);
      }
   }
   function kingSideCastle() {
      if (game.move % 2 === 0) {
         moveCell("e1", "g1");
         moveCell("h1", "f1");
      } else {
         moveCell("e8", "g8");
         moveCell("h8", "f8");
      }
   }
   function queenSideCastle() {
      if (game.move % 2 === 1) {
         moveCell("e1", "c1");
         moveCell("a1", "d1");
      } else {
         moveCell("e8", "c8");
         moveCell("a8", "d8");
      }
   }  
   function pawnPromotion() {
      let mIndex = moveStr.indexOf("-");
      let startCell = moveStr.substr(mIndex - 2,2);
      let endCell = moveStr.substr(mIndex + 1, 2);
      moveCell(startCell, endCell); 
      let newPiece = moveStr.charAt(moveStr.length - 1);
      let rankNum;
      switch (newPiece) {
         case "P" : rankNum = 9817; break;
         case "N" : rankNum = 9816; break;
         case "B" : rankNum = 9815; break;
         case "R": rankNum = 9814; break;
         case "Q" : rankNum = 9813; break;
         case "K" : rankNum = 9812; break;
      }   
      if (game.move % 2 === 1) {
         rankNum+=6;
      }
      document.getElementById(endCell).firstElementChild.innerHTML = "&#" + rankNum + ";";
   }
   function capturePiece() {
      let tIndex = moveStr.indexOf("x");
      let startCell = moveStr.substr(tIndex - 2,2);
      let endCell = moveStr.substr(tIndex + 1, 2);
      removeCell(endCell);
      moveCell(startCell, endCell)
   }   
   function movePiece() {
      let mIndex = moveStr.indexOf("-");
      let startCell = moveStr.substr(mIndex - 2,2);
      let endCell = moveStr.substr(mIndex + 1, 2);
      moveCell(startCell, endCell)
   }
}

function showPrevBoard(game) {
   moveSpans[game.move].classList.remove("highlight");
   let moveStr = game.moves[game.move];
   if (moveStr === "1-0") {
   } else if (moveStr === "0-1") {
   } else if (moveStr === "1/2-1/2") {
   } else if (moveStr === "0-0") {
      kingSideCastle();
   } else if (moveStr === "0-0-0") {
      queenSideCastle();
   } else if (moveStr.includes("=")) {
      pawnDemotion();
   } else if (moveStr.includes("x")) {
      addPiece();
   } else if (moveStr.includes("-")) {
      movePiece();
   }
   game.move--;
   function moveCell(start, end) {    
      document.getElementById(end).appendChild(document.getElementById(start).firstElementChild);      
   }
   function addCell(cell) {
      if (game.move % 2 === 0) {
         document.getElementById(cell).appendChild(blackBox.lastElementChild);
      } else {
         document.getElementById(cell).appendChild(whiteBox.lastElementChild);
      }
   }
   function kingSideCastle() {
      if (game.move % 2 === 0) {
         moveCell("g1", "e1");
         moveCell("f1", "h1");
      } else {
         moveCell("g8", "e8");
         moveCell("f8", "h8");
      }
   }
   function queenSideCastle() {
      if (game.move % 2 === 1) {
         moveCell("c1", "e1");
         moveCell("d1", "a1");
      } else {
         moveCell("c8", "e8");
         moveCell("d8", "a8");
      }
   }  
   function pawnDemotion() {
      let mIndex = moveStr.indexOf("-");
      let startCell = moveStr.substr(mIndex + 1,2);
      let endCell = moveStr.substr(mIndex - 2, 2);
      moveCell(startCell, endCell); 
      let rankNum;   
      if (game.move % 2 === 1) {
         rankNum = 9823;
      } else {
         rankNum = 9817;
      }
      document.getElementById(endCell).firstElementChild.innerHTML = "&#" + rankNum + ";";
   }
   function addPiece() {
      let tIndex = moveStr.indexOf("x");
      let startCell = moveStr.substr(tIndex + 1,2);
      let endCell = moveStr.substr(tIndex -2, 2);
      moveCell(startCell, endCell);
      addCell(startCell);
   }   
   function movePiece() {
      let mIndex = moveStr.indexOf("-");
      let startCell = moveStr.substr(mIndex + 1,2);
      let endCell = moveStr.substr(mIndex -2, 2);
      moveCell(startCell, endCell);
   }   
}

"use strict";
/*    JavaScript 7th Edition
      Chapter 8
      Chapter case   

      Draw Poker Game using Object Oriented Programming
      Author: adithya and pranay
      Date: 11/15/2024

      Filename:       js08.js
 */

      window.addEventListener("load", playDrawPoker);

      function playDrawPoker() {
         let dealButton = document.getElementById("dealB");
         let drawButton = document.getElementById("drawB");
         let standButton = document.getElementById("standB");
         let resetButton = document.getElementById("resetB");
         let statusBox = document.getElementById("status");
         let betSelection = document.getElementById("bet");
         let bankBox = document.getElementById("bank");
         let cardImages = document.querySelectorAll("img.cardImg");
         
         pokerGame.currentBank = 500;
         pokerGame.currentBet = 25;
      
         let myDeck = new pokerDeck();
         myDeck.shuffle();   
         
         let myHand = new pokerHand(5);
         
         bankBox.value = pokerGame.currentBank;
         
         betSelection.onchange = function() {
            pokerGame.currentBet = parseInt(this.value);
         }
         
         
            dealButton.addEventListener("click", function() {
            if (pokerGame.currentBank >= pokerGame.currentBet) {
               dealButton.disabled = true;        
               betSelection.disabled = true;      
               drawButton.disabled = false;      
               standButton.disabled = false;   
               statusBox.textContent = "";       
               
               bankBox.value = pokerGame.placeBet();
               
               if (myDeck.cards.length < 10) {
                     myDeck = new pokerDeck();
                     myDeck.shuffle();
               }
               
               myDeck.dealTo(myHand);
               
               for (let i = 0; i < cardImages.length; i++) {
                  cardImages[i].src = myHand.cards[i].cardImage();
                  
                  cardImages[i].onclick = function() {
                     if (this.src.includes("cardback.png")) {
                        this.src = myHand.cards[i].cardImage();
                     } else {
                        this.src = "cardback.png";
                     }
                  }
               }
               
            } else {
               statusBox.textContent = "Insufficient Funds";
            }
      
         });
         
         
         drawButton.addEventListener("click", function() {
            dealButton.disabled = false;        
            betSelection.disabled = false;      
            drawButton.disabled = true;       
            standButton.disabled = true;        
            
            for (let i = 0; i < cardImages.length; i++) {
               if (cardImages[i].src.includes("cardback.png")) {
                  myHand.replaceCard(i, myDeck);
                  cardImages[i].src = myHand.cards[i].cardImage();
               }
            }
            
            statusBox.textContent = myHand.getHandValue();   
            
            bankBox.value = pokerGame.payBet(statusBox.textContent);
         });
         
          
         standButton.addEventListener("click", function() {
            
            dealButton.disabled = false;       
            betSelection.disabled = false;     
            drawButton.disabled = true;       
            standButton.disabled = true;       
            statusBox.textContent = myHand.getHandValue();  
            
            bankBox.value = pokerGame.payBet(statusBox.textContent);      
         });
         
         
         resetButton.addEventListener("click", function() {
            location.reload();
         });
      }
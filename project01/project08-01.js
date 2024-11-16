"use strict";

/* 
JavaScript 7th Edition
Chapter 8
Project 08-01
Project to create a timer object
Filename: project08-01.js
Author: adithya and pranay
Date: 11/15/2024
*/
function Timer(min, sec) {
  this.minutes = min;
  this.seconds = sec;
  this.timeID = null;
}

Timer.prototype.runPause = function (timer, minBox, secBox) {
  if (timer.timeID) {
    window.clearInterval(timer.timeID);
    timer.timeID = null;
  } else {
    timer.timeID = window.setInterval(() => {
      countdown(timer, minBox, secBox);
    }, 1000);
  }
};

function countdown(timer, minBox, secBox) {
  if (timer.seconds > 0) {
    timer.seconds--;
  } else if (timer.minutes > 0) {
    timer.minutes--;
    timer.seconds = 59;
  } else {
    window.clearInterval(timer.timeID);
    timer.timeID = null;
  }
  minBox.value = timer.minutes;
  secBox.value = timer.seconds;
}


let minBox = document.getElementById("minutesBox");
let secBox = document.getElementById("secondsBox");
let runPauseTimer = document.getElementById("runPauseButton");

let myTimer = new Timer(Number(minBox.value), Number(secBox.value));

minBox.onchange = () => {
  myTimer.minutes = Number(minBox.value);
};

secBox.onchange = () => {
  myTimer.seconds = Number(secBox.value);
};

runPauseTimer.onclick = () => {
  myTimer.runPause(myTimer, minBox, secBox);
};

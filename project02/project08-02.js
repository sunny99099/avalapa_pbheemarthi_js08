"use strict";
/*    JavaScript 7th Edition
      Chapter 8
      Project 08-02

      Project to add balls bouncing within a container
      Author: adithya and pranay
      Date: 11/15/2024

      Filename: project08-02.js
*/

"use strict";

const BALL_RADIUS = 60;
const BOX_HEIGHT = 400;
const BOX_WIDTH = 800;

const box = {
  width: BOX_WIDTH,
  height: BOX_HEIGHT,
  xPos: 0,
  yPos: 0,
};

function Ball(size) {
  this.radius = size;
  this.xPos = null;
  this.yPos = null;
  this.xVelocity = null;
  this.yVelocity = null;
}

Ball.prototype.moveWithin = function (container) {
  let ballTop = this.yPos;
  let ballLeft = this.xPos;
  let ballBottom = this.yPos + this.radius;
  let ballRight = this.xPos + this.radius;

  if (ballTop < 0 || ballBottom > container.height) {
    container.yPos += this.yVelocity;
    this.yVelocity = -this.yVelocity;
  }

  if (ballLeft < 0 || ballRight > container.width) {
    container.xPos += this.xVelocity;
    this.xVelocity = -this.xVelocity;
  }

  this.yPos += this.yVelocity;
  this.xPos += this.xVelocity;
};

let boxImage = document.getElementById("box");
boxImage.style.width = BOX_WIDTH + "px";
boxImage.style.height = BOX_HEIGHT + "px";
boxImage.style.top = "0px";
boxImage.style.left = "0px";

let addBall = document.getElementById("addBall");

addBall.onclick = function () {
  let newBall = new Ball(BALL_RADIUS);
  newBall.yPos = (BOX_HEIGHT - BALL_RADIUS) / 2;
  newBall.xPos = (BOX_WIDTH - BALL_RADIUS) / 2;
  newBall.yVelocity = rand(-10, 10);
  newBall.xVelocity = rand(-10, 10);

  let ballImage = document.createElement("div");
  ballImage.className = "ball";
  ballImage.style.width = BALL_RADIUS + "px";
  ballImage.style.height = BALL_RADIUS + "px";
  ballImage.style.top = newBall.yPos + "px";
  ballImage.style.left = newBall.xPos + "px";

  boxImage.appendChild(ballImage);

  window.setInterval(function () {
    newBall.moveWithin(box);

    ballImage.style.top = newBall.yPos + "px";
    ballImage.style.left = newBall.xPos + "px";

    boxImage.style.top = box.yPos + "px";
    boxImage.style.left = box.xPos + "px";
  }, 25);
};

function rand(minVal, maxVal) {
  let size = maxVal - minVal + 1;
  return Math.floor(minVal + size * Math.random());
}

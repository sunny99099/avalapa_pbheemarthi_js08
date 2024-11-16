"use strict";
/*    JavaScript 7th Edition
      Chapter 8
      Project 08-03

      Project to build a pizza using object-oriented programming
      Author: adithya and pranay
      Date: 11/15/2024

      Filename: project08-03.js
*/

const cart = {
   items: [],

   addItem(foodItem) {
      this.items.push(foodItem);
      displayCart();
   },
};

function Pizza() {
   this.size = null;
   this.crust = null;
   this.toppings = [];
}

function Topping(name, side) {
   this.name = name;
   this.side = side;
}

let pizzaPreviewBox = document.getElementById("previewBox");
let pizzaSizeBox = document.getElementById("pizzaSize");
let pizzaCrustBox = document.getElementById("pizzaCrust");
let toppingOptions = document.querySelectorAll("input.topping");
let addToCart = document.getElementById("addToCart");
let cartBox = document.getElementById("cart");

for (let i = 0; i < toppingOptions.length; i++) {
   toppingOptions[i].onclick = drawPizza;
}

addToCart.onclick = updateCart;

function clearPizzaImage() {
   while (pizzaPreviewBox.firstChild) {
      pizzaPreviewBox.removeChild(pizzaPreviewBox.firstChild);
   }
}

function clearToppings() {
   let noTopping = document.querySelectorAll("input.topping[value='none']");
   for (let i = 0; i < noTopping.length; i++) {
      noTopping[i].checked = true;
   }
}

function drawPizza() {
   clearPizzaImage();

   let checkedToppings = document.querySelectorAll("input.topping:checked");

   for (let i = 0; i < checkedToppings.length; i++) {
      if (checkedToppings[i].value !== "none") {
         let toppingImage = document.createElement("img");
         toppingImage.src = checkedToppings[i].name + ".png";
         toppingImage.className = checkedToppings[i].value;
         pizzaPreviewBox.appendChild(toppingImage);
      }
   }
}

function buildPizza() {
   let pizza = new Pizza();

   pizza.size = pizzaSizeBox.value;
   pizza.crust = pizzaCrustBox.value;

   let checkedToppings = document.querySelectorAll("input.topping:checked");
   for (let i = 0; i < checkedToppings.length; i++) {
      if (checkedToppings[i].value !== "none") {
         let topping = new Topping(checkedToppings[i].name, checkedToppings[i].value);
         pizza.toppings.push(topping);
      }
   }

   return pizza;
}

function updateCart() {
   let newPizza = buildPizza();
   cart.addItem(newPizza);
   clearPizzaImage();
   clearToppings();
}

function displayCart() {
   cartBox.innerHTML = "";

   for (let i = 0; i < cart.items.length; i++) {
      let pizza = cart.items[i];
      let pizzaDescription = document.createElement("p");

      pizzaDescription.textContent =
         `Pizza ${i + 1}: Size - ${pizza.size}, Crust - ${pizza.crust}, Toppings - ` +
         pizza.toppings.map(topping => `${topping.name} (${topping.side})`).join(", ");

      cartBox.appendChild(pizzaDescription);
   }
}

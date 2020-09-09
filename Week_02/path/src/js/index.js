"use strict";

// localStorage.colorSetting = "#a4509b";
// localStorage["colorSetting"] = "#a4509b";
// localStorage.setItem("colorSetting", "#a4509b");

let map = localStorage.getItem("map")
  ? JSON.parse(localStorage.getItem("map"))
  : Array(100 * 100).fill(0);

let mouseDown = false;
let clear = false;

let board = document.getElementById("board");

for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    let cell = document.createElement("div");

    cell.classList.add("cell");

    if (map[100 * i + j] === 1) {
      cell.style.backgroundColor = "black";
    }

    cell.addEventListener("mousemove", function () {
      if (mouseDown) {
        if (clear) {
          cell.style.backgroundColor = "";
          map[100 * i + j] = 0;
        } else {
          cell.style.backgroundColor = "black";
          map[100 * i + j] = 1;
        }
      }
    });

    board.appendChild(cell);
  }
  board.appendChild(document.createElement("br"));
}

document.addEventListener("mousedown", function (event) {
  if (event.button === 0) {
    mouseDown = true;
  }

  if (event.button === 2) {
    mouseDown = true;
    clear = true;
  }
});

document.addEventListener("mouseup", function () {
  mouseDown = false;
  clear = false;
});

document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});

function clearMap() {
  map = Array(100 * 100).fill(0);
  localStorage.setItem("map", JSON.stringify(map));
}

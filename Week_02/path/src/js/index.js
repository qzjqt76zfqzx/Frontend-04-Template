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
    if (j === 99) {
      cell.style.backgroundColor = "pink";
    }
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

function sleep(t) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, t);
  });
}

async function findPath(map, startPoint, endPoint) {
  let queue = [startPoint];
  let mapCopy = Object.create(map);

  async function insert(x, y, preX, preY) {
    if (x < 0 || x >= 100 || y < 0 || y >= 100) {
      return;
    }

    if (map[x * 100 + y]) {
      return;
    }
    //await sleep(1);
    board.children[x * 100 + y].style.backgroundColor = "green";
    map[x * 100 + y] = 2;
    mapCopy[x * 100 + y] = [preX, preY];
    queue.push([x, y]);
  }

  while (queue.length) {
    let [x, y] = queue.shift();

    if (x === endPoint[0] && y === endPoint[1]) {
      board.children[x * 100 + y].style.backgroundColor = "red";
      let path = [];
      while (x !== startPoint[0] && y !== startPoint[1]) {
        path.push([x, y]);
        [x, y] = mapCopy[x * 100 + y];
        board.children[x * 100 + y].style.backgroundColor = "blue";
      }
      console.log("find the path");
      return path;
    }

    await insert(x - 1, y, x, y);
    await insert(x - 1, y - 1, x, y);
    await insert(x, y - 1, x, y);
    await insert(x + 1, y - 1, x, y);
    await insert(x + 1, y, x, y);
    await insert(x + 1, y + 1, x, y);
    await insert(x, y + 1, x, y);
    await insert(x - 1, y + 1, x, y);
  }

  console.log("fail find path");
  return null;
}

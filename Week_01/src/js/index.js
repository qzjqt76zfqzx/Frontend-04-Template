let pattern = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let color = 1;
const LOGIC_NUMBER = 3;
const ROWS_COLUMNS = 3;

function show() {
  let board = document.getElementById("board");
  board.innerHTML = ""; //always let board empty before show

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell"); //add class "cell" to new div
      cell.innerText = pattern[i][j] == 1 ? "O" : pattern[i][j] == 2 ? "X" : "";
      cell.addEventListener("click", () => move(i, j));
      board.appendChild(cell); //add cell to board
    }
    board.appendChild(document.createElement("br")); //change to new line
  }
}

function move(x, y) {
  if (pattern[x][y] !== 1 && pattern[x][y] !== 2) {
    pattern[x][y] = color;
    show();
    if (check(pattern, color)) {
      color == 1
        ? (document.getElementById("result").innerHTML = "O win")
        : (document.getElementById("result").innerHTML = "X win");
    }
    color = LOGIC_NUMBER - color;
  }
}

function check(pattern, color) {
  for (let i = 0; i < 3; i++) {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (pattern[i][j] !== color) {
        win = false;
        j = 3;
      }
    }
    if (win) {
      return true;
    }
  }

  for (let i = 0; i < 3; i++) {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (pattern[j][i] !== color) {
        win = false;
        j = 3;
      }
    }
    if (win) {
      return true;
    }
  }

  {
    let win = true;
    for (let i = 0; i < 3; i++) {
      if (pattern[i][i] !== color) {
        win = false;
        i = 3;
      }
    }
    if (win) {
      return true;
    }
  }

  {
    let win = true;
    for (let i = 0; i < 3; i++) {
      if (pattern[i][ROWS_COLUMNS - 1 - i] !== color) {
        win = false;
        i = 3;
      }
    }
    if (win) {
      return true;
    }
  }

  return false;
}

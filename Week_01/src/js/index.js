let pattern = [
  [2, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];

function show() {
  let board = document.getElementById("board");
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell"); //add class "cell" to new div
      cell.innerText = pattern[i][j] == 1 ? "O" : pattern[i][j] == 2 ? "X" : "";
      board.appendChild(cell); //add cell to board
    }
    board.appendChild(document.createElement("br")); //change to new line
  }
}

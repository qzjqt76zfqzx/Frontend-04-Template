"use strict";

// Attribute

let pattern = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let color = 1;
const LOGIC_NUMBER = 3;
const ROWS_COLUMNS = 3;

let isEnd = false;

const PVE = 1;
const PVP = 2;
let model;

let isHumanFirst;

// Commands

function setPVP() {
  model = PVP;
}

function setPVE() {
  model = PVE;
}

function setHumanFirst() {
  if (getModel() === PVE) {
    setErrorMessage(-1);
    isHumanFirst = true;
  } else {
    setErrorMessage(2);
  }
}

function setAIFirst() {
  if (getModel() === PVE) {
    setErrorMessage(-1);
    isHumanFirst = false;
  } else {
    setErrorMessage(2);
  }
}

function setErrorMessage(errorCode) {
  console.log(errorCode);
  let result = document.getElementById("errorMessage");
  errorCode === 1
    ? (result.innerText = "Please choose model first")
    : errorCode === 2
    ? (result.innerText = "Please choose PVE Model")
    : (result.innerText = "Error Message will show here");
}

function start() {
  if (model === PVE) {
    if (getIsHumanFirst() === true) {
      setErrorMessage(-1);
      show(getPattern());
    }
    if (getIsHumanFirst() === false) {
      setErrorMessage(-1);
      show(getPattern());
      AIMove(model);
    }
    return;
  }

  if (model === PVP) {
    setErrorMessage(-1);
    show(getPattern());
    return;
  }

  setErrorMessage(1);
}

function setGameEnd() {
  isEnd = true;
}

function setGameNotEnd() {
  isEnd = false;
}

function switchColor() {
  color = LOGIC_NUMBER - color;
}

function dropPiece(pattern, x, y, value) {
  pattern[x][y] = value;
}

function show(pattern) {
  let board = document.getElementById("board");
  board.innerText = ""; //alway clean the board before show
  for (let i = 0; i < ROWS_COLUMNS; i++) {
    for (let j = 0; j < ROWS_COLUMNS; j++) {
      board.appendChild(createCell(i, j, pattern[i][j]));
    }
    board.appendChild(document.createElement("br"));
  }
}

function move(model, x, y) {
  if (model === PVP) {
    //PVP part here
    if (isPositionEmpty(getPattern(), x, y)) {
      dropPiece(getPattern(), x, y, getColor());
    }
    show(getPattern());
    if (!isWin(getPattern(), getColor())) {
      let tmp = willWin(getPattern(), getColor());
      if (tmp.result) {
        console.log(tmp.position[0] + " " + tmp.position[1]);
      }
      switchColor();
    } else {
      console.log(getColor() + " is Win ");
      console.log("game is ending");
      setGameEnd();
    }
  } else {
    //PVE part here
    if (isPositionEmpty(getPattern(), x, y)) {
      dropPiece(getPattern(), x, y, getColor());
    }
    show(getPattern());

    //check game isEnding
    if (!isWin(getPattern(), getColor())) {
      let tmp = willWin(getPattern(), getColor());
      if (tmp.result) {
        console.log(tmp.position + " " + getColor() + " will WIN !");
      }
      switchColor();
      AIMove(getModel());
    } else {
      console.log(getColor() + " is Win ");
      console.log("game is ending");
      setGameEnd();
    }
  }
}

function AIMove(model) {
  //double check in PVE model
  if (model === PVE) {
    // check is empty pattern
    // if it is empty pattern go get center first
    if (isEmptyPattern(getPattern())) {
      if (isPositionEmpty(getPattern(), 1, 1)) {
        dropPiece(getPattern(), 1, 1, getColor());
      }
      show(getPattern());
      switchColor();
      return;
    } else {
      /* logic
       * check is not empty pattern
       * check can I win first
       * check can he win later
       * check I get center of pattern
       * check special cases
       * check I get side of pattern
       * random go
       */

      //check can I win first
      {
        let tmp = willWin(getPattern(), getColor());
        if (tmp.result) {
          if (isPositionEmpty(getPattern(), tmp.position[0], tmp.position[1])) {
            dropPiece(
              getPattern(),
              tmp.position[0],
              tmp.position[1],
              getColor()
            );
          }
          show(getPattern());

          //check game isEnding
          if (isWin(getPattern(), getColor())) {
            console.log(getColor() + " is Win ");
            console.log("game is ending");
            setGameEnd();
          }
          return;
        }
      }

      //check can he win later
      {
        switchColor();
        let tmp = willWin(getPattern(), getColor());
        switchColor();

        if (tmp.result) {
          isPositionEmpty(getPattern(), tmp.position[0], tmp.position[1]);
          dropPiece(getPattern(), tmp.position[0], tmp.position[1], getColor());
          show(getPattern());

          //check game isEnding
          if (!isWin(getPattern(), getColor())) {
            let tmp = willWin(getPattern(), getColor());
            if (tmp.result) {
              console.log(tmp.position + " " + getColor() + " will WIN !");
            }
            switchColor();
            return;
          } else {
            console.log(getColor() + " is Win ");
            console.log("game is ending");
            setGameEnd();
            return;
          }
        }
      }

      //if I can not win && he can not win, can I get center
      {
        if (isPositionEmpty(getPattern(), 1, 1)) {
          dropPiece(getPattern(), 1, 1, getColor());
          show(getPattern());

          //check game isEnding
          if (!isWin(getPattern(), getColor())) {
            let tmp = willWin(getPattern(), getColor());
            if (tmp.result) {
              console.log(tmp.position + " " + getColor() + " will WIN !");
            }
            switchColor();
            return;
          } else {
            console.log(getColor() + " is Win ");
            console.log("game is ending");
            setGameEnd();
            return;
          }
        }
      }

      //check special cases
      {
        switchColor();
        let tmpColor = getColor();
        switchColor();
        if (
          (getPattern()[0][0] === tmpColor &&
            getPattern()[2][2] === tmpColor &&
            isPositionEmpty(getPattern(), 0, 1) &&
            isPositionEmpty(getPattern(), 0, 2) &&
            isPositionEmpty(getPattern(), 1, 0) &&
            isPositionEmpty(getPattern(), 1, 2) &&
            isPositionEmpty(getPattern(), 2, 0) &&
            isPositionEmpty(getPattern(), 2, 1)) ||
          (getPattern()[0][2] === tmpColor &&
            getPattern()[2][0] === tmpColor &&
            isPositionEmpty(getPattern(), 0, 0) &&
            isPositionEmpty(getPattern(), 0, 1) &&
            isPositionEmpty(getPattern(), 1, 0) &&
            isPositionEmpty(getPattern(), 1, 2) &&
            isPositionEmpty(getPattern(), 2, 1) &&
            isPositionEmpty(getPattern(), 2, 2))
        ) {
          dropPiece(getPattern(), 0, 1, getColor());
          show(getPattern());

          //check game isEnding
          if (!isWin(getPattern(), getColor())) {
            let tmp = willWin(getPattern(), getColor());
            if (tmp.result) {
              console.log(tmp.position + " " + getColor() + " will WIN !");
            }
            switchColor();
            return;
          } else {
            console.log(getColor() + " is Win ");
            console.log("game is ending");
            setGameEnd();
            return;
          }
        }
      }

      //check I get side of pattern
      {
        let result = -1;
        let position = [-1, -1];

        if (isPositionEmpty(getPattern(), 0, 0)) {
          let tmp = 0;
          if (isPositionEmpty(getPattern(), 0, 1)) {
            tmp = tmp + 1;
          }
          if (isPositionEmpty(getPattern(), 1, 0)) {
            tmp = tmp + 1;
          }

          if (tmp > result) {
            result = tmp;
            position = [0, 0];
          }
        }

        if (isPositionEmpty(getPattern(), 0, 2)) {
          let tmp = 0;
          if (isPositionEmpty(getPattern(), 0, 1)) {
            tmp = tmp + 1;
          }
          if (isPositionEmpty(getPattern(), 1, 2)) {
            tmp = tmp + 1;
          }

          if (tmp > result) {
            result = tmp;
            position = [0, 2];
          }
        }

        if (isPositionEmpty(getPattern(), 2, 0)) {
          let tmp = 0;
          if (isPositionEmpty(getPattern(), 1, 0)) {
            tmp = tmp + 1;
          }
          if (isPositionEmpty(getPattern(), 2, 1)) {
            tmp = tmp + 1;
          }

          if (tmp > result) {
            result = tmp;
            position = [2, 0];
          }
        }

        if (isPositionEmpty(getPattern(), 2, 2)) {
          let tmp = 0;
          if (isPositionEmpty(getPattern(), 1, 2)) {
            tmp = tmp + 1;
          }
          if (isPositionEmpty(getPattern(), 2, 1)) {
            tmp = tmp + 1;
          }

          if (tmp > result) {
            result = tmp;
            position = [2, 2];
          }
        }

        if (result > -1) {
          if (isPositionEmpty(getPattern(), position[0], position[1])) {
            dropPiece(getPattern(), position[0], position[1], getColor());
            show(getPattern());

            //check game isEnding
            if (!isWin(getPattern(), getColor())) {
              let tmp = willWin(getPattern(), getColor());
              if (tmp.result) {
                console.log(tmp.position + " " + getColor() + " will WIN !");
              }
              switchColor();
              return;
            } else {
              console.log(getColor() + " is Win ");
              console.log("game is ending");
              setGameEnd();
              return;
            }
          }
        }
      }

      //random go
      {
        for (let i = 0; i < ROWS_COLUMNS; i++) {
          for (let j = 0; j < ROWS_COLUMNS; j++) {
            if (isPositionEmpty(getPattern(), i, j)) {
              dropPiece(getPattern(), i, j, getColor());
              show(getPattern());

              //check game isEnding
              if (!isWin(getPattern(), getColor())) {
                let tmp = willWin(getPattern(), getColor());
                if (tmp.result) {
                  console.log(tmp.position + " " + getColor() + " will WIN !");
                }
                switchColor();
                return;
              } else {
                console.log(getColor() + " is Win ");
                console.log("game is ending");
                setGameEnd();
                return;
              }
            }
          }
        }
      }
    }
  }
}

// Queries

function getIsHumanFirst() {
  return isHumanFirst;
}

function getPattern() {
  return pattern;
}

function getIsEnd() {
  return isEnd;
}

function getModel() {
  return model;
}

function isEmptyPattern(pattern) {
  for (let i = 0; i < ROWS_COLUMNS; i++) {
    for (let j = 0; j < ROWS_COLUMNS; j++) {
      if (!isPositionEmpty(pattern, i, j)) {
        return false;
      }
    }
  }

  return true;
}

// create function for create cell
function createCell(x, y, value) {
  let result = document.createElement("div"); //create small cell for each in pattern

  // !!! NOT result.classList.add = ("cell")
  result.classList.add("cell"); //add .class to cell
  value == 1
    ? (result.innerText = "O")
    : value == 2
    ? (result.innerText = "X")
    : (result.innerText = "");

  result.addEventListener("click", function () {
    if (!getIsEnd()) {
      move(getModel(), x, y);
    }
  });

  return result;
}

function isPositionEmpty(pattern, x, y) {
  if (pattern[x][y] !== 1 && pattern[x][y] !== 2) {
    return true;
  }

  return false;
}

function getColor() {
  return color;
}

function isWin(pattern, value) {
  for (let i = 0; i < ROWS_COLUMNS; i++) {
    let result = true;

    for (let j = 0; j < ROWS_COLUMNS; j++) {
      if (pattern[i][j] !== value) {
        result = false;
        j = ROWS_COLUMNS;
      }
    }

    if (result) {
      return result;
    }
  }

  for (let i = 0; i < ROWS_COLUMNS; i++) {
    let result = true;

    for (let j = 0; j < ROWS_COLUMNS; j++) {
      if (pattern[j][i] !== value) {
        result = false;
        j = ROWS_COLUMNS;
      }
    }

    if (result) {
      return result;
    }
  }

  {
    let result = true;

    for (let i = 0; i < ROWS_COLUMNS; i++) {
      if (pattern[i][i] !== color) {
        result = false;
        i = ROWS_COLUMNS;
      }
    }

    if (result) {
      return result;
    }
  }

  {
    let result = true;

    for (let i = 0; i < ROWS_COLUMNS; i++) {
      if (pattern[i][ROWS_COLUMNS - 1 - i] !== color) {
        result = false;
        i = ROWS_COLUMNS;
      }
    }

    if (result) {
      return result;
    }
  }

  return false;
}

function clone(pattern) {
  return JSON.parse(JSON.stringify(pattern));
}

function willWin(pattern, value) {
  for (let i = 0; i < ROWS_COLUMNS; i++) {
    for (let j = 0; j < ROWS_COLUMNS; j++) {
      if (isPositionEmpty(pattern, i, j)) {
        let tmp = clone(pattern);
        dropPiece(tmp, i, j, value);
        if (isWin(tmp, value)) {
          return { result: true, position: [i, j] };
        }
      }
    }
  }
  return { result: false, position: [-1, -1] };
}

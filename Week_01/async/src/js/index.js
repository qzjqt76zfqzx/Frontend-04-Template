"use strict";

const ONE_SECOND = 1000;

function green() {
  let light = document.getElementsByTagName("div");
  for (let i = 0; i < light.length; i++) {
    light[i].classList.remove("light");
  }
  document.getElementsByClassName("green")[0].classList.add("light");
}

function yellow() {
  let light = document.getElementsByTagName("div");
  for (let i = 0; i < light.length; i++) {
    light[i].classList.remove("light");
  }
  document.getElementsByClassName("yellow")[0].classList.add("light");
}

function red() {
  let light = document.getElementsByTagName("div");
  for (let i = 0; i < light.length; i++) {
    light[i].classList.remove("light");
  }
  document.getElementsByClassName("red")[0].classList.add("light");
}

function callBack() {
  green();
  setTimeout(function () {
    yellow();
    setTimeout(function () {
      red();
      setTimeout(function () {
        callBack();
      }, ONE_SECOND * 2);
    }, ONE_SECOND * 3);
  }, ONE_SECOND * 5);
}

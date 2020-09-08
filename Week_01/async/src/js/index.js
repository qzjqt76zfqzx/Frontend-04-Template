"use strict";

const ONE_SECOND = 1000;

green();

function green() {
  let lights = document.getElementsByTagName("div");
  console.log(lights);
  for (let i = 0; i < lights.length; i++) {
    lights[i].classList.remove("light");
  }
  let green = document.getElementsByClassName("green");
  console.log(green);
  console.log(green.length);
  for (let i = 0; i < green.length; i++) {
    console.log(i);
    green[i].classList.add("light");
  }
  console.log(green);
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

"use strict";
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const canvas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext("2d");
const fundotest = new Image();
fundotest.src = "./img/background.png";
setInterval(() => {
    ctx.drawImage(fundotest, 0, 0, WIDTH, HEIGHT);
}, 1000 / 60);
$(".w-win").css("width", `${window.innerWidth}px`);
$(".h-win").css("height", `${window.innerHeight}px`);

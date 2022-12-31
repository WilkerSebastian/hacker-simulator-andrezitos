"use strict";
class Loja {
    changeMenu() {
        const menu = $("#menu");
        const openLoja = $("#open-loja");
        if (menu.css("right") === '0px') {
            menu.css("right", '-300px');
            openLoja.css("right", "0px");
        }
        else {
            menu.css("right", '0px');
            openLoja.css("right", "300px");
        }
    }
}
const loja = new Loja();
$("#open-loja").on("click", loja.changeMenu);
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const canvas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext("2d");
const times = [];
let fps = 0;
const createImage = (path) => {
    const img = new Image();
    img.src = path;
    return img;
};
const imagens = new Map();
imagens.set("background", createImage("./img/background.png"));
function loop() {
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
        times.shift();
    }
    times.push(now);
    fps = times.length;
    update();
    render();
    window.requestAnimationFrame(loop);
}
function update() {
}
function render() {
    renders.fundo();
}
window.requestAnimationFrame(loop);
const renders = {
    fundo: () => {
        ctx.drawImage(imagens.get("background"), 0, 0, WIDTH, HEIGHT);
    }
};
$(".w-win").css("width", `${WIDTH}px`);
$(".h-win").css("height", `${HEIGHT}px`);

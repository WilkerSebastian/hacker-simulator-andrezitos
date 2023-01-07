"use strict";
class GameObject {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    isCollision(obj) {
        return (this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + this.height > obj.y);
    }
    update() {
    }
    render() {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
class Layer {
    constructor(image, x, y, width, height, speedModifier) {
        this.x = x;
        this.xOrginal = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update() {
        this.speed = gameSpeed * this.speedModifier;
        this.x = -gameFrame * this.speed % this.width;
    }
    render() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}
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
class Mesa extends GameObject {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.image = imagens.get("mesa");
        this.index = 0;
        this.sprites = spriteSheet["mesa"];
    }
    render() {
        const sprite = this.sprites[this.index];
        ctx.drawImage(this.image, sprite.x, sprite.y, sprite.width, sprite.height, this.x, this.y, this.width, this.height);
    }
}
class Monitor extends GameObject {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.image = imagens.get("monitor");
        this.index = 0;
        this.sprites = spriteSheet["monitor"];
        this.hover = false;
    }
    upgrade() {
        this.index++;
    }
    render() {
        const sprite = this.sprites[this.index];
        ctx.save();
        ctx.filter = this.hover ? "brightness(50%)" : "brightness(100%)";
        ctx.drawImage(this.image, sprite.x, sprite.y, sprite.width, sprite.height, this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}
class Player extends GameObject {
    constructor(x, y, width, height, debug) {
        super(x, y, width, height);
        this.debug = debug !== null && debug !== void 0 ? debug : false;
        this.money = 0;
        this.valorHack = 5;
        this.velocidadeHack = SEGUNDO * 25;
        this.maxHacks = 1;
        this.hack = 0;
    }
    hacking() {
        this.money += this.valorHack;
        $("#dinheiro").html(this.money.toString());
    }
    startHack() {
        if (this.isCollision(gameObjects[gameObjects.length - 1]) && this.hack < this.maxHacks) {
            this.hack++;
            setTimeout(this.hacking, this.velocidadeHack);
        }
    }
    update() {
        gameObjects[gameObjects.length - 1].hover = this.isCollision(gameObjects[gameObjects.length - 1]);
    }
    render() {
        if (this.debug) {
            ctx.fillStyle = "#9B3FE6";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
class Teclado extends GameObject {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.image = imagens.get("teclado");
        this.index = 0;
        this.sprites = spriteSheet["teclado"];
    }
    render() {
        const sprite = this.sprites[this.index];
        ctx.drawImage(this.image, sprite.x, sprite.y, sprite.width, sprite.height, this.x, this.y, this.width, this.height);
    }
}
class Computador extends GameObject {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.image = imagens.get("computador");
        this.index = 0;
        this.sprites = spriteSheet["computador"];
    }
    render() {
        const sprite = this.sprites[this.index];
        ctx.drawImage(this.image, sprite.x, sprite.y, sprite.width, sprite.height, this.x, this.y, this.width, this.height);
    }
}
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const canvas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext("2d");
const SEGUNDO = 1000;
const times = [];
let delta;
let previousTime = performance.now();
let fps = 0;
let quantidadeDeImagens = 6;
let carregamento = 0;
const createImage = (path) => {
    const img = new Image();
    img.onload = onloading;
    img.src = path;
    return img;
};
const imagens = new Map();
$("#run-game").on("click", () => {
    $("#run-game").css("display", "none");
    $("#load-screen").removeClass("invisible");
    $("#load-screen").addClass("visible");
    load();
});
function onloading() {
    carregamento++;
    $("#carregando").width(`${(carregamento / quantidadeDeImagens) * 100}%`);
    if (carregamento == quantidadeDeImagens) {
        $("#load").css("dispaly", "none");
        $("#jogo").css("display", "block");
        start();
    }
}
function load() {
    imagens.set("background", createImage("./img/background.png"));
    imagens.set("nuvens", createImage("./img/nuvens.png"));
    imagens.set("computador", createImage("./img/sprites/computadores.png"));
    imagens.set("mesa", createImage("./img/sprites/mesas.png"));
    imagens.set("monitor", createImage("./img/sprites/monitores.png"));
    imagens.set("teclado", createImage("./img/sprites/teclados.png"));
}
const spriteSheet = {
    "mesa": [
        { x: 0, y: 0, width: 280, height: 197 }
    ],
    "teclado": [
        { x: 0, y: 0, width: 155, height: 46 }
    ],
    "monitor": [
        { x: 0, y: 0, width: 93, height: 117 }
    ],
    "computador": [
        { x: 0, y: 0, width: 73, height: 51 }
    ]
};
let gameFrame = 0;
let gameSpeed = 1;
let nuvens;
const gameObjects = [];
let player;
$("#canvas").on("mousemove", (e) => {
    player.x = e.pageX;
    player.y = e.pageY;
});
$("#canvas").on("click", (e) => {
    if (e.button == 0) {
        player.startHack();
    }
});
function start() {
    player = new Player(0, 0, WIDTH * 0.01, HEIGHT * 0.025, true);
    nuvens = new Layer(imagens.get("nuvens"), WIDTH / 4, HEIGHT / 30, WIDTH * 0.75, HEIGHT / 2.8, 0.5);
    gameObjects.push(new Mesa(WIDTH / 2.5, HEIGHT / 2.2, WIDTH * 0.20, HEIGHT * 0.30));
    gameObjects.push(new Teclado(WIDTH / 2.15, HEIGHT / 1.93, WIDTH * 0.12, HEIGHT * 0.05));
    gameObjects.push(new Computador(WIDTH / 2.4, HEIGHT / 2.3, WIDTH * 0.06, HEIGHT * 0.09));
    gameObjects.push(new Monitor(WIDTH / 2.1, HEIGHT / 2.65, WIDTH * 0.07, HEIGHT * 0.15));
    window.requestAnimationFrame(loop);
}
function loop() {
    const currentTime = performance.now();
    delta = (currentTime - previousTime) / SEGUNDO;
    previousTime = currentTime;
    while (times.length > 0 && times[0] <= currentTime - SEGUNDO) {
        times.shift();
    }
    times.push(currentTime);
    fps = times.length;
    update();
    render();
    window.requestAnimationFrame(loop);
}
function update() {
    nuvens.update();
    gameObjects.forEach((gameObject) => {
        gameObject.update();
    });
    player.update();
    gameFrame++;
}
function render() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    nuvens.render();
    renders.fundo();
    gameObjects.forEach((gameObject) => {
        gameObject.render();
    });
    player.render();
}
const renders = {
    fundo: () => {
        ctx.drawImage(imagens.get("background"), 0, 0, WIDTH, HEIGHT);
    }
};
$(".w-win").css("width", `${WIDTH}px`);
$(".h-win").css("height", `${HEIGHT}px`);

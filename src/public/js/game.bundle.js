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
    buy(e) {
        if (Number(e.target.innerText.slice(1)) <= player.money) {
            const gameObject = loja.getType(e.target.getAttribute("type"));
            gameObject.upgrade();
        }
    }
    getType(types) {
        switch (types) {
            case "Computador": return gameObjects[2];
            case "Mesa": return gameObjects[0];
            case "Teclado": return gameObjects[1];
            case "Monitor": return gameObjects[3];
        }
    }
    setBuy(index, types) {
        const gameObject = this.getType(types);
        const buylement = $(".buy").get(index);
        const cor = gameObject.valores[gameObject.index + 1] <= player.money ? "text-green" : "text-red";
        buylement.className = `text-hacker ${cor} m-auto fs-4 buy`;
        buylement.innerText = "$" + gameObject.valores[gameObject.index + 1];
    }
    update() {
        this.setBuy(0, "Computador");
        this.setBuy(1, "Monitor");
        this.setBuy(2, "Teclado");
        this.setBuy(3, "Mesa");
    }
    changeMenu() {
        const menu = $("#menu");
        const openLoja = $("#open-loja");
        if (menu.css("right") === '0px') {
            menu.css("right", '-400px');
            openLoja.css("right", "0px");
        }
        else {
            menu.css("right", '0px');
            openLoja.css("right", "400px");
        }
    }
    changeDescricao(event) {
        if ($("#comprar").attr("disabled") == "disabled") {
            $("#comprar").removeAttr("disabled");
        }
        const gameObject = this.getType(event.target.getAttribute("type"));
        gameObject.setDescricao();
    }
    setDescricao(tipo, object, titulo, src, descricao, valor) {
        if (tipo == "shop") {
            $("#titulo").text(titulo);
            $("#icone").attr("src", src);
            $("#descricao").text(descricao);
            $("#comprar").attr("type", object);
            $("#comprar").text("$" + valor);
        }
        else if (tipo == "picture") {
        }
    }
}
const loja = new Loja();
$("#comprar").on("click", (e) => loja.buy(e));
$("#open-loja").on("click", () => loja.changeMenu());
const click = $(".click");
click.on("click", (e) => loja.changeDescricao(e));
class Mesa extends GameObject {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.image = imagens.get("mesa");
        this.index = 0;
        this.sprites = spriteSheet["mesa"];
        this.valores = [
            0,
            240
        ];
    }
    upgrade() {
    }
    setDescricao() {
        const src = imagens.get(`computador-${this.index + 1}`).src;
        switch (this.index + 1) {
            case 1:
                loja.setDescricao("shop", "Mesa", "laptop da xuxa", src, `Com esse leptop bilingue voc?? consegue aprender ingl??s enquanto hackeia meninas de 8 anos.
                \n\nAumenta o valor do hack.`, this.valores[this.index + 1]);
                break;
            default:
                break;
        }
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
        this.valores = [
            0,
            73,
            420
        ];
    }
    setDescricao() {
        const src = imagens.get(`computador-${this.index + 1}`).src;
        switch (this.index + 1) {
            case 1:
                loja.setDescricao("shop", "Monitor", "laptop da xuxa", src, `Com esse leptop bilingue voc?? consegue aprender ingl??s enquanto hackeia meninas de 8 anos.
                \n\nAumenta o valor do hack.`, this.valores[this.index + 1]);
                break;
            default:
                break;
        }
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
class Teclado extends GameObject {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.image = imagens.get("teclado");
        this.index = 0;
        this.sprites = spriteSheet["teclado"];
        this.valores = [
            0,
            15,
            122,
            437
        ];
    }
    upgrade() {
    }
    setDescricao() {
        const src = imagens.get(`computador-${this.index + 1}`).src;
        switch (this.index + 1) {
            case 1:
                loja.setDescricao("shop", "Teclado", "laptop da xuxa", src, `Com esse leptop bilingue voc?? consegue aprender ingl??s enquanto hackeia meninas de 8 anos.
                \n\nAumenta o valor do hack.`, this.valores[this.index + 1]);
                break;
            default:
                break;
        }
    }
    render() {
        const sprite = this.sprites[this.index];
        ctx.drawImage(this.image, sprite.x, sprite.y, sprite.width, sprite.height, this.x, this.y, this.width, this.height);
    }
}
class BarraDeLoad extends GameObject {
    constructor(x, y, width, height, maxFrame, delay) {
        super(x, y, width, height);
        this.maxFrame = maxFrame;
        this.delay = delay;
        this.frame = 1;
        this.load();
    }
    load() {
        const id = setInterval(() => {
            this.frame++;
        }, SEGUNDO);
        setTimeout(() => clearInterval(id), this.delay);
    }
    render() {
        ctx.fillStyle = "#303030";
        ctx.fillRect(this.x * 0.996, this.y * 0.989, this.width * 1.02, this.height * 2);
        ctx.fillStyle = "#101010";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#FAFAFA";
        ctx.fillRect(this.x, this.y, this.width * (this.frame / this.maxFrame), this.height);
    }
}
class Computador extends GameObject {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.image = imagens.get("computador");
        this.index = 0;
        this.sprites = spriteSheet["computador"];
        this.valores = [
            0,
            30,
            251
        ];
        this.modificadores = [
            5,
            12,
        ];
    }
    upgrade() {
        this.index++;
        player.money -= this.valores[this.index];
        player.valorHack = this.modificadores[this.index];
        this.setDescricao();
    }
    setDescricao() {
        const src = imagens.get(`computador-${this.index + 1}`).src;
        switch (this.index + 1) {
            case 1:
                loja.setDescricao("shop", "Computador", "laptop da xuxa", src, `Com esse leptop bilingue voc?? consegue aprender ingl??s enquanto hackeia meninas de 8 anos.
                \n\nAumenta o valor do hack.`, this.valores[this.index + 1]);
                break;
            case 2:
                loja.setDescricao("shop", "Computador", "PC da Escola", src, `Ningu??m quer mais esse
                computador  com Windows 95. Leva 40
                minutos pra ligar, e so liga 20% das
                vezes (n??o existe eplica????o cient??fica
                pra isso).
                \n\nAumenta o valor do hack.`, this.valores[this.index + 1]);
                break;
        }
    }
    render() {
        const sprite = this.sprites[this.index];
        ctx.drawImage(this.image, sprite.x, sprite.y, sprite.width, sprite.height, this.x, this.y, this.width, this.height);
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
        this.hack--;
    }
    startHack() {
        const monitor = gameObjects[3];
        if (this.isCollision(monitor) && this.hack < this.maxHacks) {
            this.hack++;
            const index = gameObjects.push(new BarraDeLoad(monitor.x - monitor.width / 1.9, monitor.y - (this.hack * (monitor.height * 0.25) + 25), WIDTH * 0.15, HEIGHT * 0.01, this.velocidadeHack / SEGUNDO, this.velocidadeHack)) - 1;
            setTimeout(() => {
                gameObjects.splice(index, 1);
                this.hacking();
            }, this.velocidadeHack);
        }
    }
    update() {
        $("#dinheiro").html(this.money.toString());
        gameObjects[3].hover = this.isCollision(gameObjects[3]);
    }
    render() {
        if (this.debug) {
            ctx.fillStyle = "#9B3FE6";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
const canvas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext("2d");
const SEGUNDO = 1000;
const times = [];
let delta;
let previousTime = performance.now();
let fps = 0;
let quantidadeDeArquivos = 8;
let carregamento = 0;
const createImage = (path) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
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
    $("#carregando").width(`${(carregamento / quantidadeDeArquivos) * 100}%`);
    if (carregamento == quantidadeDeArquivos) {
        $("#load").css("dispaly", "none");
        $("#jogo").css("display", "block");
        start();
    }
}
function load() {
    imagens.set("background", createImage("./public/img/background.png"));
    imagens.set("nuvens", createImage("./public/img/nuvens.png"));
    imagens.set("computador", createImage("./public/img/sprites/computadores.png"));
    imagens.set("mesa", createImage("./public/img/sprites/mesas.png"));
    imagens.set("monitor", createImage("./public/img/sprites/monitores.png"));
    imagens.set("teclado", createImage("./public/img/sprites/teclados.png"));
    for (let index = 1; index <= 2; index++) {
        imagens.set(`computador-${index}`, createImage(`./public/img/icones/computador-${index}.png`));
    }
}
const spriteSheet = {
    "mesa": [
        { x: 0, y: 0, width: 280, height: 197 }
    ],
    "teclado": [
        { x: 0, y: 0, width: 155, height: 46 },
        { x: 155, y: 3, width: 160, height: 43 }
    ],
    "monitor": [
        { x: 0, y: 0, width: 93, height: 117 }
    ],
    "computador": [
        { x: 0, y: 0, width: 73, height: 51 },
        { x: 73, y: 0, width: 121, height: 108 }
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
    player = new Player(0, 0, WIDTH * 0.01, HEIGHT * 0.025);
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
    loja.update();
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

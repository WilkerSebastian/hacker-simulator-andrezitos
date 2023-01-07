// tamanho da tela
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

// variaveis de renderização
const canvas = document.getElementById("canvas") as HTMLCanvasElement
canvas.width = WIDTH
canvas.height = HEIGHT

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

// variaveis de fps

const SEGUNDO = 1000
const times:number[] = [];
let delta:number
let previousTime = performance.now();
let fps = 0;

// variaveis para imagens

let quantidadeDeImagens = 6
let carregamento = 0

const createImage = (path:string) => {

    const img = new Image()

    img.onload = onloading

    img.src = path

    return img

}

const imagens = new Map<string , HTMLImageElement>()

// loading

$("#run-game").on("click", () => {

    $("#run-game").css("display", "none")
    $("#load-screen").removeClass("invisible")
    $("#load-screen").addClass("visible")
    load()

})

function onloading() {

    carregamento++

    $("#carregando").width(`${(carregamento / quantidadeDeImagens) * 100}%`)

    if (carregamento == quantidadeDeImagens) {
        
        $("#load").css("dispaly", "none")
        $("#jogo").css("display", "block")
        start()

    }

}

function load() {

    imagens.set("background", createImage("./img/background.png"))
    imagens.set("nuvens", createImage("./img/nuvens.png"))
    imagens.set("computador", createImage("./img/sprites/computadores.png"))
    imagens.set("mesa", createImage("./img/sprites/mesas.png"))
    imagens.set("monitor", createImage("./img/sprites/monitores.png"))
    imagens.set("teclado", createImage("./img/sprites/teclados.png"))  

}

const spriteSheet:AnimationFrames = {

    "mesa": [

        {x: 0,y:0,width:280,height:197}

    ],
    "teclado": [

        {x: 0,y:0,width:155,height:46}

    ],
    "monitor": [

        {x: 0,y:0,width:93,height:117}        

    ],
    "computador": [

        {x: 0,y:0,width:73,height:51}

    ]

}

// variaveis dos elementos do jogo

let gameFrame = 0

let gameSpeed = 1

let nuvens:Layer

const gameObjects:GameObject[] = []

let player:Player

// eventos

$("#canvas").on("mousemove", (e) => {

    player.x = e.pageX
    player.y = e.pageY

})

$("#canvas").on("click", (e) => {

    if (e.button == 0) {
        
        player.startHack()

    }

})

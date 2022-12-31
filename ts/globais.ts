// tamanho da tela
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

// variaveis de renderização
const canvas = document.getElementById("canvas") as HTMLCanvasElement
canvas.width = WIDTH
canvas.height = HEIGHT

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

// variaveis de fps
const times:number[] = [];
let fps = 0;

// variaveis para miagens

const createImage = (path:string) => {

    const img = new Image()
    img.src = path

    return img

}

const imagens = new Map<string , HTMLImageElement>()

imagens.set("background" , createImage("./img/background.png"))
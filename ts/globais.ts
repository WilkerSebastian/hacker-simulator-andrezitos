const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

const canvas = document.getElementById("canvas") as HTMLCanvasElement
canvas.width = WIDTH
canvas.height = HEIGHT

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

const fundotest = new Image()
fundotest.src = "./img/background.png"

setInterval(() => {

    ctx.drawImage(fundotest , 0 ,0 , WIDTH , HEIGHT)

}, 1000 / 60)
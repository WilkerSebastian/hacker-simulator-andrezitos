
class Player extends GameObject{

    debug:boolean
    money:number
    valorHack:number
    velocidadeHack:number
    maxHacks:number
    hack:number

    constructor(x:number, y:number, width:number, height:number, debug?:boolean) {

        super(x, y, width, height)
        this.debug = debug ?? false
        this.money = 0
        this.valorHack = 5
        this.velocidadeHack = SEGUNDO * 25
        this.maxHacks = 1
        this.hack = 0

    }

    hacking() {

        this.money += this.valorHack
        $("#dinheiro").html(this.money.toString())

    }

    startHack() {

        if (this.isCollision(gameObjects[gameObjects.length - 1]) && this.hack < this.maxHacks) {

            this.hack++
            setTimeout(this.hacking, this.velocidadeHack)

        }

    }

    update() {

        (gameObjects[gameObjects.length - 1] as Monitor).hover = this.isCollision(gameObjects[gameObjects.length - 1])

    }

    render() {

        if (this.debug) {
            
            ctx.fillStyle = "#9B3FE6"
            ctx.fillRect(this.x, this.y, this.width, this.height)

        }

    }

}
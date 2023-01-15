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
        this.hack--

    }

    startHack() {

        const monitor = gameObjects[3]

        if (this.isCollision(monitor) && this.hack < this.maxHacks) {

            this.hack++
            const index = gameObjects.push(new BarraDeLoad(monitor.x - monitor.width / 1.9, monitor.y - (this.hack * (monitor.height * 0.25) + 25), WIDTH * 0.15, HEIGHT * 0.01, this.velocidadeHack / SEGUNDO, this.velocidadeHack)) - 1
            setTimeout(() => {
                
                gameObjects.splice(index , 1)
                this.hacking()
            
            }, this.velocidadeHack)

        }

    }

    update() {

        $("#dinheiro").html(this.money.toString());
        (gameObjects[3] as Monitor).hover = this.isCollision(gameObjects[3])

    }

    render() {

        if (this.debug) {
            
            ctx.fillStyle = "#9B3FE6"
            ctx.fillRect(this.x, this.y, this.width, this.height)

        }

    }

}
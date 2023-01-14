class BarraDeLoad extends GameObject{

    frame:number
    maxFrame:number
    delay:number

    constructor(x:number, y:number, width:number, height:number, maxFrame:number, delay:number) {
        
        super(x , y , width, height)
        this.maxFrame = maxFrame
        this.delay = delay
        this.frame = 1
        this.load()

    }
    load() {

        const id = setInterval(() => {

            this.frame++

        }, SEGUNDO)

        setTimeout(() => clearInterval(id), this.delay)

    }

    render() {

        ctx.fillStyle = "#303030"
        ctx.fillRect(this.x * 0.996, this.y * 0.989, this.width * 1.02, this.height * 2)

        ctx.fillStyle = "#101010"
        ctx.fillRect(this.x , this.y, this.width, this.height)

        ctx.fillStyle = "#FAFAFA"
        ctx.fillRect(this.x, this.y, this.width * (this.frame / this.maxFrame), this.height)

    }
}
class Layer {

    image:HTMLImageElement
    speed:number
    speedModifier:number
    x:number
    xOrginal:number
    y:number
    width:number
    height:number

    constructor(image:HTMLImageElement, x:number, y:number, width:number, height:number, speedModifier:number) {
        
        this.x = x
        this.xOrginal = x
        this.y = y
        this.width = width
        this.height = height
        this.image = image
        this.speedModifier = speedModifier
        this.speed = gameSpeed * this.speedModifier

    }

    update() {

        this.speed = gameSpeed * this.speedModifier

        this.x = -gameFrame * this.speed % this.width

    }

    render() {

        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)

    }

}
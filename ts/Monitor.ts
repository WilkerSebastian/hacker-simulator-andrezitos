class Monitor extends GameObject{

    image:HTMLImageElement
    index:number
    hover:boolean
    sprites:Sprite[]

    constructor(x:number, y:number, width:number, height:number) {

        super(x, y, width, height)
        this.image = imagens.get("monitor") as HTMLImageElement
        this.index = 0
        this.sprites = spriteSheet["monitor"]
        this.hover = false

    }

    setShop() {

        switch (this.index) {
            case 0:
                
                break;
        }

    }

    upgrade() {

        this.index++

    }

    render() {

        const sprite = this.sprites[this.index]

        ctx.save()

        ctx.filter = this.hover ? "brightness(50%)" : "brightness(100%)"
        ctx.drawImage(this.image, sprite.x, sprite.y, sprite.width, sprite.height, this.x, this.y, this.width, this.height)

        ctx.restore()

    }

}
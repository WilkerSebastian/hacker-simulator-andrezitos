class Computador extends GameObject{

    image:HTMLImageElement
    
    index:number
    sprites:Sprite[]

    constructor(x:number, y:number, width:number, height:number) {

        super(x, y, width, height)
        this.image = imagens.get("computador") as HTMLImageElement
        this.index = 0
        this.sprites = spriteSheet["computador"]

    }

    render() {

        const sprite = this.sprites[this.index]

        ctx.drawImage(this.image, sprite.x, sprite.y, sprite.width, sprite.height, this.x, this.y, this.width, this.height)

    }

}
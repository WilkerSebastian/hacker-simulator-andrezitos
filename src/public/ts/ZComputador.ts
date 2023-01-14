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

    setDescricao() {

        const src = (imagens.get(`computador-${this.index + 1}`) as HTMLImageElement).src

        switch (this.index + 1) {
            case 1:
                
                loja.setDescricao("shop", "laptop da xuxa" , src , `Com esse leptop bilingue você consegue aprender inglês enquanto hackeia meninas de 8 anos. \n\nAumenta o valor do hack.`)

                break;
        
            default:
                break;
        }

    }
    
    update(): void {
        
        

    }

    render() {

        const sprite = this.sprites[this.index]

        ctx.drawImage(this.image, sprite.x, sprite.y, sprite.width, sprite.height, this.x, this.y, this.width, this.height)

    }

}
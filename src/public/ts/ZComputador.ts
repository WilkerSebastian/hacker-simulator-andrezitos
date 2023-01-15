class Computador extends GameObject {

    image: HTMLImageElement
    index: number
    sprites: Sprite[]
    valores: number[]
    modificadores: number[]

    constructor(x: number, y: number, width: number, height: number) {

        super(x, y, width, height)
        this.image = imagens.get("computador") as HTMLImageElement
        this.index = 0
        this.sprites = spriteSheet["computador"]
        this.valores = [

            0,
            30,
            251

        ]
        this.modificadores = [

            5,
            12,

        ]

    }

    upgrade() {

        this.index++
        player.money -= this.valores[this.index]
        player.valorHack = this.modificadores[this.index]
        this.setDescricao()

    }

    setDescricao() {

        const src = (imagens.get(`computador-${this.index + 1}`) as HTMLImageElement).src

        switch (this.index + 1) {
            case 1:

                loja.setDescricao("shop",
                    "Computador",
                    "laptop da xuxa",
                    src,
                    `Com esse leptop bilingue você consegue aprender inglês enquanto hackeia meninas de 8 anos.
                \n\nAumenta o valor do hack.`,
                    this.valores[this.index + 1])

                break;

            case 2:

                loja.setDescricao("shop",
                    "Computador",
                    "PC da Escola",
                    src,
                    `Ninguém quer mais esse
                computador  com Windows 95. Leva 40
                minutos pra ligar, e so liga 20% das
                vezes (não existe eplicação científica
                pra isso).
                \n\nAumenta o valor do hack.`,
                    this.valores[this.index + 1])
                break;
        }

    }

    render() {

        const sprite = this.sprites[this.index]

        ctx.drawImage(this.image, sprite.x, sprite.y, sprite.width, sprite.height, this.x, this.y, this.width, this.height)

    }

}
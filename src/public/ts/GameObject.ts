class GameObject {

    x:number
    y:number
    width:number
    height:number

    constructor(x:number, y:number, width:number, height:number) {

        this.x = x
        this.y = y
        this.width = width
        this.height = height

    }

    isCollision(obj:GameObject) {

        return (this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + this.height > obj.y)

    }

    update() {



    }

    render() {

        ctx.fillRect(this.x, this.y,this.width,this.height)

    }

}
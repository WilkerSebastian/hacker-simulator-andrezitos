interface Sprite {

    x:number
    y:number
    width:number
    height:number

}

interface AnimationFrames {
    [key: string]: Sprite[];
}
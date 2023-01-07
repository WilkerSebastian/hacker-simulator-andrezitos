function start() {

    player = new Player(0, 0, WIDTH * 0.01, HEIGHT * 0.025, true)

    nuvens = new Layer(imagens.get("nuvens") as HTMLImageElement, WIDTH / 4, HEIGHT / 30, WIDTH * 0.75, HEIGHT / 2.8, 0.5)

    gameObjects.push(new Mesa(WIDTH / 2.5, HEIGHT / 2.2, WIDTH * 0.20, HEIGHT * 0.30))
    gameObjects.push(new Teclado(WIDTH / 2.15, HEIGHT / 1.93, WIDTH * 0.12, HEIGHT * 0.05))
    gameObjects.push(new Computador(WIDTH / 2.4, HEIGHT / 2.3, WIDTH * 0.06, HEIGHT * 0.09))
    gameObjects.push(new Monitor(WIDTH / 2.1, HEIGHT / 2.65, WIDTH * 0.07, HEIGHT * 0.15))

    window.requestAnimationFrame(loop)
    
}

function loop() {

    const currentTime = performance.now();

    delta = (currentTime - previousTime) / SEGUNDO;

    previousTime = currentTime;

    while (times.length > 0 && times[0] <= currentTime - SEGUNDO) {

        times.shift();

    }

    times.push(currentTime);

    fps = times.length;

    update()
    render()

    window.requestAnimationFrame(loop)

}

function update() {

    nuvens.update()

    gameObjects.forEach((gameObject) => {

        gameObject.update()

    })

    player.update()

    gameFrame++

}

function render() {

    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    nuvens.render()
    renders.fundo()

    gameObjects.forEach((gameObject) => {

        gameObject.render()

    })

    player.render()

}
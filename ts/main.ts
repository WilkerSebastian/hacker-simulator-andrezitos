function loop() {

    const now = performance.now();

    while (times.length > 0 && times[0] <= now - 1000) {

        times.shift();

    }

    times.push(now);

    fps = times.length;

    update()
    render()


    window.requestAnimationFrame(loop)

}

function update() {



}

function render() {

    renders.fundo()

}

window.requestAnimationFrame(loop)
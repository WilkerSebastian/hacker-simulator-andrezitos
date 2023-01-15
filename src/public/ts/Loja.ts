class Loja {

    buy(e:JQuery.ClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>) {

        if (Number(e.target.innerText.slice(1)) <= player.money) {

            const gameObject = loja.getType(e.target.getAttribute("type") as TypeObjectShop)
    
            gameObject.upgrade();

            

        }

    }

    getType(types: TypeObjectShop) {

        switch (types) {
            case "Computador": return gameObjects[2] as Computador

            case "Mesa": return gameObjects[0] as Mesa

            case "Teclado": return gameObjects[1] as Teclado

            case "Monitor": return gameObjects[3] as Monitor
        }

    }

    setBuy(index: number, types: TypeObjectShop) {

        const gameObject = this.getType(types)

        const buylement = $(".buy").get(index) as HTMLPreElement

        const cor = gameObject.valores[gameObject.index + 1] <= player.money ? "text-green" : "text-red"

        buylement.className = `text-hacker ${cor} m-auto fs-4 buy`
        buylement.innerText = "$" + gameObject.valores[gameObject.index + 1];

    }

    update() {

        this.setBuy(0, "Computador");
        this.setBuy(1, "Monitor");
        this.setBuy(2, "Teclado");
        this.setBuy(3, "Mesa");

    }

    changeMenu() {

        const menu = $("#menu")
        const openLoja = $("#open-loja")

        if (menu.css("right") === '0px') {

            menu.css("right", '-400px');
            openLoja.css("right", "0px");

        } else {

            menu.css("right", '0px');
            openLoja.css("right", "400px");

        }

    }

    changeDescricao(event: JQuery.ClickEvent<HTMLDivElement, undefined, HTMLDivElement, HTMLDivElement>) {

        if($("#comprar").attr("disabled") == "disabled") {

            $("#comprar").removeAttr("disabled")

        }

        const gameObject = this.getType(event.target.getAttribute("type") as TypeObjectShop)

        gameObject.setDescricao()

    }

    setDescricao(tipo: "shop" | "picture",object:TypeObjectShop, titulo: string, src: string, descricao: string, valor: number) {

        if (tipo == "shop") {

            $("#titulo").text(titulo)
            $("#icone").attr("src", src)
            $("#descricao").text(descricao)
            $("#comprar").attr("type", object)
            $("#comprar").text("$" + valor)

        } else if (tipo == "picture") {



        }

    }

}

const loja = new Loja()

$("#comprar").on("click", (e) => loja.buy(e))

$("#open-loja").on("click", () => loja.changeMenu())

const click = ($(".click") as JQuery<HTMLDivElement>)

click.on("click", (e) => loja.changeDescricao(e))
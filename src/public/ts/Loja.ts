class Loja {

    buy:Function

    constructor() {

        this.buy = () => {}

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

    setValue(value:number) {

        $("#comprar").text(`$ ${value}`)

    }

    changeDescricao(event:JQuery.ClickEvent<HTMLDivElement, undefined, HTMLDivElement, HTMLDivElement>) {

        switch (event.target.getAttribute("type")) {
            case "computador":

            (gameObjects[2] as Computador).setDescricao()
                
                break;
        
            case " ":
                break;
        }

    }

    setDescricao(tipo: "shop" | "picture", titulo:string, src:string, descricao:string) {

        if (tipo == "shop") {
         
            $("#titulo").text(titulo)
            $("#icone").attr("src", src)
            $("#descricao").text(descricao)

        } else if(tipo == "picture") {
            


        }

    }

}

const loja = new Loja()

$("#comprar").on("click", () => {

    loja.buy()

})
$("#open-loja").on("click", loja.changeMenu)

const click = ($(".click") as JQuery<HTMLDivElement>)

click.on("click", loja.changeDescricao)
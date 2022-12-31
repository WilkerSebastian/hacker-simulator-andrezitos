class Loja {

    changeMenu() {

        const menu = $("#menu")
        const openLoja = $("#open-loja")

        if (menu.css("right") === '0px') {

            menu.css("right", '-300px');
            openLoja.css("right", "0px");

        } else {

            menu.css("right", '0px');
            openLoja.css("right", "300px");

        }

    }

}

const loja = new Loja()

$("#open-loja").on("click", loja.changeMenu)
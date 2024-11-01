class CookiesNotice {
    constructor() {
        this.key = "@cookies";
        this.init();
    }

    layout() {
        return `
            <div id="cookies-aviso">
                <div class="coteudo">
                    <span>
                        Este site utiliza cookies 🍪
                        Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e anúncios, e analisar o tráfego em nosso site. Alguns cookies são essenciais para o funcionamento do site, enquanto outros ajudam a personalizar sua experiência.
                        Para saber mais sobre como utilizamos cookies, você pode acessar nossa Política de Cookies. Ao continuar navegando, você concorda com o uso de todos os cookies ou pode gerenciar suas preferências.
                    </span>
                </div>
                <div class="acoes">
                    <button class="rejeitar" onclick="cookiesNotice.remove();">Rejeitar</button>
                    <button class="aceitar" onclick="cookiesNotice.accept();">Aceitar</button>
                </div>
            </div>
        `;
    }

    save() {
        localStorage.setItem(this.key, true);
    }

    get() {
        return localStorage.getItem(this.key) || false;
    }

    create() {
        document.body.insertAdjacentHTML("beforeend", this.layout());
    }

    remove() {
        const select = document.querySelector("#cookies-aviso");
        if (select) {
            select.parentNode.removeChild(select);
        }
    }

    accept() {
        this.save();
        this.remove();
    }

    async init() {
        const status = this.get();
        console.log(status);

        if (status) {
            return;
        }
        this.create();
    }
}

const cookiesNotice = new CookiesNotice();


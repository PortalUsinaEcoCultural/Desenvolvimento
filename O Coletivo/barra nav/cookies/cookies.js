class CookiesNotice {
    constructor() {
        this.key = "@cookies"; // Chave para armazenar no localStorage
        this.init(); // Inicializa a classe
    }

    layout() {
        // Cria o layout do aviso de cookies
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
                    <button class="rejeitar">Rejeitar</button>
                    <button class="aceitar">Aceitar</button>
                </div>
            </div>
        `;
    }

    save() {
        // Salva a escolha do usuário no localStorage
        localStorage.setItem(this.key, true);
        console.log("Cookies aceitos."); // Log para depuração
    }

    get() {
        // Recupera a escolha do usuário do localStorage
        return localStorage.getItem(this.key) === "true";
    }

    create() {
        // Adiciona o aviso de cookies ao DOM
        document.body.insertAdjacentHTML("beforeend", this.layout());
        console.log("Aviso de cookies criado."); // Log para depuração

        // Adiciona os event listeners para os botões
        document.querySelector(".rejeitar").addEventListener("click", () => {
            console.log("Cookies rejeitados."); // Log para depuração
            this.remove();
        });
        document.querySelector(".aceitar").addEventListener("click", () => {
            this.save();
            this.remove();
        });
    }

    remove() {
        // Remove o aviso de cookies do DOM
        const select = document.querySelector("#cookies-aviso");
        if (select) {
            select.parentNode.removeChild(select);
            console.log("Aviso de cookies removido."); 
        }
    }

    async init() {
        const status = this.get();
        console.log("Status de cookies:", status); 
        if (status) {
            return; 
        }
        this.create(); 
    }
}

const cookiesNotice = new CookiesNotice(); 
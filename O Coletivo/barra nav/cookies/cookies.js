class CookiesNotice{
    constructor(){
        this.key = "@cookies"
        this.init();
    }

    layout(){
        return
            <div id="cookies-notice">
                <div>
                    <span>
                        Este site utiliza cookies 🍪
                        Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e anúncios, e analisar o tráfego em nosso site. Alguns cookies são essenciais para o funcionamento do site, enquanto outros ajudam a personalizar sua experiência.
                        Para saber mais sobre como utilizamos cookies, você pode acessar nossa Política de Cookies. Ao continuar navegando, você concorda com o uso de todos os cookies ou pode gerenciar suas preferências.
                    </span>
                </div>
                <div>
                    <button>Rejeitar</button>
                    <button>Aceitar</button>
                </div>
            </div>
        ;
    }

    save(){

    }

    get(){
        const get = localStorage.getItem(this.key);
    }

    create(){

    }

    remove(){

    }

    accept(){

    }

    async init(){
    
        const status = await this.get();
    }



}
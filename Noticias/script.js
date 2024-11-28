const news = [ 
    { img: "/Noticias/imgs/noticia1.jpeg",
        title: "Incinerador Vergueiro começa a ser fechado",
        date: "Mariana Viveiros - Folha de S.Paulo - 23/06/2001",
        link: "https://www1.folha.uol.com.br/fsp/cotidian/ff2306200112.htm",
        photoCredit: "Usina Eco-Cultural" },
    
    { img: "/Noticias/imgs/noticia2.jpg",
        title: "Inauguração da reforma e modernização de Estação de Transbordo",
        date: "Prefeitura de São Paulo - 11/06/2012",
        link: "https://www.prefeitura.sp.gov.br/cidade/secretarias/comunicacao/noticias/?p=106970",
        photoCredit: "Fábio Arantes/Secom" },

    { img: "/Noticias/imgs/noticia4.jpg",
        title: "Audiência Pública sobre Transbordo Vergueiro",
        date: "Câmara de São Paulo - 28/07/2021",
        link: "https://www.saopaulo.sp.leg.br/blog/situacao-atual-e-obras-de-modernizacao-da-estacao-de-transbordo-vergueiro-sao-debatidos-em-audiencia-publica/",
        photoCredit: "Usina Eco-Cultural" },
    
    { img: "/Noticias/imgs/noticia3.jpg",
        title: "O Incinerador abandonado Vergueiro - Enigmas Urbanos",
        date: "Mundando a Rotina - 03/05/2021",
        link: "https://www.youtube.com/watch?v=DarEmOyc2mE&t=127s",
        photoCredit: "Usina Eco-Cultural" },

    { img: "/Noticias/imgs/noticia5.png",
        title: "Antigo Incinerador Vergueiro será Renovado como Pólo Ecológico",
        date: "Ipirangafeelings - 08/11/2021",
        link: "https://ipirangafeelings.com.br/antigo-incinerador-vergueiro-em-obras/",
        photoCredit: "Divulgação/EcoUrbis" },

    { img: "/Noticias/imgs/TCC-Larissa.png", 
        title: "Permanências: memória e projeto no ipiranga (trabalho final de graduação)",
        date: "Larissa Candro - 29/06/2017",
        link: "https://issuu.com/larissacandro/docs/caderno_larissa_candro_online_73526598624966",
        photoCredit: "Larissa Candro"},

    { img: "/Noticias/imgs/TCC-Thay.png",
        title: "Espaços públicos de vivência, cultura e educação ambiental",
        date: "Thaynara Monteiro Marcolin - 29/06/2017",
        link: "https://repositorio.animaeducacao.com.br/items/1c466401-f34f-4322-9e89-3693419ac328",
        photoCredit: "Thaynara Monteiro Marcolin"},

    { img: "/Noticias/imgs/TCC-Diogo.png",
        title: "Campus Startups Vergueiro",
        date: "Diogo Horvath - 05/12/2019",
        link: "https://issuu.com/diogohorvath/docs/campus_startups_vergueiro_-_monografia",
        photoCredit: "Google maps/Editada por Diogo Horvath"},

    { img: "/Noticias/imgs/TCC-Nathalia.png",
        title: "Arquitetura Compartilhada - Projetando sobre o construído",
        date: "Nathalia de Siena Haga - 18/12/2022",
        link: "https://issuu.com/nathaliashaga/docs/nath_lia_de_siena_haga_caderno_tfg_2_semestre_p_s",
        photoCredit: "Nathalia de Siena Haga"},

    { img: "/Noticias/imgs/TCC-Abner.png",
        title: "Museu de Arte do Instituto Vergueiro",
        date: "Abner Juan Bobato - 08/04/2022",
        link: "https://issuu.com/abnerbobato/docs/museu_de_arte_instituto_vergueiro",
        photoCredit: "Abner Juan Bobato"}
];

const totalPages = Math.ceil(news.length / 3);
let currentPage = 1;

function updateNews() {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "";

    const startIndex = (currentPage - 1) * 3;
    const endIndex = startIndex + 3;

    for (let i = startIndex; i < endIndex && i < news.length; i++) {
        const article = news[i];
        const isTCC = article.img.includes("TCC");
        const label = isTCC ? "TCC - Trabalho de Conclusão de Curso" : "Notícia";
        const labelColor = isTCC ? "#3b5f13" : "#69A625"; 
    
        newsContainer.innerHTML += `
            <div class="row mb-3">
                <div class="col-md-3">
                    <img src="${article.img}" alt="Foto: ${article.photoCredit}" class="img-fluid rounded" width="293" height="226">
                    <p class="text-muted text-left" style="font-size: 80%;">Foto: ${article.photoCredit}</p>
                </div>
                <div class="col-md-8">
                    <p style="font-weight: bold; color: ${labelColor};">${label}</p> 
                    <h4 class="font-weight-bold">${article.title}</h4>
                    <a href="${article.link}" class="d-block text-dark">${article.link}</a>
                    <p class="text-muted">${article.date}</p>
                </div>
            </div>`;
    }

    document.getElementById("prevBtn").disabled = currentPage === 1;
    document.getElementById("nextBtn").disabled = currentPage === totalPages;

    updatePageNumbers();
}

function updatePageNumbers() {
    const pageNumbers = document.getElementById("pageNumbers");
    pageNumbers.innerHTML = `Página ${currentPage} de ${totalPages}`;
}

function navigate(direction) {
    currentPage += direction;

    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;

    updateNews();
}

updateNews();

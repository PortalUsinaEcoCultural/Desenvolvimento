const news = [
    { img: "/Noticias/imgs/noticia1.jpg",
    title: "Incinerador Vergueiro começa a ser fechado",
    date: "Câmara de São Paulo - 23/06/2001",
    link: "https://www1.folha.uol.com.br/fsp/cotidian/ff2306200112.htm",
    photoCredit: "Usina Eco-Cultural"},

    {img: "/Noticias/imgs/noticia2.jpg",
    title: "Inauguração da reforma e modernização de Estação de Transbordo",
    date: "Prefeitura de São Paulo - 11/06/2012",
    link: "https://www.prefeitura.sp.gov.br/cidade/secretarias/comunicacao/noticias/?p=106970",
    photoCredit: "Usina Eco-Cultural"},

    {img: "/Noticias/imgs/noticia3.jpg",
    title: "INCINERADOR VERGUEIRO - Espaço nobre e subutilizado",
    date: "Publicação: Nova Gazeta, JULHO 10, 2020",
    link: "https://www.youtube.com/watch?v=DarEmOyc2mE&t=127s",
    photoCredit: "Usina Eco-Cultural"},

    {img: "/Noticias/imgs/noticia4.jpg",
    title: "Audiência Pública sobre Transbordo Vergueiro",
    date: "Câmara de São Paulo - 28/07/2021",
    link: "https://www.saopaulo.sp.leg.br/blog/situacao-atual-e-obras-de-modernizacao-da-estacao-de-transbordo-vergueiro-sao-debatidos-em-audiencia-publica/",
    photoCredit: "Usina Eco-Cultural"},

    {img: "/Noticias/imgs/noticia5.jpg",
    title: "Antigo Incinerador Vergueiro será Renovado como Pólo Ecológico",
    date: "Câmara de São Paulo - 28/07/2021",
    link: "https://ipirangafeelings.com.br/antigo-incinerador-vergueiro-em-obras/",
    photoCredit: "Usina Eco-Cultural"},

    {img: "/Noticias/imgs/TCC.jpg",
    title: "TCC - Trabalho de Conclusão de Curso",
    date: "29/06/2017",
    link: "https://issuu.com/larissacandro/docs/caderno_larissa_candro_online_73526598624966",
    photoCredit: "Larissa Candro"},

    {img: "/Noticias/imgs/TCC.jpg",
    title: "TCC - Trabalho de Conclusão de Curso",
    date: "29/06/2017",
    link: "https://repositorio.animaeducacao.com.br/items/1c466401-f34f-4322-9e89-3693419ac328",
    photoCredit: "Thaynara Monteiro Marcolin"},

    {img: "/Noticias/imgs/TCC.jpg",
    title: "TCC - Trabalho de Conclusão de Curso",
    date: "05/12/2019",
    link: "https://issuu.com/diogohorvath/docs/campus_startups_vergueiro_-_monografia",
    photoCredit: "Diogo Horvath"},

    {img: "/Noticias/imgs/TCC.jpg",
    title: "TCC - Trabalho de Conclusão de Curso",
    date: "18/12/2022",
    link: "https://issuu.com/nathaliashaga/docs/nath_lia_de_siena_haga_caderno_tfg_2_semestre_p_s",
    photoCredit: "Nathalia de Siena Haga"},

    {img: "/Noticias/imgs/TCC.jpg",
    title: "TCC - Trabalho de Conclusão de Curso",
    date: "08/04/2022",
    link: "https://issuu.com/abnerbobato/docs/museu_de_arte_instituto_vergueiro",
    photoCredit: "Abner Juan Bobato"}];

// Calcula o número total de páginas baseado na quantidade de notícias e no número de notícias por página (3 neste caso).
const totalPages = Math.ceil(news.length / 3);

// Define a página atual. Inicialmente, ela começa na página 1.
let currentPage = 1;

// Função para atualizar o conteúdo das notícias com base na página atual.
function updateNews() {
// Pega o elemento que vai exibir as notícias.
const newsContainer = document.getElementById("news-container");

// Limpa o conteúdo de notícias existente antes de exibir as novas.
newsContainer.innerHTML = "";

// Calcula o índice inicial e final das notícias que serão exibidas nesta página.
const startIndex = (currentPage - 1) * 3;  // Ex.: Página 1 -> índice inicial 0 (1-1)*3 = 0.
const endIndex = startIndex + 3;  // Ex.: Se começamos do índice 0, exibimos até o 3º item (índice 2).

// Loop para gerar o HTML de cada notícia da página atual.
for (let i = startIndex; i < endIndex && i < news.length; i++) {
    const article = news[i]; // Pega o artigo atual da lista de notícias.

    // Adiciona o HTML para exibir a notícia, incluindo imagem, título, link, data e crédito da foto.
    newsContainer.innerHTML += `
        <div class="row mb-4">
            <div class="col-md-4">
                <img src="${article.img}" alt="Foto: ${article.photoCredit}" class="img-fluid rounded">
                <p class="text-muted text-left" style="font-size: 0.8rem;">Foto: ${article.photoCredit}</p>
            </div>
            <div class="col-md-8">
                <p class="text-success" style="font-weight: bold;">Notícia</p>
                <h3 class="font-weight-bold">${article.title}</h3>
                <a href="${article.link}" class="d-block text-dark">${article.link}</a>
                <p class="text-muted">${article.date}</p>
            </div>
        </div>`;
}

// Atualiza o estado dos botões de navegação "Anterior" e "Seguinte".
// Desabilita o botão "Anterior" se estiver na primeira página.
document.getElementById("prevBtn").disabled = currentPage === 1;

// Desabilita o botão "Seguinte" se estiver na última página.
document.getElementById("nextBtn").disabled = currentPage === totalPages;

updatePageNumbers();
}

// Função para atualizar o texto da numeração da página.
function updatePageNumbers() {
const pageNumbers = document.getElementById("pageNumbers");

// Exibe o número da página atual e o total de páginas.
pageNumbers.innerHTML = `Página ${currentPage} de ${totalPages}`;
}

// Função para navegar entre as páginaS
function navigate(direction) {
// Atualiza a página atual, somando ou subtraindo com base na direção recebida
currentPage += direction;

// Garante que a página atual não ultrapasse os limites 
if (currentPage < 1) currentPage = 1;
if (currentPage > totalPages) currentPage = totalPages;

// Chama a função para atualizar o conteúdo 
updateNews();
}

// Inicializa a página
updateNews();
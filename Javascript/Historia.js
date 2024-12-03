/* Seção "Apoiadores" */
const carrossel = document.querySelector(".carrossel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstParceiroWidth = carrossel.querySelector(".parceiro").offsetWidth;
const carrosselChildren = [...carrossel.children];

let isDragging = false, startX, startScrollLeft;

let parceirosPerView = Math.round(carrossel.offsetWidth / firstParceiroWidth);

carrosselChildren.slice(-parceirosPerView).reverse().forEach(parceiro => {
    carrossel.insertAdjacentHTML("afterbegin", parceiro.outerHTML);
});

carrosselChildren.slice(0, parceirosPerView).forEach(parceiro => {
    carrossel.insertAdjacentHTML("beforeend", parceiro.outerHTML);
});

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carrossel.scrollLeft += btn.id === "left" ? -firstParceiroWidth : firstParceiroWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carrossel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carrossel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    carrossel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carrossel.classList.remove("dragging");
}

carrossel.addEventListener("mousedown", dragStart);
carrossel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

/* Seção "linha do tempo" */

// Carregar eventos do servidor ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarEventos();
});

// Função para adicionar um novo evento na linha do tempo
function adicionarEvento() {
    const ano = prompt("Digite o ano:");
    const descricao = prompt("Digite a descrição:");

    if (!ano || !descricao) return;

    const linhaDoTempo = document.getElementById('linha-do-tempo');
    const container = document.createElement('div');
    container.className = `linha-do-tempo-container ${linhaDoTempo.children.length % 2 === 0 ? 'esquerda' : 'direita'}`;

    container.innerHTML = `
        <div class="linha-do-tempo-conteudo">
            <h2>${ano}</h2>
            <p>${descricao}</p>
            <button class="linha-do-tempo-btn-excluir" onclick="excluirEvento(this)">Excluir</button>
        </div>
    `;

    linhaDoTempo.appendChild(container);
    // Enviar evento para o servidor
    salvarEventoNoServidor(ano, descricao);
}

// Função para excluir um evento da linha do tempo
function excluirEvento(botao) {
    const evento = botao.parentElement.parentElement;
    evento.remove();

    // Excluir evento no banco de dados
    const ano = evento.querySelector('h2').textContent;
    excluirEventoNoServidor(ano);
}

// Função para salvar um evento no servidor
async function salvarEventoNoServidor(ano, descricao) {
    const evento = { ano, descricao };

    const response = await fetch('http://localhost:3000/eventos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(evento),  // Envia o evento em formato JSON
    });

    if (response.ok) {
        console.log('Evento salvo com sucesso!');
    } else {
        console.error('Erro ao salvar evento');
    }
}

// Função para salvar todos os eventos no servidor
function salvarEventos() {
    const eventos = [];
    document.querySelectorAll('.linha-do-tempo-container').forEach(container => {
        const ano = container.querySelector('h2').textContent;
        const descricao = container.querySelector('p').textContent;
        eventos.push({ ano, descricao });
    });

    // Enviar todos os eventos para o servidor
    eventos.forEach(evento => {
        salvarEventoNoServidor(evento.ano, evento.descricao);
    });
    alert('Modificações salvas com sucesso!');
}

// Função para carregar eventos do servidor
async function carregarEventos() {
    const linhaDoTempo = document.getElementById('linha-do-tempo');
    linhaDoTempo.innerHTML = ''; // Limpa o conteúdo para evitar duplicação

    // Buscar eventos do servidor
    const response = await fetch('http://localhost:3000/eventos');
    if (response.ok) {
        const eventos = await response.json();
        eventos.forEach(evento => {
            const container = document.createElement('div');
            container.className = `linha-do-tempo-container ${linhaDoTempo.children.length % 2 === 0 ? 'esquerda' : 'direita'}`;

            container.innerHTML = `
                <div class="linha-do-tempo-conteudo">
                    <h2>${evento.ano}</h2>
                    <p>${evento.descricao}</p>
                    <button class="linha-do-tempo-btn-excluir" onclick="excluirEvento(this)">Excluir</button>
                </div>
            `;

            linhaDoTempo.appendChild(container);
        });
    } else {
        alert('Erro ao carregar eventos');
    }
}

// Função para alternar a visibilidade da linha do tempo
function alternarVisibilidade() {
    const linhaDoTempo = document.getElementById('linha-do-tempo');
    const botaoMinimizar = document.querySelector('.linha-do-tempo-minimizar');
    if (linhaDoTempo.style.display === 'none') {
        linhaDoTempo.style.display = 'block';
        botaoMinimizar.textContent = '▲';
    } else {
        linhaDoTempo.style.display = 'none';
        botaoMinimizar.textContent = '▼';
    }
}



/* Carrossel "Apoiadores da Política" */
const carrosselPolitica = document.querySelector(".wrapper-politica .carrossel");
const arrowBtnsPolitica = document.querySelectorAll(".wrapper-politica i");
const firstParceiroWidthPolitica = carrosselPolitica.querySelector(".parceiro").offsetWidth;
const carrosselChildrenPolitica = [...carrosselPolitica.children];

let isDraggingPolitica = false, startXPolitica, startScrollLeftPolitica;

let parceirosPerViewPolitica = Math.round(carrosselPolitica.offsetWidth / firstParceiroWidthPolitica);

carrosselChildrenPolitica.slice(-parceirosPerViewPolitica).reverse().forEach(parceiro => {
    carrosselPolitica.insertAdjacentHTML("afterbegin", parceiro.outerHTML);
});

carrosselChildrenPolitica.slice(0, parceirosPerViewPolitica).forEach(parceiro => {
    carrosselPolitica.insertAdjacentHTML("beforeend", parceiro.outerHTML);
});

arrowBtnsPolitica.forEach(btn => {
    btn.addEventListener("click", () => {
        carrosselPolitica.scrollLeft += btn.id === "left" ? -firstParceiroWidthPolitica : firstParceiroWidthPolitica;
    });
});

const dragStartPolitica = (e) => {
    isDraggingPolitica = true;
    carrosselPolitica.classList.add("dragging");
    startXPolitica = e.pageX;
    startScrollLeftPolitica = carrosselPolitica.scrollLeft;
}

const draggingPolitica = (e) => {
    if (!isDraggingPolitica) return;
    e.preventDefault();
    carrosselPolitica.scrollLeft = startScrollLeftPolitica - (e.pageX - startXPolitica);
}

const dragStopPolitica = () => {
    isDraggingPolitica = false;
    carrosselPolitica.classList.remove("dragging");
}

carrosselPolitica.addEventListener("mousedown", dragStartPolitica);
carrosselPolitica.addEventListener("mousemove", draggingPolitica);
document.addEventListener("mouseup", dragStopPolitica);

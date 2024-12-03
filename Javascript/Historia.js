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

function excluirEvento(botao) {
    const evento = botao.parentElement.parentElement;
    evento.remove();

    // Excluir evento no banco de dados
    const ano = evento.querySelector('h2').textContent;
    excluirEventoNoServidor(ano);
}

function editarTodosEventos() {
    const ano = prompt("Digite o ano do evento que deseja editar:");
    const eventos = document.querySelectorAll('.linha-do-tempo-container');
    let encontrado = false;

    eventos.forEach(evento => {
    if (evento.querySelector('h2').textContent === ano) {
        const novoAno = prompt("Editar ano:", evento.querySelector('h2').textContent);
        const novaDescricao = prompt("Editar descrição:", evento.querySelector('p').textContent);

        if (novoAno && novaDescricao) {
        evento.querySelector('h2').textContent = novoAno;
        evento.querySelector('p').textContent = novaDescricao;
          // Atualizar evento no servidor
        atualizarEventoNoServidor(ano, novoAno, novaDescricao);
        }
        encontrado = true;
    }
    });

    if (!encontrado) {
    alert(`Não existe um evento cadastrado em ${ano}.`);
    }
}

function salvarEventos() {
    const eventos = [];
    document.querySelectorAll('.linha-do-tempo-container').forEach(container => {
    const ano = container.querySelector('h2').textContent;
    const descricao = container.querySelector('p').textContent;
    eventos.push({ ano, descricao });
    });
    // Salvar todos os eventos no servidor
    eventos.forEach(evento => {
    salvarEventoNoServidor(evento.ano, evento.descricao);
    });
    alert('Modificações salvas com sucesso!');
}

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

// Função para adicionar um novo evento na linha do tempo
function adicionarEvento() {
    const linhaDoTempo = document.getElementById('linha-do-tempo');
    
    // Criação de um novo evento na linha do tempo (formulário para captura)
    const novoEventoHTML = `
        <div class="linha-do-tempo-container esquerda">
            <div class="linha-do-tempo-conteudo">
                <h2><input type="number" placeholder="Ano" class="ano" required></h2>
                <p><input type="text" placeholder="Descrição do evento" class="descricao" required></p>
                <button class="linha-do-tempo-btn-excluir" onclick="excluirEvento(this)">Excluir</button>
            </div>
        </div>
    `;
    
    linhaDoTempo.insertAdjacentHTML('beforeend', novoEventoHTML);
}

// Função para excluir um evento da linha do tempo
function excluirEvento(button) {
    button.closest('.linha-do-tempo-container').remove();
}

// Função para salvar os eventos no banco de dados
async function salvarEventos() {
    const eventos = [];
    
    // Coletando todos os eventos da linha do tempo
    const containers = document.querySelectorAll('.linha-do-tempo-container');
    containers.forEach(container => {
        const ano = container.querySelector('.ano').value;
        const descricao = container.querySelector('.descricao').value;

        if (ano && descricao) {
            eventos.push({ ano: parseInt(ano), descricao: descricao });
        }
    });

    // Enviando os dados para o servidor
    const response = await fetch('http://localhost:3000/eventos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventos),
    });

    if (response.ok) {
        alert('Eventos salvos com sucesso!');
    } else {
        alert('Erro ao salvar eventos!');
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

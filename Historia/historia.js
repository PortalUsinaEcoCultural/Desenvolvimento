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

// Carregar eventos do localStorage ao carregar a página
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
}

function excluirEvento(botao) {
  const evento = botao.parentElement.parentElement;
  evento.remove();
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
  localStorage.setItem('eventosLinhaDoTempo', JSON.stringify(eventos));
  alert('Modificações salvas com sucesso!');
}

function carregarEventos() {
  const linhaDoTempo = document.getElementById('linha-do-tempo');
  linhaDoTempo.innerHTML = ''; // Limpa o conteúdo para evitar duplicação
  const eventos = JSON.parse(localStorage.getItem('eventosLinhaDoTempo')) || [];
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
}

function alternarVisibilidade() {
  const linhaDoTempo = document.getElementById('linha-do-tempo');
  const botaoMinimizar = document.querySelector('.linha-do-tempo-minimizar');
  if (linhaDoTempo.style.display === 'none') {
      linhaDoTempo.style.display = 'block';
      botaoMinimizar.textContent = 'Minimizar Linha do Tempo';
  } else {
      linhaDoTempo.style.display = 'none';
      botaoMinimizar.textContent = 'Expandir Linha do Tempo';
  }
}

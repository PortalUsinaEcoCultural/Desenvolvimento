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

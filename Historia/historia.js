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


// VARIÁVEIS
const elementosLinhaDoTempo = document.querySelectorAll(".linha-do-tempo-item");

// INÍCIO
window.addEventListener("load", iniciar);

function iniciar() {
  definirAlturasIguais(elementosLinhaDoTempo);
}

// DEFINIR ALTURAS IGUAIS
function definirAlturasIguais(el) {
  let alturaMaxima = 0;
  for (let i = 0; i < el.length; i++) {
    const alturaAtual = el[i].offsetHeight;

    if (alturaMaxima < alturaAtual) {
      alturaMaxima = alturaAtual;
    }
  }

  for (let i = 0; i < el.length; i++) {
    el[i].style.height = `${alturaMaxima}px`;
  }
}

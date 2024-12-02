// Seção "Parceiros Estratégicos"
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

/* Fade*/
const faders = document.querySelectorAll('.fade-in');
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show'); 
      observer.unobserve(entry.target); 
    }
  });
}, {
  threshold: 0.1 
});
faders.forEach(fader => {
  appearOnScroll.observe(fader);
});


// Seção "Parceiros e Conexões"
const carrosselConexoes = document.querySelector(".carrossel-conexoes");
const arrowBtnsConexoes = document.querySelectorAll(".wrapper-conexoes i");
const firstParceiroWidthConexoes = carrosselConexoes.querySelector(".parceiro-conexoes").offsetWidth;
const carrosselChildrenConexoes = [...carrosselConexoes.children];

let isDraggingConexoes = false, startXConexoes, startScrollLeftConexoes;
let parceirosPerViewConexoes = Math.round(carrosselConexoes.offsetWidth / firstParceiroWidthConexoes);

carrosselChildrenConexoes.slice(-parceirosPerViewConexoes).reverse().forEach(parceiro => {
    carrosselConexoes.insertAdjacentHTML("afterbegin", parceiro.outerHTML);
});

carrosselChildrenConexoes.slice(0, parceirosPerViewConexoes).forEach(parceiro => {
    carrosselConexoes.insertAdjacentHTML("beforeend", parceiro.outerHTML);
});

arrowBtnsConexoes.forEach(btn => {
    btn.addEventListener("click", () => {
        carrosselConexoes.scrollLeft += btn.id === "left-conexoes" ? -firstParceiroWidthConexoes : firstParceiroWidthConexoes;
    });
});

const dragStartConexoes = (e) => {
    isDraggingConexoes = true;
    carrosselConexoes.classList.add("dragging");
    startXConexoes = e.pageX;
    startScrollLeftConexoes = carrosselConexoes.scrollLeft;
};

const draggingConexoes = (e) => {
    if (!isDraggingConexoes) return;
    e.preventDefault();
    carrosselConexoes.scrollLeft = startScrollLeftConexoes - (e.pageX - startXConexoes);
};

const dragStopConexoes = () => {
    isDraggingConexoes = false;
    carrosselConexoes.classList.remove("dragging");
};

carrosselConexoes.addEventListener("mousedown", dragStartConexoes);
carrosselConexoes.addEventListener("mousemove", draggingConexoes);
document.addEventListener("mouseup", dragStopConexoes);

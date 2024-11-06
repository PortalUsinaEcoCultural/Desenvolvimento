/* Seção "Nossos Parceiros..." */
const carrossel = document.querySelector(".carrossel");
const arrowBtns = document.querySelectorAll(".wrapper ");
const fisrtParceiroWidth = carrossel.querySelector(".parceiro").offsetWidth;
const carrosselChildrens = [...carrossel.children];

let isDragging = false, startX, startScroollLeft;

let parceiroPerView = Math.round(carrossel.offsetWidth / firstParceiroWidth);

carrosselChildrens.slice(-parceiroPerView).reverse().forEach(parceiro => {
    carrossel.insertAdjacentHTML("afterbegin", parceiro.outerHTML);

});


carrosselChildrens.slice(0, parceiroPerView).forEach(parceiro => {
    carrossel.insertAdjacentHTML("beforeend", parceiro.outerHTML);

});

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carrossel.scrollLeft += btn.id === "left" ? -fisrtParceiroWidth : fisrtParceiroWidth;
    });
});

const dragStart = () => {
    isDragging = true;
    carrossel.classList.add("dragging");
    startX = e.pageX;
    startScroollLeft = carrossel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; 
    carrossel.scrollLeft = startScroollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carrossel.classList.remove("dragging");
}

carrossel.addEventListener("mousedown", dragStart);
carrossel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
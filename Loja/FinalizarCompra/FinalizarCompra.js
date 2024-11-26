const pixBtn = document.getElementById('pixBtn');
const paypalBtn = document.getElementById('paypalBtn');
const continuarBtn = document.getElementById('continuarBtn');


let metodoSelecionado = '';

function resetBotao() {
    pixBtn.classList.remove('selecionado');
    paypalBtn.classList.remove('selecionado');
}

pixBtn.addEventListener('click', function () {
    resetBotao();
    pixBtn.classList.add('selecionado');
    metodoSelecionado = 'PIX';
});


paypalBtn.addEventListener('click', function () {
    resetBotao();
    paypalBtn.classList.add('selecionado');
    metodoSelecionado = 'PayPal';
});
continuarBtn.addEventListener('click', function () {
    if (metodoSelecionado === 'PIX') {
        window.location.href = '/Doe e apoie/formsPix.html';
    } else {
        alert('Selecione um método de pagamento antes de continuar.');
    }
});

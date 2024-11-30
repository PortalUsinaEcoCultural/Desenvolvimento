document.addEventListener("DOMContentLoaded", function () {
    const botoesSaibaMais = document.querySelectorAll('.saiba-mais-botao');

    botoesSaibaMais.forEach(function (botao) {
        botao.addEventListener('click', function () {
            const resposta = this.nextElementSibling; 
            if (resposta && resposta.classList.contains('evento-resposta')) {
                resposta.style.display = resposta.style.display === 'none' ? 'block' : 'none';
            }
        });
    });
});

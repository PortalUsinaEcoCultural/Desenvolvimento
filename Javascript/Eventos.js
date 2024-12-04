document.addEventListener("DOMContentLoaded", function () {
    const botoesSaibaMais = document.querySelectorAll('.saiba-mais-botao');

    botoesSaibaMais.forEach(botao => {
        botao.addEventListener('click', () => {
            const resposta = botao.nextElementSibling;
            if (resposta && resposta.classList.contains('evento-resposta')) {
                resposta.style.display = resposta.style.display === 'none' ? 'block' : 'none';
            }
        });
    });
});
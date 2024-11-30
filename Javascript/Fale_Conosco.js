document.addEventListener("DOMContentLoaded", function () {
    const perguntas = document.querySelectorAll('.pergunta-titulo');

    perguntas.forEach(function (pergunta) {
        pergunta.addEventListener('click', function () {
            const resposta = pergunta.nextElementSibling;
            resposta.style.display = resposta.style.display === 'block' ? 'none' : 'block';
        });
    });
});


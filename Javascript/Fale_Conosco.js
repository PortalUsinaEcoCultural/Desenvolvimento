document.addEventListener('DOMContentLoaded', () => {
    const titulo = document.querySelector('.pergunta-titulo');
    const resposta = document.querySelector('.pergunta-resposta');

    if (!titulo || !resposta) {
        console.error('Elementos não encontrados!');
        return;
    }

    titulo.addEventListener('click', () => {
        resposta.style.display = resposta.style.display === 'none' ? 'block' : 'none';
        console.log(`Resposta visível: ${resposta.style.display}`);
    });
});

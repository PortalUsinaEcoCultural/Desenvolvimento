//ao clicar o botão de rejeitar, ele chama essa função
function aceitarCookies() {
    document.getElementById('cookies-aviso').style.display = 'none';
    localStorage.setItem('cookiesAceitos', 'true');
}

//ao clicar o botão de rejeitar, ele chama essa função
function rejeitarCookies() {
    document.getElementById('cookies-aviso').style.display = 'none';
    localStorage.setItem('cookiesAceitos', 'false');
}

//Para ver se o usuário ja aceitou o cookie alguma vez
window.onload = function() {
    if (localStorage.getItem('cookiesAceitos') !== null) {
        document.getElementById('cookies-aviso').style.display = 'none';
    }
}
//Ao clicar o botão de aceitar
function aceitarCookies() {
    document.getElementById('cookies-aviso').style.display = 'none';
    localStorage.setItem('cookiesAceitos', 'true');
}

//Ao clicar o botão de rejeitar
function rejeitarCookies() {
    document.getElementById('cookies-aviso').style.display = 'none';
    localStorage.setItem('cookiesAceitos', 'false');
}

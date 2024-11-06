function aceitarCookies() {
    document.getElementById('cookies-aviso').style.display = 'none';
    // Salva a preferência do usuário no localStorage para futuras visitas
    localStorage.setItem('cookiesAceitos', 'true');
}

function rejeitarCookies() {
    document.getElementById('cookies-aviso').style.display = 'none';
    // Salva a preferência do usuário no localStorage para futuras visitas
    localStorage.setItem('cookiesAceitos', 'false');
}
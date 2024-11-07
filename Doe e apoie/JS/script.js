// Seleciona os botões de pagamento
const btnPix = document.querySelector('.btn-pagamento:first-child');
const btnPaypal = document.querySelector('.btn-pagamento:last-child');

// Função para gerar o QR Code do PIX
function gerarQRCodePIX(chavePix, valor) {
    // Dados do QR Code em formato do Banco Central para PIX
    const pixData = `00020101021226860014BR.GOV.BCB.PIX0114${chavePix}520400005303986540${valor}5802BR5913Nubank Inc.6009São Paulo62070503***6304`;

    // Gera o QR Code usando a biblioteca QRCode.js
    const qrCodeContainer = document.createElement('div');
    document.body.appendChild(qrCodeContainer);

    new QRCode(qrCodeContainer, {
        text: pixData,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

// Evento de clique no botão PIX
btnPix.addEventListener('click', () => {
    // Lógica para o botão PIX
    console.log('Botão PIX clicado');
    
    // Dados do pagamento
    const chavePix = 'sophiacoelho40@gmail.com';  // Substitua com sua chave PIX (CPF, CNPJ ou e-mail)
    const valor = 100.00;  // Valor da transação
    
    // Exibe o QR Code do PIX
    gerarQRCodePIX(chavePix, valor);
});
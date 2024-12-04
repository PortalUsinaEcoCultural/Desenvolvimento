document.addEventListener('DOMContentLoaded', () => {
    const itensCarrinho = document.getElementById('itensCarrinho');
    const valorTotal = document.getElementById('valorTotal');
    // Recuperar dados do LocalStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;

    if (cartItems.length > 0) {
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}`;
            itensCarrinho.appendChild(li);
        });
        valorTotal.textContent = `Total: R$ ${totalAmount.toFixed(2)}`;
    } else {
        itensCarrinho.innerHTML = '<li>O carrinho está vazio.</li>';
        valorTotal.textContent = `Total: R$ 0,00`;
    }

    document.getElementById("pixBtn").addEventListener("click", function () {
        const qrCodeContainer = document.getElementById("qrCodeContainer");
        
        // Alterna entre mostrar e esconder
        if (qrCodeContainer.style.display === "none" || qrCodeContainer.style.display === "") {
            qrCodeContainer.style.display = "block"; // Mostra o QR Code
        } else {
            qrCodeContainer.style.display = "none"; // Esconde o QR Code
        }
    });

    // Ação do botão "Continuar"
    document.getElementById('continuarBtn').addEventListener('click', () => {
        localStorage.removeItem('cartItems');
        localStorage.removeItem('totalAmount');
        alert('Compra finalizada com sucesso! Agradecemos por sua compra, em breve receberá em sua casa.');
        window.location.href = '/index.html';
    });
});
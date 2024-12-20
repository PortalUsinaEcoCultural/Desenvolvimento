document.addEventListener('DOMContentLoaded', () => {
    const itensCarrinho = document.getElementById('itensCarrinho');
    const valorTotal = document.getElementById('valorTotal');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;


    // Lógica para o resumo da compra
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


    // Lógica para aparecer o Pix quandi ele for selecionado
    document.getElementById("pixBtn").addEventListener("click", function () {
        const qrCodeContainer = document.getElementById("qrCodeContainer");
        if (qrCodeContainer.style.display === "none" || qrCodeContainer.style.display === "") {
            qrCodeContainer.style.display = "block";
        } else {
            qrCodeContainer.style.display = "none"; 
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
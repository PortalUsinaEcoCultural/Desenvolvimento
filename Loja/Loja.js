document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.adicionar');
    const cartItemCount = document.querySelector('.carrinho-quantidade');
    const cartItemsList = document.querySelector('.itens-carrinho');
    const cartTotal = document.querySelector('.total-carrinho');
    const cartIcon = document.querySelector('.carrinho-icone');
    const sidebar = document.querySelector('.sidebar');
    const closeButton = document.querySelector('.fechar-sidebar i');
    const mensagemConfirmacao = document.querySelector('.mensagem-confirmacao');

    let cartItems = [];
    let totalAmount = 0;

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const itemName = document.querySelectorAll('.titulo-card')[index].textContent;
            const itemPrice = parseFloat(document.querySelectorAll('.preco')[index].textContent.replace('R$', '').replace(',', '.'));

            const existingItem = cartItems.find((cartItem) => cartItem.name === itemName);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
            }

            totalAmount += itemPrice;
            updateCartUI();
            mostrarConfirmacao();
        });
    });

    function updateCartUI() {
        updateCartItemCount();
        updateCartItemList();
        updateCartTotal();
    }

    function updateCartItemCount() {
        const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartItemCount.textContent = itemCount;
    }

    function updateCartItemList() {
        cartItemsList.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span>(${item.quantity}x) ${item.name}</span>
                <span class="cart-item-price">R$ ${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-btn" data-index="${index}"><i class="fa-solid fa-times"></i></button>
            `;

            cartItemsList.append(cartItem);
        });

        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', event => {
                const index = event.currentTarget.dataset.index;
                removeItemFromCart(index);
            });
        });
    }

    function removeItemFromCart(index) {
        const removedItem = cartItems[index];
        totalAmount -= removedItem.price * removedItem.quantity;
        cartItems.splice(index, 1);
        updateCartUI();
    }

    function updateCartTotal() {
        cartTotal.textContent = `R$ ${totalAmount.toFixed(2)}`;
    }

    cartIcon.addEventListener('click', () => {
        sidebar.classList.toggle('abrir-sidebar');
    });

    closeButton.addEventListener('click', () => {
        sidebar.classList.remove('abrir-sidebar');
    });
    
    function mostrarConfirmacao() {
        mensagemConfirmacao.classList.add('show');
        setTimeout(() => {
            mensagemConfirmacao.classList.remove('show'); 
        }, 3000);
    }
});

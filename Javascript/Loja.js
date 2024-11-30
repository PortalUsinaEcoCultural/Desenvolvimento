document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.adicionar');
    const cartItemCount = document.querySelector('.carrinho-quantidade');
    const cartItemsList = document.querySelector('.itens-carrinho');
    const cartTotal = document.querySelector('.total-carrinho');
    const cartIcon = document.querySelector('.carrinho-icone');
    const sidebar = document.querySelector('.sidebar');
    const closeButton = document.querySelector('.fechar-sidebar i');
    const mensagemConfirmacao = document.querySelector('.mensagem-confirmacao');
    const checkoutButton = document.querySelector('.checkout'); // Selecionando o botão de checkout
    const checkoutLink = document.querySelector('.rodape-sidebar a'); // Selecionando o link de checkout

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
            mostrarConfirmacao(itemName);
        });
    });

    // Função para mostrar a mensagem de confirmação
    function mostrarConfirmacao(itemName) {
        mensagemConfirmacao.textContent = `"${itemName}" adicionado ao carrinho!`;

        mensagemConfirmacao.classList.add('show');
        setTimeout(() => {
            mensagemConfirmacao.classList.remove('show');
        }, 3000);
    }

    // Função para habilitar/desabilitar o botão de checkout
    function toggleCheckoutButton() {
        const totalValue = parseFloat(cartTotal.textContent.replace('R$', '').replace(',', '.'));
        if (totalValue === 0) {
            checkoutButton.disabled = true; 
            checkoutButton.style.opacity = '0.5'; 
            checkoutButton.style.cursor = 'not-allowed'; 
            checkoutLink.style.pointerEvents = 'none'; 
        } else {
            checkoutButton.disabled = false; 
            checkoutButton.style.opacity = '1'; 
            checkoutButton.style.cursor = 'pointer'; 
            checkoutLink.style.pointerEvents = 'auto'; 
        }
    }

    // Funções de atualização do carrinho
    function updateCartUI() {
        updateCartItemCount();
        updateCartItemList();
        updateCartTotal();
        toggleCheckoutButton(); 
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
        if (removedItem.quantity > 1) {
            removedItem.quantity--;
            totalAmount -= removedItem.price;
        } else {
            totalAmount -= removedItem.price;
            cartItems.splice(index, 1);
        }
        updateCartUI();
    }

    function updateCartTotal() {
        cartTotal.textContent = `R$ ${totalAmount.toFixed(2)}`;
    }

    // Ação do ícone do carrinho
    cartIcon.addEventListener('click', () => {
        sidebar.classList.toggle('abrir-sidebar');
    });

    // Ação do botão de fechar sidebar
    closeButton.addEventListener('click', () => {
        sidebar.classList.remove('abrir-sidebar');
    });

    // Inicialize a verificação do botão ao carregar a página
    toggleCheckoutButton();
});

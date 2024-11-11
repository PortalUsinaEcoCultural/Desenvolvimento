document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart')
    const cartItemCount = document.querySelector('.carrinho-quantidade');
    const cartItemsList = document.querySelector('.itens-carrinho');
    const cartTotal = document.querySelector('.total-carrinho');
    const cartIcon = document.querySelector('.carrinho-icone');
    const sidebar = document - getElementById('.sidebar');

    let cartItems = [];
    let totalAmount = 0;

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const item = {
                name: document.querySelectorAll('.titulo-card')[index].textcontent,
                price: parseFloat(document.querySelectorAll('.preco')[index].textContent.slice(2).replace(',', '.')),
                quantity: 1,
            };

            const exisitingItem = cartItems.find((cartItem) => cartItem.name === item.name);

            if (exisitingItem) {
                exisitingItem.quantity++;
            }
            else {
                cartItems.push(item);
            }

            totalAmount += item.price;

            updateCartUI();
        });
    });

    function updateCartUI() {
        updateCartItemCount(cartItems.length);
        updateCartList();
        updateCartTotal();
    }

    function updateCartItemCount(count) {
        cartItemCount.textContent = count;
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

        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', event => {
                const index = event.target.dataset.index;
                removeItemFromCart(index);
            });
        });
    }

    function removeltemFromCart(index) {
        const removeltem = cartItems.splice(index, 1)[0];
        totalAmount -= removeltem.price * removeItem.quantity;
        updateCartUI;
    }

    function updateCartTotal() {
        cartTotal.textContent = 'R${totalAmount.toFixed(2)}';
    }

    cartIcon.addEventListener('click', () => {
        sidebar.classList.toggle('abrir-sidebar');
    });

    const closeButton = document.querySelector('.sidebar-close');
    closeButton.addEventListener('click', () => {
        sidebar.classList.remove('abrir-sidebar');
    });

});
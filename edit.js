// Função para carregar o conteúdo salvo no localStorage
function carregarConteudo() {
    document.querySelectorAll("[data-editable]").forEach(element => {
        const savedText = localStorage.getItem(element.getAttribute("data-key"));
        if (savedText) {
            element.innerText = savedText; 
        }
    });
}

// Função para ativar o modo de edição
function ativarEdicao() {
    if (localStorage.getItem('loggedIn') === 'true') { 
        document.querySelectorAll("[data-editable]").forEach(element => {
            element.setAttribute("contenteditable", "true"); 
        });
        mostrarModal("Modo de edição ativado. Clique em 'Salvar Edições' para salvar ou 'Desfazer Todas Edições' para reverter.");
    } else {
        mostrarModal("Você precisa estar logado para ativar o modo de edição.");
    }
}

// Função para salvar as edições no localStorage
function salvarEdicoes() {
    if (localStorage.getItem('loggedIn') === 'true') { 
        document.querySelectorAll("[data-editable]").forEach(element => {
            const key = element.getAttribute("data-key"); 
            localStorage.setItem(key, element.innerText); 
        });
        mostrarModal("Edições salvas com sucesso!");
    } else {
        mostrarModal("Você precisa estar logado para salvar as edições.");
    }
}

// Função para desfazer todas as edições e restaurar o conteúdo original
function desfazerEdicoes() {
    if (localStorage.getItem('loggedIn') === 'true') { 
        if (confirm("Tem certeza que deseja desfazer todas as edições? Esta ação é irreversível.")) {
            document.querySelectorAll("[data-editable]").forEach(element => {
                const key = element.getAttribute("data-key"); 
                localStorage.removeItem(key); 
                element.innerText = element.getAttribute("data-original"); 
            });
            mostrarModal("Todas as edições foram desfeitas.");
        }
    } else {
        mostrarModal("Você precisa estar logado para desfazer as edições.");
    }
}

// Função para salvar o conteúdo original antes de qualquer edição
function salvarConteudoOriginal() {
    document.querySelectorAll("[data-editable]").forEach(element => {
        element.setAttribute("data-original", element.innerText); 
    });
}

// Função para exibir um modal com uma mensagem
function mostrarModal(mensagem) {
    const modal = document.getElementById("modal"); 
    const modalMessage = document.getElementById("modal-message"); 
    modalMessage.innerText = mensagem; 
    modal.style.display = "flex"; 
}


// Função para fechar o modal
function fecharModal() {
    const modal = document.getElementById("modal"); 
    modal.style.display = "none"; 
}

// Configuração inicial ao carregar a página
window.onload = function () {
    // Verifica se o usuário está logado
    const loggedIn = localStorage.getItem('loggedIn') === 'true';

    // Verifique se os botões de edição estão no HTML
    const botoesEdicao = document.querySelector(".edit-buttons-container");

    if (botoesEdicao) {
        botoesEdicao.style.display = loggedIn ? "block" : "none";
    }

    salvarConteudoOriginal();

    carregarConteudo();
};
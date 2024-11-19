// Função para verificar a autenticação do usuário
async function verificarAutenticacao() {
    try {
        const response = await fetch('http://localhost:3000/verificar-autenticacao');
        if (!response.ok) throw new Error('Falha na requisição');
        
        const data = await response.json();
        return data.autenticado; // Certifique-se de que a API retorna { autenticado: true }
    } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        return false;
    }
}

// Inicializa os estados da página ao carregar
document.addEventListener("DOMContentLoaded", async function () {
    esconderBotoesDeEdicao();
    salvarConteudoOriginal();
    carregarConteudo();

    // Gerencia o botão de logout baseado na autenticação
    const logoutButton = document.getElementById('logoutButton');
    const autenticado = await verificarAutenticacao();

    if (autenticado) {
        logoutButton.style.display = 'block'; // Exibe o botão de logout
        console.log("Usuário autenticado, botão de logout visível.");
    } else {
        logoutButton.style.display = 'none'; // Esconde o botão de logout
        console.log("Usuário não autenticado, botão de logout oculto.");
    }
});

// Função para logout
function logout() {
    fetch('http://localhost:3000/logout', {
        method: 'GET',
        credentials: 'include', // Inclui os cookies na requisição
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao fazer logout');
        }
        // Após o logout, ocultar o botão de logout e mostrar o botão de login novamente
        const loginButton = document.querySelector('.login-button');
        const logoutButton = document.getElementById('logoutButton');
        if (loginButton) loginButton.classList.remove('logged-in');
        if (logoutButton) logoutButton.style.display = 'none';

        // Esconde os botões de edição
        const editContainer = document.querySelector(".edit-buttons-container");
        if (editContainer) editContainer.style.display = "none";

        console.log('Usuário deslogado');
    })
    .catch(error => console.error('Erro ao deslogar:', error));
}

// Adiciona o evento de clique para o botão de logout
document.getElementById('logoutButton')?.addEventListener('click', logout);

// Função para carregar o conteúdo salvo do localStorage
function carregarConteudo() {
    document.querySelectorAll("[data-editable]").forEach(element => {
        const savedText = localStorage.getItem(element.getAttribute("data-key"));
        if (savedText) {
            element.innerText = savedText;
        }
    });
}

// Salva o conteúdo original dos elementos editáveis
function salvarConteudoOriginal() {
    document.querySelectorAll("[data-editable]").forEach(element => {
        element.setAttribute("data-original", element.innerText);
    });
}

// Esconde os botões de edição inicialmente
function esconderBotoesDeEdicao() {
    const editContainer = document.querySelector(".edit-buttons-container");
    if (editContainer) {
        editContainer.style.display = "none";
    }
}

// Ativa o modo de edição
function ativarEdicao() {
    document.querySelectorAll("[data-editable]").forEach(element => {
        element.setAttribute("contenteditable", "true");
    });
    document.getElementById("editModeBorder").style.display = "block";
    document.getElementById("editModeText").style.display = "block";
    mostrarModal("Modo de edição ativado. Clique em 'Salvar Edições' para salvar ou 'Desfazer Todas Edições' para reverter.");
}

// Salva as edições feitas nos elementos editáveis
function salvarEdicoes() {
    document.querySelectorAll("[data-editable]").forEach(element => {
        const key = element.getAttribute("data-key");
        localStorage.setItem(key, element.innerText);
    });
    document.getElementById("editModeBorder").style.display = "none";
    document.getElementById("editModeText").style.display = "none";
    mostrarModal("Edições salvas com sucesso!");
}

// Desfaz todas as edições, restaurando o conteúdo original
function desfazerEdicoes() {
    if (confirm("Tem certeza que deseja desfazer todas as edições? Esta ação é irreversível.")) {
        document.querySelectorAll("[data-editable]").forEach(element => {
            const key = element.getAttribute("data-key");
            localStorage.removeItem(key);
            element.innerText = element.getAttribute("data-original");
        });
        document.getElementById("editModeBorder").style.display = "none";
        document.getElementById("editModeText").style.display = "none";
        mostrarModal("Todas as edições foram desfeitas.");
    }
}

// Mostra um modal com uma mensagem
function mostrarModal(mensagem) {
    const modal = document.getElementById("modal");
    const modalMessage = document.getElementById("modal-message");
    const modalOverlay = document.getElementById("modal-overlay");

    modalMessage.innerText = mensagem;
    modal.style.display = "block";
    modalOverlay.style.display = "block";
}

// Fecha o modal
function fecharModal() {
    const modal = document.getElementById("modal");
    const modalOverlay = document.getElementById("modal-overlay");

    modal.style.display = "none";
    modalOverlay.style.display = "none";
}


// Garantir que o conteúdo seja tratado ao carregar a página
window.onload = function () {
    salvarConteudoOriginal();
    carregarConteudo();
};
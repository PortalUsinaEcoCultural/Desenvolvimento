// Função para verificar a autenticação do usuário 
async function verificarAutenticacao() {
    try {
        const response = await fetch('http://localhost:3000/verificar-autenticacao', {
            method: 'GET',
            credentials: 'include', // Envia os cookies para autenticação
        });

        if (!response.ok) {
            throw new Error('Falha na requisição');
        }

        const data = await response.json();
        return data.autenticado; // Certifique-se de que a API retorna { autenticado: true }
    } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        return false;
    }
}

// Função para exibir ou esconder o botão de voltar com base na autenticação
document.addEventListener('DOMContentLoaded', async () => {
    const autenticado = await verificarAutenticacao();
    const backButton = document.getElementById("backButton");

    // Exibe ou esconde o botão de voltar dependendo do login
    if (backButton) {
        backButton.style.display = autenticado ? "flex" : "none";
    }
});


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
        // Torna os elementos editáveis
        document.querySelectorAll("[data-editable]").forEach(element => {
            element.setAttribute("contenteditable", "true");
        });

        // Exibe os indicadores de edição
        document.getElementById("editModeBorder").style.display = "block";
        document.getElementById("editModeText").style.display = "block";

        // Exibe o botão de retorno no canto esquerdo
        document.getElementById("backButton").style.display = "none";

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

        // Oculta os indicadores de edição
        document.getElementById("editModeBorder").style.display = "none";
        document.getElementById("editModeText").style.display = "none";

        // Oculta o botão de retorno
        document.getElementById("backButton").style.display = "none";

        mostrarModal("Edições salvas com sucesso!");
    } else {
        mostrarModal("Você precisa estar logado para salvar as edições.");
    }
}

// Verifica se o usuário está logado ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
        // Exibe o botão de voltar se estiver logado
        document.getElementById("backButton").style.display = "flex";
    }
});

// Função para desfazer todas as edições e restaurar o conteúdo original
function desfazerEdicoes() {
    const loggedIn = localStorage.getItem('loggedIn'); // Verifica novamente se está logado
    if (loggedIn === 'true') {
        if (confirm("Tem certeza que deseja desfazer todas as edições? Esta ação é irreversível.")) {
            document.querySelectorAll("[data-editable]").forEach(element => {
                const key = element.getAttribute("data-key");
                localStorage.removeItem(key);
                element.innerText = element.getAttribute("data-original");
            });

            // Oculta os indicadores de edição
            document.getElementById("editModeBorder").style.display = "none";
            document.getElementById("editModeText").style.display = "none";

            // Exibe o botão de voltar após desfazer as edições
            document.getElementById("backButton").style.display = "flex";

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

// Função para o botão de retorno ao modo administrador
function irParaAdmin() {
    alert("Voltando para o modo administrador...");
}

// Configuração inicial ao carregar a página
window.onload = function () {
    // Verifica se o usuário está logado
    const loggedIn = localStorage.getItem('loggedIn') === 'true';

    // Verifica se os botões de edição estão no HTML
    const botoesEdicao = document.querySelector(".edit-buttons-container");

    if (botoesEdicao) {
        botoesEdicao.style.display = loggedIn ? "block" : "none";
    }

    // Verifica se o botão de retorno existe antes de tentar acessar seu estilo
    const backButton = document.getElementById("backButton");
    if (backButton) {
        backButton.style.display = "flex";
    }

    salvarConteudoOriginal();
    carregarConteudo();
};

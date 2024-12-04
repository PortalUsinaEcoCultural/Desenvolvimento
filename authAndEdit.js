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

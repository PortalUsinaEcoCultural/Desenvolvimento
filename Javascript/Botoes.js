// Variáveis de controle
let isLoggedIn = false; // Controle de login
let isEditing = false; // Controle de modo de edição

// Função para exibir os botões de edição e o botão "Voltar" após o login
function login() {
    // Simulação de login bem-sucedido
    console.log("Login realizado");
    isLoggedIn = true;
    exibirBotoesEdicao();  // Exibe os botões de edição
    exibirBotaoVoltar();  // Exibe o botão "Voltar"
}

// Função para exibir os botões de edição quando o login for realizado
function exibirBotoesEdicao() {
    console.log("Exibindo botões de edição");
    if (isLoggedIn) {
        document.getElementById("editButtons").style.display = "flex";
    }
}

// Função para exibir o botão "Voltar" após o login
function exibirBotaoVoltar() {
    const backButton = document.getElementById("backButton");
    if (backButton) {
        backButton.style.display = "block"; // Torna o botão visível
    }
}


// Função para exibir os botões de edição quando o login for realizado
function exibirBotoesEdicao() {
    console.log("Exibindo botões de edição");  // Adicionado para depuração
    if (isLoggedIn) {
        document.getElementById("editButtons").style.display = "flex";
    }
}

// Função para ativar o modo de edição
function ativarEdicao() {
    if (!isLoggedIn) {
        alert("Você precisa fazer login primeiro.");
        return;
    }

    isEditing = true;
    document.getElementById("editModeBorder").style.display = "block";
    document.getElementById("editModeText").style.display = "block";
    document.querySelectorAll(".edit-button").forEach(button => {
        button.disabled = false; // Habilita os botões de edição
    });
}

// Função para salvar as edições
function salvarEdicoes() {
    if (!isEditing) {
        alert("Ative o modo de edição primeiro.");
        return;
    }

    console.log("Salvando as edições...");  // Para depuração
    document.querySelectorAll('[contenteditable="true"]').forEach(function (element) {
        const key = element.getAttribute('data-key');  // Recupera a chave (data-key)
        const text = element.innerHTML.trim();  // Recupera o texto do conteúdo editado
        if (text) {
            console.log(`Salvando a chave ${key}: ${text}`);  // Depuração
            localStorage.setItem(key, text);  // Salva o texto no localStorage
        } else {
            console.log(`O conteúdo da chave ${key} está vazio. Não foi salvo.`);  // Depuração
        }
    });
    alert("Edições salvas com sucesso!");
    isEditing = false;
    document.getElementById("editModeBorder").style.display = "none";
    document.getElementById("editModeText").style.display = "none";
}

// Função para desfazer todas as edições
function desfazerEdicoes() {
    if (!isEditing) {
        alert("Ative o modo de edição primeiro.");
        return;
    }

    console.log("Desfazendo as edições...");  // Para depuração

    // Lógica para desfazer as edições
    document.querySelectorAll('[data-key]').forEach(function (element) {
        const key = element.getAttribute('data-key');
        const savedText = localStorage.getItem(key);

        if (savedText !== null && savedText !== "") {
            element.innerHTML = savedText;  // Restaura o conteúdo salvo no localStorage
        }
    });

    alert("Todas as edições foram desfeitas.");
    isEditing = false;
    document.getElementById("editModeBorder").style.display = "none";
    document.getElementById("editModeText").style.display = "none";
}

// Função para carregar as edições ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    carregarEdicoes();
});

function carregarEdicoes() {
    console.log("Carregando as edições salvas...");
    document.querySelectorAll('[contenteditable="true"]').forEach(function (element) {
        const key = element.getAttribute('data-key');
        const savedText = localStorage.getItem(key);
        if (savedText !== null && savedText !== "") {
            console.log(`Restaurando o conteúdo para ${key}: ${savedText}`);
            element.innerHTML = savedText;  // Atualiza o texto com o salvo
        } else {
            console.log(`Nenhuma edição salva encontrada para a chave ${key}.`);
        }
    });
}

// Função para abrir o modal
function abrirModal(mensagem) {
    console.log("Abrindo modal com mensagem: " + mensagem);  // Adicionado para depuração
    document.getElementById('modal-overlay').style.display = 'block';
    document.getElementById('modal').style.display = 'block';
    document.getElementById('modal-message').textContent = mensagem;
}

// Função para fechar o modal
function fecharModal() {
    console.log("Fechando o modal");  // Adicionado para depuração
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('modal').style.display = 'none';
}

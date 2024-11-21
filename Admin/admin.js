// Função para salvar o perfil
document.getElementById("salvar-perfil").addEventListener("click", salvarPerfil);

function salvarPerfil() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Validar e-mail e senha
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    let isValid = true;

    // Resetando os estilos dos campos de erro
    document.getElementById("email").classList.remove("is-invalid");
    document.getElementById("senha").classList.remove("is-invalid");

    // Validação do e-mail
    if (!emailRegex.test(email)) {
        alert("Por favor, insira um e-mail válido.");
        document.getElementById("email").classList.add("is-invalid"); // Adiciona classe de erro
        isValid = false;
    }

    // Validação da senha
    if (!senhaRegex.test(senha)) {
        alert("A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula e um número.");
        document.getElementById("senha").classList.add("is-invalid"); // Adiciona classe de erro
        isValid = false;
    }

    // Se os dados não são válidos, não salva nada
    if (!isValid) {
        return; // Não salva dados e não atualiza o Local Storage
    }

    // Salvar os dados no Local Storage
    localStorage.setItem("nome", nome);
    localStorage.setItem("email", email);
    localStorage.setItem("senha", senha);

    console.log("Dados salvos:", { nome, email, senha });

    // Exibir o modal de sucesso
    const modal = document.getElementById("modal-salvo");
    modal.style.display = "flex";

    // Fechar o modal ao clicar no botão
    document.getElementById("fechar-modal").addEventListener("click", function () {
        modal.style.display = "none";
    });
}

// Selecionar os campos de entrada
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");

// Carregar os dados salvos ao iniciar a página
window.onload = function () {
    if (localStorage.getItem("nome")) {
        nomeInput.value = localStorage.getItem("nome");
    }
    if (localStorage.getItem("email")) {
        emailInput.value = localStorage.getItem("email");
    }
    if (localStorage.getItem("senha")) {
        senhaInput.value = localStorage.getItem("senha");
    }
};

// Função do olhinho para mostrar ou esconder a senha
document.getElementById("toggle-password").addEventListener("click", function () {
    const senhaInput = document.getElementById("senha");
    const passwordIcon = document.getElementById("password-icon");

    if (senhaInput.type === "password") {
        senhaInput.type = "text";
        passwordIcon.classList.remove("fa-eye");
        passwordIcon.classList.add("fa-eye-slash");
    } else {
        senhaInput.type = "password";
        passwordIcon.classList.remove("fa-eye-slash");
        passwordIcon.classList.add("fa-eye");
    }
});

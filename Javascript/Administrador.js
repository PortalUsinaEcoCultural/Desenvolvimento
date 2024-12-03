// Função para salvar o perfil
document.getElementById('salvar-perfil').addEventListener('click', function () {
    const form = document.getElementById('perfil-form');
    const fields = form.querySelectorAll('.form-control');
    let isValid = true;
    let errorMessage = '';

    fields.forEach(field => {
        const value = field.value.trim();
        const originalValue = field.getAttribute('data-original');

        if (field.id === 'nome' && value === '') {
            isValid = false;
            errorMessage += 'O nome não pode estar vazio.<br>';
            field.value = originalValue; 
        }

        if (field.id === 'email' && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|br)$/.test(value)) {
            isValid = false;
            errorMessage += 'O email deve ser válido';
            field.value = originalValue; 
        }

        if (field.id === 'senha' && value.length < 8) {
            isValid = false;
            errorMessage += 'A senha deve ter pelo menos 8 caracteres.<br>';
            field.value = originalValue; 
        }
    });

    if (!isValid) {
        const errorModal = document.getElementById('error-modal');
        document.getElementById('error-message').innerHTML = errorMessage;
        errorModal.style.display = 'flex';

        document.getElementById('close-modal').onclick = function () {
            errorModal.style.display = 'none';
        };
    } else {
        const successModal = document.getElementById('success-modal');
        successModal.style.display = 'flex';

        document.getElementById('close-success-modal').onclick = function () {
            successModal.style.display = 'none';
        };
    }
});

// Selecionar os campos de entrada
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");

// Carregar os dados salvos ao iniciar a página
window.onload = function () {
    const nome = localStorage.getItem("nome") || "Nome não definido";
    const email = localStorage.getItem("email") || "Email não definido";
    const senha = localStorage.getItem("senha") || "";

    nomeInput.value = nome; // Atualiza o campo de nome
    emailInput.value = email; // Atualiza o campo de email
    senhaInput.value = senha; // Atualiza o campo de senha
};

// Função do olhinho para mostrar ou esconder a senha
document.addEventListener("DOMContentLoaded", function () {
    const salvarBtn = document.getElementById("salvar-perfil");

    if (salvarBtn) {
        salvarBtn.addEventListener("click", function () {
            // Obtém os valores dos campos de perfil
            const nome = document.getElementById("nome").value;
            const email = localStorage.getItem("email"); // O email é usado como identificador único
            const senha = document.getElementById("senha").value;

            // Validações básicas
            if (!nome || !email) {
                alert("Nome e email são obrigatórios.");
                return;
            }

            // Envia os dados atualizados para o backend
            fetch("http://localhost:3000/atualizarPerfil", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, nome, senha }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Atualiza o nome no localStorage
                        localStorage.setItem("nome", nome);

                        // Atualiza a mensagem de boas-vindas
                        const welcomeMessage = document.querySelector("h2.mb-4");
                        if (welcomeMessage) {
                            welcomeMessage.textContent = `Bem-vindo, ${nome}!`;
                        }

                        // Exibe a mensagem de sucesso
                        alert("Perfil atualizado com sucesso!");
                    } else {
                        // Exibe o erro do backend (caso haja)
                        alert("Erro ao atualizar perfil: " + data.message);
                    }
                })
                .catch(error => {
                    console.error("Erro ao salvar perfil:", error);
                    alert("Erro ao salvar perfil. Por favor, tente novamente.");
                });
        });
    }
});

function exibirPopup(id, mensagem) {
    const popup = document.getElementById(id);
    if (popup) {
        popup.querySelector("span").innerText = mensagem;
        popup.style.display = "flex";

        // Oculta automaticamente após 5 segundos
        setTimeout(() => {
            popup.style.display = "none";
        }, 5000);
    }
}

function fecharPopup(id) {
    const popup = document.getElementById(id);
    if (popup) {
        popup.style.display = "none";
    }
}



function logout() {
    // Limpar dados do localStorage
    localStorage.removeItem("nome");
    localStorage.removeItem("email");
    localStorage.removeItem("senha");

    // Mensagem de logout e redirecionamento
    alert("Você foi deslogado!");
    window.location.href = "/Login/Login.html";
}

// Gráficos
if (localStorage.getItem('acessos')) {
    let contador = parseInt(localStorage.getItem('acessos')) + 1;
    localStorage.setItem('acessos', contador);
} else {
    localStorage.setItem('acessos', 1);
}

// Exibe o número total de acessos no site
document.getElementById('acesso-total').innerText = localStorage.getItem('acessos');

// Dados para o gráfico de Acessos
var acessoDados = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'], // Mês
    datasets: [{
        label: 'Acessos ao Site',
        data: [10, 15, 20, 25, 30],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }]
};
// Gráfico de Acessos ao Site
var ctxAcesso = document.getElementById('acessoGrafico').getContext('2d');
new Chart(ctxAcesso, {
    type: 'bar',
    data: acessoDados,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Dados para o gráfico de Vendas
var vendasDados = {
    labels: ['Camiseta branca', 'Botton', 'Boné', 'Caneca'], 
    datasets: [{
        label: 'Vendas por Produto',
        data: [5, 10, 8, 15],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }]
};
// Gráfico de Vendas por Produto
var ctxVendas = document.getElementById('vendasGrafico').getContext('2d');
new Chart(ctxVendas, {
    type: 'pie',
    data: vendasDados,
    options: {
        responsive: true,
    }
});
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


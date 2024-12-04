let isLoggedIn = false; // Controle de login
        let isEditing = false; // Controle de edição

        // Função para simular o login
        function login() {
            console.log("Login realizado");
            isLoggedIn = true;
            exibirBotoesEdicao();
            exibirBotaoVoltar();
        }

        // Exibe os botões de edição
        function exibirBotoesEdicao() {
            if (isLoggedIn) {
                document.getElementById("editButtons").style.display = "flex";
            }
        }

        // Exibe o botão "Voltar"
        function exibirBotaoVoltar() {
            const backButton = document.getElementById("backButton");
            if (backButton) {
                backButton.style.display = "block";
            }
        }

        // Ativa o modo de edição
        function ativarEdicao() {
            if (!isLoggedIn) {
                alert("Você precisa fazer login primeiro.");
                return;
            }
            isEditing = true;
            document.getElementById("editModeBorder").style.display = "block";
            document.getElementById("editModeText").style.display = "block";
            document.querySelectorAll('[contenteditable="true"]').forEach(element => {
                element.classList.add('active');
            });
        }

        // Salva as edições
        function salvarEdicoes() {
            if (!isEditing) {
                alert("Ative o modo de edição primeiro.");
                return;
            }
            document.querySelectorAll('[contenteditable="true"]').forEach(element => {
                const key = element.getAttribute('data-key');
                const text = element.innerHTML.trim();
                if (text) {
                    localStorage.setItem(key, text);
                }
            });
            alert("Edições salvas com sucesso!");
            finalizarEdicao();
        }

        // Desfaz as edições
        function desfazerEdicoes() {
            if (!isEditing) {
                alert("Ative o modo de edição primeiro.");
                return;
            }
            document.querySelectorAll('[data-key]').forEach(element => {
                const key = element.getAttribute('data-key');
                const savedText = localStorage.getItem(key);
                if (savedText) {
                    element.innerHTML = savedText;
                }
            });
            alert("Edições desfeitas.");
            finalizarEdicao();
        }

        // Finaliza o modo de edição
        function finalizarEdicao() {
            isEditing = false;
            document.getElementById("editModeBorder").style.display = "none";
            document.getElementById("editModeText").style.display = "none";
            document.querySelectorAll('[contenteditable="true"]').forEach(element => {
                element.classList.remove('active');
            });
        }

        // Carrega as edições ao carregar a página
        document.addEventListener('DOMContentLoaded', function () {
            carregarEdicoes();
        });

        function carregarEdicoes() {
            document.querySelectorAll('[contenteditable="true"]').forEach(element => {
                const key = element.getAttribute('data-key');
                const savedText = localStorage.getItem(key);
                if (savedText) {
                    element.innerHTML = savedText;
                }
            });
        }

        // Abre o modal
        function abrirModal(mensagem) {
            document.getElementById('modal-overlay').style.display = 'block';
            document.getElementById('modal').style.display = 'block';
            document.getElementById('modal-message').textContent = mensagem;
        }

        // Fecha o modal
        function fecharModal() {
            document.getElementById('modal-overlay').style.display = 'none';
            document.getElementById('modal').style.display = 'none';
        }
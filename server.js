// npm init -y 
// npm install express mongoose body-parser nodemon bcrypt
// Para executar, use o comando "node server.js"
// Deve aparecer a mensagem: "Servidor rodando em http://localhost:3000 e conectado ao MongoDB"

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt'); // Usando bcrypt para hash de senhas

const app = express();
const port = 3000;

// Configuração do CORS
app.use(cors());

// Middleware para parsear os dados do corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do express-session
app.use(session({
    secret: 'seuSegredoAqui',
    resave: false,
    saveUninitialized: true,
}));

// Serve todos os diretórios definidos no array
const directories = [
    'Admin', 'Boletim', 'Doe', 'Doe e apoie', 'Eventos',
    'Login/FalaConosco/Fale_Conosco.html', 'Galeria', 'Galeria Teste', 'Historia', 'Login', 'Loja',
    'Noticias', 'O Coletivo', 'Quem Somos'
];

// Serve os arquivos estáticos
directories.forEach(dir => {
    app.use(express.static(path.join(__dirname, dir)));
});

// Conexão com o MongoDB
async function conectarAoMongoDB() {
    try {
        await mongoose.connect('mongodb+srv://sophiacoelho40:sophia010306@cluster0.vztzz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Conectado ao MongoDB');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err);
    }
}

// Definindo o esquema do MongoDB
const User = mongoose.model('User', mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true }
}));

// Rota de cadastro de novo usuário
app.post('/signup', async (req, res) => {
    const { nome, email, senha } = req.body; // Extraindo dados do corpo da requisição

    try {
        // Verificar se o usuário já existe
        const usuarioExistente = await User.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({
                success: false,
                message: 'Este e-mail já está cadastrado.'
            });
        }

        // Gerar o salt e criptografar a senha
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        // Criar o novo usuário com a senha criptografada
        const novoUsuario = new User({
            nome,
            email,
            senha: senhaHash
        });

        // Salvar o novo usuário no banco de dados
        await novoUsuario.save();

        res.status(201).json({
            success: true,
            message: 'Cadastro realizado com sucesso!'
        });
    } catch (err) {
        console.error(err); // Verifique o erro no console do servidor
        res.status(500).json({
            success: false,
            message: 'Erro ao processar cadastro.'
        });
    }
});

// Rota de login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const usuario = await User.findOne({ email });

        if (usuario) {
            const senhaValida = await bcrypt.compare(senha, usuario.senha);

            if (senhaValida) {
                req.session.user = { nome: usuario.nome, email: usuario.email }; // Armazena apenas os dados necessários

                console.log("Usuário logado:", req.session.user); // Log temporário para verificação

                res.status(200).json({
                    success: true,
                    message: `Bem-vindo(a), ${usuario.nome}!`
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'E-mail ou senha incorretos.'
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'E-mail ou senha incorretos.'
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Erro ao processar login.'
        });
    }
});

// Rota de verificação de autenticação
app.get('/verificar-autenticacao', (req, res) => {
    if (req.session.user) {
        res.status(200).send({ autenticado: true });
    } else {
        res.status(401).send({ autenticado: false });
    }
});

// Rota de logout
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Erro ao deslogar.');
        }
        res.status(200).send('Logout realizado com sucesso.');
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    conectarAoMongoDB();
});
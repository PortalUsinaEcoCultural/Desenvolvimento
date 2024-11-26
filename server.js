// npm init -y 
// npm install express mongoose body-parser nodemon bcrypt npm install jsonwebtoken
// Para executar, use o comando "node server.js"
// Deve aparecer a mensagem: "Servidor rodando em http://localhost:3000 e conectado ao MongoDB"
//mongodb+srv://sophiacoelho40:sophia010306@cluster0.vztzz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Configuração do CORS
app.use(cors({
    origin: 'http://127.0.0.1:5501', // Substitua pelo domínio do frontend
    credentials: true, // Permite o envio de cookies
}));

// Middleware para parsear os dados do corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Configuração do express-session
app.use(session({
    secret: 'Usina',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Use "true" se estiver em HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 dia
    },
}));

// Serve os arquivos estáticos
const directories = [
    'Admin', 'Boletim', 'Doe', 'Eventos', 'Login', 'Loja',
    'Noticias', 'O Coletivo', 'Quem Somos'
];
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

// Modelo do MongoDB
const User = mongoose.model('User', mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true }
}));

// Rota de cadastro
app.post('/signup', async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const usuarioExistente = await User.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ success: false, message: 'E-mail já cadastrado.' });
        }

        const senhaHash = await bcrypt.hash(senha, 10);
        const novoUsuario = new User({ nome, email, senha: senhaHash });
        await novoUsuario.save();

        res.status(201).json({ success: true, message: 'Cadastro realizado com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Erro ao processar cadastro.' });
    }
});

// Rota de login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const usuario = await User.findOne({ email });
        if (usuario && await bcrypt.compare(senha, usuario.senha)) {
            req.session.user = { nome: usuario.nome, email: usuario.email };
            res.status(200).json({ success: true, message: `Bem-vindo(a), ${usuario.nome}!` });
        } else {
            res.status(400).json({ success: false, message: 'E-mail ou senha incorretos.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Erro ao processar login.' });
    }
});

// Rota de verificação de autenticação
app.get('/verificar-autenticacao', (req, res) => {
    if (req.session.user) {
        res.status(200).json({ autenticado: true, usuario: req.session.user });
    } else {
        res.status(401).json({ autenticado: false });
    }
});

// Rota de logout
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao deslogar.' });
        }
        res.clearCookie('connect.sid'); // Limpa o cookie de sessão
        res.status(200).json({ success: true, message: 'Logout realizado com sucesso.' });
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    conectarAoMongoDB();
});

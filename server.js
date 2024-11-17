// npm init -y
// npm install express mongoose body-parser nodemon
// Para executar, use o comando "node server.js"
// Deve aparecer a mensagem: "Servidor rodando em http://localhost:3000 e conectado ao MongoDB"

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); // Importa o middleware cors

const app = express();
const port = 3000;

// Middleware para habilitar o CORS
app.use(cors()); // Permite todas as origens por padrão

// Middleware para parsear os dados do corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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

// Rota para cadastro de usuário
app.post('/signup', async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const novoUsuario = new User({ nome, email, senha });
        await novoUsuario.save();
        res.status(201).send('Usuário cadastrado com sucesso!');
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).send('Este e-mail já está cadastrado.');
        } else {
            res.status(500).send('Erro ao cadastrar usuário.');
        }
    }
});

// Rota para login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await User.findOne({ email, senha });
        if (usuario) {
            res.json({ success: true, message: `Bem-vindo, ${usuario.nome}!` });
        } else {
            res.status(400).json({ success: false, message: 'E-mail ou senha incorretos.' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Erro ao processar login.' });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    conectarAoMongoDB();
});

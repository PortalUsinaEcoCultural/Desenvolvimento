// npm init -y 
// npm install express mongoose body-parser nodemon bcrypt nodemailer dotenv cors
// Para executar, use o comando "node server.js"
// Deve aparecer a mensagem: "Servidor rodando em http://localhost:3000 e conectado ao MongoDB"

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = 3000;

// Configuração do CORS
app.use(cors({
    origin: 'http://127.0.0.1:5501',
    credentials: true,
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
        secure: false,
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
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado ao MongoDB');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err);
    }
}

// Modelo de Usuário
const User = mongoose.model('User', mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true }
}));

// Modelo de Doação
const Doacao = mongoose.model('Doacao', mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    email: { type: String, required: true },
    comentario: { type: String },
    metodoPagamento: { type: String, required: true },
    data: { type: Date, default: Date.now }
}));

// Rota de cadastro de usuário
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

// Rota de login de usuário
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

// Rota para registrar doações
app.post('/doacao', async (req, res) => {
    const { nome, sobrenome, email, comentario, metodoPagamento } = req.body;

    try {
        const novaDoacao = new Doacao({ nome, sobrenome, email, comentario, metodoPagamento });
        await novaDoacao.save();

        // Configurar e enviar o e-mail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_DESTINO, // E-mail do responsável pelas doações
            subject: 'Nova Doação Recebida',
            text: `
                Uma nova doação foi registrada:
                Nome: ${nome} ${sobrenome}
                Email: ${email}
                Comentário: ${comentario || 'Nenhum'}
                Método de Pagamento: ${metodoPagamento}
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Doação registrada e e-mail enviado!' });
    } catch (error) {
        console.error('Erro ao salvar a doação:', error);
        res.status(500).json({ error: 'Erro ao processar a doação' });
    }
});

// Rota de logout
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao deslogar.' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ success: true, message: 'Logout realizado com sucesso.' });
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    conectarAoMongoDB();
});

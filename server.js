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

// Configuração para aceitar dados em JSON e URL codificado
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

const Voluntario = mongoose.model('Voluntario', mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    email: { type: String, required: true },
    comentario: { type: String },
    comoOuviu: { type: String },
    data: { type: Date, default: Date.now },
}));


app.post('/voluntarios', async (req, res) => {
    const { nome, sobrenome, email, comentario, comoOuviu } = req.body;

    try {
        // Salvar dados no MongoDB
        const novoVoluntario = new Voluntario({ nome, sobrenome, email, comentario, comoOuviu });
        await novoVoluntario.save();

        // Configurar o transporte de e-mail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Configurar conteúdo do e-mail
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_DESTINO, // E-mail do responsável pelos voluntários
            subject: 'Novo Cadastro de Voluntário',
            text: `
                Novo voluntário cadastrado:
                Nome: ${nome} ${sobrenome}
                Email: ${email}
                Comentário: ${comentario || 'Nenhum'}
                Como ouviu falar: ${comoOuviu || 'Não informado'}
            `,
        };

        // Enviar o e-mail
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Voluntário registrado e e-mail enviado!' });
    } catch (error) {
        console.error('Erro ao salvar voluntário:', error);
        res.status(500).json({ error: 'Erro ao processar o cadastro do voluntário' });
    }
});

// Adicione este modelo para Parceiro
const Parceiro = mongoose.model('Parceiro', mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    email: { type: String, required: true },
    comentario: { type: String },
    comoOuviu: { type: String },
    data: { type: Date, default: Date.now }
}));

// Rota para registrar parceiros
app.post('/parceiro', async (req, res) => {
    const { nome, sobrenome, email, comentario, comoOuviu } = req.body;

    try {
        const novoParceiro = new Parceiro({ nome, sobrenome, email, comentario, comoOuviu });
        await novoParceiro.save();

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
            to: process.env.EMAIL_DESTINO, // E-mail do responsável pelos parceiros
            subject: 'Novo Interesse em Parceria',
            text: `
                Um novo interessado em parceria preencheu o formulário:
                Nome: ${nome} ${sobrenome}
                Email: ${email}
                Contribuição: ${comentario || 'Nenhuma'}
                Como ouviu: ${comoOuviu || 'Não informado'}
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Dados enviados e e-mail enviado ao responsável!' });
    } catch (error) {
        console.error('Erro ao salvar parceiro:', error);
        res.status(500).json({ error: 'Erro ao processar o registro de parceiro' });
    }
});

// Definição do modelo de pagamento
const pagamentoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    endereco: { type: String, required: true },
    email: { type: String, required: true },
    data: { type: Date, default: Date.now }
});

const Pagamento = mongoose.model('Pagamento', pagamentoSchema);

// Rota para registrar o pagamento
app.post('/pagamento', async (req, res) => {
    const { nome, sobrenome, endereco, email } = req.body;

    try {
        // Criando o novo documento no banco de dados
        const novoPagamento = new Pagamento({ nome, sobrenome, endereco, email });
        await novoPagamento.save();

        // Configurando o envio de e-mail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Seu e-mail
                pass: process.env.EMAIL_PASS, // Sua senha
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER, // De quem será o e-mail
            to: process.env.EMAIL_DESTINO, // Para quem vai o e-mail (responsável pelo acompanhamento)
            subject: 'Novo Registro de Pagamento', // Assunto do e-mail
            text: `
            Um novo pagamento foi registrado:
            Nome: ${nome} ${sobrenome}
            Email: ${email}
            Endereço: ${endereco}
            `, // Corpo do e-mail
        };

        // Enviando o e-mail
        await transporter.sendMail(mailOptions);

        // Respondendo ao cliente com sucesso
        res.status(200).json({ message: 'Pagamento registrado e e-mail enviado!' });
    } catch (error) {
        console.error('Erro ao salvar pagamento:', error);
        res.status(500).json({ error: 'Erro ao processar o pagamento' });
    }
});

const Email = mongoose.model("Email", mongoose.Schema({
    Nome: { type: String },
    Email: { type: String }
}));

app.post('/submit_newsletter', async (req, res) => {
    const { name, email } = req.body;

    try {
        // Salvar no MongoDB
        const novoEmail = new Email({ Nome: name, Email: email });
        await novoEmail.save();
        console.log('Novo email salvo no MongoDB:', novoEmail);

        // Configurar o transporte de e-mail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Configurar o conteúdo do e-mail
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email, // Enviar para o email do usuário
            subject: 'Obrigado por se inscrever!',
            html: `<h1>Olá ${name}!</h1><p>Obrigado por se inscrever na nossa newsletter!</p>`,
        };

        // Enviar o e-mail
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Cadastro realizado com sucesso! Verifique seu e-mail para a confirmação.' });
    } catch (error) {
        console.error('Erro ao salvar email ou enviar confirmação:', error);
        res.status(500).json({ error: 'Erro ao processar a inscrição na newsletter.' });
    }
});

async function salvarEventoNoServidor(ano, descricao) {
    const evento = { ano, descricao };

    const response = await fetch('http://localhost:3000/eventos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(evento),  // Converte o evento em JSON para enviar
    });

    if (response.ok) {
        console.log('Evento salvo com sucesso!');
    } else {
        console.error('Erro ao salvar evento');
    }
}

const eventoSchema = new mongoose.Schema({
    ano: { type: Number, required: true },
    descricao: { type: String, required: true },
});

const Evento = mongoose.model('Evento', eventoSchema);

// Rota para obter todos os eventos
app.get('/eventos', async (req, res) => {
    try {
        const eventos = await Evento.find();  // Busca todos os eventos
        res.status(200).json(eventos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar eventos' });
    }
});

// Rota para salvar novos eventos
app.post('/eventos', async (req, res) => {
    const { ano, descricao } = req.body;

    const novoEvento = new Evento({ ano, descricao });

    try {
        await novoEvento.save();  // Salva o evento no banco de dados
        res.status(200).json({ message: 'Evento salvo com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao salvar evento' });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    conectarAoMongoDB();
});

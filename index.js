// npm  init -y
//npm install express, mongoose, nodemailer, body-parser, nodemon

const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// Inicializando o Express
const app = express();
const port = 3000;

// Middleware para parsear os dados do corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));

// Conexão com o MongoDB
async function conectarAoMongoDB() {
    try {
        await mongoose.connect('mongodb+srv://sophiacoelho40:sophia010306@cluster0.vztzz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Conectado ao MongoDB');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB', err);
    }
}

// Definindo o esquema do MongoDB para os emails
const Email = mongoose.model("Email", mongoose.Schema({
    Nome: { type: String },
    Email: { type: String }
}));

// Criando o transporte de e-mail com Nodemailer
const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'sophiacoelho40@gmail.com', // Substitua com seu e-mail
        pass: 'fcxj jrtl xbpd tqgm', // Substitua com a senha do seu e-mail
    }
});

// Endpoint para salvar o email e enviar o e-mail de confirmação
app.post('/submit_newsletter', async (req, res) => {
    const { name, email} = req.body;

    // Salvar no MongoDB
    try {
        const novoEmail = new Email({ Nome: name, Email: email });
        await novoEmail.save();
        console.log('Novo email salvo no MongoDB:', novoEmail);

        // Enviar o e-mail de confirmação
        const info = await transport.sendMail({
            from: 'Sophia <sophiacoelho40@gmail.com>',
            to: email, // E-mail do usuário
            subject: 'Obrigado por se inscrever!',
            html: `<h1>Olá ${name}!</h1><p>Obrigado por se inscrever na nossa newsletter!</p>`,
            text: `Olá ${name}! Obrigado por se inscrever na nossa newsletter!`
        });

        console.log('E-mail enviado:', info);
        res.status(200).send('Cadastro realizado com sucesso! Você receberá uma confirmação por e-mail.');

    } catch (err) {
        console.error('Erro ao salvar o email ou enviar o e-mail de confirmação:', err);
        res.status(500).send('Ocorreu um erro ao processar seu cadastro. Tente novamente mais tarde.');
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    conectarAoMongoDB();
});

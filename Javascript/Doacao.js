const mongoose = require('mongoose');

const DoacaoSchema = new mongoose.Schema({
nome: { type: String, required: true },
sobrenome: { type: String, required: true },
email: { type: String, required: true },
comentario: { type: String },
metodoPagamento: { type: String, required: true },
data: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Doacao', DoacaoSchema);

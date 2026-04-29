const express = require('express');
const app = express();
app.use(express.json());

let livros = [
    { id: 1, livro: "O Hobbit", autor: "J.R.R. Tolkien", co_autores: [], editora: "HarperCollins" }
];

// GET /livros
app.get('/livros', (req, res) => {
    res.status(200).json(livros);
});

// GET /livros/:id
app.get('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).json({ erro: "ID deve ser um número." });
    }

    const livro = livros.find(l => l.id === id);
    if (!livro) {
        return res.status(404).json({ erro: "Livro não encontrado." });
    }

    res.status(200).json(livro);
});

// POST /livros
app.post('/livros', (req, res) => {
    const { livro, autor, co_autores, editora } = req.body;

    // Validações básicas (Caminho Feliz/Simples)
    if (!livro || !autor || !editora) {
        return res.status(400).json({ erro: "Campos obrigatórios: livro, autor e editora." });
    }

    const novoLivro = {
        id: livros.length + 1,
        livro,
        autor,
        co_autores: Array.isArray(co_autores) ? co_autores : [],
        editora
    };

    livros.push(novoLivro);
    res.status(201).json(novoLivro);
});

module.exports = app;

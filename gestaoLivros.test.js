const request = require('supertest');
const app = require('./app');

describe("🎯 Bateria de Testes de Integração - Gestão de Livros", () => {
    
    describe("✅ Testes Positivos (Caminho Feliz)", () => {
        test("CT-01 - Deve listar todos os livros com sucesso", async () => {
            const res = await request(app).get('/livros');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        test("CT-02 - Deve criar um novo livro com sucesso", async () => {
            const novoLivro = {
                livro: "Código Limpo",
                autor: "Robert C. Martin",
                editora: "Alta Books",
                co_autores: []
            };
            const res = await request(app)
                .post('/livros')
                .send(novoLivro);
            
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body.livro).toBe(novoLivro.livro);
        });

        test("CT-03 - Deve buscar um livro por ID existente", async () => {
            const res = await request(app).get('/livros/1');
            expect(res.status).toBe(200);
            expect(res.body.id).toBe(1);
        });
    });

    describe("🔴 Testes Negativos e Validações", () => {
        test("CT-04 - Deve retornar 400 ao enviar livro sem título", async () => {
            const res = await request(app)
                .post('/livros')
                .send({ autor: "Autor", editora: "Editora" });
            expect(res.status).toBe(400);
            expect(res.body.erro).toContain("Campos obrigatórios");
        });

        test("CT-08 - Deve retornar 400 para ID inválido (string)", async () => {
            const res = await request(app).get('/livros/abc');
            expect(res.status).toBe(400);
            expect(res.body.erro).toBe("ID deve ser um número.");
        });

        test("CT-07 - Deve retornar 404 para ID inexistente", async () => {
            const res = await request(app).get('/livros/9999');
            expect(res.status).toBe(404);
            expect(res.body.erro).toBe("Livro não encontrado.");
        });

        test("CT-09 - Deve retornar 400 para payload vazio", async () => {
            const res = await request(app)
                .post('/livros')
                .send({});
            expect(res.status).toBe(400);
        });

        test("CT-06 - Deve aceitar co_autores como não-array e converter para array vazio", async () => {
            const res = await request(app)
                .post('/livros')
                .send({ livro: "L", autor: "A", editora: "E", co_autores: "String inválida" });
            
            expect(res.status).toBe(201);
            expect(Array.isArray(res.body.co_autores)).toBe(true);
            expect(res.body.co_autores.length).toBe(0);
        });
    });

    describe("📏 Análise de Valor Limite (BVA) e Robustez", () => {
        test("Deve retornar 404 para ID 0 (limite inferior de existência)", async () => {
            const res = await request(app).get('/livros/0');
            expect(res.status).toBe(404);
        });

        test("Deve retornar 404 para ID negativo", async () => {
            const res = await request(app).get('/livros/-1');
            expect(res.status).toBe(404);
        });
    });
});

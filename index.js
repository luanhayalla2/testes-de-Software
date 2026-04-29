const SistemaAlunos = require('./sistemaAlunos');
const readline = require('readline');

const sistema = new SistemaAlunos();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("\x1b[36m%s\x1b[0m", "========================================");
console.log("\x1b[36m%s\x1b[0m", "   SISTEMA DE NOTAS ESCOLARES (QA)      ");
console.log("\x1b[36m%s\x1b[0m", "========================================");

const notas = [];

const perguntarNota = (index) => {
    if (index < 4) {
        rl.question(`Digite a nota ${index + 1}: `, (entrada) => {
            try {
                const nota = parseFloat(entrada.replace(',', '.'));
                sistema.validarNota(nota); // Validação sênior em tempo real
                notas.push(nota);
                perguntarNota(index + 1);
            } catch (error) {
                console.log("\x1b[31m%s\x1b[0m", `❌ Erro: ${error.message}`);
                perguntarNota(index); // Pergunta novamente a mesma nota em caso de erro
            }
        });
    } else {
        processarResultado();
    }
};

const processarResultado = () => {
    try {
        const media = sistema.calcularMedia(...notas);
        const status = sistema.verificarStatus(media);

        console.log("\n\x1b[33m%s\x1b[0m", "--- RESULTADO FINAL ---");
        console.log(`Média: \x1b[32m${media.toFixed(2)}\x1b[0m`);
        
        let corStatus = "\x1b[32m"; // Verde para Aprovado
        if (status === "Recuperação") corStatus = "\x1b[33m"; // Amarelo
        if (status === "Reprovado") corStatus = "\x1b[31m"; // Vermelho

        console.log(`Situação: ${corStatus}${status}\x1b[0m`);
        console.log("\x1b[36m%s\x1b[0m", "========================================");
    } catch (error) {
        console.log("\x1b[31m%s\x1b[0m", `❌ Erro crítico: ${error.message}`);
    } finally {
        rl.close();
    }
};

perguntarNota(0);

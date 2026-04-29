const SistemaAlunos = require('./sistemaAlunos');

describe("🎯 Bateria de Testes Sênior - SistemaAlunos", () => {
    let sistema;

    beforeEach(() => {
        sistema = new SistemaAlunos();
    });

    describe("🔍 Método: calcularMedia", () => {
        test("Deve calcular média corretamente com valores inteiros", () => {
            expect(sistema.calcularMedia(7, 8, 9, 6)).toBe(7.5);
        });

        test("Deve tratar valores decimais extremos e arredondar", () => {
            // 9.9 + 9.8 + 9.7 + 9.6 = 39 / 4 = 9.75
            expect(sistema.calcularMedia(9.9, 9.8, 9.7, 9.6)).toBeCloseTo(9.75);
        });

        test("Deve lançar erro se não forem informadas exatamente 4 notas", () => {
            expect(() => sistema.calcularMedia(7, 8, 9)).toThrow("Devem ser informadas 4 notas.");
        });

        test("Deve lançar TypeError para NaN", () => {
            expect(() => sistema.calcularMedia(NaN, 5, 6, 7)).toThrow("Nota inválida.");
        });

        test("Deve lançar TypeError para Infinity", () => {
            expect(() => sistema.calcularMedia(Infinity, 5, 6, 7)).toThrow("Nota inválida.");
        });

        test("Deve lançar erro para notas fora do intervalo (10.1)", () => {
            expect(() => sistema.calcularMedia(10.1, 5, 6, 7)).toThrow("Nota fora do intervalo.");
        });

        test("Deve lançar erro para notas negativas (-1)", () => {
            expect(() => sistema.calcularMedia(-1, 5, 6, 7)).toThrow("Nota fora do intervalo.");
        });
    });

    describe("📏 Método: verificarStatus (Análise de Valor Limite - BVA)", () => {
        const cenarios = [
            { media: 7.0, esperado: "Aprovado" },
            { media: 6.9, esperado: "Recuperação" },
            { media: 5.0, esperado: "Recuperação" },
            { media: 4.9, esperado: "Reprovado" },
            { media: 10.0, esperado: "Aprovado" },
            { media: 0.0, esperado: "Reprovado" }
        ];

        cenarios.forEach(({ media, esperado }) => {
            test(`Média ${media} deve retornar '${esperado}'`, () => {
                expect(sistema.verificarStatus(media)).toBe(esperado);
            });
        });

        test("Deve lançar erro para média inválida (> 10)", () => {
            expect(() => sistema.verificarStatus(11)).toThrow("Nota fora do intervalo.");
        });

        test("Deve lançar erro para média inválida (< 0)", () => {
            expect(() => sistema.verificarStatus(-0.1)).toThrow("Nota fora do intervalo.");
        });
    });
});

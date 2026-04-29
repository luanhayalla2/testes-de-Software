class SistemaAlunos {
    /**
     * Valida se a entrada é um número válido e está no intervalo permitido (0-10).
     * @param {number} nota 
     */
    validarNota(nota) {
        if (typeof nota !== 'number' || isNaN(nota) || !isFinite(nota)) {
            throw new TypeError("Nota inválida.");
        }
        if (nota < 0 || nota > 10) {
            throw new Error("Nota fora do intervalo.");
        }
    }

    /**
     * Calcula a média de 4 notas utilizando rest parameters e reduce.
     * @param  {...number} notas 
     * @returns {number}
     */
    calcularMedia(...notas) {
        if (notas.length !== 4) {
            throw new Error("Devem ser informadas 4 notas.");
        }

        notas.forEach(nota => this.validarNota(nota));

        const media = notas.reduce((acc, n) => acc + n, 0) / 4;
        return Number(media.toFixed(2));
    }

    /**
     * Classifica o aluno com base na média.
     * @param {number} media 
     * @returns {string}
     */
    verificarStatus(media) {
        this.validarNota(media);

        if (media >= 7) return "Aprovado";
        if (media >= 5) return "Recuperação";
        return "Reprovado";
    }
}

module.exports = SistemaAlunos;

# 🧠 SistemaAlunos - Engenharia de Qualidade (QA)

[![Tests](https://github.com/seu-usuario/sistema-alunos/actions/workflows/test.yml/badge.svg)](https://github.com/seu-usuario/sistema-alunos/actions)
![Coverage](https://img.shields.io/badge/Coverage-100%25-brightgreen)

Este projeto demonstra a aplicação de técnicas avançadas de **Garantia de Qualidade (QA)** em um módulo de cálculo de médias escolares. O foco principal é a robustez contra entradas inválidas e a cobertura total das regras de negócio.

## 🎯 Objetivo
Garantir confiabilidade, segurança e previsibilidade através de testes automatizados rigorosos.

## 🚀 Tecnologias
*   **JavaScript (ES6+)**
*   **Jest** (Framework de Testes)
*   **GitHub Actions** (CI/CD)

## 🧪 Estratégia de Testes

### 1. Análise do Valor Limite (BVA)
Focamos nos pontos de transição críticos:
*   **4.9 / 5.0**: Fronteira entre Reprovado e Recuperação.
*   **6.9 / 7.0**: Fronteira entre Recuperação e Aprovado.
*   **0.0 / 10.0**: Limites absolutos do sistema.

### 2. Partição de Equivalência (EP)
Os dados foram divididos em classes de equivalência para otimizar a execução:
*   **Classes Válidas**: Números reais no intervalo [0, 10].
*   **Classes Inválidas**: Strings, `null`, `undefined`, `NaN`, `Infinity` e números fora da faixa permitida.

### 3. Testes de Exceção (Caminho Negativo)
O sistema foi projetado para "falhar rápido" (fail-fast), lançando erros descritivos para prevenir comportamentos inesperados em produção.

## 📈 Cobertura de Código
O projeto mantém **100% de cobertura** em todos os critérios:
*   **Statements**: 100%
*   **Branches**: 100%
*   **Functions**: 100%
*   **Lines**: 100%

## 🛠️ Como Executar

### Pré-requisitos
*   Node.js instalado.

### Instalação
```bash
npm install
```

### Executar Testes
```bash
npm test
```

### Relatório de Cobertura
```bash
npm run test:coverage
```

---
*Projeto desenvolvido para fins didáticos e portfólio de QA Sênior.*

# XSS Testing - Demonstração Educacional

Este projeto é uma aplicação frontend educacional criada para demonstrar riscos de **Cross-Site Scripting (XSS)** de forma controlada e não maliciosa.

## ⚠️ Aviso Importante

Este projeto é **apenas para fins educacionais**. Ele demonstra vulnerabilidades XSS propositalmente para fins de aprendizado. **Nunca use código inseguro em produção!**

## 🎯 Objetivos

Este projeto permite demonstrar:

1. Como renderizar HTML sem proteção é perigoso
2. Como a sanitização previne ataques XSS
3. A diferença prática entre código inseguro e seguro

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ e npm/yarn/pnpm instalados

### Instalação

```bash
npm install
```

### Executar em modo de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
XSS_testing/
├── docs/
│   └── security/
│       └── xss/                  # Documentação educacional sobre XSS (isolada do código)
│           ├── README.md
│           ├── insecure-examples.md
│           └── safe-examples.md
├── src/
│   ├── components/
│   │   ├── InsecureTodoApp.tsx   # Versão vulnerável a XSS
│   │   ├── SecureTodoApp.tsx     # Versão protegida com DOMPurify
│   │   └── TodoApp.css           # Estilos compartilhados
│   ├── utils/
│   │   └── auth.ts               # Utilitários para gerenciar token (opcional)
│   ├── App.tsx                   # Componente principal com roteamento
│   ├── main.tsx                  # Ponto de entrada
│   └── index.css                 # Estilos globais
├── package.json
├── vite.config.ts
└── README.md
```

## 📖 Documentação de segurança

A documentação educacional sobre XSS fica **isolada** do código da aplicação em **[docs/security/xss/](docs/security/xss/)**:

- **[README.md](docs/security/xss/README.md)** — O que é XSS, por que HTML não sanitizado é perigoso e como a doc se relaciona com o app demo.
- **[insecure-examples.md](docs/security/xss/insecure-examples.md)** — Exemplos propositalmente inseguros e explicação dos riscos (sem payloads ou instruções de exploração).
- **[safe-examples.md](docs/security/xss/safe-examples.md)** — Abordagens seguras (texto puro, sanitização) e comparação com os exemplos inseguros.

Essa documentação é apenas para fins educacionais e não deve ser usada em produção.

## 🔐 Funcionalidades

### TODO App com Estado Local

A aplicação funciona completamente em estado local usando `useState` do React. Todos os TODOs são armazenados apenas em memória e não persistem após recarregar a página.

### Duas Versões do TODO App

#### 🔴 Versão Insegura (`/inseguro`)

- Usa `dangerouslySetInnerHTML` sem sanitização
- Qualquer HTML inserido é renderizado diretamente
- Vulnerável a ataques XSS
- **NUNCA use isso em produção!**

#### 🟢 Versão Segura (`/seguro`)

- Usa `DOMPurify` para sanitizar o conteúdo antes de renderizar
- Remove scripts e elementos perigosos
- Previne ataques XSS
- **Abordagem recomendada para produção**

## 📚 Conceitos Demonstrados

### XSS (Cross-Site Scripting)

XSS é uma vulnerabilidade que permite que atacantes injetem scripts maliciosos em páginas web visitadas por outros usuários. Este projeto demonstra:

- **Como acontece**: Renderização direta de HTML sem sanitização
- **Como prevenir**: Sanitização com bibliotecas como DOMPurify


## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para construir interfaces
- **Vite** - Build tool e dev server
- **TypeScript** - Tipagem estática
- **React Router** - Roteamento
- **DOMPurify** - Sanitização de HTML para prevenir XSS

## 📝 Notas Educacionais

### Por que a versão insegura é perigosa?

Quando você usa `dangerouslySetInnerHTML` sem sanitização, qualquer HTML inserido pelo usuário é renderizado diretamente. Isso significa que:

```javascript
// Se alguém inserir:
<script>alert('XSS!')</script>

// Ou pior:
<img src="x" onerror="alert('XSS!')" />
```

Esses scripts serão executados no navegador do usuário, podendo:
- Roubar cookies/tokens
- Redirecionar para sites maliciosos
- Modificar o conteúdo da página
- E muito mais...

### Como a versão segura previne isso?

DOMPurify remove elementos e atributos perigosos antes de renderizar:

```javascript
// Input malicioso:
<script>alert('XSS!')</script>

// Após sanitização:
// (removido completamente)
```

Apenas tags e atributos seguros são permitidos, prevenindo a execução de scripts maliciosos.

## 🎓 Uso Educacional

Este projeto pode ser usado para:

- Demonstrações em vídeo sobre segurança web
- Treinamentos sobre vulnerabilidades XSS
- Aulas sobre segurança frontend
- Estudos sobre sanitização de dados

## ⚖️ Licença

Este projeto é de código aberto e está disponível apenas para fins educacionais.

## 🙏 Contribuições

Este é um projeto educacional. Sugestões e melhorias são bem-vindas, mas lembre-se: o objetivo é educar, não ensinar exploração maliciosa.

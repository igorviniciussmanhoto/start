# Marmo Fácil

Tela responsiva de gerenciamento de materiais, desenvolvida com React e Vite. Tema escuro com detalhes dourados inspirado nas referências do projeto.

## Executar o frontend

Requer Node.js 20.19+ ou 22.12+ (validado com Node.js 24).

```bash
cd frontend
npm ci
npm run dev
```

O Vite informa a porta de desenvolvimento (padrão: 5173). Para gerar a versão de produção: `npm run build`. Para servir essa versão localmente: `npm run preview`.

## Funcionalidades

- Busca por nome ou tipo, sem distinção de acentos.
- Filtros por Mármore, Granito, Quartzo e Lâmina.
- Cadastro e edição com validação dos campos e preços por m².
- Exclusão com confirmação e estados vazios.
- Persistência local no navegador via localStorage, com seis materiais iniciais.
- Diálogos com navegação por teclado, fechamento com Escape e foco contido.

Os dados são locais a cada navegador. Não há autenticação ou sincronização com servidor nesta etapa. Limpar os dados do navegador restaura o catálogo inicial.

## Estrutura

- `frontend/src/App.jsx`: tela e estado do catálogo.
- `frontend/src/components/`: formulário e diálogo acessível reutilizável.
- `frontend/src/materials.js`: dados iniciais, leitura local e formatação.
- `frontend/src/styles.css`: tema, componentes visuais e adaptações responsivas.
- `backend/`: estrutura inicial Spring Boot 3.5, preparada para a futura API.

## Spring Boot (opcional nesta etapa)

Requer Java 17+ e Maven 3.6.3+:

```bash
cd backend
mvn spring-boot:run
```

A estrutura Spring Boot ainda não implementa endpoints de materiais nem banco de dados. O frontend funciona de forma independente. A fonte usa Google Fonts, com alternativas locais caso indisponível.

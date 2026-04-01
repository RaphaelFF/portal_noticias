# PortalNoticias 📰

Portal de notícias, com interface moderna, responsiva e acessível.

## 🚀 Visão Geral

**PortalNoticias** é uma plataforma de publicação de notícias construída com React 18, Vite e Tailwind CSS, oferece:

- ✅ Interface moderna e profissional
- ✅ Layout responsivo (mobile/tablet/desktop)
- ✅ Acessibilidade WCAG AA completa
- ✅ Performance otimizada (FCP < 1.5s)
- ✅ Pronto para produção
- ✅ Escalável e fácil de manter

## 📋 Features

### Funcionalidades Implementadas

- **Manchete Principal**: Notícia destaque com imagem grande, título, resumo e byline completo
- **Grid de Notícias**: 4 notícias secundárias em grid responsivo (1→2→4 colunas)
- **Imagens Otimizadas**: Lazy loading, width/height definidos (evita CLS)
- **Navegação por Teclado**: Tab/Enter completamente funcional
- **Alt Text**: Todas imagens com descrição acessível
- **Tipografia Elegante**: Cores profissionais (cinza escuro + azul)
- **Hover Effects**: Animações suaves ao interagir com elementos
- **Estados Loading**: Spinner customizado durante carregamento
- **Tratamento de Erros**: Mensagens amigáveis se dados não carregarem

## 🛠️ Stack Técnico

### Frontend
- **React** 18.2.0 - UI framework
- **Vite** 5.x - Bundler e dev server
- **Tailwind CSS** 3.4.0 - Styling utilitário
- **React Router** 6.20.0 - Navegação SPA
- **ESLint** - Linting e code quality

### Dados
- **JSON local** (`public/data/news.json`) - Armazenamento de notícias (mockado)
- Pronto para integração com Backend/API

### Deployment
- **Vercel** - Frontend (recomendado)
- **Node.js** - Backend (Railway, Render, DigitalOcean)
- **Cloudinary** - CDN de imagens (optional)

## 📁 Estrutura do Projeto

```
portal_noticias/
├── src/
│   ├── App.jsx                    # Router principal
│   ├── main.jsx                   # Entry point React
│   ├── components/
│   │   ├── NewsFeatured.jsx       # Manchete principal (2 colunas responsivo)
│   │   ├── NewsCard.jsx           # Card individual de notícia
│   │   └── NewsGrid.jsx           # Grid layout com 4 colunas em desktop
│   ├── pages/
│   │   ├── Home.jsx               # Página inicial
│   │   └── Article.jsx            # Página detalhe da notícia
│   ├── hooks/
│   │   └── useNews.js             # Hook para fetch de notícias
│   ├── utils/
│   │   └── constants.js           # Constantes e configuração
│   └── styles/
│       └── globals.css            # Estilos globais + directives Tailwind
├── public/
│   └── data/
│       └── news.json              # Dados mockados de notícias
├── index.html                     # Template HTML
├── package.json                   # Dependências npm
├── vite.config.js                 # Configuração Vite
├── tailwind.config.js             # Configuração Tailwind CSS
├── postcss.config.js              # Pipeline CSS (Tailwind + Autoprefixer)
├── .gitignore                     # Git ignore patterns
└── README.md                      # Este arquivo

specs/                            # Documentação de especificação
├── 001-exibicao-home/
│   ├── spec.md                   # Especificação funcional
│   ├── plan.md                   # Plano de implementação
│   ├── data-model.md             # Modelo de dados
│   ├── research.md               # Pesquisa e decisões técnicas
│   ├── quickstart.md             # Guia de início rápido
│   ├── tasks.md                  # Lista de tarefas (55 tasks)
│   ├── ANALYSIS.md               # Análise de consistência
│   └── checklists/
│       └── requirements.md       # Checklist de requisitos
```

## 🚀 Início Rápido

### Pré-requisitos
- **Node.js** 18+ e **npm** 9+
- Git configurado

### Instalação

```bash
# Clonar repositório
git clone https://github.com/RaphaelFF/portal_noticias.git
cd portal_noticias

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5174/` no navegador.

### Desenvolvimento

```bash
# Servidor de desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview

# Linting com ESLint
npm run lint
```


## 🔄 Fluxo de Dados

```
┌─────────────────────────────────┐
│   public/data/news.json         │
│   (mockado - 1 + 4 notícias)    │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│   useNews Hook                  │
│   (fetch com error handling)    │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│   Home.jsx (Page)               │
│   (gerencia loading/error)      │
└────────┬────────────────────────┘
         │
   ┌─────┴─────────────┐
   ▼                   ▼
NewsFeatured        NewsGrid
(manchete)        (cards grid)
```


## 🔐 Segurança

- ✅ .gitignore configurado (node_modules, dist, .env)
- ✅ Sem credenciais versionadas
- ✅ External links com `rel="noopener noreferrer"`
- ✅ HTML semântico (previne vulnerabilidades)
- ✅ CORS pronto para backend futuro


## 🔧 Próximas Fases (Roadmap)

### Phase 2: Backend + Admin 
- [ ] Express.js server
- [ ] PostgreSQL database
- [ ] Painel admin (CRUD notícias)
- [ ] Autenticação JWT
- [ ] Upload de imagens (Cloudinary)

### Phase 3: Recursos Extras (Optional)
- [ ] RSS Feed (para agregadores)
- [ ] Email notifications
- [ ] Analytics básico
- [ ] Progressive Web App (PWA)
- [ ] Integração social (WhatsApp, Facebook)

## 📝 Especificação

A especificação completa está em `specs/001-exibicao-home/`:

- **spec.md** - Descrição completa de requisitos
- **plan.md** - Arquitetura e tech stack
- **data-model.md** - Schema de dados
- **tasks.md** - 55 tarefas estruradas em 8 fases
- **ANALYSIS.md** - Validação de consistência (Grade A+)


**Desenvolvido** | v1.0.0 | Abril 2026

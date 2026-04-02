# README: Feature 004 - Layout da Manchete Principal

**Diretório**: `specs/004-layout-manchete/`  
**Status**: 🔄 Em especificação (pronto para implementação)  
**Última Atualização**: 2 de abril de 2026

---

## 📚 Conteúdo

Este diretório contém a documentação completa para a implementação da Feature 004.

### Arquivos

| Arquivo | Descrição | Tamanho |
|---------|-----------|---------|
| **spec.md** | Especificação técnica completa | 1.2 KB |
| **plan.md** | Plano de arquitetura e design | 1.5 KB |
| **tasks.md** | Lista de tasks com estimativas | 2.1 KB |
| **quickstart.md** | Guia rápido de início | 1.8 KB |
| **ANALYSIS.md** | Análise técnica e de risco | 2.3 KB |
| **data-model.md** | Estrutura de dados e fluxos | 1.9 KB |
| **README.md** | Este arquivo | 0.5 KB |

**Total**: ~12 KB de documentação

---

## 🎯 O Que é Feature 004?

**Objetivo**: Redesenhar o componente `NewsFeatured` (manchete principal) com um layout responsivo e dinâmico.

### Visão Geral

```
ANTES (Feature 003):
┌──────────────────────────┐
│   Imagem (100%)          │
├──────────────────────────┤
│   Texto                  │
└──────────────────────────┘
(Layout: 2 colunas - imagem + texto)

DEPOIS (Feature 004):
┌─────────────────────┬────────┐
│   Carrossel (2/3)   │ News 1 │
│  [Slide 1, 2, 3...]│        │
│   com setas ◄ ►    ├────────┤
│                     │ News 2 │
│                     │        │
└─────────────────────┴────────┘
(Layout: 2 colunas - carrossel dinâmico + sidebar estática)
```

### Características Principais

✅ **Carrossel dinâmico** (2/3 da tela)
- Navegação com setas (anterior/próxima)
- Auto-play (5 segundos)
- Pause on hover
- Transições suave

✅ **Sidebar estática** (1/3 da tela)
- 2 notícias empilhadas
- Altura igual ao carrossel
- Sem interação (apenas links)

✅ **Design responsivo**
- Desktop (1440px): 2 colunas
- Tablet (768px): 2 colunas reduzidas
- Mobile (375px): 1 coluna empilhada

✅ **Visual polish**
- Imagens como background com `object-fit: cover`
- Gradiente negro na base
- Textos brancos sobrepostos
- Rounded corners (12px)

---

## 📖 Como Usar Esta Documentação

### Para Entender o Projeto

1. **Leia primeiro**: `README.md` (este arquivo)
2. **Depois**: `spec.md` (requisitos e design)
3. **Depois**: `plan.md` (arquitetura e decisões)

### Para Implementar

1. **Leia**: `quickstart.md` (guia passo a passo)
2. **Consulte**: `tasks.md` (ordem de implementação)
3. **Consulte**: `data-model.md` (estrutura de dados)

### Para Revisar/Aprovar

1. **Leia**: `ANALYSIS.md` (risco e impacto)
2. **Verifique**: `tasks.md` (estimativas)
3. **Valide**: `spec.md` (requisitos atendidos)

---

## 📊 Estatísticas

### Escopo

| Métrica | Valor |
|---------|-------|
| Componentes novos | 3 |
| Arquivos modificados | 1 |
| Linhas de código esperadas | 350-400 |
| Estimativa de tempo | 16-20h |
| Complexidade | Média |

### Risco

| Aspecto | Nível |
|--------|-------|
| Impacto técnico | Baixo ✅ |
| Quebra de compatibilidade | Nenhuma ✅ |
| Performance | Minimal ✅ |
| Acessibilidade | Planejada ✅ |

---

## 🚀 Quick Start

### Clone e Prepare
```bash
# Clonar branch
git checkout -b 004-layout-manchete

# Instalar dependências (se necessário)
npm install

# Iniciar dev server
npm run dev
```

### Implementar
```bash
# Seguir as instruções em quickstart.md
# Ou seguir tasks.md na sequência sugerida
```

### Testar
```bash
# Testar local
npm run dev
# Ir para http://localhost:5173

# Build
npm run build

# Preview production
npm run preview
```

---

## 📋 Checklist Pré-Implementação

- [ ] Ler `spec.md` completamente
- [ ] Entender o design em `plan.md`
- [ ] Revisar tarefas em `tasks.md`
- [ ] Clonar branch `004-layout-manchete`
- [ ] Seguir `quickstart.md` passo a passo
- [ ] Testar em 3 breakpoints (desktop, tablet, mobile)
- [ ] Executar `npm run build`
- [ ] Verificar console (sem errors)
- [ ] Fazer commit and push

---

## 🔗 Navegação

**Volta para Projeto:**
- [Projeto Home](../../../README.md)
- [Features Anteriores](../)

**Próximas Features:**
- Feature 005: (A definir)

---

## 📞 Dúvidas Comuns

**P: Por que 3 componentes novos ao invés de 1?**
R: Separação de responsabilidades. Ver `ANALYSIS.md` para detalhes.

**P: Quanto vai aumentar o tamanho do build?**
R: ~3-4 KB (~1.6-2% de aumento). Ver `plan.md` para estimativas.

**P: É necessário alterar `Home.jsx`?**
R: Não. `NewsFeatured` mantém a mesma interface de props.

**P: Quantas notícias são necessárias?**
R: Mínimo 5 (3 para carrossel + 2 para sidebar).

---

## ✅ Critérios de Conclusão

Implementação considerada completa quando:

- [x] Spec.md, plan.md, tasks.md criados
- [ ] 3 componentes implementados (FeaturedCarousel, FeaturedSidebar, Controls)
- [ ] NewsFeatured.jsx refatorado
- [ ] Estilos aplicados (Tailwind)
- [ ] Carrossel funciona (setas + auto-play)
- [ ] Responsividade testada (3 breakpoints)
- [ ] Acessibilidade validada
- [ ] Build < 195 KB
- [ ] Sem console errors/warnings
- [ ] Commit criado
- [ ] PR aberta para `001-exibicao-home`

---

## 📝 Histórico de Versões

| Versão | Data | Descrição |
|--------|------|-----------|
| 1.0 | 2026-04-02 | Especificação e planejamento completos |

---

## 📧 Contato

Para dúvidas durante a implementação, consulte:
1. Este README
2. Os arquivos `.md` neste diretório
3. Execute `npm run dev` e inspecione console

---

**Ready to implement?** 🚀 Comece com [quickstart.md](quickstart.md)


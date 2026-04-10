---

description: "Lista de tarefas para implementação do Painel Administrativo"
---

# Tasks: Painel Administrativo

**Input**: Documentos de design em `/specs/005-painel-admin/`
**Pré-requisitos**: plan.md (obrigatório), spec.md (obrigatório para histórias de usuário)

**Organização**: Tarefas agrupadas por história de usuário para permitir implementação e testes independentes.

## Formato: `[ID] [P?] [Story] Descrição`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependências)
- **[Story]**: A qual história de usuário a tarefa pertence (ex: US1, US2, US3)
- Incluir caminhos de arquivos exatos nas descrições

---

## Fase 1: Setup (Infraestrutura Compartilhada)

**Propósito**: Inicialização do projeto e estrutura básica

- [ ] T001 Criar estrutura de pastas e arquivos dos componentes do painel admin em `src/components/AdminPanel/`
- [ ] T002 Inicializar dependências do editor rich text (ex: React Quill, TipTap ou Draft.js) no projeto
- [ ] T003 [P] Configurar ferramentas de lint e formatação (ex: ESLint, Prettier)

---

## Fase 2: Fundacional (Pré-requisitos Bloqueantes)

**Propósito**: Infraestrutura essencial para todas as histórias

- [ ] T004 Definir modelo de dados de Post e Manchete em `src/models/post.js` e `src/models/headline.js`
- [ ] T005 Implementar serviço de persistência (localStorage ou backend) em `src/services/postService.js`
- [ ] T006 [P] Implementar autenticação e controle de acesso em `src/services/authService.js`

---

## Fase 3: [US1] Gerenciar Posts (P1)

**Objetivo**: Permitir ao administrador criar, editar e excluir posts
**Critério de teste independente**: Criar, editar e excluir posts, verificando se as ações refletem corretamente no portal

- [ ] T007 [US1] Criar componente de listagem de posts em `src/components/AdminPanel/PostList.jsx`
- [ ] T008 [US1] Criar componente de formulário de criação/edição de post em `src/components/AdminPanel/PostForm.jsx`
- [ ] T009 [US1] Integrar editor rich text ao formulário de post em `src/components/AdminPanel/PostForm.jsx`
- [ ] T010 [US1] Implementar ações de editar/excluir post em `src/components/AdminPanel/PostList.jsx`
- [ ] T011 [US1] Integrar serviço de persistência ao CRUD de posts em `src/services/postService.js`
- [ ] T012 [P] [US1] Exibir mensagens de sucesso/erro para ações de post em `src/components/AdminPanel/PostForm.jsx`

---

## Fase 4: [US2] Seleção Opcional de Manchetes Principais (P2)

**Objetivo**: Permitir ao administrador selecionar manualmente manchetes principais
**Critério de teste independente**: Selecionar/remover posts das manchetes e verificar exibição correta na home; não selecionar nenhum post manualmente e verificar lógica automática

- [ ] T013 [US2] Criar componente de seleção de manchetes em `src/components/AdminPanel/HeadlineSelector.jsx`
- [ ] T014 [US2] Implementar lógica de seleção manual e automática de manchetes em `src/services/headlineService.js`
- [ ] T015 [US2] Impedir seleção de posts não publicados como manchete em `src/components/AdminPanel/HeadlineSelector.jsx`
- [ ] T016 [US2] Integrar seleção de manchetes à home via serviço em `src/services/headlineService.js`
- [ ] T017 [P] [US2] Exibir mensagens de erro ao tentar selecionar post inválido em `src/components/AdminPanel/HeadlineSelector.jsx`

---

## Fase 5: [US3] Controle de Acesso (P3)

**Objetivo**: Garantir que apenas usuários autenticados e autorizados acessem o painel
**Critério de teste independente**: Tentar acessar o painel sem autenticação/permissão e verificar bloqueio

- [ ] T018 [US3] Proteger rota do painel admin em `src/pages/AdminPanel.jsx`
- [ ] T019 [US3] Exibir mensagem de acesso negado para usuários não autorizados em `src/pages/AdminPanel.jsx`
- [ ] T020 [P] [US3] Registrar tentativas de acesso negado em `src/services/authService.js`

---

## Fase Final: Polimento & Cross-cutting

- [ ] T021 Atualizar documentação de uso do painel admin em `specs/005-painel-admin/README.md`
- [ ] T022 Revisar e refatorar código para garantir clareza e manutenibilidade
- [ ] T023 [P] Corrigir bugs identificados durante testes em `src/components/AdminPanel/`
- [ ] T024 [P] Garantir responsividade e acessibilidade dos componentes do painel admin

---

## Dependências

- Fase 2 deve ser concluída antes das fases de histórias de usuário
- US1 (Gerenciar Posts) é pré-requisito para US2 (Seleção de Manchetes)
- US3 (Controle de Acesso) pode ser implementada em paralelo com US1/US2

---

## Execução Paralela (Exemplo)

- T003, T006, T012, T017, T020, T023, T024 podem ser executadas em paralelo
- US3 pode ser desenvolvida em paralelo com US1/US2 após fundacional

---

## Estratégia de Implementação

- MVP: Concluir US1 (CRUD de posts) e controle de acesso básico (US3)
- Incremental: Adicionar seleção de manchetes (US2) e polimento

---

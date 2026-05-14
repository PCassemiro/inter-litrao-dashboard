# CURSOR.md - Projeto Inter de Litrão 2026

Este arquivo orienta o Cursor no desenvolvimento do Dashboard de estatísticas.

## Visão Geral

Dashboard para acompanhamento de performance de futebol amador.
Stack: Next.js 14+ (App Router), TypeScript, Tailwind CSS, Lucide React e Recharts.

## Arquitetura

- **Components** (`src/components/`): Componentes visuais modulares (Cards, Tabelas, Gráficos).
- **Constants** (`src/constants/`): Onde ficará o `mockData.ts` extraído da imagem.
- **Hooks** (`src/hooks/`): Lógica para cálculos de estatísticas (ex: calcular artilheiro).

## Convenções e Regras

- **Design:** Tema escuro (Dark Mode), usando cores Slate e Emerald.
- **Gráficos:** Usar `recharts` para visualizações. Devem ser responsivos.
- **Dados:** Os dados iniciais devem ser baseados no print `dashboard-referencia.png`.
- **Organização:** Grid layout (3 colunas no desktop, 1 no mobile).

## Comandos Úteis

```bash
npm run dev          # Iniciar dev
npx shadcn-ui@latest add table card  # Adicionar componentes UI
```

# dataflow-ui — CLAUDE.md

## What this project is
A React component library for data-heavy interfaces. Goal: published npm package + live Storybook on Vercel. This is a portfolio project built to demonstrate senior frontend engineering skills to startup hiring teams.

## Stack
- React + TypeScript + Vite
- Tailwind v4 (via @tailwindcss/vite plugin — no postcss config)
- Storybook
- class-variance-authority + clsx for variant-based components
- Recharts for chart wrappers (session 5)

## Current session status
Update this line as you progress:
`STATUS: Session 4 complete — DataTable with sort, pagination, row actions, loading/empty states + FilterBar composed story`

## Project structure (target)
src/
  components/
    Button/
      Button.tsx
      Button.stories.tsx
    Input/
    Select/
    Checkbox/
    Toggle/
    Badge/
    Tooltip/
    Tag/
    FilterBar/
    DataTable/
    charts/
      LineChart/
      BarChart/
      PieChart/
  index.ts          ← public exports only
index.css           ← @import "tailwindcss" at top, then CSS vars

## Component conventions
- Every component uses cva() for variants, clsx() for conditional classes
- Every component has a matching .stories.tsx with autodocs + all variant stories
- Props extend the native HTML element's props where applicable
- All components export their Props interface

## Build sessions
1. Scaffold — Vite, TS, Tailwind v4, Storybook, npm package config, Button 
2. Core UI — Input, Select, Checkbox, Toggle, Badge, Tooltip, Tag ← current
3. Filter bar — multi-select, date range, search, composable
4. Data table — sort, filter, pagination, row actions (hero component)
5. Chart wrappers — Line, bar, pie over Recharts, consistent tokens
6. Ship — Storybook to Vercel, npm v1.0.0, README

## Package config
- Entry point: src/index.ts
- Build config: vite.lib.config.ts (separate from dev config)
- Peer deps: react, react-dom (external, not bundled)
- Target: ES modules + CJS

## Known issues / decisions made
- Tailwind v4 used (not v3) — init command doesn't exist, no tailwind.config.js
- @tailwindcss/vite plugin required in both vite.config.ts (dev) and vite.lib.config.ts (lib build)
- postcss.config.js should not exist — conflicts with v4 Vite plugin approach

## How to run
npm run dev          # Vite dev server
npm run storybook    # Storybook on localhost:6006
npm run build:lib    # Build the library for npm

## About the engineer
Mudit Khandelwal — frontend-heavy full stack, 3.5 years. React, Redux, TypeScript, 
Node.js, PostgreSQL, D3.js. Specialises in data-intensive UIs, interactive tables, 
dashboards, LLM-integrated interfaces. When helping, treat as a senior engineer — 
no hand-holding, exact code and file paths, no skipping steps.
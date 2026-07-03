# Pokédex React Case

Aplicação frontend em **React + TypeScript + Vite** que consome a **PokeAPI** para listar Pokémon, buscar por nome, filtrar por tipo, ordenar, filtrar por região, favoritar e manter preferências em `localStorage`.

## Funcionalidades entregues

- Listagem inicial com **20 Pokémon**.
- Botão **Carregar mais** para paginação incremental.
- Busca por nome.
- Filtro por tipo em bottom sheet, seguindo a referência visual enviada.
- Ordenação por:
  - menor número primeiro;
  - maior número primeiro;
  - ordem alfabética crescente;
  - ordem alfabética decrescente.
- Filtro por regiões:
  - Kanto, Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, Galar e Paldea.
- Favoritar/desfavoritar Pokémon usando estado global com Context API + reducer.
- Tela/lista de favoritos.
- Persistência de favoritos em `localStorage`.
- Responsividade mobile e desktop.
- HTML semântico, loading skeleton, estados vazios e tratamento de erro.

## Como rodar localmente

```bash
npm install
npm run dev
```

A aplicação ficará disponível no endereço indicado pelo Vite, normalmente:

```bash
http://localhost:5173
```

## Build de produção

```bash
npm run build
npm run preview
```

## Deploy

Sugestão rápida usando Vercel ou Netlify:

1. Suba este projeto para um repositório público no GitHub.
2. Importe o repositório na Vercel/Netlify.
3. Configure:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Após publicar, substitua este campo pelo link final:

**Link do deploy:** `adicione-aqui-o-link-do-deploy`

## Organização de componentes

A estrutura segue Atomic Design:

```txt
src/components
├── atoms
│   ├── Badge
│   ├── IconButton
│   ├── SearchInput
│   └── SheetButton
├── molecules
│   ├── BottomNav
│   ├── FilterSheet
│   ├── PokemonCard
│   └── SortSheet
└── organisms
    ├── AppHeader
    ├── FavoritesView
    └── PokemonList
```

Cada componente `.tsx` possui seu próprio arquivo `.css` associado.

## Observações técnicas

### TypeScript forte

- O projeto está com `strict`, `noUncheckedIndexedAccess` e `exactOptionalPropertyTypes` ativos.
- Não foi usado `any`.
- As respostas da API têm tipos dedicados em `src/types/pokeApi.ts`.
- Os tipos de domínio da aplicação ficam em `src/types/pokemon.ts`.
- O fetch genérico `fetchJson<TResponse>()` mantém o retorno tipado e centraliza o tratamento de erro HTTP.

### Otimização das requisições

- A aplicação carrega primeiro um catálogo leve com nome, URL e número do Pokémon.
- Os detalhes completos são buscados apenas para os Pokémon visíveis na página atual.
- O botão **Carregar mais** busca os próximos detalhes conforme necessário.
- O filtro por tipo usa o endpoint `/type/{type}` para restringir IDs antes de buscar detalhes completos.
- Requisições usam `AbortController` para evitar atualização de estado após desmontagem ou troca rápida de filtros.

### Regras de região

As regiões foram mapeadas por intervalos da Pokédex nacional:

- Kanto: 1–151
- Johto: 152–251
- Hoenn: 252–386
- Sinnoh: 387–493
- Unova: 494–649
- Kalos: 650–721
- Alola: 722–809
- Galar: 810–905
- Paldea: 906–1025

### Persistência

Os favoritos são salvos em:

```txt
pokedex:favorites:v1
```

## API usada

Base URL:

```txt
https://pokeapi.co/api/v2
```

Endpoints principais:

```txt
GET /pokemon?limit=1025&offset=0
GET /pokemon/{id}
GET /type/{type}
```

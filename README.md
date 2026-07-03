# Pokédex React

Aplicação frontend desenvolvida em React e TypeScript para consumo da PokeAPI. O projeto apresenta listagem de Pokémon, busca, filtros, ordenação, favoritos persistentes, páginas de regiões e página de detalhes de cada Pokémon.

## Tecnologias utilizadas

- React
- TypeScript
- Vite
- React Router DOM
- PokeAPI
- CSS por componente
- LocalStorage
- Lucide React

## Funcionalidades

### Pokédex

- Listagem de Pokémon com nome, número, sprite e tipos.
- Carregamento progressivo de itens.
- Busca por nome.
- Filtro por tipo.
- Ordenação por:
  - Menor número
  - Maior número
  - A-Z
  - Z-A
- Cards com cor dinâmica de acordo com o tipo principal do Pokémon.
- Badges de tipos com ícones SVG e contraste de texto configurado por tipo.

### Favoritos

- Favoritar e desfavoritar Pokémon.
- Persistência dos favoritos no `localStorage`.
- Página dedicada para visualizar os Pokémon favoritos.
- Estado global para controle dos favoritos.

### Regiões

- Página com cards das regiões.
- Cada card utiliza imagem de fundo local e exibe os três Pokémon iniciais da região.
- Ao clicar em uma região, o usuário acessa uma página específica da região.
- A página da região contém:
  - Botão de voltar.
  - Nome da região.
  - Campo de busca.
  - Filtro por tipo.
  - Ordenação.
  - Lista de Pokémon restrita à região selecionada.

### Detalhes do Pokémon

- Página individual acessada a partir dos cards de Pokémon.
- Sprite animado do Pokémon usando os assets `showdown` da PokeAPI.
- Cor de fundo dinâmica de acordo com o tipo principal.
- Ícone do tipo principal aplicado como elemento visual de fundo.
- Botão de voltar.
- Botão de favoritar.
- Nome, número, tipos e descrição.
- Informações principais:
  - Peso
  - Altura
  - Categoria
  - Habilidade
- Distribuição de gênero.
- Lista de fraquezas.
- Cadeia evolutiva.

## Estrutura do projeto

```txt
src/
  assets/
    icons/
      nav-bar/
      pokemon-detail/
      pokemon-types/
    images/
      regions-bg/

  components/
    atoms/
    molecules/
    organisms/

  context/
    FavoritesContext.tsx

  hooks/
    usePokemonCatalog.ts
    usePokemonDetail.ts

  pages/
    FavoritesPage/
    PokedexPage/
    PokemonDetailPage/
    RegionDetailPage/
    RegionsPage/

  routes/
    AppRoutes.tsx

  services/
    pokeApi.ts
    pokemonDetailApi.ts

  types/
    pokemon.ts
    pokemonDetail.ts

  utils/
    filterPokemon.ts
    pokemonIds.ts
    regionCards.ts
    regions.ts
    typeIcons.ts
    typeMeta.ts
```

## Como clonar o projeto

```bash
git clone <URL_DO_REPOSITORIO>
```

Depois acesse a pasta do projeto:

```bash
cd <NOME_DA_PASTA_DO_PROJETO>
```

Caso tenha baixado o projeto como arquivo `.zip`, extraia o conteúdo e abra a pasta raiz no terminal.

## Instalação das dependências

Execute:

```bash
npm install
```

## Rodando localmente

Para iniciar o ambiente de desenvolvimento:

```bash
npm run dev
```

Depois acesse no navegador:

```txt
http://localhost:5173
```

## Gerando build de produção

```bash
npm run build
```

O build será gerado na pasta:

```txt
dist/
```

## Visualizando o build localmente

```bash
npm run preview
```

## Lint

Caso o projeto tenha script de lint configurado no `package.json`, execute:

```bash
npm run lint
```

## Rotas da aplicação

A aplicação utiliza `react-router-dom`.

Principais rotas:

```txt
/                    Redireciona para /pokedex
/pokedex             Lista principal da Pokédex
/regions             Lista de regiões
/regions/:regionId   Lista de Pokémon da região selecionada
/pokemon/:pokemonId  Detalhes do Pokémon
/favorites           Lista de favoritos
/profile             Página de conta, caso implementada
```

## Consumo da PokeAPI

O projeto utiliza dados públicos da PokeAPI.

Principais endpoints utilizados:

```txt
https://pokeapi.co/api/v2/pokemon
https://pokeapi.co/api/v2/pokemon/{id}
https://pokeapi.co/api/v2/pokemon-species/{id}
https://pokeapi.co/api/v2/type/{type}
```

Também são utilizados sprites públicos do repositório oficial de sprites da PokeAPI, incluindo:

```txt
sprites padrão
sprites de versões específicas
sprites animados showdown
```

## Persistência de dados

Os favoritos são armazenados no `localStorage`, permitindo que o usuário mantenha os Pokémon favoritos mesmo após recarregar a página.

## Organização dos componentes

O projeto segue uma organização baseada em Atomic Design:

```txt
atoms      Componentes básicos e reutilizáveis
molecules  Composições pequenas de componentes
organisms  Blocos maiores da interface
pages      Telas ligadas às rotas
```

Cada componente possui seu próprio arquivo CSS associado para facilitar manutenção e isolamento visual.

## Assets

Os ícones SVG dos tipos ficam em:

```txt
src/assets/icons/pokemon-types/
```

Os ícones da navegação inferior ficam em:

```txt
src/assets/icons/nav-bar/
```

Os ícones da página de detalhes ficam em:

```txt
src/assets/icons/pokemon-detail/
```

As imagens de fundo dos cards de regiões ficam em:

```txt
src/assets/images/regions-bg/
```

## Observações técnicas

- O projeto utiliza TypeScript com tipagem forte.
- O uso de `any` deve ser evitado.
- As respostas da PokeAPI são tipadas nos services.
- A seleção de tipo na Pokédex é individual, ou seja, apenas um tipo pode ser filtrado por vez.
- Os filtros e ordenação são aplicados de forma reutilizável tanto na Pokédex quanto nas páginas de região.
- A página de detalhes reutiliza a mesma lógica visual de cores e ícones dos tipos.
- O botão de favorito usa estado global e reflete o estado ativo em diferentes telas.
- Os estilos usam variáveis CSS globais para cores, espaçamentos, radius e camadas.
- A navegação inferior utiliza `NavLink`, permitindo estado ativo automático com base na rota atual.
- Os ícones SVG são importados com `?url` para garantir que o Vite trate os arquivos como assets.
- A página de detalhes usa informações combinadas dos endpoints `pokemon`, `pokemon-species`, `type` e `evolution-chain`.

## Deploy

O projeto pode ser publicado em plataformas como Vercel, Netlify ou GitHub Pages.

Exemplo de build para deploy:

```bash
npm run build
```

Depois, publique a pasta:

```txt
dist/
```

Caso utilize Vercel ou Netlify, configure:

```txt
Build command: npm run build
Publish directory: dist
```

## Requisitos atendidos

- React com TypeScript.
- Consumo de API RESTful via HTTP.
- Listagem de pelo menos 20 Pokémon.
- Paginação ou carregamento progressivo.
- Busca por nome.
- Filtro por tipo.
- Ordenação por número e nome.
- Favoritar e desfavoritar.
- Persistência de favoritos.
- Estado global para favoritos.
- Responsividade.
- Estrutura organizada por Atomic Design.
- CSS separado por componente.
- Uso de variáveis CSS.
- Rotas para navegação entre páginas.
- Página de detalhes do Pokémon.
- Página de regiões com navegação para região específica.

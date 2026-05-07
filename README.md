# ServiceClub Front-end Technical Challenge

This repository is used as a **live coding** exercise during interviews.

The goal is to build a small “wiki” of Chess Grandmasters, as defined by Chess.com.

## Tech constraints
- React + TypeScript
- You may use any approach to structure the code, as long as you can explain your trade-offs.
- You do **not** need to ship production-ready code, but we do expect solid engineering fundamentals.

API documentation: `https://www.chess.com/news/view/published-data-api#pubapi-endpoint-games-archive`

## Getting started

```bash
npm install
npm run dev
```

## The tasks

### Step 1: List the Grandmasters
Build a page that lists all Chess.com Grandmasters.

Endpoint: `https://api.chess.com/pub/titled/GM`

**Expectations**
- Loading / error / empty states
- Clean and readable UI

### Step 2: Grandmaster profile page
When clicking a grandmaster in the list, navigate to a profile page and display information from the player endpoint.

Endpoint: `https://api.chess.com/pub/player/{username}` (example: `https://api.chess.com/pub/player/john`)

**Expectations**
- Routing: `/player/:username`
- Fetch the player data and render a small profile view
- Handle missing fields gracefully (some data can be absent)

### Step 3: “Time since last online” clock
On the profile page, display a clock that shows how much time has passed since the player was last online.

Requirements:
- Format: `HH:MM:SS`
- Updates every second
- Clean up intervals properly

Hint: `last_online` is an epoch timestamp (seconds).

## Search (debounce)
Add a search input on the list page that filters grandmasters by username.

Requirements:
- Use a proper debounce (e.g. 250–400ms)
- Avoid stale values and make sure timers are cleaned up

## What we evaluate
- Correctness and robustness (loading, errors, missing data)
- Code structure and readability
- Reasonable TypeScript usage
- Handling async concerns (cancellation / race conditions)
- Ability to explain compromises and improvements

## Non-goals
- Pixel-perfect UI
- Authentication
- Complex state management
- End-to-end tests (unless there is extra time)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

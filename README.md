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

## Start here (what you need to implement)

Everything is scaffolded so you can focus on a few core tasks.

**You will mainly work in:**
- `src/hooks/useDebouncedValue.ts`
- `src/pages/GrandmastersListPage.tsx`
- `src/pages/GrandmasterProfilePage.tsx`

### Checklist (recommended order)
- [ ] 1) Find what’s missing in the list page (read the TODO)
- [ ] 2) Implement the debounce hook (complete the TODO and explain your choices)
- [ ] 3) Wire the debounced value into filtering (change 1 line and explain why)
- [ ] 4) Ticking clock on the profile page (complete the TODO and explain cleanup)

If you finish early, ask for one bonus improvement.

### Steps (super short)
1. Open `src/pages/GrandmastersListPage.tsx` and find `TODO_WIRE_DEBOUNCE` (read what’s missing).

2. Open `src/hooks/useDebouncedValue.ts`, go to `TODO_DEBOUNCE`, complete it, and explain your implementation.

3. Go back to `src/pages/GrandmastersListPage.tsx`, complete `TODO_WIRE_DEBOUNCE` (change exactly one line), and explain why.

4. Open `src/pages/GrandmasterProfilePage.tsx`, go to `TODO_CLOCK`, complete it, and explain interval cleanup and drift avoidance.

## The tasks (functional requirements)

### Step 1: List the Grandmasters
Build a page that lists all Chess.com Grandmasters.

Endpoint: `https://api.chess.com/pub/titled/GM`

**Expectations**
- Loading / error / empty states
- Clean and readable UI

Where to work:
- `src/pages/GrandmastersListPage.tsx`

### Step 2: Grandmaster profile page
When clicking a grandmaster in the list, navigate to a profile page and display information from the player endpoint.

Endpoint: `https://api.chess.com/pub/player/{username}` (example: `https://api.chess.com/pub/player/john`)

**Expectations**
- Routing: `/player/:username`
- Fetch the player data and render a small profile view
- Handle missing fields gracefully (some data can be absent)

Where to work:
- `src/pages/GrandmasterProfilePage.tsx`

### Step 3: “Time since last online” clock
On the profile page, display a clock that shows how much time has passed since the player was last online.

Requirements:
- Format: `HH:MM:SS`
- Updates every second
- Clean up intervals properly

Hint: `last_online` is an epoch timestamp (seconds).

Where to work:
- `src/pages/GrandmasterProfilePage.tsx`

## Search (debounce)
Add a search input on the list page that filters grandmasters by username.

Requirements:
- Use a proper debounce (e.g. 250–400ms)
- Avoid stale values and make sure timers are cleaned up

Where to work:
- `src/hooks/useDebouncedValue.ts`
- `src/pages/GrandmastersListPage.tsx`

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

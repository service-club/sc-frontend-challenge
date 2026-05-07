import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SearchInput } from '../components/SearchInput'
import { Spinner } from '../components/Spinner'
import { ErrorState } from '../components/ErrorState'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { useGrandmasters } from '../hooks/useGrandmasters'

export function GrandmastersListPage() {
  const { status, data, error, refetch } = useGrandmasters()
  const [query, setQuery] = useState('')
  const [count, setCount] = useState(0)

  // Debounced input (the hook implementation is part of the exercise).
  const debouncedQuery = useDebouncedValue(query, 300)

  const filtered = useMemo(() => {
    const list = data ?? []
    // TODO_WIRE_DEBOUNCE:
    // Change exactly 1 line: use `debouncedQuery` instead of `query`.
    const q = query.trim().toLowerCase()
    void debouncedQuery // remove after wiring
    if (!q) return list
    return list.filter((u) => u.toLowerCase().includes(q))
  }, [data, debouncedQuery, query])
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Grandmasters</h1>
          <p className="mt-1 text-sm text-white/60">
            Chess.com titled players (GM).
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-end">
          <div className="w-full sm:w-80">
            <SearchInput
              label="Search grandmasters"
              placeholder="Type a username…"
              value={query}
              onChange={setQuery}
            />
          </div>

          <div className="sm:pb-[2px]">
            <div className="mb-1 text-xs text-white/60">Re-render demo</div>
            {/* TODO_RERENDER_FIX: Replace setCount(count + 1) with the functional form: setCount...*/}
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10"
              onClick={() => setCount(count + 1)}
            >
              Count: <span className="font-mono">{count}</span>
            </button>
          </div>
        </div>
      </div>

      {status === 'loading' && (
        <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-10">
          <Spinner label="Loading grandmasters…" />
        </div>
      )}

      {status === 'error' && (
        <ErrorState
          title="Could not load grandmasters"
          message={error?.message ?? 'Unknown error'}
          onRetry={refetch}
        />
      )}

      {status === 'success' && (
        <>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
              No results.
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {filtered.map((username) => (
                <li key={username}>
                  <Link
                    to={`/player/${encodeURIComponent(username)}`}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
                  >
                    <div className="min-w-0">
                      <div className="truncate font-medium">{username}</div>
                      <div className="mt-0.5 text-xs text-white/50">
                        View profile
                      </div>
                    </div>
                    <div className="text-xs text-white/60">→</div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="text-xs text-white/40">
            Showing {filtered.length} of {(data ?? []).length}
          </div>
        </>
      )}
    </div>
  )
}


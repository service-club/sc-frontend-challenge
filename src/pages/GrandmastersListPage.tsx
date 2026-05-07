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

  // TODO (candidate): Use a debounced value for filtering (e.g. 250–400ms).
  // Hints:
  // - Prefer debouncing the query, not the render.
  // - Avoid stale values and make sure timeouts are cleaned up.
  const debouncedQuery = useDebouncedValue(query, 300)

  const filtered = useMemo(() => {
    const list = data ?? []
    const q = debouncedQuery.trim().toLowerCase()
    if (!q) return list
    return list.filter((u) => u.toLowerCase().includes(q))
  }, [data, debouncedQuery])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Grandmasters</h1>
          <p className="mt-1 text-sm text-white/60">
            Chess.com titled players (GM).
          </p>
        </div>

        <div className="w-full sm:w-80">
          <SearchInput
            label="Search grandmasters"
            placeholder="Type a username…"
            value={query}
            onChange={setQuery}
          />
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


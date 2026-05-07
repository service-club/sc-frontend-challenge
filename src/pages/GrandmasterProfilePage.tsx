import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ErrorState } from '../components/ErrorState'
import { Spinner } from '../components/Spinner'
import { usePlayer } from '../hooks/usePlayer'
import { formatDuration } from '../utils/formatDuration'

export function GrandmasterProfilePage() {
  const { username } = useParams<{ username: string }>()
  const { status, data, error, refetch } = usePlayer(username)

  const lastOnlineMs = useMemo(() => {
    if (!data?.last_online) return null
    return data.last_online * 1000
  }, [data?.last_online])

  // TODO (candidate): Build a ticking clock that updates every second and shows
  // time since last_online as HH:MM:SS.
  //
  // Requirements:
  // - It must update every second
  // - Clean up the interval on unmount (and when lastOnline changes)
  // - Derive elapsed from Date.now() (avoid drift from incrementing a counter)
  const [nowMs, setNowMs] = useState(() => Date.now())
  useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const elapsedSeconds = useMemo(() => {
    if (!lastOnlineMs) return null
    return Math.max(0, Math.floor((nowMs - lastOnlineMs) / 1000))
  }, [lastOnlineMs, nowMs])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {username ?? 'Player'}
          </h1>
          <div className="mt-1 text-sm text-white/60">
            Grandmaster profile
          </div>
        </div>
        <Link
          to="/grandmasters"
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10"
        >
          ← Back
        </Link>
      </div>

      {status === 'loading' && (
        <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-10">
          <Spinner label="Loading profile…" />
        </div>
      )}

      {status === 'error' && (
        <ErrorState
          title="Could not load profile"
          message={error?.message ?? 'Unknown error'}
          onRetry={refetch}
        />
      )}

      {status === 'success' && data && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 md:col-span-2">
            <div className="flex items-start gap-4">
              {data.avatar ? (
                <img
                  src={data.avatar}
                  alt=""
                  className="h-16 w-16 rounded-2xl object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-sm text-white/70">
                  N/A
                </div>
              )}

              <div className="min-w-0">
                <div className="truncate text-lg font-semibold">
                  {data.name ?? data.username}
                </div>
                <div className="mt-1 text-sm text-white/60">
                  @{data.username}
                  {data.title ? (
                    <span className="ml-2 rounded-md bg-emerald-400/15 px-2 py-0.5 text-xs font-medium text-emerald-200">
                      {data.title}
                    </span>
                  ) : null}
                </div>
                {data.status ? (
                  <div className="mt-2 text-xs text-white/50">
                    Status: {data.status}
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          <aside className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm font-medium">Last online</div>
            <div className="mt-2 font-mono text-2xl tracking-tight">
              {elapsedSeconds == null ? '—' : formatDuration(elapsedSeconds)}
            </div>
            <div className="mt-2 text-xs text-white/50">
              {data.last_online ? 'Updates every second' : 'No last_online data'}
            </div>
          </aside>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 md:col-span-3">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat label="Followers" value={data.followers} />
              <Stat label="Joined" value={data.joined ? formatDate(data.joined) : '—'} />
              <Stat label="Country" value={data.country ?? '—'} />
              <Stat label="Player ID" value={data.player_id ?? '—'} />
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="text-xs text-white/50">{label}</div>
      <div className="mt-1 truncate text-sm font-medium">{value}</div>
    </div>
  )
}

function formatDate(epochSeconds: number) {
  try {
    return new Date(epochSeconds * 1000).toLocaleDateString()
  } catch {
    return '—'
  }
}


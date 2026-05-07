import { Link, NavLink } from 'react-router-dom'
import { clsx } from '../utils/clsx'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/grandmasters" className="font-semibold tracking-tight">
            ServiceClub Chess Wiki
          </Link>
          <nav className="flex items-center gap-2 text-sm text-white/70">
            <NavLink
              to="/grandmasters"
              className={({ isActive }) =>
                clsx(
                  'rounded-lg px-3 py-1.5 transition hover:bg-white/10 hover:text-white',
                  isActive && 'bg-white/10 text-white',
                )
              }
            >
              Grandmasters
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-8">{children}</main>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-5xl px-4 text-xs text-white/50">
          Powered by Chess.com public API.
        </div>
      </footer>
    </div>
  )
}


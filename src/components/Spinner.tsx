export function Spinner({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-white/70">
      <div
        className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white/80"
        aria-hidden="true"
      />
      <div>{label ?? 'Loading…'}</div>
    </div>
  )
}


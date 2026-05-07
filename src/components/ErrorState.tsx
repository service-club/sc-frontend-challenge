export function ErrorState({
  title,
  message,
  onRetry,
}: {
  title: string
  message: string
  onRetry?: () => void
}) {
  return (
    <div className="rounded-2xl border border-rose-300/20 bg-rose-400/10 p-6">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-2 text-sm text-white/70">{message}</div>
      {onRetry ? (
        <button
          type="button"
          className="mt-4 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10"
          onClick={onRetry}
        >
          Retry
        </button>
      ) : null}
    </div>
  )
}


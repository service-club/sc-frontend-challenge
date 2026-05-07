export function formatDuration(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds))
  const hours = Math.floor(s / 3600)
  const minutes = Math.floor((s % 3600) / 60)
  const seconds = s % 60

  return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`
}

function pad2(n: number) {
  return String(n).padStart(2, '0')
}


export const CHESS_DOT_COM_API_BASE = 'https://api.chess.com/pub'

export type GrandmastersResponse = {
  players: string[]
}

export type Player = {
  avatar?: string
  player_id?: number
  username: string
  name?: string
  title?: string
  followers?: number
  country?: string
  status?: string
  joined?: number
  last_online?: number
}

export class HttpError extends Error {
  status: number
  url: string

  constructor(message: string, opts: { status: number; url: string }) {
    super(message)
    this.name = 'HttpError'
    this.status = opts.status
    this.url = opts.url
  }
}

export async function fetchJson<T>(
  url: string,
  opts?: { signal?: AbortSignal },
): Promise<T> {
  const res = await fetch(url, { signal: opts?.signal })
  if (!res.ok) {
    const text = await safeReadText(res)
    throw new HttpError(
      `Request failed (${res.status})${text ? `: ${text}` : ''}`,
      { status: res.status, url },
    )
  }
  return (await res.json()) as T
}

async function safeReadText(res: Response) {
  try {
    return await res.text()
  } catch {
    return ''
  }
}

export async function getGrandmasters(opts?: {
  signal?: AbortSignal
}): Promise<string[]> {
  const url = `${CHESS_DOT_COM_API_BASE}/titled/GM`
  const data = await fetchJson<GrandmastersResponse>(url, opts)
  return data.players
}

export async function getPlayer(
  username: string,
  opts?: { signal?: AbortSignal },
): Promise<Player> {
  const url = `${CHESS_DOT_COM_API_BASE}/player/${encodeURIComponent(username)}`
  return await fetchJson<Player>(url, opts)
}


import { useCallback, useEffect, useRef, useState } from 'react'
import { getPlayer, HttpError, type Player } from '../api/chess'

type LoadState<T> =
  | { status: 'loading'; data?: undefined; error?: undefined }
  | { status: 'error'; data?: undefined; error: Error }
  | { status: 'success'; data: T; error?: undefined }

export function usePlayer(username: string | undefined) {
  const [state, setState] = useState<LoadState<Player>>({ status: 'loading' })
  const abortRef = useRef<AbortController | null>(null)

  const load = useCallback(async () => {
    if (!username) {
      setState({ status: 'error', error: new Error('Missing username') })
      return
    }

    abortRef.current?.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl

    setState({ status: 'loading' })
    try {
      const player = await getPlayer(username, { signal: ctrl.signal })
      setState({ status: 'success', data: player })
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return
      const err =
        e instanceof Error
          ? e
          : new HttpError('Unknown error', { status: 0, url: 'unknown' })
      setState({ status: 'error', error: err })
    }
  }, [username])

  useEffect(() => {
    void load()
    return () => abortRef.current?.abort()
  }, [load])

  return {
    status: state.status,
    data: state.status === 'success' ? state.data : undefined,
    error: state.status === 'error' ? state.error : undefined,
    refetch: load,
  }
}


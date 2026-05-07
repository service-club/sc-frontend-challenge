import { useCallback, useEffect, useRef, useState } from 'react'
import { getGrandmasters, HttpError } from '../api/chess'

type LoadState<T> =
  | { status: 'loading'; data?: undefined; error?: undefined }
  | { status: 'error'; data?: undefined; error: Error }
  | { status: 'success'; data: T; error?: undefined }

export function useGrandmasters() {
  // Note: fetching is pre-wired to keep the live coding session fast.
  // If you want extra signal, ask the candidate to improve cancellation/caching.
  const [state, setState] = useState<LoadState<string[]>>({ status: 'loading' })
  const abortRef = useRef<AbortController | null>(null)

  const load = useCallback(async () => {
    abortRef.current?.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl

    setState({ status: 'loading' })
    try {
      const players = await getGrandmasters({ signal: ctrl.signal })
      setState({ status: 'success', data: players })
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return
      const err =
        e instanceof Error
          ? e
          : new HttpError('Unknown error', { status: 0, url: 'unknown' })
      setState({ status: 'error', error: err })
    }
  }, [])

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


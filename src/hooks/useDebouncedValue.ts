// TODO_DEBOUNCE:
// Replace the placeholder implementation with a real debounce hook.
//
// Do this (fill ONLY the TODO markers):
// - Add `useEffect` + `useState` imports
// - Implement:
//   const [debounced, setDebounced] = useState(value)
//   useEffect(() => {
//     const id = window.setTimeout(() => setDebounced(/* TODO */), /* TODO */)
//     return () => window.clearTimeout(id)
//   }, [value, delayMs])
//   return debounced
export function useDebouncedValue<T>(value: T, delayMs: number) {
  // Placeholder (intentionally wrong): replace it.
  void delayMs
  return value
}


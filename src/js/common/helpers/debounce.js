export function debounceEvent (callback, time) {
  let interval

  return () => {
    clearTimeout(interval)
    interval = setTimeout(() => {
      interval = null
      callback(arguments)
    }, time)
  }
}

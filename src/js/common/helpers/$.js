export function $ ($elm, all) {
  return all === 'all' ? document.querySelectorAll($elm) : document.querySelector($elm)
}

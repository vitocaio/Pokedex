export const template = `
  <div class="heart animated infinite text-center alert-info">
    <p class="text-color-white no-padding no-margin">Sem conexão com a internet :(</p>
  </div>
`

export function render () {
  document.body.insertAdjacentHTML('beforeend', template)
}

export function destroy () {
  if (document.querySelector('.alert-info')) {
    document.querySelector('.alert-info').parentNode.removeChild(document.querySelector('.alert-info'))
  }
}

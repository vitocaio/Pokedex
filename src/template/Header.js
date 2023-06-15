export const template = `
  <header>
    <ul class="list">
      <li route="/">
        <img class="logo" src="../../static/Pokemon-logo.png" />
      </li>
      <li route="/about">About</li>
      <li>
        <a href="https://github.com/vitocaio/Pokedex" target="_black">Github</a>
      </li>
    </ul>
  </header>`;

export function render () {
  document.body.insertAdjacentHTML('afterbegin', template)
}

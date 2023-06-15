const $view = document.querySelector('.VIEW')
const uriPokemonArt =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";


export const template = `
  <div class="list-pokemons m-top10 layout-center">
    <div class="row">
      <h1 class="font-roboto-light text-color-pallet-5 letter-spacing-3 padding20 pull-left">Choose your pokemon</h1>
      <div class="search width-40 pull-right">
        <input class="input-text letter-spacing-2 text-color-gray-2" autofocus="true" type="text" placeholder="Search pokemon for name...">
        <ul class="autocomplete-results"></ul>
      </div>
    </div>
    <div class="row">
      <div class="row arrows pull-right">
        <div class="before-page-block"></div>
          <img class="pull-left m-left20 arrow-left-an cursor-pointer before-page" src="static/pokeball2.png" alt="next">
        <span class="pull-left"> Previus </span>
        <div class="next-page-block"></div>
          <img class="pull-right m-right25 arrow-right-an cursor-pointer next-page" src="static/pokeball2.png" alt="next">
        <span class="pull-right"> Next </span>
      </div>
    </div>
    <div class="row">
      <section class="pokemon-not-found m-bottom5">
        <h6 class="text-center heart animated infinite no-padding no-margin text-color-pallet-3">Pokemon não encontrado</h6>
      </section>
      <div class="loading">
        <img class="pokeball-loading animated infinite" src="https://upload.wikimedia.org/wikipedia/commons/3/39/Pokeball.PNG" alt="loading...">
      </div>
      <ul class="list fx fx-just-center fx-wrap fx-just-baseline fx-box-sizing-border-box pull-left"></ul>
    </div>
  </div>`;

export function render () {
  $view.insertAdjacentHTML('afterbegin', template)
}

export function renderPokemons (url, name) {
  const regexGetIdPokemon = /(\/)(\d+)/
  let idPokemon = url.match(regexGetIdPokemon)
  idPokemon = idPokemon[2]

  const $listPokemons = document.querySelector('.list-pokemons ul.list')
  $listPokemons.insertAdjacentHTML('beforeend', `
    <li class="hover-grow pokemon fx-calc text-center cursor-pointer" id="${idPokemon}">
      <p class="pull-right m-0"> ${idPokemon} </p>
      <img class="flipH animated width-80" src="${uriPokemonArt + idPokemon + '.png'}" alt="pokemon-front">
      <div class="list-item-details text-left">
        <p class="font-roboto-strong">${name}</p>
      </div>
    </li>
  `)
}

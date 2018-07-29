const uriPokemonArt = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other-sprites/official-artwork/'
const $view = document.querySelector('.VIEW')

export const template = `
<div class="pokemon-details-container">
  <div class="loading">
    <img class="pokeball-loading animated infinite" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG" alt="loading...">
  </div>

  <div class="box-modal-pokemon-detail pull-right m-right20">
    <div class="box-modal-content">
      <span class="close">&times;</span>

      <div class="row">
        <section class="pokemon-detail pull-left">
          <div class="render-pokemon"></div>
        </section>
      </div>
    </div>
  </div>
</div>
`
export function render () {
  $view.insertAdjacentHTML('beforeend', template)
}

export function renderPokemon (pokemon) {
  const $pokemon = document.querySelector('.pokemon-detail .render-pokemon')

  $pokemon.innerHTML = `
    <div class="row">
      <div class="pull-left pokemon-card width-50">
        <picture class="flipH animated text-center pull-left">
          <h1 class="roll text-color-pallet-4 animated text-center m-bottom20 font-roboto-light text-capitalize">${pokemon.name}</h1>
          <img class="flipH animated width-40" src="${uriPokemonArt + pokemon.id + '.png'}" alt="pokemon-front">
        </picture>
      </div>

      <div class="pokemon-description text-left m-top10 pull-right width-50">
        <div class="attributes">
          <h2><small>Type:</small> <i class="font-roboto-light text-color-pallet-2">${pokemon.types[0].type.name}</i></h2>
          <h2><small>Weight:</small> <i class="font-roboto-light text-color-pallet-2">${pokemon.weight}</i></h2>
          <h2><small>Experience:</small> <i class="font-roboto-light text-color-pallet-2">${pokemon.base_experience}</i></h2>
          <h2><small>Height:</small> <i class="font-roboto-light text-color-pallet-2">${pokemon.height}</i></h2>
        </div>
      </div>
    </div>`
}

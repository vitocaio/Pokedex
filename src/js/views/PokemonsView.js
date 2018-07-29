import * as PokeListComponent from '../../template/PokeList'
import * as PokeDetailsComponent from '../../template/PokeDetails'
import { $ } from '../common/helpers/$'
import { debounceEvent } from '../common/helpers/debounce'

export function RenderListPokemons (pokemons) {
  const PokemonsController = require('../controllers/PokemonsController')
  const $loadingListPokemons = $('.list-pokemons .loading')
  const $listPokemons = $('.list-pokemons ul.list')
  const $arrows = $('.arrows')

  $loadingListPokemons.style.display = 'none'

  $listPokemons.innerHTML = ''
  pokemons.filter((pokemon, index) => {
    PokeListComponent.renderPokemons(pokemon.url, pokemon.name)
  })

  // CLICK AT POKEMON FOR DETAILS
  const $pokemons = $('.pokemon', 'all')
  $pokemons.forEach((pokemon) => {
    pokemon.addEventListener('click', (e) => {
      e.preventDefault()

      if (e.target.id) {
        debounceEvent(PokemonsController().getPokemon(e.target.id), 500)
      } else {
        debounceEvent(PokemonsController().getPokemon(e.target.parentNode.id), 500)
      }
    })
  })

  $arrows.style.display = 'block'
}

export function RenderPokemon (pokemon) {
  const $loading = $('.pokemon-details-container .loading')
  const $close = $('.box-modal-pokemon-detail .close')
  const PokemonsController = require('../controllers/PokemonsController')

  $loading.style.display = 'none'

  PokeDetailsComponent.renderPokemon(pokemon)

  // HANLDE ERROR IMAGE ART POKEMON
  $('.pokemon-detail picture').onerror = function () {
    this.src = './static/no-pokemon.jpg'
    throw new Error('Não existe esta imagem no servidor, so sorry :( ')
  }

  $close.addEventListener('click', (e) => {
    PokemonsController().closePokemonDetails()
  })

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target === $('.box-modal-pokemon-detail')) {
      PokemonsController().closePokemonDetails()
    }
  }
}

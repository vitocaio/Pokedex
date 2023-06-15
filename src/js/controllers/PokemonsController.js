import * as PokemonsService from '../providers/PokemonsService'
import { RenderListPokemons, RenderPokemon } from '../views/PokemonsView'
import { $ } from '../common/helpers/$'
const localforage = require('localforage')

module.exports = () => {
  const controller = {}
  const $loadingListPokemons = $('.list-pokemons .loading')
  const $boxPokemonDetails = $('.box-modal-pokemon-detail')
  const $loadingPokemonDetail = $('.pokemon-details-container .loading')
  const $pokemonNotFound = $('.pokemon-not-found')
  // const $totalPokemons = $('.list-pokemons h1')

  controller.createPaginationAndSearch = () => {
    // ELEMENTS
    const $search = $('.search input')
    const $beforePage = $('.before-page')
    const $beforePageBlock = $('.before-page-block')
    const $nextPage = $('.next-page')
    const $nextPageBlock = $('.next-page-block')

    // VARS TO PAGINATE
    let page = 0
    let qtsPokemons = 21

    // NEXT LIST POKEMONS
    $beforePage.addEventListener('click', (e) => {
      page--
      controller.listPokemons(qtsPokemons, qtsPokemons * page)
      if (page === 0) {
        $beforePage.setAttribute('style', 'opacity: .3;')
        $beforePageBlock.setAttribute('style', 'display: block;')
      }

      if (page < 40) {
        $nextPage.setAttribute('style', 'opacity: 1;')
        $nextPageBlock.setAttribute('style', 'display: none;')
      }
    })

    // NEXT LIST POKEMONS
    $nextPage.addEventListener('click', (e) => {
      page++
      controller.listPokemons(qtsPokemons, qtsPokemons * page)
      if (page > 0) {
        $beforePage.setAttribute('style', 'opacity: 1;')
        $beforePageBlock.setAttribute('style', 'display: none;')
      }

      if (page === 40) {
        $nextPage.setAttribute('style', 'opacity: .3;')
        $nextPageBlock.setAttribute('style', 'display: block;')
      }
    })

    // SEARCH POKEMON FOR NAME
    let allPokemons = []
    PokemonsService.listAllPokemons((pokemons) => {
      allPokemons = pokemons
    })

    // functions
    const autocomplete = (val) => {
      let pokemonReturn = []

      allPokemons.forEach((pokemon) => {
        if (val === pokemon.name.slice(0, val.length)) {
          pokemonReturn.push(pokemon.name)
        }
      })

      return pokemonReturn
    }

    let $autocompleteResults = $('.autocomplete-results')
    let pokemonToShow = []

    window.addEventListener('click', (e) => {
      pokemonToShow = []
      $autocompleteResults.innerHTML = ''
      $search.value = ''
    })

    $search.addEventListener('keyup', (e) => {
      let inputVal = e.target.value

      if (inputVal.length > 0) {
        $autocompleteResults.innerHTML = ''
        pokemonToShow = autocomplete(inputVal)

        pokemonToShow.forEach((pokemon) => {
          $autocompleteResults.innerHTML += `<li class="autocompleted cursor-pointer">${pokemon}</li>`
        })

        $('.autocompleted', 'all').forEach(($elm) => {
          $elm.addEventListener('click', (e) => {
            $search.value = e.target.innerText
            $search.focus()
            pokemonToShow = []
            $autocompleteResults.innerHTML = ''
            controller.searchPokemon($search.value)
            $search.value = ''
          })
        })

        $autocompleteResults.style.display = 'block'
      } else {
        pokemonToShow = []
        $autocompleteResults.innerHTML = ''
      }

      if (e.code === 'Enter') {
        pokemonToShow = []
        $autocompleteResults.innerHTML = ''
        controller.searchPokemon($search.value)
        $search.value = ''
      }
    })
  }

  const getTotalPokemons = () => {
    PokemonsService.getTotalPokemons().then((total) => {
      let totalPokemons = total
      return totalPokemons.count.toString();
    })
  }

  controller.listPokemons = (limit, offset) => {
    $loadingListPokemons.style.display = 'block'
    PokemonsService.listPokemons(limit, offset).then((pokemons) => {
      RenderListPokemons(pokemons)
      getTotalPokemons()
    }).catch(() => {
      // IF NOT CONNECTION INTERNET, RETURN DATA LOCAL
      localforage.getItem('pokemons', (err, pokemons) => {
        if (err) {
          throw new Error(err)
        }
        RenderListPokemons(pokemons)
      })
    })
  }

  controller.getPokemon = (pokemonId) => {
    $loadingPokemonDetail.style.display = 'block'
    PokemonsService.getPokemon(pokemonId).then((pokemon) => {
      if (navigator.onLine) {
        RenderPokemon(pokemon)
      }
      $pokemonNotFound.style.display = 'none'
      $boxPokemonDetails.style.display = 'block'
    })
  }

  controller.closePokemonDetails = () => {
    $boxPokemonDetails.style.display = 'none'
  }
  // When the user clicks on <span> (x), close the modal

  controller.searchPokemon = (query) => {
    const regexGetIdPokemon = /(\/)(\d+)/
    query = query.toLowerCase()

    $loadingPokemonDetail.style.display = 'block'

    PokemonsService.listAllPokemons((pokemons) => {
      [...pokemons].every((pokemon, index) => {
        if (pokemon.name === query) {
          let idPokemon = pokemon.url.match(regexGetIdPokemon)
          idPokemon = idPokemon[2]
          PokemonsService.getPokemon(idPokemon).then((pokemon) => {
            RenderPokemon(pokemon)
            $pokemonNotFound.style.display = 'none'
            $boxPokemonDetails.style.display = 'block'
          }).catch(() => {
            $pokemonNotFound.style.display = 'block'
          })
          $pokemonNotFound.style.display = 'none'
          return false
        } else {
          $pokemonNotFound.style.display = 'block'
          $loadingPokemonDetail.style.display = 'none'
          setTimeout(() => {
            $pokemonNotFound.style.display = 'none'
          }, 3000)
          return true
        }
      })
    })
  }

  return controller
}

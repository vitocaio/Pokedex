import fetch from 'isomorphic-fetch'
import * as alertInfoComponent from '../../template/AlertInfo'
const uriAllPokemon = 'https://pokeapi.co/api/v2/pokemon/?limit=840'
const uriPokemon = 'https://pokeapi.co/api/v2/pokemon'
const localforage = require('localforage')

export function listAllPokemons (callback) {
  if (!navigator.onLine) {
    return alertInfoComponent.render()
  }
  alertInfoComponent.destroy()

  const fetchPokemons = async () => {
    const response = await fetch(`${uriAllPokemon}`)
    const data = await response.json()
    localforage.setItem('allPokemons', data.results)
    return callback(data.results)
  }

  // IF THERE ARE POKEMONS OFFLINE
  localforage.getItem('allPokemons', (err, pokemons) => {
    if (err) {
      throw new Error(err)
    }
    if (pokemons) {
      return callback(pokemons)
    } else {
      fetchPokemons()
    }
  })
}

export async function listPokemons (limit, offset) {
  if (!navigator.onLine) {
    return alertInfoComponent.render()
  }
  alertInfoComponent.destroy()

  const response = await fetch(`${uriPokemon}/?limit=${limit || '21'}&offset=${offset || '0'}`)
  const data = await response.json()
  localforage.setItem('pokemons', data.results)
  return data.results
}

export async function getPokemon (pokemonId) {
  if (!navigator.onLine) {
    return alertInfoComponent.render()
  }
  alertInfoComponent.destroy()

  const response = await fetch(`${uriPokemon}/${pokemonId}`)
  const data = await response.json()
  localforage.setItem(`pokemon${pokemonId}`, data)
  return data
}

export async function getTotalPokemons () {
  if (!navigator.onLine) {
    return alertInfoComponent.render()
  }
  const response = await fetch(`${uriPokemon}`)
  const data = await response.json()
  localforage.setItem('pokemons', data)
  return data
}

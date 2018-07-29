import fetch from 'isomorphic-fetch'
const expect = require('chai').expect
const uriAllPokemon = 'https://pokeapi.co/api/v2/pokemon/?limit=840'
const uriPokemons = 'https://pokeapi.co/api/v2/pokemon'
const uriPokemon = 'https://pokeapi.co/api/v2/pokemon/1'

const listAllPokemons = () => {
  return fetch(uriAllPokemon)
}

const listPokemons = () => {
  return fetch(uriPokemons)
}

const getPokemon = () => {
  return fetch(uriPokemon)
}

describe('API Pokemons', () => {
  it('list 840 pokemons should return status code 200(ok)', () => {
    listAllPokemons().then((data) => {
      expect(data.status).to.equal(200)
    })
  })

  it('list pokemons should return status code 200(ok)', () => {
    listPokemons().then((data) => {
      expect(data.status).to.equal(200)
    })
  })
  it('list pokemons should return a array', () => {
    listPokemons().then((data) => {
      data.json().then((data) => {
        expect(data.results).to.be.an('array')
      })
    })
  })
  it('list pokemons should return a array of objects', () => {
    listPokemons().then((data) => {
      data.json().then((data) => {
        expect(data.results[0]).to.be.an('object')
      })
    })
  })
  it('list pokemons should return a array of object that have properties url and name', () => {
    listPokemons().then((data) => {
      data.json().then((data) => {
        expect(data.results[0]).to.have.a.property('url')
        expect(data.results[0]).to.have.a.property('name')
      })
    })
  })

  it('get pokemon id should return status code 200(ok)', () => {
    getPokemon().then((data) => {
      expect(data.status).to.equal(200)
    })
  })
  it('get pokemon id should return properties type, weight, experience, height', () => {
    getPokemon().then((data) => {
      data.json().then((data) => {
        expect(data).to.have.a.property('name')
        expect(data).to.have.a.property('weight')
        expect(data).to.have.a.property('height')
        expect(data).to.have.a.property('base_experience')
        expect(data.types[0].type).to.have.a.property('name')
      })
    })
  })
})

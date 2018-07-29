import { Routers } from './Routes/index'
import PokemonsController from './controllers/PokemonsController'
import * as HeaderComponent from '../template/Header'
import * as PokeListComponent from '../template/PokeList'
import * as PokeDetailsComponent from '../template/PokeDetails'

// registers
HeaderComponent.render()
PokeListComponent.render()
PokeDetailsComponent.render()

// LIST POKEMONS
PokemonsController().listPokemons()
PokemonsController().createPaginationAndSearch()
Routers()

import PokemonsController from '../js/controllers/PokemonsController'

export function Home () {
  setTimeout(() => {
    PokemonsController().listPokemons()
    PokemonsController().createPaginationAndSearch()
  }, 10)
  return `
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
          <img class="pokeball-loading animated infinite" src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG" alt="loading...">
        </div>
        <ul class="list fx fx-just-center fx-wrap fx-just-baseline fx-box-sizing-border-box pull-left"></ul>
      </div>
    </div>
    
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
}

export function About () {
  return `
    <article class="m-top20 m-left20">
      <h2 class="text-color-pallet-2">## Aplicação</h2>
      <ul>
        <li>Criar uma página para listar todos os pokemons</li>
        <li>Criar uma página para listar os detalhes de um pokemon selecionado</li>
      </ul>
      <h2 class="text-color-pallet-2">## O que será avaliado</h2>
        <ul>
          <li>consumo de api</li>
          <li>responsive design</li>
          <li>route management</li>
          <li>componentes/classes em ES6</li>
          <li>application build</li>
          <li>Históricos de commits (standard commits)</li>
        </ul>
      <h2 class="text-color-pallet-2">## HTML</h2>
      <p>Semântica e separação de template</p>
      <h2 class="text-color-pallet-2">## Style</h2>
      <p>Organização e reaproveitamento, padrão utilizado. (BEM, ATOMIC, SMACSS)</p>
      <h2 class="text-color-pallet-2">## JS</h2>
      <p>Reaproveitamento de código, conhecimento da linguagem ECMASCRIPT mínimo 2015</p>
      <h2 class="text-color-pallet-2">## Coverage</h2>
      <p>Teste com mocha e chai</p>
    </article>
  `
}

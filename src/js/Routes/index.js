import { $ } from '../common/helpers/$'
import * as containers from '../../containers/Pages'

export function Routers () {
  const $activateRoutes = Array.from($('[route]', 'all'))

  const navigate = (event) => {
    let route = event.target.attributes[0].value
    let routeInfo = myRoute.routes.filter((r) => (
      r.path === route
    ))[0]

    if (routeInfo === undefined) {
      routeInfo = {
        path: '/',
        routes: 'Home'
      }
    }

    if (!routeInfo) {
      window.history.pushState({}, '', 'error')
      $('.VIEW').innertHTML = 'No route exist with this path'
    } else {
      window.history.pushState({}, '', routeInfo.path)
      $('.VIEW').innerHTML = containers[routeInfo.routes]()
    }
  }

  $activateRoutes.forEach((route) => {
    route.addEventListener('click', navigate, false)
  })

  const Router = (name, routes) => (
    {
      name,
      routes
    }
  )

  const myRoute = new Router('myRoute', [
    {
      path: '/',
      routes: 'Home'
    },
    {
      path: '/about',
      routes: 'About'
    }
  ])

  const curretPath = window.location.pathname

  if (curretPath === '/') {
    $('.VIEW').innertHTML = 'Rootpage'
  } else if (curretPath === '/about') {
    $('.VIEW').innertHTML = 'About'
  } else {
    let route = myRoute.routes.filter((r) => (
      r.path === curretPath
    ))[0]

    if (route) {
      $('.VIEW').innertHTML = 'You are ' + route.name
    } else {
      $('.VIEW').innertHTML = '404'
    }
  }
}

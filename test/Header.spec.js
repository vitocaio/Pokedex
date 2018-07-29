import * as HeaderComponent from '../src/template/Header'
const expect = require('chai').expect

describe('Component Header', () => {
  it('should render a header component', () => {
    expect(HeaderComponent.template).to.contains(`<header>`
  )
  })
})

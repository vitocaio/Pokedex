import HeaderComponent from '../src/template/Header'
const expect = require('chai').expect
const Header = new HeaderComponent()

describe('Component Header', () => {
  it('should render a header component', () => {
    expect(Header.template).to.contains(`<header>`
  )
  })
})

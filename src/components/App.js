import React, { Component } from 'react';
import { connect } from 'react-redux'
import { increment, decrement } from '../actions'
import ColorInfo from './ColorInfo'

const rgbPattern = /.+?(\d+).*?,.*?(\d+).*?,.*?(\d+)/

const parseRGB = (string) => {
  const matches = rgbPattern.exec(string)
  if (matches) {
    const [, r, g, b] = matches
    return {
      r: parseInt(r, 10),
      g: parseInt(g, 10),
      b: parseInt(b, 10),
    }
  }
  throw new Error(`invalid rgb: ${string}`)
}

const isRGB = (value) => rgbPattern.test(value)

const getRGB = (value) => {
  if (isRGB(value)) {
    return parseRGB(value)
  }
  return {}
}

class App extends Component {
  state = {
    value: 'rgb(200, 150, 200)',
  }

  handleInputChange = (event) => {
    this.setState({ value: event.target.value })
  }

  render() {
    const { r, g, b } = getRGB(this.state.value)
    const name = ''

    return (
      <div className="container mx-auto my-8">
        <div>
          <div className="h-24 flex border border-black" style={{background: this.state.value }}>

            <div className="flex-1 flex justify-center items-center">
              <input
                value={this.state.value}
                className="text-center border border-black"
                placeholder="color code"
                onChange={this.handleInputChange}
              />
            </div>

            <ColorInfo
              name={name}
              r={r}
              g={g}
              b={b}
            />

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  count: state.count,
})

const mapDispatchToProps = {
  increment,
  decrement,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

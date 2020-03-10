import React, { Component } from 'react'
import Color from './Color'
import { getRGB, addHex } from '../util'

class App extends Component {
  state = {
    colors: [],
    nextKey: 0,
    mixResult: '#09f',
    chipA: '',
    chipB: '',
  }

  handleAddColor = () => {
    const key = this.state.nextKey
    this.setState((prevState) => ({
      colors: [
        ...prevState.colors,
        { key },
      ],
      nextKey: prevState.nextKey + 1,
    }))
  }

  handleColorChange = chip => (value) => {
    const { r, g, b } = getRGB(value)
    if (r !== undefined
      && g !== undefined
      && b !== undefined) {
      const hex = {r, g, b}
      this.setState({ [chip]: hex })
    }
  }

  render() {
    const { chipA, chipB } = this.state
    const composite = chipA && chipB && addHex(chipA, chipB)
    let compositeResult
    if (composite) {
      // TODO: round down
      compositeResult = `rgb(${composite.r}, ${composite.g}, ${composite.b})`
    }
    return (
      <div className="container mx-auto my-8">
        <div>
          <Color
            onChange={this.handleColorChange('chipA')}
          />
          <Color
            onChange={this.handleColorChange('chipB')}
          />
          <div style={{background: compositeResult }}>result: {compositeResult}</div>
        </div>
        { this.state.colors.map((item) => {
            return (
              <Color
                key={item.key}
                onNewColor={this.handleAddColor}
              />
            )
        })
        }
        <button onClick={this.handleAddColor}>add color</button>
      </div>
    )
  }
}

export default App

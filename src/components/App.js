import React, { Component } from 'react'
import Color from './Color'
import Chip from './Chip'
import PlainChip from './PlainChip'
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

  handleStartSelecting = chip => () => {
    this.setState({
      selecting: chip,
    })
  }

  handleStopSelecting = () => () => {
    this.setState({
      selecting: null,
    })
  }

  handleColorClick = (color) => {
    if (this.state.selecting) {
      this.setState((prevState) => ({
        [prevState.selecting]: color,
        selecting: null,
      }))
    }
  }

  render() {
    const { chipA, chipB } = this.state
    const composite = chipA && chipB && addHex(chipA, chipB)
    return (
      <div className="container mx-auto my-8">
        <div>
          <h3 className="text-5xl">Color Mixing</h3>
          <div className="flex">
          <Chip
            onStartSelecting={this.handleStartSelecting('chipA')}
            onStopSelecting={this.handleStopSelecting('chipA')}
            isSelecting={this.state.selecting === 'chipA'}
            color={this.state.chipA}
          />

          <Chip
            onStartSelecting={this.handleStartSelecting('chipB')}
            onStopSelecting={this.handleStopSelecting('chipB')}
            isSelecting={this.state.selecting === 'chipB'}
            color={this.state.chipB}
          />

          <PlainChip
            color={composite}
          />
          </div>

        </div>

        <h3 className="text-5xl">Palette</h3>

        <div className="overflow-scroll">
      { this.state.colors.map((item) => {
        return (
          <Color
            key={item.key}
            onNewColor={this.handleAddColor}
            onClick={this.handleColorClick}
          />
        )
        })
        }
          </div>
        <button onClick={this.handleAddColor}>add color</button>
      </div>
    )
  }
}

export default App

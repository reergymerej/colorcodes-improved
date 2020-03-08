import React, { Component } from 'react'
import Color from './Color'

class App extends Component {
  state = {
    colors: [],
    nextKey: 0,
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

  render() {
    return (
      <div className="container mx-auto my-8">
        { this.state.colors.map((item) => {
            return (
              <Color
                key={item.key}
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

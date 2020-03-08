import React, { Component } from 'react';
import { connect } from 'react-redux'
import { increment, decrement } from '../actions'
import ColorInfo from './ColorInfo'

class App extends Component {
  render() {
    return (
      <div className="container mx-auto my-8">
        <div>
          <div className="h-24 flex border border-black" style={{background: 'rgb(200, 150, 200)'}}>

            <div className="flex-1 flex justify-center items-center">
              <input
                className="text-center border border-black"
                placeholder="color code"
              />
            </div>

            <ColorInfo />

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

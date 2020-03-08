import React from 'react'

const withColor = (color) => ({ children }) => (
  <span style={{ color }}>
    { children }
  </span>
)

const Red = withColor('red')
const Green = withColor('green')
const Blue = withColor('blue')

const RGB = ({ r = 0, g = 0, b = 0 }) => (
  <div>
    rgb(
    <Red>
      {r}
    </Red>
    ,&nbsp;
    <Green>
      {g}
    </Green>
    ,&nbsp;
    <Blue>
      {b}
    </Blue>
    )
  </div>
)

const Hex = ({ r = 0, g = 0, b = 0 }) => (
  <div>
    #
    <Red>
      {r.toString(16)}
    </Red>
    <Green>
      {g.toString(16)}
    </Green>
    <Blue>
      {b.toString(16)}
    </Blue>
  </div>
)

const ColorInfo = () => (
  <div className="p-3 flex flex-col justify-center bg-black text-white">
    <RGB
      r={200}
      g={150}
      b={200}
    />
    <Hex
      r={200}
      g={150}
      b={200}
    />
    <div>
      color name
    </div>
  </div>
)

export default ColorInfo

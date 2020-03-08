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
    <Red>
      r
    </Red>
    <Green>
      g
    </Green>
    <Blue>
      b
    </Blue>
    (
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

const ColorInfo = () => (
  <div className="p-3 flex flex-col justify-center bg-black text-white">
    <RGB
      r={200}
      g={150}
      b={200}
    />
    <div>
      #AA88AA
    </div>
    <div>
      color name
    </div>
  </div>
)

export default ColorInfo

import { useState } from 'react'
import './App.css'
import { Canvas } from './Components/Canvas/Canvas'
import { Sprite } from './Components/Sprite/Sprite'
import reactImg from './assets/react.svg'

function App() {
  return (
    <Canvas h={500} w={500}>
      <Sprite
        image={reactImg}
        keys={{
          "up": "w",
          "down": "s",
          "left": "a",
          "right": "d"
        }}
      />
    </Canvas>
  )
}

export default App

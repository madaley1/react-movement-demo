import { useState } from 'react'
import './App.css'
import { Canvas } from './Components/Canvas/Canvas'
import { Sprite } from './Components/Sprite/Sprite'
import reactImg from './assets/react.svg'
import { CenteredComponent } from './Components/CenteredComponent/CenteredComponent'

function App() {
  return (
    <Canvas h={750} w={750}>
      <CenteredComponent />
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

import './App.css';
import { Canvas } from './Components/Canvas/Canvas';
import { Sprite } from './Components/Sprite/Sprite';
import reactImg from './assets/react.svg';

function App() {
  return (
    <Canvas h={500} w={500}>
      {/* <CenteredComponent /> */}
      <Sprite
        image={{
          src: reactImg,
          height: 50,
          width: 50
        }}
        keys={{
          up: 'w',
          down: 's',
          left: 'a',
          right: 'd'
        }}
        movementSpeed={1}
      />
    </Canvas>
  );
}

export default App;

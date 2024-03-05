import { CanvasContext } from "../Canvas/canvasProvider"

export const CenteredComponent = () => {
  return (
    <div style={{backgroundColor: 'red', height: 50, width: 50, position: 'absolute', top: '50%', left: '50%', marginLeft: '-50px'}}>
    </div>
  )
}
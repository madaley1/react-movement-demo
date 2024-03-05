import { CanvasContext } from './canvasProvider';

type CanvasProps = {
    h: number,
    w: number,
    children?: JSX.Element[] | JSX.Element
  };

export function Canvas(props: CanvasProps){
  const { h, w, children } = props;
  return (
    <CanvasContext.Provider value={{
      h,
      w,
    }}>
      <div style={{
        width: `${w}px`,
        height: `${h}px`,
        backgroundColor: 'blue'
      }}>
        {children}
      </div>
    </CanvasContext.Provider>
  )
}
type CanvasProps = {
    h: number,
    w: number,
    children?: JSX.Element[] | JSX.Element
  };

export function Canvas(props: CanvasProps){
  const { h, w, children } = props;
  return (
    <div style={{
      width: `${w}px`,
      height: `${h}px`
    }}>
      {children}
    </div>
  )
}
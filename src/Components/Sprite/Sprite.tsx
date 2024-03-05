import React, { useRef, useState } from "react";
import { CanvasContext } from "../Canvas/canvasProvider";
type SpriteProps = {
  image: string,
  keys?: {
    "up": string,
    "down": string,
    "left": string,
    "right": string
  }
}

export function Sprite(props: SpriteProps){
  const [topPosition, setTop] = useState(0);
  const [leftPosition, setLeft] = useState(0);

  const spriteRef = useRef(null);

  return (
    <CanvasContext.Consumer>
      {value => (
        <div id="sprite" className="sprite" style={{'position': 'absolute', marginTop: 0, marginLeft: value.w/8, 'top': `${(value.h / 2) + topPosition}px`, 'left': `${(value.w / 2) + leftPosition}px` }} ref={spriteRef as React.RefObject<HTMLDivElement>}>
          <img src={props.image} alt="sprite" />
        </div>
      )}
      
    </CanvasContext.Consumer>
  )
}
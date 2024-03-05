import React, { useRef, useState } from "react";

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
  const [topPosition, setTop] = useState(50);
  const [leftPosition, setLeft] = useState(50);

  const spriteRef = useRef(null);

  return (
    <div id="sprite" className="sprite" style={{'position': 'absolute', 'top': `${topPosition}%`, 'left': `${leftPosition}%` }} ref={spriteRef as React.RefObject<HTMLDivElement>}>
      <img src={props.image} alt="sprite" />
    </div>
    
  )
}
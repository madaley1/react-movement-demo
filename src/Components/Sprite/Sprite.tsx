import React, { useEffect, useRef, useState } from "react";
type SpriteProps = {
  image: {
    src: string,
    height: number,
    width: number
  },
  keys: {
    "up": string,
    "down": string,
    "left": string,
    "right": string
  },
  movementSpeed?: number
}

export function Sprite(props: SpriteProps){
  const {image, keys, movementSpeed} = props;

  const spriteRef = useRef<HTMLElement>();

  const [topPosition, setTop] = useState(-image.height);
  const [topInterval, setTopInterval] = useState<number>();

  const [leftPosition, setLeft] = useState(-image.width);
  const [leftInterval, setLeftInterval] = useState<number>();

  const [verticalKeyPressed, setVerticalKeyPressed] = useState(false);
  const [horizontalKeyPressed, setHorizontalKeyPressed] = useState(false);

  const defaultSpeed = 1

  const moveUp = (num?: number) => {
    setTop(topPosition => topPosition - (num || defaultSpeed))
  }
  const moveRight = (num?: number) => {
    setLeft(leftPosition => leftPosition + (num || defaultSpeed))
  }
  const moveDown = (num?: number) => {
    setTop(topPosition => topPosition + (num || defaultSpeed))
  }
  const moveLeft = (num?: number) => {
    setLeft(leftPosition => leftPosition - (num || defaultSpeed))
  }

  const startMovement = (e: React.KeyboardEvent) =>{
    const character = e.key.toLowerCase();
    const speed = movementSpeed || defaultSpeed
    if(character === keys.up){
      if(verticalKeyPressed) return
      setTopInterval(setInterval(()=>{
        moveUp(speed)
        console.log('interval')
      }, 1))
      setVerticalKeyPressed(true)
    }
    if(character === keys.right){
      if(horizontalKeyPressed) return
      setLeftInterval(setInterval(()=>moveRight(speed), 1))
      setHorizontalKeyPressed(true)
    }
    if(character === keys.down){
      if(verticalKeyPressed) return
      setTopInterval(setInterval(()=>moveDown(speed), 1))
      setVerticalKeyPressed(true)
    }
    if(character === keys.left){
      if(horizontalKeyPressed) return
      setLeftInterval(setInterval(()=>moveLeft(speed), 1))
      setHorizontalKeyPressed(true)
    }
  }
  const stopMovement = (e: React.KeyboardEvent) => {
    const character = e.key.toLowerCase();
    if(character === keys.up){
      clearInterval(topInterval)
      setVerticalKeyPressed(false)
    }
    if(character === keys.right){
      clearInterval(leftInterval)
      setHorizontalKeyPressed(false)
    }
    if(character === keys.down){
      clearInterval(topInterval)
      setVerticalKeyPressed(false)
    }
    if(character === keys.left){
      clearInterval(leftInterval)
      setHorizontalKeyPressed(false)
    }
  }

  useEffect(()=>{
    if(spriteRef && spriteRef.current){ 
      spriteRef.current.focus()
    }

  },[])

  return (
    <div 
      id="sprite" 
      className="sprite" 
      tabIndex={-1} 
      style={{'position': 'absolute', transform: 'translate(50%, 50%)', 'top': `calc(50% + ${topPosition}px)`, 'left': `calc(50% + ${leftPosition}px`, zIndex: '99'}} 
      ref={spriteRef as React.RefObject<HTMLDivElement>}
      onKeyDown={startMovement}
      onKeyUp={stopMovement}
      onBlur={()=>spriteRef.current?.focus()}
    >
      <img src={image.src} height={image.height} width={image.width} alt="sprite" />
    </div>
  )
}
import React, { useEffect, useRef, useState } from "react";
import { CanvasContext } from "../Canvas/canvasProvider";
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

  const borderCheck = (borderValue: number, spritePosition: number)=>{
    return borderValue === spritePosition
  }

  const verticalBorderSpriteFix = image.height/2;
  const horizontalBorderSpriteFix = image.width/2;

  const moveUp = (border: number, speed?: number) => {
    setTop(topPosition => {
      const requestedPosition = topPosition - (speed || defaultSpeed)
      return borderCheck(-(border+(verticalBorderSpriteFix)), requestedPosition) ? topPosition : requestedPosition
    })
  }
  const moveRight = (border: number, speed?: number) => {
    setLeft(leftPosition => {
      const requestedPosition = leftPosition + (speed || defaultSpeed)
      return borderCheck(border-(horizontalBorderSpriteFix), requestedPosition) ? leftPosition : requestedPosition
    })
  }
  const moveDown = (border: number, speed?: number) => {
    setTop(topPosition => {
      const requestedPosition = topPosition + (speed || defaultSpeed)
      return borderCheck(border-(verticalBorderSpriteFix), requestedPosition) ? topPosition : requestedPosition
    })
  }
  const moveLeft = (border: number, speed?: number) => {
    setLeft(leftPosition => {
      const requestedPosition = leftPosition - (speed || defaultSpeed)
      return borderCheck(-(border+(horizontalBorderSpriteFix)), requestedPosition) ? leftPosition : requestedPosition
    })  }

  const startMovement = (e: React.KeyboardEvent, canvasDimensions: {h: number, w: number}) =>{
    const character = e.key.toLowerCase();
    const speed = movementSpeed || defaultSpeed
    const { h, w } = canvasDimensions
    const horizontalBorderValue = (h/2);
    const verticalBorderValue = (w/2);
    if(character === keys.up){
      if(verticalKeyPressed) return
      setTopInterval(setInterval(()=>moveUp(verticalBorderValue, speed), 1))
      setVerticalKeyPressed(true)
    }
    if(character === keys.right){
      if(horizontalKeyPressed) return
      setLeftInterval(setInterval(()=>moveRight(horizontalBorderValue - image.width, speed), 1))
      setHorizontalKeyPressed(true)
    }
    if(character === keys.down){
      if(verticalKeyPressed) return
      setTopInterval(setInterval(()=>moveDown(verticalBorderValue - image.height, speed), 1))
      setVerticalKeyPressed(true)
    }
    if(character === keys.left){
      if(horizontalKeyPressed) return
      setLeftInterval(setInterval(()=>moveLeft(horizontalBorderValue, speed), 1))
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
    <CanvasContext.Consumer>
      {value=>(
        <>
          <div
            id="coordinates"
            style={{
              position: 'fixed',
              top: '10px',
              left: '10px',
              zIndex: '999'
            }}
          >
            X: {leftPosition}&nbsp;
            Y: {topPosition}
          </div>
          <div 
            id="sprite" 
            className="sprite" 
            tabIndex={-1} 
            style={
              {
                'position': 'absolute', 
                'transform': `translate(calc(50% ), calc(50%))`, 
                'top': `calc(50% + ${topPosition}px)`, 
                'left': `calc(50% + ${leftPosition}px`, 
                'zIndex': '99'
              }
            } 
            ref={spriteRef as React.RefObject<HTMLDivElement>}
            onKeyDown={(e)=>startMovement(e, value)}
            onKeyUp={(e)=>stopMovement(e)}
            onBlur={()=>spriteRef.current?.focus()}
          >
            <img src={image.src} height={image.height} width={image.width} alt="sprite" />
          </div>
        </>
      )}
    </CanvasContext.Consumer>
    
  )
}
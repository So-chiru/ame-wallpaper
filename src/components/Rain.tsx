import React, { useEffect, useRef, useState } from 'react'

import '@/styles/rain.scss'
import Rain from '@/core/rain'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

interface RainComponentProps {
  max?: number
  speed?: number
}

export const RainComponent = (props: RainComponentProps) => {
  const [canvas, setCanvas] = useState<Rain>()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    const rainCanvas = new Rain(canvasRef.current)

    const onResize = () => {
      rainCanvas.resize()
    }

    window.addEventListener('resize', onResize)

    setCanvas(rainCanvas)

    rainCanvas.start()

    return () => {
      window.removeEventListener('resize', onResize)
      rainCanvas.destroy()
    }
  }, [canvasRef.current])

  useEffect(() => {
    if (!canvas) {
      return
    }

    if (typeof props.max !== 'undefined') {
      canvas.max = props.max
    }

    if (typeof props.speed !== 'undefined') {
      canvas.speed = props.speed
    }
  }, [canvas, props])

  return (
    <div className='ame-rain'>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

interface RainContainerProps {}

export const RainContainer = ({}: RainContainerProps) => {
  let rains = (useSelector(
    (state: RootState) => state.settings.max_rain.value
  ) as unknown) as number

  let rainSpeed = (useSelector(
    (state: RootState) => state.settings.speed_rain.value
  ) as unknown) as number

  if (!rains) {
    return <></>
  }

  return <RainComponent max={rains} speed={rainSpeed}></RainComponent>
}

export default RainContainer

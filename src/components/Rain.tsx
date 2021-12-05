import React, { useEffect, useRef, useState } from 'react'

import '@/styles/rain.scss'
import Rain from '@/core/rain'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

interface RainComponentProps {
  max?: number
  speed?: number
  animation?: boolean
  beatStrategy?: number
  debugWave?: boolean
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

    if (typeof props.animation !== 'undefined') {
      canvas.animation = props.animation
    }

    if (typeof props.debugWave !== 'undefined') {
      canvas.debugWave = props.debugWave
    }

    if (typeof props.beatStrategy !== 'undefined') {
      canvas.beatStrategy = props.beatStrategy
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
  const rains = useSelector(
    (state: RootState) => state.settings.max_rain.value
  ) as number

  const rainSpeed = useSelector(
    (state: RootState) => state.settings.speed_rain.value
  ) as number

  const rainAnimation = useSelector(
    (state: RootState) => state.settings.use_music_speed_control.value
  ) as boolean

  const beatStrategy = useSelector(
    (state: RootState) => state.settings.beat_strategy.value
  ) as number

  const debugWave = useSelector(
    (state: RootState) => state.settings.use_debug_wave.value
  ) as boolean

  if (!rains) {
    return <></>
  }

  return (
    <RainComponent
      max={rains}
      speed={rainSpeed}
      animation={rainAnimation}
      beatStrategy={beatStrategy}
      debugWave={debugWave}
    ></RainComponent>
  )
}

export default RainContainer

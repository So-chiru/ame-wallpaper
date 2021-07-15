import React from 'react'

import { RootState } from '@/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

interface Ripple {
  x: number
  y: number
}

import '@/styles/ripple'

class RippleManager {
  ripples: Map<string, Ripple>
  onUpdate?: (ripples: RippleManager['ripples']) => void
  timeout: number

  constructor () {
    this.ripples = new Map()
    this.timeout = 950
  }

  add (v: Ripple) {
    const id = Math.random().toString(36)

    this.ripples.set(id, v)

    if (this.onUpdate) {
      this.onUpdate(this.ripples)
    }

    setTimeout(() => {
      this.remove(id)
    }, this.timeout)
  }

  remove (id: string) {
    if (this.ripples.has(id)) {
      this.ripples.delete(id)
    }

    if (this.onUpdate) {
      this.onUpdate(this.ripples)
    }
  }
}

interface RippleComponentProps extends Ripple {
  id: string
}

export const RippleComponent = ({ id, x, y }: RippleComponentProps) => {
  return (
    <div
      className='ame-ripple'
      data-id={id}
      style={{
        ['--x' as string]: x,
        ['--y' as string]: y
      }}
    ></div>
  )
}

export const RippleContainer = () => {
  const useRipple = useSelector(
    (state: RootState) => state.settings.use_ripple_effect.value
  ) as boolean

  const [_, update] = useState<number>(0)

  const [manager, _setManager] = useState<RippleManager>(new RippleManager())

  useEffect(() => {
    if (!useRipple) {
      return
    }

    const onClick = (ev: MouseEvent) => {
      manager.add({
        x: ev.x,
        y: ev.y
      })
    }

    window.addEventListener('click', onClick)

    manager.onUpdate = () => {
      update(Math.random())
    }

    return () => {
      window.removeEventListener('click', onClick)
    }
  })

  return (
    <div className='ame-ripple-container'>
      {Array.from(manager.ripples.keys()).map(key => (
        <RippleComponent
          id={key}
          key={key}
          x={manager.ripples.get(key)!.x}
          y={manager.ripples.get(key)!.y}
        ></RippleComponent>
      ))}
    </div>
  )
}

export default RippleContainer

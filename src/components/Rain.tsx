import React from 'react'

interface RainComponentProps {}

export const RainComponent = ({}: RainComponentProps) => {
  return <div className='ame-rain'></div>
}

interface RainContainerProps {}

export const RainContainer = ({}: RainContainerProps) => {
  return <RainComponent></RainComponent>
}

export default RainContainer

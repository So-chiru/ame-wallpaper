import React from 'react'

interface FullScreenButtonComponentProps {
  active: boolean
  onClick: () => void
}

export const FullScreenButtonComponent = ({
  active,
  onClick
}: FullScreenButtonComponentProps) => {
  return (
    <div
      className={['full-screen-button', active && 'active']
        .filter(v => typeof v === 'string')
        .join(' ')}
      onClick={onClick}
    >
      {active ? (
        <span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='24'
            height='24'
          >
            <path fill='none' d='M0 0h24v24H0z' />
            <path
              d='M18 7h4v2h-6V3h2v4zM8 9H2V7h4V3h2v6zm10 8v4h-2v-6h6v2h-4zM8 15v6H6v-4H2v-2h6z'
              fill='#000'
            />
          </svg>
        </span>
      ) : (
        <span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='24'
            height='24'
          >
            <path fill='none' d='M0 0h24v24H0z' />
            <path
              d='M20 3h2v6h-2V5h-4V3h4zM4 3h4v2H4v4H2V3h2zm16 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z'
              fill='#000'
            />
          </svg>
        </span>
      )}
    </div>
  )
}

const FullScreenButtonContainer = ({
  active,
  onClick
}: FullScreenButtonComponentProps) => {
  return (
    <FullScreenButtonComponent
      active={active}
      onClick={onClick}
    ></FullScreenButtonComponent>
  )
}

export default FullScreenButtonContainer

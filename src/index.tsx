import React from 'react'
import { render } from 'react-dom'

import App from './app'

import '@/styles/index'

render(
  <App></App>, document.querySelector('#app')
)

window.addEventListener('load', () => {
  const app = document.querySelector('.app') as HTMLDivElement
  app.classList.add('load-done')
})
import React from 'react'

import { Provider } from 'react-redux'

import store from './store/index'

import Background from './components/Background'
import Options from './components/Options'
import Rain from './components/Rain'
import Logo from './components/Logo'
import Ripple from './components/Ripple'

const App = () => {
  return (
    <Provider store={store}>
      <>
        <Options></Options>
        <Background></Background>
        <Rain></Rain>
        <Logo></Logo>
        <Ripple></Ripple>
      </>
    </Provider>
  )
}

export default App

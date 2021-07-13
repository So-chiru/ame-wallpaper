import React from 'react'

import { Provider } from 'react-redux'

import store from './store/index'

import Background from './components/Background'
import Options from './components/Options'
import Rain from './components/Rain'

const App = () => {
  return (
    <Provider store={store}>
      <>
        <Options></Options>
        <Background></Background>
        <Rain></Rain>
      </>
    </Provider>
  )
}

export default App

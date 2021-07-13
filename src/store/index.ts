import { createStore, combineReducers } from 'redux'

import SettingsReducer from './settings/reducer'

// 최상위 Reducer. 하위 Reducer들을 여기다 집어 넣습니다.
const reducers = combineReducers({
  settings: SettingsReducer
})

// 하위 컴포넌트에서 최상위 Reducer에서 추론된 타입을 이용할 수 있도록 RootState 변수를 지정합니다.
export type RootState = ReturnType<typeof reducers>

// react-redux 저장소를 만듭니다.
const store = createStore(reducers)
export default store

import { EnvAction } from './action'

type WallpaperEnvironment = 'wallpaperEngine' | 'browser'

export interface EnvDefaultType {
  mode: WallpaperEnvironment
}

export const EnvDefault: EnvDefaultType = {
  mode: typeof window.wallpaperRegisterAudioListener !== 'undefined' ? 'wallpaperEngine' : 'browser'
}

const EnvReducer = (
  state = EnvDefault,
  action: EnvAction
): EnvDefaultType => {
  switch (action.type) {
    case '@ame/env/set':
      return Object.assign({}, state, {
        mode: action.data
      })
    default:
      return state
  }
}

export default EnvReducer

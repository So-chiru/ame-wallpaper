export interface EnvAction {
  type: string
  data?: unknown
}

export const updateSettings = (
  data: unknown
): EnvAction => {
  return {
    type: '@ame/env/set',
    data: data
  }
}

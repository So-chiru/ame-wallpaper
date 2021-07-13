export interface SettingsAction {
  type: string
  key?: AmeOptionKeys
  data?: unknown
  object?: { key: AmeOptionKeys; data: AmeOption['value'] }[]
}

export const updateSettings = (
  data: { key: AmeOptionKeys; data: AmeOption['value'] }[]
): SettingsAction => {
  return {
    type: '@ame/settings/update',
    object: data
  }
}

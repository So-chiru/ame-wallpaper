// project.json generator

import {
  AmeOption,
  AmeOptionKeys,
  SettingsCategory,
  SettingsCategoryKeys,
  SettingsCategoryOrder,
  SettingsLanguages
} from './src/@types/option'
import fs from 'fs'
import path from 'path'

import { WEOptions } from './src/@types/wallpaper_engine'

import { SettingsDefault } from './src/store/settings/reducer'

const project: any = {
  contentrating: 'Everyone',
  description: 'ツユのやっぱり雨は降るんだね',
  file: 'index.html',
  general: {
    supportsaudioprocessing: true,
    localization: {
      'en-us': {
        ui_howToCalendar:
          "The guide for Notion calendar setup is available in <a href='https://www.notion.so/How-to-setup-notion-calendar-for-wallpaper-c064462ab84b4a63b8cf99cf0ccb8573'>here</a>."
      },

      'ja-jp': {
        ui_howToCalendar:
          "Notionカレンダー設定方法は<a href='https://www.notion.so/How-to-setup-notion-calendar-for-wallpaper-c064462ab84b4a63b8cf99cf0ccb8573'>こちら</a>から確認できます。"
      },

      'ko-kr': {
        ui_howToCalendar:
          "Notion 캘린더 설정 가이드는 <a href='https://www.notion.so/b693231f298b44cdb7ed4adabbddb226'>여기</a>에서 확인 할 수 있습니다."
      }
    },
    properties: {
      logos: {
        order: 99999,
        text: `<hr style='width: 200px;'><p style='margin-left: 30px;'>version ${process.env.npm_package_version} - <a href='https://steamcommunity.com/sharedfiles/filedetails/changelog/2038274232'>Changelog</a>, wallpaper by <a href='https://steamcommunity.com/profiles/76561198273773489'>Sochiru</a>.</p>`
      },
      calendar_how_to: {
        order: SettingsCategoryOrder['Calendar'] * 100 + 99,
        text: 'ui_howToCalendar'
      },
      schemecolor: {
        order: 101,
        text: 'ui_browse_properties_scheme_color',
        type: 'color',
        value: '0.14901960784313725 0.6352941176470588 0.7725490196078432'
      }
    }
  },
  preview: 'preview.jpg',
  tags: ['Unspecified'],
  title: 'やっぱり雨は降るんだね',
  type: 'web',
  workshopid: '2038274232'
}
;(() => {
  const properties: {
    [key in string]?: WEOptions
  } = {}

  const languages: {
    [key in string]?: { [index: string]: string }
  } = {}

  const categories: {
    [key in keyof typeof SettingsCategory]?: {
      [key in AmeOptionKeys]?: AmeOption
    }
  } = {}

  for (const key in SettingsDefault) {
    const item = SettingsDefault[key as AmeOptionKeys]

    if (!item.category) {
      if (!categories['General']) {
        categories['General'] = {}
      }

      categories['General'][key as AmeOptionKeys] = item
    } else {
      if (!categories[item.category]) {
        categories[item.category] = {}
      }

      categories[item.category]![key as AmeOptionKeys] = item
    }
  }

  for (const categoryKey in categories) {
    const category = categories[categoryKey as keyof typeof SettingsCategory]!

    const settingKeys = Object.keys(category)
    for (let i = 0; i < settingKeys.length; i++) {
      const settingKey = settingKeys[i] as AmeOptionKeys
      const setting = category[settingKey] as AmeOption

      const order =
        SettingsCategoryOrder[
          categoryKey as keyof typeof SettingsCategoryKeys
        ] * 100

      if (i === 0) {
        properties[categoryKey] = {
          order: order,
          text: `<h3>${
            SettingsCategory[categoryKey as keyof typeof SettingsCategory]
          }</h3></br>`
        }
      }

      properties[settingKey] = {
        order: order + i + 1,
        text: 'ui_' + settingKey, //setting.description,
        value: setting.default
      }

      if (setting.localization) {
        if (typeof setting.localization === 'string') {
          SettingsLanguages.forEach(lang => {
            if (!languages[lang]) {
              languages[lang] = {}
            }

            languages[lang]![
              `ui_${settingKey}`
            ] = setting.localization as string
          })
        } else {
          Object.keys(setting.localization).forEach(lang => {
            if (!languages[lang]) {
              languages[lang] = {}
            }

            languages[lang]![`ui_${settingKey}`] = (setting.localization as {
              [index: string]: string
            })[lang]
          })
        }
      }

      if (setting.weOptions) {
        properties[settingKey] = {
          ...properties[settingKey],
          ...setting.weOptions
        }
      }
    }
  }

  project.general.properties = {
    ...project.general.properties,
    ...properties
  }

  SettingsLanguages.forEach(v => {
    if (!languages[v]) {
      return
    }

    project.general.localization[v] = {
      ...project.general.localization[v],
      ...languages[v]
    }
  })
})()

let distPath = './dist/project.json'

for (let i = 0; i < process.argv.length; i++) {
  if (process.argv[i] === '--env') {
    let toSet = process.argv[i + 1]

    if (!toSet) {
      break
    }

    const split = toSet.split('=')

    if (split[1]) {
      distPath = path.join(split[1], './project.json')
    }
  }
}

fs.writeFileSync(distPath, JSON.stringify(project, null, 2))

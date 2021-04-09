import { isLanguage, isString, isDefined, isBrowser } from '../is'
import { pick } from '../object'
import { getLocation } from '../url'
import { languagesList } from '../languages'

export function getParams(url: string, index = 0): string | string[] {
  if (!url) {
    url = getLocation().pathname
  }

  if (isString(url)) {
    if (url.indexOf('?') > -1) {
      url = url.substr(0, url.indexOf('?'))
    }

    const params = url.split('/')
    params.shift()

    if (params[params.length - 1] === '') {
      params.pop()
    }

    if (index) {
      if (isLanguage(params[0])) {
        index += 1
      }

      if (isDefined(params[index])) {
        return params[index]
      }
    }

    return params
  }

  return ''
}

export const getCurrentLanguage = (url?: string, defaultLanguage = 'en-US') => {
  const params = getParams(url || '')
  return params && isLanguage(params[0]) ? params[0] : defaultLanguage
}

export function redirectTo(url = '/', includeLanguage?: any): void {
  if (isBrowser()) {
    const { pathname } = window.location
    const language = getCurrentLanguage()
    let slash = '/'

    if (url === '_self') {
      if (isLanguage(includeLanguage)) {
        const segments = pathname.split(slash).filter(v => v)

        if (isLanguage(segments[0])) {
          segments[0] = includeLanguage
        }

        window.location.href = `${slash}${segments.join('/')}`
      } else {
        window.location.href = pathname
      }
    } else if (includeLanguage) {
      if (url[0] === '/') {
        slash = ''
      }

      window.location.href = `/${language}${slash}${url}`
    } else {
      window.location.href = url
    }
  }
}

export const getLanguagesList = () => {
  return languagesList
}

export const getSelectLanguages = (list: any) => {
  const languages: any = []
  const currentLanguage = getCurrentLanguage()

  list.forEach((language: string) => {
    languages.push({
      option: languagesList[language].name,
      value: languagesList[language].lang,
      selected: language === currentLanguage
    })
  })

  return languages
}

export const availableLanguages = (join = true) => {
  const listOfLanguages = Object.keys(languagesList)

  if (join) {
    return listOfLanguages.join('|')
  }

  return listOfLanguages
}

export function t(key: string, __: any) {
  return pick(key, __)
}

export function getDirection(language?: any, value1?: any, value2?: any): any {
  if (!isLanguage(language)) {
    language = getCurrentLanguage()
  }

  if (!value1) {
    value1 = 'rtl'
  }

  if (!value2) {
    value2 = 'ltr'
  }

  return language === 'ar' ? value1 : value2
}

import { isBrowser, isLanguage, isString, isDefined } from '../is'

export function getLocation(req?: any): any {
  return typeof window !== 'undefined' ? window.location : { pathname: req && req.url }
}

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

export function getParamsFromUrl(mapParams: string[], baseUrl?: string): any {
  let pathname = ''

  if (isBrowser() && !baseUrl) {
    pathname = window.location.pathname
  } else if (baseUrl) {
    pathname = baseUrl.split('?')[0] // eslint-disable-line prefer-destructuring

    if (pathname.substr(-1) === '/') {
      pathname = pathname.slice(0, -1)
    }
  }

  const chunks = pathname.split('/').filter(v => v)
  const params: any = {}

  mapParams.forEach((param, i) => {
    params[param] = chunks[i] || null
  })

  return params
}

import { isBrowser } from '../is'

export function getLocation(req?: any): any {
  return typeof window !== 'undefined' ? window.location : { pathname: req && req.url }
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

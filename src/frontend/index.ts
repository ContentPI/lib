// Dependencies
import slug from 'slug'

// Utils
import { isDefined, isString } from '../is'

// Interfaces
interface Router {
  asPath: string
}

interface PathInfo {
  section: string
  module: string
  action: string
  id: string
}

interface iAdd {
  if: (condition: boolean) => string
}

interface iProps {
  ccn: string
  data: string[]
  className?: string
}

export function buildUrl(params: string[]): string {
  return params.filter(v => v).join('/')
}

export function slugFn(str = ''): string {
  return slug(str, { lower: true })
}

export function cx(...classes: string[]): string {
  return classes.join(' ').trim()
}

export function isFirstRender(items: any[] | any): boolean {
  return !isDefined(items) || items.length === 0 || Object.keys(items).length === 0
}

export function waitFor(time: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, time * 1000))
}

export function add(cssRule: string | any): iAdd {
  return {
    if: (condition: boolean) => {
      if (condition && cssRule) {
        if (isString(cssRule)) {
          return cssRule
        }

        let cssString = ''

        Object.keys(cssRule).forEach((property: string) => {
          cssString += `${property}: ${cssRule[property]};`
        })

        return cssString
      }

      return ''
    }
  }
}

export function cxGenerator({ ccn, data, className }: iProps): string {
  const classList = [ccn]

  data.forEach(key => {
    if (key !== '') {
      classList.push(`${ccn}-${key}`)
    }
  })

  if (className) {
    classList.push(className)
  }

  return classList.join(' ')
}

export function getModuleInfo(router: Router): PathInfo {
  let cleanPath = router.asPath.split('?')[0]

  if (cleanPath.substr(-1) === '/') {
    cleanPath = cleanPath.slice(0, -1)
  }

  const [, section, module = 'home', action, id] = cleanPath.split('/')

  return {
    section,
    module,
    action,
    id
  }
}

export function scrollToTop(): void {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

export function isValidHexColor(hexCode: string): boolean {
  return /^#([0-9a-f]{3}){1,2}$/i.test(hexCode.toLowerCase())
}

export function generateHexCode(): string {
  let newHex = `${Math.floor(Math.random() * 16777215)
    .toString(16)
    .substring(0, 7)}`

  if (newHex.length < 6) {
    newHex += 'f'
  }

  return `#${newHex}`
}

export function invertHexCode(hexCode?: any): string {
  if (!hexCode) {
    return '#FFFFFF'
  }

  let hex = hexCode.replace('#', '')

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }

  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)

  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF'
}

export function getInitialState() {
  if (typeof window !== 'undefined') {
    if (window.initialState) {
      return window.initialState
    }
  }

  return {}
}

export function getCookie(name: string): string {
  const cookie = `; ${document.cookie}`.match(`;\\s*${name}=([^;]+)`)
  return cookie ? cookie[1] : ''
}

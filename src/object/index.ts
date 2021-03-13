// Dependencies
import dot from 'dot-object'

// Utils
import { isBrowser, isObject, isDefined, isJson, isArray } from '../is'

interface iData {
  _DEBUG: string
}

interface iNode {
  key: string
  value: string
}

export function cloneObject(o: any): any {
  return { ...o }
}

export function getDebug(data: iData): any {
  if (data._DEBUG) {
    return JSON.parse(data._DEBUG)
  }

  return null
}

export function keys(obj: any): any[] {
  if (isObject(obj)) {
    return Object.keys(obj)
  }

  return []
}

export function forEach(items: any, callback: any): any {
  if (!isDefined(items)) {
    return false
  }

  if ((isDefined(items) && isDefined(items[0])) || isArray(items)) {
    return items.forEach(callback)
  }

  return isObject(items) ? keys(items).forEach(callback) : false
}

export function pick(key: string, obj: any): string {
  return dot.pick(key, obj) || key
}

export function buildContentJson(nodes: iNode[], raw?: boolean) {
  const rows: any = {}

  forEach(nodes, (node: iNode) => {
    rows[node.key] = node.value
  })

  if (!raw) {
    dot.object(rows)
  }

  return rows
}

export function objectToDot(nodes: any): any {
  if (isObject(nodes)) {
    return dot.dot(nodes)
  }

  return null
}

export function hasOwnProperty(obj: any, prop: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

export function getStorageItem(key: string, returnJson = true): any {
  if (!isBrowser() || !localStorage) {
    return null
  }

  const item = localStorage.getItem(key) || ''

  if (returnJson && isJson(item)) {
    return JSON.parse(item)
  }

  return item
}

export function setStorageItem(key: string, value: any): any {
  if (isBrowser() && key && value && localStorage) {
    if (isObject(value)) {
      value = JSON.stringify(value)
    }

    localStorage.setItem(key, value)

    return true
  }

  return null
}

export function removeStorageItem(key: string): void {
  if (isBrowser() && key && localStorage) {
    localStorage.removeItem(key)
  }
}

export function clearStorage(): void {
  if (isBrowser() && localStorage) {
    localStorage.clear()
  }
}

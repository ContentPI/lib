import {
  buildContentJson,
  cloneObject,
  forEach,
  getDebug,
  hasOwnProperty,
  keys,
  objectToDot,
  pick
} from '../index'

describe('#cloneObject', () => {
  it('should clone an object', () => {
    const obj = {
      foo: true,
      baz: false
    }

    const clonedObj = cloneObject(obj)

    expect(clonedObj).toEqual(obj)
  })

  it('should clone an object and have a different instance', () => {
    const obj = {
      foo: true,
      baz: false
    }

    const clonedObj = cloneObject(obj)

    expect(clonedObj === obj).toBe(false)
  })
})

describe('#getDebug', () => {
  it('should get the debug data', () => {
    const query = {
      _DEBUG: JSON.stringify({
        foo: 'bar'
      })
    }

    const debug = getDebug(query)

    expect(debug.foo).toEqual('bar')
  })

  it('should clone an object and have a different instance', () => {
    const obj = {
      foo: true,
      baz: false
    }

    const clonedObj = cloneObject(obj)

    expect(clonedObj === obj).toBe(false)
  })
})

describe('#keys', () => {
  it('should get the object keys', () => {
    const obj = {
      foo: 'bar',
      baz: 'bar'
    }

    expect(keys(obj)).toEqual(['foo', 'baz'])
  })
})

describe('#hasOwnProperty', () => {
  it('should get find a node', () => {
    const obj = {
      foo: 'bar',
      baz: 'bar'
    }

    expect(hasOwnProperty(obj, 'foo')).toBe(true)
  })
})

describe('#buildContentJson', () => {
  it('should build a json from content', () => {
    const content = [
      {
        key: 'site.language',
        value: 'en'
      },
      {
        key: 'site.title',
        value: 'Bar'
      },
      {
        key: 'site.meta.abstract',
        value: 'Foo'
      }
    ]

    const expectedResult = {
      site: {
        language: 'en',
        title: 'Bar',
        meta: {
          abstract: 'Foo'
        }
      }
    }

    expect(buildContentJson(content)).toEqual(expectedResult)
  })
})

describe('#forEach', () => {
  it('should call the callback on the forEach', () => {
    const mockCallback = jest.fn()

    forEach([0, 1], mockCallback)

    // The mock function is called twice
    expect(mockCallback.mock.calls.length).toBe(2)

    // The first argument of the first call to the function was 0
    expect(mockCallback.mock.calls[0][0]).toBe(0)

    // The first argument of the second call to the function was 1
    expect(mockCallback.mock.calls[1][0]).toBe(1)
  })

  it('should return false when the items are not defined', () => {
    const mockCallback = jest.fn()

    expect(forEach(undefined, mockCallback)).toBe(false)
  })
})

describe('#objectToDot', () => {
  it('should convert an object to dot notation', () => {
    const content = {
      site: {
        language: 'en',
        title: 'Bar',
        meta: {
          abstract: 'Foo'
        }
      }
    }

    const expectedResult = {
      'site.language': 'en',
      'site.meta.abstract': 'Foo',
      'site.title': 'Bar'
    }

    const result = objectToDot(content)

    expect(result).toEqual(expectedResult)
  })

  it('should return null if content is not an object', () => {
    const content = ['foo', 'bar']

    const expectedResult = null

    const result = objectToDot(content)

    expect(result).toEqual(expectedResult)
  })
})

describe('#pick', () => {
  it('should pick a key from object', () => {
    const test = {
      foo: {
        bar: 'Testing'
      }
    }

    expect(pick('foo.bar', test)).toBe('Testing')
  })

  it('should return a key that could not find in the object', () => {
    const test = {
      foo: {
        bar: 'Testing'
      }
    }

    expect(pick('foo.baz', test)).toBe('foo.baz')
  })
})

import { pluralify } from '../index'

describe('#pluralify', () => {
  it('should return singular value', () => {
    expect(pluralify('Entry', 'Entries', 1)).toBe('Entry')
  })

  it('should return plural', () => {
    expect(pluralify('Entry', 'Entries', 0)).toBe('Entries')
    expect(pluralify('Entry', 'Entries', 2)).toBe('Entries')
  })
})

import { isSameDir } from '../lib/index.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const fixtures = (type) => [
  path.resolve(__dirname, './fixtures', type, 'a'),
  path.resolve(__dirname, './fixtures', type, 'b'),
]

describe('is same dir', () => {
  it('files count not match should return false', async () => {
    expect(await isSameDir(...fixtures('files-count-not-match'))).toBe(false)
  })
  it('file content not match should return false', async () => {
    expect(await isSameDir(...fixtures('files-content-not-match'))).toBe(false)
  })
  it('file content&count match should return true', async () => {
    expect(await isSameDir(...fixtures('basic'))).toBe(true)
  })
})

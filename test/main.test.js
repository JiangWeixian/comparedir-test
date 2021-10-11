import { compare } from '../lib/index.js'
import path, { dirname }  from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const fixtures = (type) => [
  path.resolve(__dirname, './fixtures', type, 'a'),
  path.resolve(__dirname, './fixtures', type, 'b'),
]

describe('compare dir', () => {
  it.todo('glob should contain hidden files')
  it.todo('glob should contain dynamic files')
  it('files count not match should return false', async () => {
    expect(compare(...fixtures('files-count-not-match'), {})).rejects.toThrowError()
  })
  it('file content not match should return false', async () => {
    expect(compare(...fixtures('files-content-not-match'), {})).rejects.toThrowError()
  })
  it('file content&count match should return true', async () => {
    expect(compare(...fixtures('basic'), {})).resolves.toBe(true)
  })
})
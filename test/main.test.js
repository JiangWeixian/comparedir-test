import { compare } from '../lib/index.js'
import path from 'path'

const fixtures = (type) => [
  path.resolve('.', './fixtures', type, 'a'),
  path.resolve('.', './fixtures', type, 'b'),
]

describe('compare dir', () => {
  it.todo('glob should contain hidden files')
  it.todo('glob should contain dynamic files')
  it('files count not match should return false', async () => {
    compare(...fixtures('files-count'), {})
  })
  it.todo('file content not match should return false')
})

import { compare } from '../lib/index.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

describe('compare dir', () => {
  it('nest glob should work', async () => {
    await compare(path.resolve(__dirname, '..'), path.resolve(__dirname, '..'))
  })
})

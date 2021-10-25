import { glob } from '../lib/index.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs-extra'

const __dirname = dirname(fileURLToPath(import.meta.url))

describe('compare dir', () => {
  it('glob ignore ', async () => {
    fs.moveSync(
      path.resolve(__dirname, '..', './.gitignore'),
      path.resolve(__dirname, '..', './.github/.gitignore'),
    )
    const files = await glob(path.resolve(__dirname, '..'))
    console.log(files)
    fs.moveSync(
      path.resolve(__dirname, '..', './.github/.gitignore'),
      path.resolve(__dirname, '..', './.gitignore'),
    )
  })
})

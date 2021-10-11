import { globby } from 'globby'
import path from 'path'
import fs from 'fs'

/**
 * compare input and target dir is same or not
 * @param input dir path
 * @param target snapshot dir path
 * @param _options
 */
export const compare = async (input: string, target: string, _options?: any) => {
  const [inputFiles, targetFiles] = await Promise.all(
    [input, target].map((cwd) => {
      return globby(['**'], { cwd, gitignore: true })
    }),
  )
  if (inputFiles.length !== targetFiles.length) {
    throw new Error('input total files count not match target')
  }
  for (const inputFilePath of inputFiles) {
    const targetFilePath = path.resolve(target, inputFilePath)
    if (!fs.existsSync(targetFilePath)) {
      throw new Error('target file not exit')
    }
    const inputBuffer = fs.readFileSync(path.resolve(input, inputFilePath))
    const targetBuffer = fs.readFileSync(targetFilePath)
    if (!inputBuffer.equals(targetBuffer)) {
      throw new Error('input file content not match target file')
    }
  }
  return true
}

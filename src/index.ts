import { globby } from 'globby'
import path from 'path'
import fs from 'fs'
import { toMatchFile } from 'jest-file-snapshot'
import ignorePatterns from '@aiou/eslint-ignore'

export const glob = (cwd: string) => {
  return globby(['**'], { cwd, gitignore: true, dot: true, ignore: ignorePatterns })
}

/**
 * compare input and target dir is same or not
 * @param input current dir path
 * @param target expected snapshot dir path
 * @param _options
 */
export const compare = async (input: string, target: string, _options?: any) => {
  if ('expect' in global) {
    try {
      expect.extend({ toMatchFile })
    } catch (e) {}
  }
  const [inputFiles, targetFiles] = await Promise.all(
    [input, target].map((cwd) => {
      return glob(cwd)
    }),
  )
  if (inputFiles.length !== targetFiles.length) {
    if ('expect' in global) {
      expect(inputFiles.length).toBe(targetFiles.length)
    }
    return false
  }
  for (const inputFilePath of inputFiles) {
    const targetFilePath = path.resolve(target, inputFilePath)
    if (!fs.existsSync(targetFilePath)) {
      if ('expect' in global) {
        expect(fs.existsSync(targetFilePath)).toBe(true)
      }
      return false
    }
    const inputBuffer = fs.readFileSync(path.resolve(input, inputFilePath))
    const targetBuffer = fs.readFileSync(targetFilePath)
    if ('expect' in global) {
      expect(inputBuffer.toString()).toMatchFile(targetFilePath)
    }
    if (!inputBuffer.equals(targetBuffer)) {
      return false
    }
  }
  return true
}

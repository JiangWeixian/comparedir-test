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
export const isSameDir = async (input: string, target: string, _options?: any) => {
  const [inputFiles, targetFiles] = await Promise.all(
    [input, target].map((cwd) => {
      return glob(cwd)
    }),
  )
  if (inputFiles.length !== targetFiles.length) {
    return false
  }
  for (const inputFilePath of inputFiles) {
    const targetFilePath = path.resolve(target, inputFilePath)
    if (!fs.existsSync(targetFilePath)) {
      return false
    }
    const inputBuffer = fs.readFileSync(path.resolve(input, inputFilePath))
    const targetBuffer = fs.readFileSync(targetFilePath)
    // if not in jest env, early return false if not equal
    if (!inputBuffer.equals(targetBuffer)) {
      return false
    }
  }
  return true
}

function toExit(
  this: { snapshotState: { _updateSnapshot: string } },
  inputFilePath: string,
  targetFilePath: string,
): any {
  if ('expect' in global) {
    if (this.snapshotState._updateSnapshot === 'new') {
      return {
        pass: fs.existsSync(targetFilePath),
        message: () => `Expect received file ${targetFilePath} not exited`,
      }
    } else if (this.snapshotState._updateSnapshot === 'all') {
      const inputBuffer = fs.readFileSync(inputFilePath)
      expect(inputBuffer.toString()).toMatchFile(targetFilePath)
      return {
        pass: true,
        message: () => `Update ${inputFilePath}`,
      }
    }
  }
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
      expect.extend({ toExit: toExit as any })
    } catch (e) {}
  }
  const [inputFiles] = await Promise.all(
    [input, target].map((cwd) => {
      return glob(cwd)
    }),
  )
  for (const inputFilePath of inputFiles) {
    const abTargetFilePath = path.resolve(target, inputFilePath)
    const abInputFilePath = path.resolve(input, inputFilePath)
    if ('expect' in global) {
      if (!fs.existsSync(abTargetFilePath)) {
        ;(expect(abInputFilePath) as any).toExit(abTargetFilePath)
      } else {
        const inputBuffer = fs.readFileSync(abInputFilePath)
        expect(inputBuffer.toString()).toMatchFile(abTargetFilePath)
      }
    }
  }
  return true
}

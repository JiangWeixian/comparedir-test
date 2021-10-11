import typescript from '@rollup/plugin-typescript'
import alias from '@rollup/plugin-alias'
import bundlesize from 'rollup-plugin-bundle-size'
import pkg from './package.json'

export default [
  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/index.ts',
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }), // so Rollup can convert TypeScript to JavaScript
      alias({
        resolve: ['.ts', '.js', '.tsx', '.jsx'],
        entries: [{ find: '@/', replacement: './src/' }],
      }),
      bundlesize({ file: pkg.exports }),
    ],
    output: [{ file: pkg.exports, format: 'es' }],
  },
]

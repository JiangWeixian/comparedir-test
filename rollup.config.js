import typescript from '@rollup/plugin-typescript'
import alias from '@rollup/plugin-alias'
import bundleSize from 'rollup-plugin-bundle-size'
import pkg from './package.json'

export default [
  // browser-friendly UMD build
  // {
  //   input: 'src/index.ts',
  //   plugins: [
  //     resolve(), // so Rollup can find `ms`
  //     commonjs(), // so Rollup can convert `ms` to an ES module
  //     typescript({
  //       typescript: require('typescript'),
  //     }), // so Rollup can convert TypeScript to JavaScript
  //     alias({
  //       resolve: ['.ts', '.js', '.tsx', '.jsx'],
  //       entries: [{ find: '@/', replacement: './src/' }],
  //     }),
  //     // exclude dependencies and peerDependencies
  //     excludeDependenciesFromBundle({
  //       peerDependencies: true,
  //     }),
  //     // console.log bundle file size
  //     bundleSize(),
  //   ],
  //   output: {
  //     name: 'rollup-template',
  //     file: pkg.browser,
  //     format: 'umd',
  //   },
  // },

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
      bundleSize(),
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
]

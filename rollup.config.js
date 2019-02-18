import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

let pkg = require('./package.json')
let external = ['@hatiolab/things-scene']
// let externalForESM = ['@hatiolab/things-scene']
let plugins = [
  resolve(),
  babel(),
  commonjs({
    namedExports: {
      'node_modules/chart.js/src/chart.js': ['Chart']
    }
  }),
  terser({
    sourcemap: true
  })
]

function getFileNameFromPackageName(pkg) {
  var name = pkg.name
  var regex = /^@(things-scene)\/(\w+)/
  var matched = regex.exec(name)
  return `${matched[1]}-${matched[2]}`
}

const PACKAGE_NAME = getFileNameFromPackageName(pkg)

export default [
  {
    input: 'src/index.js',
    plugins,
    external,
    output: [
      {
        file: `dist/${PACKAGE_NAME}.js`,
        name: PACKAGE_NAME,
        format: 'umd',
        globals: {
          '@hatiolab/things-scene': 'scene'
        }
      }
    ]
  },
  {
    input: 'src/index.js',
    plugins,
    external,
    // external: externalForESM,
    output: [
      {
        file: `dist/${PACKAGE_NAME}.mjs`,
        format: 'esm'
      }
    ]
  }
]

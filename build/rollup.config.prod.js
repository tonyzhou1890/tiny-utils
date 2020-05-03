import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

export default {
  input: './src/index.js',
  output: {
    file: './lib/index.min.js',
    format: 'umd',
    name: 'tinyUtil'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    uglify()
  ]
}
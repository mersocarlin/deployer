import json from '@rollup/plugin-json'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

export default {
  input: './src/index.ts',
  output: {
    banner: '#!/usr/bin/env node',
    file: 'dist/index.js',
    format: 'cjs',
  },
  external: Object.keys(pkg.dependencies),
  plugins: [json(), typescript(), terser()],
}

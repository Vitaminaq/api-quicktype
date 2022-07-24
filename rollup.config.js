import typescript from '@rollup/plugin-typescript';
import { terser } from "rollup-plugin-terser";
import clear from 'rollup-plugin-clear';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default [{
  input: 'extension.ts',
  output: {
    file: 'dist/quicktype.js',
    format: 'cjs',
    exports: 'named',
    name: 'APIQuicktype'
  },
  plugins: [
    typescript({
      tsconfig: "tsconfig.json"
    }),
    getBabelOutputPlugin({
      presets: ['@babel/preset-env'],
    }),
    json(),
    commonjs(),
    nodeResolve({
      preferBuiltins: true
    }),
    terser(),
    clear({
       targets: [ './dist' ]
    })
  ]
}];
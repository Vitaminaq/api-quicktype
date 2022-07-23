import typescript from '@rollup/plugin-typescript';
import { terser } from "rollup-plugin-terser";
import clear from 'rollup-plugin-clear';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

export default [{
  input: 'src/main.ts',
  output: {
    file: 'dist/quicktype.cjs',
    format: 'cjs',
    exports: 'named',
    name: 'APIQuicktype'
  },
  plugins: [
    typescript({
      tsconfig: "tsconfig.json",
      lib: ["es5", "es6", "dom"],
      target: "es5"
    }),
    getBabelOutputPlugin({
      presets: ['@babel/preset-env'],
    }),
    terser(),
    clear({
       targets: [ './dist' ]
    })
  ]
}];
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts';
import { defineConfig } from 'rollup'
import clear from 'rollup-plugin-clear';

export default defineConfig([{
  input: './src/index.ts',
  output:
    [
      {
        format: 'umd',
        name: 'bpScriptEditor',
        file: './build/bundle.umd.js'
      }, {
        format: 'amd',
        file: './build/bundle.amd.js'
      },
      {
        format: 'cjs',
        file: './build/bundle.cjs.js'
      },
      {
        format: "es",
        file: "./build/bundle.es.js"
      },
    ],

  plugins: [
    terser(),
    resolve(),
    commonjs(),
    typescript(),
    clear({
      targets: ['build']
    }),
  ],
  external: ['react', 'react-dom']
},
{
  input: './src/index.ts',
  plugins: [dts()],
  output: {
    format: 'esm',
    file: './build/index.d.ts',
  },
}]);

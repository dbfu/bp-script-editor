import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import { defineConfig } from 'rollup'
import clear from 'rollup-plugin-clear';

export default defineConfig([{
  input: './src/index.ts',
  output:
    [
      {
        format: "es",
        file: "./build/bundle.es.js"
      },
    ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    clear({
      targets: ['build']
    }),
  ],
  external: ['react', 'react-dom']
}, {
  input: './src/index.ts',
  plugins: [dts()],
  output: {
    format: 'esm',
    file: './build/index.d.ts',
  },
}]);

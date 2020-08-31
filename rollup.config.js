import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

import pkg from './package.json';

export default {
  external: ['mobx-state-tree'],
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      // sourcemap: true,
    },
    // {
    //   file: pkg.module,
    //   format: 'es',
    //   exports: 'named',
    //   sourcemap: true,
    // },
  ],
  plugins: [
    external(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      exclude: '**/__tests__/**',
      clean: true,
    }),
    terser(), // minifies generated bundles
    commonjs({
      include: ['node_modules/**'],
    })
  ],
};

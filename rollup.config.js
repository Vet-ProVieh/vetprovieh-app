import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
const { generateSW } = require('rollup-plugin-workbox');
const { injectManifest } = require('rollup-plugin-workbox');
import copy from 'rollup-plugin-copy'


import {
  terser
} from 'rollup-plugin-terser';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/app/main.js',
  output: {
    file: 'public/bundle.js',
    format: 'iife', // immediately-invoked function expression — suitable for <script> tags
    sourcemap: true
  },
  plugins: [
    resolve(), // tells Rollup how to find date-fns in node_modules
    commonjs(), // converts date-fns to ES modules
    production && terser(), // minify, but only in production
    copy({ // Copy HTML-Pages to Public Folder
      targets: [
        { src: 'src/assets/*', dest: 'www/assets' },
        { src: 'src/pages/*', dest: 'www'}
      ]
    }),
    generateSW({
      swDest: 'public/wb_service_worker.js',
      globDirectory: 'public/',
      globIgnores: ['injectManifest_sw.js'],
    })
  ]
};
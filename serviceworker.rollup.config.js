import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';


import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';


// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/app/serviceWorker.ts',
  output: {
    file: 'www/request_store.js',
    format: 'es', // immediately-invoked function expression — suitable for <script> tags
    sourcemap: true,
  },
  plugins: [
    typescript(),
    resolve({
      browser: true,
    }), // tells Rollup how to find date-fns in node_modules
    commonjs(


    ), // converts date-fns to ES modules
    replace({
      'process.env.NODE_ENV': '"development"',
    }),
  ],
};

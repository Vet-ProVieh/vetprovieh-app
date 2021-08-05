import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { uglify } from "rollup-plugin-uglify";

const {
    generateSW
} = require('rollup-plugin-workbox');
const {
    injectManifest
} = require('rollup-plugin-workbox');
import copy from 'rollup-plugin-copy';
import replace from '@rollup/plugin-replace';
import typescript from 'rollup-plugin-typescript';


var modules = {
    'admin/tenants' : 'admin/tenants',
    'measures' : 'measures',
    'farmers': 'farmers',
    'barns': 'barns',
    'drugs': 'drugs',
    'careplans/operational': 'careplans/operational',
    'careplans/settings/pages/careplans': 'settings/careplans',
    'careplans/settings/pages/groups': 'settings/careplans/groups',
    'careplans/settings/pages/fields': 'settings/careplans/fields',
    'users': 'users',
    'documents': 'documents',
    'register': 'register'
};

var targets = Object.keys(modules).map((source) => {
    return {
        src: 'src/' + source + '/**/*.(html|json)',
        dest: 'www/' + modules[source] + '/',
        flatten: true
    }
})

import {
    terser
} from 'rollup-plugin-terser';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/app/main.ts',
    output: {
        file: 'www/bundle.js',
        format: 'es', // immediately-invoked function expression — suitable for <script> tags
        sourcemap: true
    },
    cache: true,
    treeshake: true,
    plugins: [
        typescript(),
        production && uglify(),
        resolve({
            browser: true
        }), // tells Rollup how to find date-fns in node_modules
        commonjs(
            { sourceMap: false }
        ), // converts date-fns to ES modules
        production && terser(), // minify, but only in production
        replace({
            'process.env.NODE_ENV': '"development"',
          }),
        copy({ // Copy HTML-Pages to Public Folder
            targets: targets.concat([{
                    src: 'src/assets/*',
                    dest: 'www/assets'
                },
                {
                    src: 'src/shared/pages/*',
                    dest: 'www'
                },
                {
                    src: 'node_modules/bulma/css/bulma.min.css',
                    dest: 'www/node_modules/bulma/css/'
                },
                {
                    src: 'node_modules/bulma-pageloader/dist/css/bulma-pageloader.min.css',
                    dest: 'www/node_modules/bulma-pageloader/dist/css'
                },
                {
                    src: 'node_modules/@fortawesome/fontawesome-free/css/all.min.css*',
                    dest: 'www/node_modules/fontawesome/css/'
                },
                {
                    src: 'node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2',
                    dest: 'www/node_modules/fontawesome/webfonts/'
                },
                {
                    src: 'node_modules/ol/ol.css',
                    dest: 'www/assets/css'
                }
            ])
        }),
        generateSW({
            swDest: 'www/wb_service_worker.js',
            globDirectory: 'www/',
            globPatterns: ['**/*'],
            directoryIndex: "index.html",
            globIgnores: ['auth/**/*', 'injectManifest_sw.js', 'fontawesome/js/*.js'],
            clientsClaim: true,
            skipWaiting: true,
            ignoreURLParametersMatching: [/.*/],
            importScripts: ['./request_store.js'],
            runtimeCaching: [{
                    urlPattern: /service/,
                    handler: "NetworkFirst",
                    options: {
                        cacheName: 'api',
                        expiration: {
                            maxEntries: 100,
                            maxAgeSeconds: 72 * 60 * 60
                        },
                        cacheableResponse: {
                            statuses: [0, 200]
                        },
                    }
                },
                {
                    urlPattern: /node_modules/,
                    handler: "CacheFirst",
                    options: {
                        cacheName: 'node_modules',
                        expiration: {
                            maxEntries: 100,
                            maxAgeSeconds: 72 * 60 * 60
                        },
                        cacheableResponse: {
                            statuses: [0, 200]
                        },
                    }
                }
            ]
        })
    ]
};
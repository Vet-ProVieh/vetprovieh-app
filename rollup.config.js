import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';


const {
    generateSW
} = require('rollup-plugin-workbox');
const {
    injectManifest
} = require('rollup-plugin-workbox');
import copy from 'rollup-plugin-copy'
import typescript from 'rollup-plugin-typescript';


var modules = {
    'farmers': 'farmers',
    'barns': 'barns',
    'careplans/operational': 'careplans/operational',
    'careplans/settings/pages/careplans': 'settings/careplans',
    'careplans/settings/pages/groups': 'settings/careplans/groups',
    'careplans/settings/pages/fields': 'settings/careplans/fields'
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
    plugins: [
        typescript(),
        resolve(), // tells Rollup how to find date-fns in node_modules
        commonjs(


        ), // converts date-fns to ES modules
        production && terser(), // minify, but only in production
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
                    src: 'node_modules/bulma/*',
                    dest: 'www/node_modules/bulma'
                },
                {
                    src: 'node_modules/bulma-pageloader/*',
                    dest: 'www/node_modules/bulma-pageloader'
                },
                {
                    src: 'node_modules/@fortawesome/fontawesome-free/*',
                    dest: 'www/node_modules/fontawesome'
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
            globIgnores: ['auth/**/*', 'injectManifest_sw.js'],
            clientsClaim: true,
            skipWaiting: true,
            ignoreURLParametersMatching: [/.*/],
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
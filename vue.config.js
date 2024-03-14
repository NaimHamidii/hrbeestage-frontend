var webpack = require('webpack')
const appConfig = require('./src/app.config')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const path = require('path')

module.exports = {
    //publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',

    configureWebpack: {
        // We provide the app's title in Webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: appConfig.title,
        // Set up all the aliases we use in our app.
        resolve: {
            alias: require('./aliases.config').webpack,
        },
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /Codemirror$/, /lodash$/),
            // This will be enabled whe building

            // new PrerenderSPAPlugin({
            //         staticDir: path.join(__dirname, 'dist'),
            //         //outputDir: path.join(__dirname, 'dist'),
            //         routes: [
            //             '/',
            //             '/privacy-policy',
            //             '/terms-conditions',
            //             '/auth/login',
            //             '/auth/jobseeker',
            //             '/auth/company',
            //             '/auth/forgot',
            //             '/404'
            //         ],

            // })// End of prerender */
        ],
    },
    // tweak internal webpack configuration.
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md

    chainWebpack: (config) => {
        const splitOptions = config.optimization.get('splitChunks')
        config.optimization.splitChunks(
            Object.assign({}, splitOptions, {
                // (default 5) maximum concurrent requests when loading on demand
                maxAsyncRequests: 16,
                // （Default 3) Maximum number of concurrent requests on the entry point
                maxInitialRequests: 16,
                // (Default: 1) The minimum number of blocks of the shared module before splitting
                minChunks: 1,
                //  (default: 30000) the minimum size of the block
                minSize: 30000,
                // Webpack will use the origin and name of the block to generate the name: `vendors~main.js`, if the item conflicts with "~", it can be modified by this value, Eg: '-'
                automaticNameDelimiter: '~',
                // cacheGroups is an object where keys are the cache group names.
                name: true,
                cacheGroups: {
                    default: false,
                    common: {
                        name: `chunk-common`,
                        minChunks: 2,
                        priority: -20,
                        chunks: 'initial',
                        reuseExistingChunk: true,
                    },
                    element: {
                        name: 'bootstra-vue',
                        test: /[\\/]node_modules[\\/]bootstra-vue[\\/]/,
                        chunks: 'initial',
                        // The default group has a lower priority to allow any custom cache group to have a higher priority (default is 0)
                        priority: -30,
                    },
                },
            })
        )
    },

    //https://cli.vuejs.org/config/
    productionSourceMap: false,
    filenameHashing: true,
    css: {
        // Enable CSS source maps.
        sourceMap: false,
    },
    pwa: {
        name: 'HRbee',
        themeColor: '#2DAAE4',
        msTileColor: '#2DAAE4',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        iconPaths: {
            favicon32: 'img/icons/favicon-32x32.png',
            favicon16: 'img/icons/favicon-16x16.png',
            appleTouchIcon: 'img/icons/apple-touch-icon.png',
            maskIcon: 'img/icons/safari-pinned-tab.svg',
            msTileImage: 'img/icons/mstile-150x150.png',
        },
        // configure the workbox plugin (GenerateSW or InjectManifest)
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'public/service-worker.js',
            // ...other Workbox options...
        },
    },
}

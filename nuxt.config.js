/* eslint-disable */
const PurgecssPlugin = require('purgecss-webpack-plugin')
const purgeHtml = require('purgecss-from-html')
const glob = require('glob-all')
const path = require('path')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Waterloop',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Official website of Waterloop',
      },
      {
        name: 'theme-color',
        content: '#fed138',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'icon',
        type: 'icon',
        href: '/icon.png',
      },
    ],
  },
  css: [
    'typeface-lato/index.css',
    'tachyons/css/tachyons.min.css',
    '~/assets/css/style.scss',
  ],
  modules: [
    '@nuxtjs/sitemap',
    ['@nuxtjs/component-cache', {
      max: 10000,
      maxAge: 1000 * 60 * 60
    }],
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#fed138' },
  build: {
    extend (config, { isDev, isClient }) {
      if (!isDev && isClient) {
        // Remove unused CSS using purgecss. See https://github.com/FullHuman/purgecss
        // for more information about purgecss.
        debugger
        config.plugins.push(
          new PurgecssPlugin({
            paths: glob.sync([
              path.join(__dirname, 'pages/**/*.vue'),
              path.join(__dirname, 'layouts/**/*.vue'),
              path.join(__dirname, 'components/**/*.vue')
            ]),
            whitelist: ['html', 'body'],
            extractors: [
              {
                extractor: purgeHtml,
                extensions: ["html"],
              },
            ],
          })
        )
      }
    },
    babel: {
      presets: [['vue-app', {
        useBuiltIns: true,
        loose: true,
      }]],
    },
  },
  serverMiddleware: [
    // API middleware
    '~/api/index.js',
  ],
}

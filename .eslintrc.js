module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jquery: true,
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'recommended/esnext',
    'recommended/esnext/style-guide',
    'recommended/node',
    'recommended/node/style-guide',
    'plugin:vue/recommended',
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
  ],
  // add your custom rules here
  rules: {
    'comma-dangle': [2, 'always-multiline'],
    'space-before-function-paren': [2, 'never'],
    'indent': [2, 2],
    'curly': [2, 'all'],
    'import/no-namespace': 0,
    'no-invalid-this': 0,
    'babel/generator-star-spacing': 0,
  },
  settings: {
    'import/resolver': {
      nuxt: {
        nuxtSrcDir: '.',
        extensions: ['.js', '.json', '.vue'],
      },
    }
  }
}

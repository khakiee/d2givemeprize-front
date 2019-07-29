// https://eslint.org/docs/user-guide/configuring

// noinspection ES6ModulesDependencies, JSUnresolvedVariable
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development//allow not return in computed function
    'vue/return-in-computed-property': 'off',
    // allow script tag indention
    'vue/script-indent': ['error', 2, {'baseIndent': 1, 'switchCase': 1}],
    'vue/html-indent': ['error', 4]
  },
  overrides: [
    {
      'files': ['*.vue'],
      'rules': {
        'indent': 'off'
      }
    },
    {
      'files': ['*.html'],
      'rules': {
        'indent': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-sequences': 'off'
      }
    }
  ]
}

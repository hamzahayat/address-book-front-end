module.exports = {
  extends: 'airbnb',
  plugins: ['react', 'jsx-a11y', 'import'],
  rules: {
    'react/jsx-filename-extension': 0,
    'no-console': 0,
    'function-paren-newline': 0,
    'react/prop-types': 0,
    'arrow-parens': 0,
    'arrow-body-style': 0,
    'no-confusing-arrow': 0,
    'object-curly-newline': 0,
  },
  globals: {
    document: 1,
  },
  parser: 'babel-eslint',
  env: {
    browser: 1,
  },
};

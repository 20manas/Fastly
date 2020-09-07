module.exports = {
  'parser': '@typescript-eslint/parser',
  'env': {
    'browser': true,
    'commonjs': true,
    'node': true,
    'es2021': true,
  },
  'extends': [
    'eslint:recommended',
    'google',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'parserOptions': {
    'ecmaVersion': 2020,
    'ecmaFeatures': {
      'jsx': true,
    },
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    'new-cap': ['off'],
    '@typescript-eslint/no-var-requires': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
  },
};

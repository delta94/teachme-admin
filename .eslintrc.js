module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      typescript: {}, // This loads <rootdir>/tsconfig.json to eslint
    },
  },
  extends: [
    'react-app',
    'prettier',
    'prettier/react',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  plugins: ['react-hooks'],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    'eol-last': ['error', 'always'],
    'no-trailing-spaces': 'error',
    'no-multiple-empty-lines': [2, { max: 1, maxBOF: 0, maxEOF: 0 }],
    indent: ['error', 2, { SwitchCase: 1 }],
    'arrow-body-style': [2, 'as-needed'],
    'class-methods-use-this': 0,
    'max-len': 0,
    'no-confusing-arrow': 0,
    'no-console': 1,
    'no-undef': 0,
    'no-unused-vars': 1,
    'no-use-before-define': 0,
    'prefer-template': 2,
    'import/order': 2,
    'import/no-unresolved': 2,
    'import/imports-first': 0,
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'react/destructuring-assignment': 0,
    'react/forbid-prop-types': 0,
    'react/no-array-index-key': 0,
    'react/prefer-stateless-function': 1,
    'react/require-default-props': 0,
    'react/require-extension': 0,
    'react/self-closing-comp': [2, { component: true, html: true }],
    'react/sort-comp': 0,
    'react/static-property-placement': 0,
    'react/state-in-constructor': 0,
    'react/jsx-closing-tag-location': 0,
    'react/jsx-indent': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-no-target-blank': 0,
    'react/jsx-uses-vars': 2,
    'react/jsx-uses-react': 1,
    'react/jsx-props-no-spreading': 0,
  },
};

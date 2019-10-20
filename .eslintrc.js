module.exports =  {
  parser:  '@typescript-eslint/parser',
  extends:  [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions:  {
  ecmaVersion:  2018,
  sourceType:  'module',
  ecmaFeatures:  {
    jsx:  true,
  },
  },
  rules:  {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-this-alias": "off",
    "prefer-rest-params": "off"
  },
  settings:  {
    react:  {
      version:  'detect',
    },
  },
};

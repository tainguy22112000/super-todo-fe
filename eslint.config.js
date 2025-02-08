import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import tsparser from "@typescript-eslint/parser";

export default [
  {
    ignores: [
      '**/dist/*',
      "**/*.config.js",
      "**/*.config.ts",
      'tsconfig.json',
    ]
  },
  { 
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: tsparser,
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      semi: ['warn', 'always', { omitLastInOneLineBlock: false }],
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
      'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
      '@typescript-eslint/ban-types': ['error', {
        types: {
          Function: false,
        },
        extendDefaults: true,
      }],
      'max-len': ['error', { code: 140, ignoreComments: true, ignoreUrls: true, tabWidth: 4 }],
      "@typescript-eslint/ban-ts-comment": "off",
      "indent": ["error", 2, { "SwitchCase": 1 }],
      "no-undef": "off",
      "vue/no-v-text-v-html-on-component": "off",
      'vue/multi-word-component-names': 'off',
    }
  }
];
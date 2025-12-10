const js = require("@eslint/js");
const globals = require("globals");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");
const prettierPlugin = require("eslint-plugin-prettier");
const prettierConfig = require("eslint-config-prettier");
const unusedImports = require("eslint-plugin-unused-imports");
const simpleImportSort = require("eslint-plugin-simple-import-sort");
const jest = require("eslint-plugin-jest");
const jestFormatting = require("eslint-plugin-jest-formatting");
const testingLibrary = require("eslint-plugin-testing-library");
const jestDom = require("eslint-plugin-jest-dom");
const reactPlugin = require("eslint-plugin-react");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const jsxA11y = require("eslint-plugin-jsx-a11y");
const importPlugin = require("eslint-plugin-import");

module.exports = [
  // Global ignores
  {
    ignores: [
      "deploy/**",
      "node_modules/**",
      "out/**",
      ".next/**",
      ".storybook/**",
      "eslint.config.js",
      "next.config.js",
      "postcss.config.js",
      "tailwind.config.js",
      "jest.config.js",
      "*.config.js",
    ],
  },

  // Base configuration for all files
  js.configs.recommended,

  // Configuration for TypeScript and React files
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "unused-imports": unusedImports,
      "simple-import-sort": simpleImportSort,
      prettier: prettierPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    rules: {
      ...typescriptEslint.configs["recommended"].rules,
      ...reactPlugin.configs["recommended"].rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...prettierConfig.rules,

      // Prettier rules
      "prettier/prettier": [
        "error",
        {
          singleQuote: false,
          endOfLine: "auto",
        },
      ],

      // Import sorting
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/order": "off",
      "import/extensions": "off",
      "import/prefer-default-export": "off",
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "**/*.test.ts",
            "**/*.test.tsx",
            "**/*.stories.*",
          ],
        },
      ],

      // TypeScript rules
      "@typescript-eslint/comma-dangle": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": "off",

      // Unused imports
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],

      // React rules
      "react/function-component-definition": "off",
      "react/destructuring-assignment": "off",
      "react/require-default-props": "off",
      "react/jsx-props-no-spreading": "off",
      "react/prop-types": "off",

      // General rules
      "no-restricted-syntax": [
        "error",
        "ForInStatement",
        "LabeledStatement",
        "WithStatement",
      ],
    },
  },

  // Configuration for JavaScript files
  {
    files: ["**/*.js", "**/*.jsx"],
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...prettierConfig.rules,
      "prettier/prettier": [
        "error",
        {
          singleQuote: false,
          endOfLine: "auto",
        },
      ],
    },
  },

  // Configuration for browser scripts
  {
    files: ["public/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-undef": "off",
    },
  },

  // Configuration for test files
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
    plugins: {
      jest: jest,
      "jest-formatting": jestFormatting,
      "testing-library": testingLibrary,
      "jest-dom": jestDom,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      ...jest.configs.recommended.rules,
      ...jestFormatting.configs.recommended.rules,
      ...testingLibrary.configs.react.rules,
      ...jestDom.configs.recommended.rules,
    },
  },

  // Configuration for Storybook files
  {
    files: ["**/*.stories.*"],
    rules: {
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
        },
      ],
    },
  },

  // Configuration for test setup files
  {
    files: ["jest.setup.ts", "**/__mocks__/**"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
        },
      ],
      "no-undef": "off",
    },
  },

  // Configuration for E2E tests with Playwright
  {
    files: ["tests/e2e/**/*.spec.ts", "tests/e2e/**/*.test.ts"],
    rules: {
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
        },
      ],
      "testing-library/prefer-screen-queries": "off",
    },
  },
];

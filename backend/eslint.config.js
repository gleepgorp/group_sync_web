import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

export default [
  {
    ignores: ["node_modules/**", "dist/**"]
  },
  {
    files: ["src/**/*.js", "src/**/*.ts"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json"
      },
      globals: {
        process: "readonly",
        console: "readonly"
      }
    },
    plugins: {
      "@typescript-eslint": tseslint
    },
    rules: {
      "no-console": "off",
      "quotes": ["error", "double", { avoidEscape: true }],
      "semi": ["error", "always"],

      "@typescript-eslint/no-unused-vars": ["warn", { 
        argsIgnorePattern: "^_", 
        varsIgnorePattern: "^_" 
      }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/consistent-type-imports": ["error", { 
        prefer: "type-imports" 
      }],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-misused-promises": ["error", {
        checksVoidReturn: false
      }],

      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
      "object-shorthand": "error",
      "no-duplicate-imports": "error",

      "no-await-in-loop": "warn",
      "no-promise-executor-return": "error",
      "no-unreachable-loop": "error",
      "no-useless-return": "error",
      "no-lonely-if": "error",

      "no-loop-func": "off",
      "@typescript-eslint/no-loop-func": "warn",
      "no-caller": "error",
      "no-eval": "error",
      "no-implied-eval": "off",
      "@typescript-eslint/no-implied-eval": "error",
      "no-extend-native": "error",

      "eqeqeq": ["error", "always", { null: "ignore" }],
      "curly": ["error", "all"],
      "default-case-last": "error",
      "no-else-return": "error",
      "no-empty-function": "off",
      "@typescript-eslint/no-empty-function": "warn",
      "no-useless-concat": "error",
      "yoda": "error",

      "comma-dangle": ["error", "never"],
      "arrow-spacing": "error",
      "space-before-blocks": "error",
      "keyword-spacing": "error",
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"]
    }
  }
]
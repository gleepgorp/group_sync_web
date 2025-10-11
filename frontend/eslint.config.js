import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "node_modules"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite
    ],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: globals.browser
    },
    rules: {
      "no-console": "off",
      quotes: ["error", "double", { avoidEscape: true }],
      semi: ["error", "always"],
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "error",
      "object-shorthand": "error",
      "no-duplicate-imports": "error",
      "eqeqeq": ["error", "always", { null: "ignore" }],
      "curly": ["error", "all"],
      "comma-dangle": ["error", "never"],
      "arrow-spacing": "error",
      "space-before-blocks": "error",
      "keyword-spacing": "error",
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],

      "@typescript-eslint/no-unused-vars": ["warn", { 
        argsIgnorePattern: "^_", 
        varsIgnorePattern: "^_" 
      }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }]
    }
  }
]);

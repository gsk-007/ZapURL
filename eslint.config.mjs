import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ["**/*.js"] },
  ...tseslint.configs.recommended,
  { files: ["src/**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ]
    }
  },
];

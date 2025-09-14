import { defineConfig } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  // 👇 Add this block first to ignore files that aren’t in tsconfig
  {
    ignores: [
      "eslint.config.mjs", // ignore this config file
      "node_modules",
      "dist",
    ],
  },
  {
    extends: compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react/recommended", "plugin:jsx-a11y/recommended"),

    plugins: {
      "@typescript-eslint": typescriptEslint,
      react,
      "jsx-a11y": jsxA11Y,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },

      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        // if you want typed linting:
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },

    settings: {
      react: {
        version: "detect",
      },
      rules: {
        "jsx-a11y/anchor-is-valid": [
          "warn",
          {
            components: ["Link"], // Apply this rule to <Link>
            specialLink: ["to"], // <Link to="...">
            aspects: ["noHref", "invalidHref", "preferButton"],
          },
        ],
      },
    },

    rules: {
      "jsx-a11y/no-static-element-interactions": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
    },
  },
]);

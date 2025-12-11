// .eslintrc.js
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import js from '@eslint/js';
import globals from 'globals';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierConfig from 'eslint-config-prettier';

import prettierPlugin from 'eslint-plugin-prettier';
import sonarjs from 'eslint-plugin-sonarjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración para tests
const testConfig = {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx', '**/test/**/*'],
    languageOptions: {
        parser: typescriptParser,
        parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            project: './tsconfig.app.json',
            tsconfigRootDir: process.cwd(),
        },
        globals: {
            ...globals.jest,
        },
    },
    plugins: {
        '@typescript-eslint': typescript,
    },
    rules: {
        ...js.configs.recommended.rules,
        ...typescript.configs.recommended.rules,
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
    },
};

// Configuración general para el proyecto (React con Vite y TypeScript)
const generalConfig = {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
        parser: typescriptParser,
        parserOptions: {
            ecmaVersion: 'latest',
            ecmaFeatures: { jsx: true },
            sourceType: 'module',
            project: './tsconfig.app.json',
            tsconfigRootDir: process.cwd(),
        },
        globals: {
            ...globals.browser,
            React: true,
        },
    },
    plugins: {
        '@typescript-eslint': typescript,
        react: react,
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
        prettier: prettierPlugin,
        sonarjs: sonarjs,
    },
    settings: {
        react: { version: 'detect' },
        'import/core-modules': ['@ant-design/icons'],
        'import/resolver': {
            alias: {
                "node": {
                    "extensions": [".js", ".jsx", ".ts", ".tsx"]
                },
                map: [
                    ['@/components', './src/components'],
                    ['@/hooks', './src/hooks'],
                    ['@/lib', './src/lib'],
                    ['@/assets', './src/assets'],
                    ['@/pages', './src/pages'],
                    ['@/routes', './src/routes'],
                ],
                extensions: ['.ts', '.js', '.jsx', '.json', '.tsx']
            },
        },
    },
    rules: {
        ...js.configs.recommended.rules,
        ...typescript.configs.recommended.rules,
        ...react.configs.recommended.rules,
        ...react.configs['jsx-runtime'].rules,
        ...reactHooks.configs.recommended.rules,
        ...sonarjs.configs.recommended.rules, // Reglas recomendadas de SonarJS


        // Reglas de React
        'react/react-in-jsx-scope': 'off',
        'react/jsx-no-target-blank': 'off',
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        "sonarjs/prefer-read-only-props": "off",

        // Reglas de TypeScript
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                caughtErrorsIgnorePattern: "^_",
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^[A-Z][A-Z0-9_]*$', // Ignora enums en mayúsculas
                ignoreRestSiblings: true,


            },
        ],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'warn',

        // Reglas generales
        'no-console': 'warn',
        'no-debugger': 'warn',

        // Reglas extra
        'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
        'no-unused-vars': 'off',
        // Configuración de Prettier (usando eslint-plugin-prettier)
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],

        // Otras reglas de React (ajústalas según tus necesidades)
        'react/no-unescaped-entities': 'off',
    },
};

// Ignorar archivos y directorios
const ignoreConfig = {
    ignores: [
        'dist/**',
        'node_modules/**',
        '*.http.ts',
        '*.config.js',
        '*.config.cjs',
        '*.config.ts',
        'commitlint.config.*',
        'vite.config.*',
        '.eslintrc.*',
        'jest.setup.ts',
        'build/**',
        'public/**',
        'cache/**',
        'coverage/**'
    ],
};

// Configuración base: usando solo las reglas recomendadas de ESLint
const baseConfig = [js.configs.recommended];

// Exportamos el arreglo completo de configuraciones
export default [
    ignoreConfig,
    ...baseConfig,
    testConfig,
    generalConfig,
    prettierConfig, // Integración de Prettier por separado
];

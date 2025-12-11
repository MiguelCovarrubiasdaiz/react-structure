const config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    setupFiles: ['jest-canvas-mock'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.ts',
        '^../config/env$': '<rootDir>/src/__mocks__/env.ts',
        '^../../../config/env$': '<rootDir>/src/__mocks__/env.ts',
        '^config/env$': '<rootDir>/src/__mocks__/env.ts',
    },
    transform: {
        '^.+\\.(ts|tsx)$': [
            'ts-jest',
            {
                useESM: true,
                tsconfig: {
                    jsx: 'react-jsx',
                    module: 'esnext',
                },
            },
        ],
        '^.+\\.(js|jsx)$': [
            'babel-jest',
            {
                presets: ['@babel/preset-env'],
            },
        ],
    },
    testTimeout: 30000, // Increased timeout
    transformIgnorePatterns: [
        'node_modules/(?!query-string|decode-uri-component|split-on-first|filter-obj|antd|@ant-design|rc-.*?|@babel/runtime)/',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    testEnvironmentOptions: {
        customExportConditions: ['node', 'node-addons'],
    },
    collectCoverage: true,
    coverageProvider: 'v8',
    coverageDirectory: 'coverage',
    coverageReporters: ['lcov', 'text', 'html', 'cobertura'],
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.test.{ts,tsx}',
        '!**/node_modules/**',
        '!src/__mocks__/**',
        '!src/config/env.ts',
        '!src/components/panel/General/Header.tsx',
        '!src/components/panel/General/Sidebar.tsx',
        '!src/App.tsx',
        '!src/main.tsx',
        '!src/pages/NotFound.tsx',
        '!src/pages/dashboard/Home/*',
        '!src/routes/*',
    ],
    reporters: [
        'default',
        [
            'jest-junit',
            {
                outputDirectory: './test-results',
                outputName: 'junit.xml',
                classNameTemplate: '{classname}',
                titleTemplate: '{title}',
                ancestorSeparator: ' › ',
                usePathForSuiteName: true,
            },
        ],
    ],
};

export default config;

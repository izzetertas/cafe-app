module.exports = {
    preset: 'ts-jest',
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts', '!**/*.d.ts'],
    testEnvironment: 'node',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
};
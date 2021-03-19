module.exports = {
    rootDir: '.',
    roots: ['./app'],
    setupFilesAfterEnv: ['./jest.setup.js'],
    testEnvironment: 'node',
    testEnvironmentOptions: {
        NODE_ENV: 'test',
    },
    restoreMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        'app/{controllers,middleware,routes,services,utils}/**/**/**/*.js',
        'app/index.js',
        'app/app.js',
        'app/server.js',
    ],
    moduleDirectories: ['node_modules'],
    moduleNameMapper: {
        '~/(.*)': '<rootDir>/$1',
    },
}

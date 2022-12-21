module.exports = {
    moduleFileExtensions: [
        'js',
        'ts',
        'json',
        'vue'
    ],
    transform: {
        '^.+\\.ts$': 'ts-jest',
        '^.+\\.vue$': '@vue/vue3-jest'
    },
    devServer: {
        proxy: 'http://10.10.4.179:9000',
    },
    testEnvironment: 'jsdom',
    coverageDirectory: "<rootDir>/tests/jest/coverage",
}
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "@/(.*)$": ["<rootDir>/src/$1"],
    "@/services/(.*)$": ["<rootDir>/src/services/$1"],
    "@/helpers/(.*)$": ["<rootDir>/src/helpers/$1"],
    "@/components/(.*)$": ["<rootDir>/src/components/$1"],
    "@/lib/(.*)$": ["<rootDir>/src/lib/$1"]
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: [
    '/node_modules/(?!(jose)/)',
  ],
}

export default createJestConfig(config)
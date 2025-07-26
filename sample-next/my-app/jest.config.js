const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: "node",
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // <== This line is key
  },
  transform: {
    ...tsJestTransformCfg,
  },
  testMatch: [
    "**/__tests__/**/*.ts?(x)",
    "**/?(*.)+(spec|test|e2e).ts?(x)"
  ],
};
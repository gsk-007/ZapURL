// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: "./src/test/setup.ts",
    hookTimeout: 20000,
  },
});

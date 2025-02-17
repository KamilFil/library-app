import { defineConfig, mergeConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

// eslint-disable-next-line import/no-default-export
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ['src/**/*.test.ts'],
      exclude: ['**/e2e/**', ...configDefaults.exclude],
    },
  }),
);

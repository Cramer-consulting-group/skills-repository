import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SkillsRepoCLI',
      fileName: 'index',
      formats: ['cjs']
    },
    rollupOptions: {
      external: ['commander', 'inquirer', 'fs-extra', 'ora', 'archiver', 'chalk'],
      output: {
        globals: {
          commander: 'commander',
          inquirer: 'inquirer',
          'fs-extra': 'fsExtra',
          ora: 'ora',
          archiver: 'archiver',
          chalk: 'chalk'
        },
        entryFileNames: 'index.js'
      }
    },
    emptyOutDir: true
  }
});

import { join } from 'path';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { fileURLToPath } from 'url';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,svelte,ts}',
    join(fileURLToPath(new URL(import.meta.resolve('@skeletonlabs/skeleton'))), '../**/*.{html,js,svelte,ts}')
  ],
  theme: {
    extend: {},
  },
  plugins: [
    skeleton
  ],
}
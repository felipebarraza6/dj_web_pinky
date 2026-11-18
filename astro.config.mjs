// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages: https://felipebarraza6.github.io/dj_web_pinky/
export default defineConfig({
  site: 'https://felipebarraza6.github.io',
  base: '/dj_web_pinky',
  vite: {
    plugins: [tailwindcss()],
  },
});


import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  theme: {
  },
  preflight: false,
  plugins: [],
  extract: {
    include: ['**/*.{jsx,js,ts,tsx,css,html}'],
    exclude: ['node_modules', '.git', '.next'],
  },
});

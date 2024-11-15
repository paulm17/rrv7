import { extendTheme, pigment } from '@stylefusion/vite-plugin';
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { getPigmentCSSTheme } from '@raikou/system';

const { cssTheme, rawTheme } = getPigmentCSSTheme();

const theme = extendTheme({
  cssVarPrefix: 'raikou',
  getSelector: (colorScheme) =>
    colorScheme ? `[data-raikou-color-scheme='${colorScheme}']` : ':root',
  ...cssTheme,
});

export default defineConfig({
  plugins: [
    pigment({
      atomic: false,
      theme,
      rawTheme,
      transformLibraries: ['@raikou/core', '@raikou/system'],
    }),
    reactRouter({
      prerender: ["/about"],
    }),
    tsconfigPaths(),
  ],
  optimizeDeps: {
    include: ['prop-types', 'react-is'],
  },
  resolve: {
    alias: {
      'prop-types': 'prop-types/prop-types.js',
      'react-is': 'react-is/cjs/react-is.development.js',
    },
  }, 
  ssr: {
    noExternal: ['@stylefusion/react', '@raikou/core', '@raikou/system'],
  }
});

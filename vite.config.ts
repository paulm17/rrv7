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
      transformLibraries: ['@raikou/core', '@raikou/system', '@raikou/emotion'],
    }),
    reactRouter({
      prerender: ["/about"],
    }),
    tsconfigPaths(),
  ],
  optimizeDeps: {
    include: ['prop-types', 'react-is', 'hoist-non-react-statics', 'html-react-parser'],
  },
  resolve: {
    alias: {
      'prop-types': 'prop-types/prop-types.js',
      'react-is': 'react-is/cjs/react-is.development.js',
      'hoist-non-react-statics': 'node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js',
      'html-react-parser': 'node_modules/html-react-parser/lib/index.js'
    },
  }, 
  ssr: {
    noExternal: ['@stylefusion/react', '@raikou/core', '@raikou/system', '@raikou/emotion'],
  }
});

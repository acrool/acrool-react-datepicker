import type { Preview } from "@storybook/react";
import './reset.css';
import '@acrool/react-datepicker/dist/index.css';
import '@acrool/react-grid/dist/index.css';
import {GridThemeProvider} from "@acrool/react-grid";

import { themes } from '@storybook/theming';

const preview: Preview = {
  parameters: {
    darkMode: {
        dark: { ...themes.dark, appPreviewBg: '#000' },
        light: { ...themes.dark, appPreviewBg: '#fff' }
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
      (Story) => (
          <GridThemeProvider>
            <Story />
          </GridThemeProvider>
      ),
  ],
};

export default preview;

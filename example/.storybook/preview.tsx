import type { Preview } from "@storybook/react";
import './reset.css';
import '@acrool/react-datepicker/dist/index.css';
import '@acrool/react-grid/dist/index.css';
import {GridThemeProvider} from "@acrool/react-grid";

import { themes } from '@storybook/theming';
import { useDarkMode } from 'storybook-dark-mode';

const preview: Preview = {
  parameters: {
    darkMode: {
        // 同步切換預覽區背景，深淺對比才看得出來
        stylePreview: true,
        dark: { ...themes.dark, appPreviewBg: '#000' },
        light: { ...themes.light, appPreviewBg: '#fff' },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
      // 將工具列 dark-mode 的狀態注入每個 story 的 isDark，讓元件本身切換深色主題
      (Story, context) => {
        const isDark = useDarkMode();
        return (
          <GridThemeProvider>
            <Story args={{ ...context.args, isDark }} />
          </GridThemeProvider>
        );
      },
  ],
};

export default preview;

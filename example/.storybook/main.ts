import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ['../src/components/**/*.mdx', '../src/components/**/*.stories.@(ts|tsx)'],
  staticDirs: ['../../public'],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;

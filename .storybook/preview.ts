import type { Preview } from "@storybook/nextjs";
import "@/styles/reset.css";
import "@/styles/global.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

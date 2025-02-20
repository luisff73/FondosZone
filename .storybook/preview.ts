// import type { Preview } from "@storybook/react";

// const preview: Preview = {
//   parameters: {
//     controls: {
//       matchers: {
//         color: /(background|color)$/i,
//         date: /Date$/i,
//       },
//     },
//   },
// };

// export default preview;

// Replace your-framework with the framework you are using (e.g., react, vue3)
import { Preview } from '@storybook/react';

import '../src/index.css';

const preview: Preview = {
  parameters: {},
};

export default preview;
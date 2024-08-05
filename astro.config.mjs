import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./remark-reading-time.mjs";

import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});

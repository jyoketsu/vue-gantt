import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue-Gantt",
  description: "Gantt chart component for Vue 3",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
    ],

    sidebar: [
      {
        text: "Get started",
        items: [
          { text: "Overview", link: "/overview" },
          { text: "Getting Started", link: "/getting-started" },
          { text: "Examples", link: "/examples" },
        ],
      },
      {
        text: "Api",
        items: [
          { text: "Props", link: "/api-props" },
          { text: "Events", link: "/api-events" },
          { text: "Slots", link: "/api-slots" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/jyoketsu/vue-gantt" },
    ],
  },
});

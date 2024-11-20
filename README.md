# Vue Gantt

<b>Vue Gantt</b> is a simple, interactive Gantt chart component for Vue 3, with a minimum unit of days.

![image](https://github.com/jyoketsu/vue-gantt/blob/main/docs/public/screenshot.png?raw=true)

## Features

- Full support for **Vue 3**
- Built-in **TypeScript** support with out-of-the-box type declarations
- **Interactive** features such as dynamic, movable, and pushable bars
- **Reactive and responsive** behavior where bars automatically reposition upon changes
- Extensive **customization options**, including chart and bar styling, slots, and event handlers
- Height can be **adaptive**, and the header and left side can remain fixed while scrolling
- The minimum unit is days, and after dragging, the element will automatically snap to the nearest day
- Each row represents a person, and that person's task bars are displayed on the same row without overlapping

## Guide and Docs

For further guides and references, check out the [official docs](https://jyoketsu.github.io/vue-gantt/getting-started.html).

## Quickstart

Install

```sh
npm install @jyoketsu/vue-gantt
```

Configuring TailwindCSS

To ensure TailwindCSS styles work with `@jyoketsu/vue-gantt`, add the following path to the content array in your `tailwind.config.js` file:
```javascript
"./node_modules/@jyoketsu/vue-gantt/**/*.{vue,js,ts}"
```
For example:
```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@jyoketsu/vue-gantt/**/*.{vue,js,ts}",
  ]
};

```

Next, initialize the plugin at the entry point of your application (typically in src/main.js):

```js
import { createApp } from "vue"
import App from "./App.vue"
...
import vuegantt from '@jyoketsu/vue-gantt'
...
createApp(App)
  .use(vuegantt)
  .mount('#app')
```

```javascript
const data = reactive([
  {
    name: "Xu Quan",
    projects: [
      { name: "Project 1", startDate: "2024-09-24", endDate: "2024-09-30" },
      { name: "Project 2", startDate: "2024-10-01", endDate: "2024-10-02" },
      { name: "Project 3", startDate: "2024-10-03", endDate: "2024-10-15" },
    ],
  },
  {
    name: "Lei Yufei",
    projects: [
      { name: "Project 1", startDate: "2024-10-05", endDate: "2024-10-28" },
      { name: "Project 2", startDate: "2024-12-12", endDate: "2025-01-09" },
      { name: "Project 3", startDate: "2025-02-01", endDate: "2025-02-27" },
    ],
  },
]);
```

```html
<vue-gantt :data="data" start-date="2024-09-23" end-date="2025-09-23" />
```

## About

**License** [MIT](https://choosealicense.com/licenses/mit/)  
**Author**: jyoketsu  
[GitHub Repository](https://github.com/jyoketsu/vue-gantt)

## Support the project
If you found the library helpful, any small tip would be greatly appreciated!
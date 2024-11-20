# Getting started

## Install

::: code-group

```sh [npm]
npm install @jyoketsu/vue-gantt
```

```sh [pnpm]
pnpm add @jyoketsu/vue-gantt
```

```sh [yarn]
yarn add @jyoketsu/vue-gantt
```

```sh [bun]
bun add @jyoketsu/vue-gantt
```

:::

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

## Basic usage

```vue
<template>
  <div class="w-full h-[142px] overflow-hidden">
    <vue-gantt :data="data" start-date="2024-09-23" end-date="2025-09-23" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

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
  {
    name: "Jing Yixian",
    projects: [
      { name: "Project 1", startDate: "2024-09-24", endDate: "2024-09-30" },
      { name: "Project 2", startDate: "2024-10-01", endDate: "2024-10-02" },
      { name: "Project 3", startDate: "2024-10-03", endDate: "2024-10-15" },
    ],
  },
  {
    name: "Liu Xinwei",
    projects: [
      { name: "Project 1", startDate: "2024-07-20", endDate: "2024-08-18" },
      { name: "Project 2", startDate: "2024-11-10", endDate: "2024-12-07" },
      { name: "Project 3", startDate: "2025-01-15", endDate: "2025-02-12" },
    ],
  },
]);
</script>
```

The result shoud look like this:

<div class="w-full h-[142px] overflow-hidden">
	<vue-gantt :data="data" start-date="2024-09-23" end-date="2025-09-23" />
</div>

<script setup>
	import { reactive } from "vue"

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
	{
		name: "Jing Yixian",
    projects: [
      { name: "Project 1", startDate: "2024-09-24", endDate: "2024-09-30" },
      { name: "Project 2", startDate: "2024-10-01", endDate: "2024-10-02" },
      { name: "Project 3", startDate: "2024-10-03", endDate: "2024-10-15" },
    ],
	},
	{
    name: "Liu Xinwei",
    projects: [
      { name: "Project 1", startDate: "2024-07-20", endDate: "2024-08-18" },
      { name: "Project 2", startDate: "2024-11-10", endDate: "2024-12-07" },
      { name: "Project 3", startDate: "2025-01-15", endDate: "2025-02-12" },
    ],
  },
]);
</script>

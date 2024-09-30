import type { Plugin } from "vue";

import VueGantt from "./Gantt.vue";

export const vueGantt: Plugin = {
  install(app) {
    app.component("VueGantt", VueGantt);
  },
};

export default vueGantt;

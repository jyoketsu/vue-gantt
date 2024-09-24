import { inject } from "vue";
import { GANTT_DATA } from "./symbols.js";

export default function provideGanttData() {
  const config = inject(GANTT_DATA);
  if (!config) {
    throw Error("Failed to inject data!");
  }
  return config;
}

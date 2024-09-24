import { inject } from "vue";
import { WORK_DAYS } from "./symbols.js";

export default function provideWorkDays() {
  const config = inject(WORK_DAYS);
  if (!config) {
    throw Error("Failed to inject work days!");
  }
  return config;
}

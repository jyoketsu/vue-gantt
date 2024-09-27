import { inject } from "vue";
import { COLS } from "./symbols.js";

export default function provideWorkDays() {
  const config = inject(COLS);
  if (!config) {
    throw Error("Failed to inject work days!");
  }
  return config;
}
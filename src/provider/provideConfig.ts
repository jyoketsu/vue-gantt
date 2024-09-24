import { inject } from "vue";
import { CONFIG } from "./symbols.js";

export default function provideConfig() {
  const config = inject(CONFIG);
  if (!config) {
    throw Error("Failed to inject config!");
  }
  return config;
}

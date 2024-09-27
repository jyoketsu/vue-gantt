import { inject } from "vue";
import { EMIT_ROW_EVENT } from "./symbols.js";

export default function provideEmitRowEvent() {
  const emitRowEvent = inject(EMIT_ROW_EVENT);
  if (!emitRowEvent) {
    throw Error("Failed to inject emitRowEvent!");
  }
  return emitRowEvent;
}

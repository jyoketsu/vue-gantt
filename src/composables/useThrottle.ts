import { ref } from "vue";

export function useThrottle(fn: Function, delay: number) {
  const lastTime = ref(0);

  return function (...args: any[]) {
    const now = Date.now();
    if (now - lastTime.value >= delay) {
      fn(...args);
      lastTime.value = now;
    }
  };
}

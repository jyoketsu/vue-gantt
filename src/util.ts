import dayjs from "dayjs";

const defaultStyles = [
  { background: "#d4b9b0", color: "#4a2d2b" },
  { background: "#b8a59d", color: "#3b2a27" },
  { background: "#9ea19e", color: "#2e3532" },
  { background: "#c8c1b7", color: "#463f36" },
  { background: "#c5a59f", color: "#4d3532" },
  { background: "#8c9d9b", color: "#2d3735" },
  { background: "#d2b4a1", color: "#4b362d" },
  { background: "#afa294", color: "#3c332d" },
  { background: "#bdbdb6", color: "#4a4a44" },
  { background: "#938b80", color: "#2f2d28" },
  { background: "#d5cdc5", color: "#504944" },
  { background: "#b5aba3", color: "#3b332d" },
  { background: "#c6bab4", color: "#463f39" },
  { background: "#bcae9e", color: "#3f332a" },
  { background: "#a0938b", color: "#322d28" },
  { background: "#d9d2ca", color: "#544e47" },
  { background: "#d0c6c0", color: "#4e4741" },
  { background: "#a59a8f", color: "#352e28" },
  { background: "#c3b7ae", color: "#4c423b" },
  { background: "#bfb0a4", color: "#463b34" },
];

export function getDefaultStyle() {
  const randomIndex = Math.floor(Math.random() * defaultStyles.length);
  return defaultStyles[randomIndex];
}

export function isWeekday(date: dayjs.Dayjs): boolean {
  // 判断是否是工作日（周一到周五）
  const day = date.day();
  return day !== 0 && day !== 6; // 0: Sunday, 6: Saturday
}

export function getMonthFirstDay(time: string): string {
  return dayjs(time).startOf("month").format("YYYY-MM-DD");
}

import dayjs from "dayjs";
import provideConfig from "../provider/provideConfig";

export default function useTime2Position() {
  const { colWidth, startDate } = provideConfig();

  const time2position = (time: string, isStart: boolean) => {
    // const diffFromStart = dayjs(time).diff(startDate, "day", true);
    const workdayDiffFromStart = calculateWorkdayDiff(startDate.value!, time);
    return Math.ceil(
      (isStart ? workdayDiffFromStart - 1 : workdayDiffFromStart) * colWidth.value!
    );
  };
  return {
    time2position,
  };
}

function calculateWorkdayDiff(startDate: string, endDate: string) {
  let start = dayjs(startDate);
  const end = dayjs(endDate);

  let workdayCount = 0;

  // 遍历从 startDate 到 endDate 的每一天
  while (start.isBefore(end) || start.isSame(end, "day")) {
    const dayOfWeek = start.day(); // 0 表示周日，6 表示周六
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      workdayCount++;
    }
    start = start.add(1, "day"); // 移动到下一天
  }

  return workdayCount;
}

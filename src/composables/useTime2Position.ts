import dayjs from "dayjs";
import provideConfig from "../provider/provideConfig";

export default function useTime2Position() {
  const { colWidth, startDate, cellUnit } = provideConfig();

  const time2position = (time: string, isStart: boolean) => {
    if (cellUnit.value === "day") {
      let workdayDiffFromStart = calculateWorkdayDiff(startDate.value!, time);
      if (workdayDiffFromStart > 0) {
        workdayDiffFromStart = isStart
          ? workdayDiffFromStart - 1
          : workdayDiffFromStart;
      } else {
        workdayDiffFromStart = isStart
          ? workdayDiffFromStart + 1
          : workdayDiffFromStart;
      }

      return Math.ceil(workdayDiffFromStart * colWidth.value!);
    } else {
      const diffFromStart = isStart
        ? dayjs(time).diff(startDate.value, "month", true)
        : dayjs(time).add(1, "day").diff(startDate.value, "month", true);
      // console.log("---diffFromStart---", diffFromStart);
      return Math.ceil(diffFromStart * colWidth.value);
    }
  };

  const position2time = (position: number, isStart: boolean) => {
    if (cellUnit.value === "day") {
      let workdayDiff = Math.floor(position / colWidth.value!);
      if (!isStart) {
        workdayDiff = workdayDiff - 1;
      }
      return calculateDateFromWorkdays(startDate.value!, workdayDiff);
    } else {
      const monthDiff = position / colWidth.value;

      // 拆分整月和小数部分
      const wholeMonths = Math.floor(monthDiff); // 整月部分
      const fractionMonths = monthDiff - wholeMonths; // 小数部分

      // 计算整月后的日期
      let calculatedDate = dayjs(startDate.value).add(wholeMonths, "month");

      // 根据小数部分计算天数，并加上小数部分代表的天数
      const daysInCurrentMonth = calculatedDate.daysInMonth(); // 当前整月有多少天
      const extraDays = Math.round(fractionMonths * daysInCurrentMonth); // 计算小数月份转换的天数

      // 加上计算出来的天数
      calculatedDate = calculatedDate.add(extraDays, "day");
      if (!isStart) {
        calculatedDate = calculatedDate.subtract(1, "day");
      }
      return calculatedDate.format("YYYY-MM-DD");
    }
  };
  return {
    time2position,
    position2time,
  };
}

function calculateWorkdayDiff(startDate: string, endDate: string) {
  let start = dayjs(startDate);
  let end = dayjs(endDate);

  let isMinus = false;
  if (start.isAfter(end)) {
    isMinus = true;
    start = dayjs(endDate);
    end = dayjs(startDate);
  }

  let workdayCount = 0;

  // 遍历从 startDate 到 endDate 的每一天
  while (start.isBefore(end) || start.isSame(end, "day")) {
    const dayOfWeek = start.day(); // 0 表示周日，6 表示周六
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      workdayCount++;
    }
    start = start.add(1, "day"); // 移动到下一天
  }

  return isMinus ? -workdayCount : workdayCount;
}

function calculateDateFromWorkdays(startDate: string, workdayDiff: number) {
  let currentDate = dayjs(startDate);
  let workdaysPassed = 0;

  if (workdayDiff >= 0) {
    // 遍历日期，直到累积的工作日数等于 workdayDiff
    while (workdaysPassed < workdayDiff) {
      currentDate = currentDate.add(1, "day");
      const dayOfWeek = currentDate.day();

      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        workdaysPassed++;
      }
    }
  } else {
    while (workdaysPassed > workdayDiff) {
      currentDate = currentDate.subtract(1, "day");
      const dayOfWeek = currentDate.day();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        workdaysPassed--;
      }
    }
  }

  return currentDate.format("YYYY-MM-DD");
}

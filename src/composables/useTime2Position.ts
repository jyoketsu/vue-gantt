import dayjs from "dayjs";
import provideConfig from "../provider/provideConfig";

export default function useTime2Position(time: string) {
  const { colWidth, startDate } = provideConfig();
  const diffFromStart = dayjs(time).diff(startDate, "day", true);
  return Math.ceil(diffFromStart * colWidth!);
}

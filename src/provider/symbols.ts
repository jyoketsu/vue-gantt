import { InjectionKey } from "vue";
import { Gantt, GanttConfig } from "../types";
import dayjs from "dayjs";

export const GANTT_DATA = Symbol("GANTT_DATA") as InjectionKey<Gantt[]>;
export const WORK_DAYS = Symbol("WORK_DAYS") as InjectionKey<dayjs.Dayjs[]>;
export const CONFIG = Symbol("CONFIG") as InjectionKey<GanttConfig>;

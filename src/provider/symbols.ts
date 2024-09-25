import { InjectionKey } from "vue";
import { Config, Gantt, GanttConfig } from "../types";
import dayjs from "dayjs";

export const WORK_DAYS = Symbol("WORK_DAYS") as InjectionKey<dayjs.Dayjs[]>;
export const CONFIG = Symbol("CONFIG") as InjectionKey<Config>;

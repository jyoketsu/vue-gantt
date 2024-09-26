import { InjectionKey } from "vue";
import { Config, EmitBarEvent } from "../types";
import dayjs from "dayjs";

export const WORK_DAYS = Symbol("WORK_DAYS") as InjectionKey<dayjs.Dayjs[]>;
export const CONFIG = Symbol("CONFIG") as InjectionKey<Config>;
export const EMIT_BAR_EVENT = Symbol(
  "EMIT_BAR_EVENT"
) as InjectionKey<EmitBarEvent>;

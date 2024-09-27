import { ComputedRef, InjectionKey } from "vue";
import { Config, EmitBarEvent, EmitRowEvent } from "../types";
import dayjs from "dayjs";

export const COLS = Symbol("COLS") as InjectionKey<ComputedRef<dayjs.Dayjs[]>>;

export const CONFIG = Symbol("CONFIG") as InjectionKey<Config>;
export const EMIT_BAR_EVENT = Symbol(
  "EMIT_BAR_EVENT"
) as InjectionKey<EmitBarEvent>;
export const EMIT_ROW_EVENT = Symbol(
  "EMIT_ROW_EVENT"
) as InjectionKey<EmitRowEvent>;

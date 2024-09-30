import { ToRefs } from "vue";

export interface Gantt {
  [key: string]: any;
  name: string;
  projects: Project[];
}

export interface Project {
  name: string;
  startDate: string;
  endDate: string;
  background?: string;
  color?: string;
}

export interface GanttConfig {
  startDate: string;
  endDate: string;
  rowHeight?: number;
  headHeight?: number;
  colWidth?: number;
  rowActiveBackgroundColor?: string;
  rowActiveBorderColor?: string;
  cellUnit?: "day" | "month";
  leftWidth?: number;
}

export interface GanttProps extends GanttConfig {
  data: Gantt[];
}

export type Config = ToRefs<Required<GanttProps>>;

export type EmitBarEvent = (
  type: string,
  e: MouseEvent,
  bar: Project,
  barIndex: number,
  rowIndex: number
) => void;

export type EmitRowEvent = (
  e: MouseEvent,
  row: Gantt,
  time: string,
  rowIndex: number
) => void;

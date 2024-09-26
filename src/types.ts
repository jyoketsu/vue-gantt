import { ToRefs } from "vue";

export interface Gantt {
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
}

export interface GanttProps extends GanttConfig {
  data: Gantt[];
}

export type Config = ToRefs<Required<GanttProps>>;

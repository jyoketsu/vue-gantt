export interface Gantt {
  name: string;
  projects: Project[];
}

export interface Project {
  name: string;
  startDate: string;
  endDate: string;
}

export interface GanttProps {
  startDate?: string;
  endDate?: string;
  data: Gantt[];
}

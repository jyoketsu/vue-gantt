<template>
  <GanttChart :data="data" :start-date="startDate" :end-date="endDate"
    @dragend-bar="handleDragEnd($event.e, $event.bar, $event.barIndex, $event.rowIndex)">
    <template #gantt-left-head>
      <div class="size-full grid grid-cols-3">
        <div class="px-1 border-r">职位</div>
        <div class="px-1 border-r">姓名</div>
        <div class="px-1">工时</div>
      </div>
    </template>
    <template #gantt-left-row="{ row }">
      <div class="size-full grid grid-cols-3">
        <div class="px-1 border-r">{{ row.position }}</div>
        <div class="px-1 border-r">{{ row.name }}</div>
        <div class="px-1">{{ calculateWorkingHoursForRow(row.projects) }}</div>
      </div>
    </template>
    <template #gantt-bar-content="{ project }">
      <div class="w-full h-full overflow-hidden whitespace-nowrap text-ellipsis" :title="project.name">
        {{ project.startDate }}</div>
    </template>
  </GanttChart>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import GanttChart from './Gantt.vue'
import { ganttTestData } from './demoData';
import dayjs from 'dayjs';
import { isWeekday } from './util';
import { Project } from './types';

const startDate = ref(dayjs().format('YYYY-MM-DD'))
const endDate = ref(dayjs().add(3, 'month').format())
const data = reactive(ganttTestData)

const calculateWorkingDays = (
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs
): number => {
  let workingDays = 0;
  let currentDate = startDate;

  // 遍历从开始日期到结束日期的每一天
  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, "day")) {
    if (isWeekday(currentDate)) {
      workingDays++;
    }
    currentDate = currentDate.add(1, "day");
  }

  return workingDays;
}

const calculateWorkingHoursForRow = (projects: any[]): number => {
  let totalWorkingHours = 0;

  projects.forEach(project => {
    const start = dayjs(project.startDate);
    const end = dayjs(project.endDate);

    // 计算项目的工作日天数
    const workingDays = calculateWorkingDays(start, end);
    totalWorkingHours += workingDays * 8;
  });

  return totalWorkingHours;
};

const handleDragEnd = (e: MouseEvent,
  bar: Project,
  barIndex: number,
  rowIndex: number) => {
  console.log('---drag-end---', e, bar, barIndex, rowIndex);
  data[rowIndex].projects[barIndex] = bar;
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

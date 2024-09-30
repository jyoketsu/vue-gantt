<template>
  <div class="size-full flex flex-col">
    <div class="w-full h-8 border-b flex items-center p-2 space-x-2 text-zinc-400">
      <span class="flex-1"></span>
      <span class="cursor-pointer" :class="{ 'text-blue-400': cellUnit === 'day' }"
        @click="cellUnit = 'day'">Year</span>
      <span class="cursor-pointer" :class="{ 'text-blue-400': cellUnit === 'month' }"
        @click="cellUnit = 'month'">Month</span>
      <div class="w-[1px] h-full border-r" />
      <span class="cursor-pointer" @click="toNow">Now</span>
    </div>
    <div class="flex-1 overflow-hidden">
      <GanttChart :data="data" :start-date="startDate" :end-date="endDate" :cell-unit="cellUnit" :col-width="colWidth"
        @dragend-bar="handleDragEnd($event.e, $event.bar, $event.barIndex, $event.rowIndex)"
        @click-bar="handleClickBar($event.e, $event.bar, $event.barIndex, $event.rowIndex)"
        @click-row="handleClickRow($event.e, $event.row, $event.time, $event.rowIndex)">
        <template #gantt-left-head>
          <div class="size-full grid grid-cols-3">
            <div class="px-1 border-r">Position</div>
            <div class="px-1 border-r">Name</div>
            <div class="px-1">Hours</div>
          </div>
        </template>
        <template #gantt-left-row="{ row }">
          <div class="size-full grid grid-cols-3">
            <div class="px-1 border-r whitespace-nowrap overflow-hidden text-ellipsis">{{ row.position }}</div>
            <div class="px-1 border-r whitespace-nowrap overflow-hidden text-ellipsis">{{ row.name }}</div>
            <div class="px-1 whitespace-nowrap overflow-hidden text-ellipsis">{{
              calculateWorkingHoursForRow(row.projects) }}</div>
          </div>
        </template>
        <template #gantt-bar-content="{ project }">
          <div class="w-full h-full overflow-hidden text-sm flex justify-center items-center" :title="project.name">
            <span class="overflow-hidden whitespace-nowrap text-ellipsis">{{ `${project.startDate} : ${project.endDate}`
              }}</span>
          </div>
        </template>
      </GanttChart>
    </div>
    <div class="h-[700px]"></div>
  </div>

</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import GanttChart from './Gantt.vue'
import { ganttTestData } from './demoData';
import dayjs from 'dayjs';
import { isWeekday } from './util';
import { Gantt, Project } from './types';

const startDate = ref(dayjs('2024-02-01').format('YYYY-MM-DD'))
const endDate = ref(dayjs('2024-02-01').add(12, 'month').format())
const data = reactive(ganttTestData)
const cellUnit = ref<'day' | 'month'>('day')
const colWidth = computed(() => cellUnit.value === 'day' ? 32 : 120)

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

const toNow = () => {
  startDate.value = dayjs().format('YYYY-MM-DD')
  endDate.value = dayjs().add(12, 'month').format()
}

const handleDragEnd = (
  e: MouseEvent,
  bar: Project,
  barIndex: number,
  rowIndex: number) => {
  console.log('---drag-end---', e, bar, barIndex, rowIndex);
  data[rowIndex].projects[barIndex] = bar;
}

const handleClickBar = (
  e: MouseEvent,
  bar: Project,
  barIndex: number,
  rowIndex: number) => {
  console.log('---click-bar---', e, bar, barIndex, rowIndex);
}

const handleClickRow = (
  e: MouseEvent,
  row: Gantt,
  time: string,
  rowIndex: number) => {
  console.log('---click-row---', e, row, time, rowIndex);
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

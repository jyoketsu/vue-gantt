# Examples

## Basic usage

```vue
<template>
  <div class="w-full h-[142px] overflow-hidden">
    <vue-gantt :data="data" start-date="2024-09-23" end-date="2025-09-23" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const data = reactive([
  {
    position: "Product",
    name: "Xu Quan",
    projects: [
      { name: "Project 1", startDate: "2024-09-24", endDate: "2024-09-30" },
      { name: "Project 2", startDate: "2024-10-01", endDate: "2024-10-02" },
      { name: "Project 3", startDate: "2024-10-03", endDate: "2024-10-15" },
    ],
  },
  {
    position: "Design",
    name: "Lei Yufei",
    projects: [
      { name: "Project 1", startDate: "2024-10-05", endDate: "2024-10-28" },
      { name: "Project 2", startDate: "2024-12-12", endDate: "2025-01-09" },
      { name: "Project 3", startDate: "2025-02-01", endDate: "2025-02-27" },
    ],
  },
  {
    position: "Development",
    name: "Jing Yixian",
    projects: [
      { name: "Project 1", startDate: "2024-09-24", endDate: "2024-09-30" },
      { name: "Project 2", startDate: "2024-10-01", endDate: "2024-10-02" },
      { name: "Project 3", startDate: "2024-10-03", endDate: "2024-10-15" },
    ],
  },
  {
    position: "Testing",
    name: "Liu Xinwei",
    projects: [
      { name: "Project 1", startDate: "2024-07-20", endDate: "2024-08-18" },
      { name: "Project 2", startDate: "2024-11-10", endDate: "2024-12-07" },
      { name: "Project 3", startDate: "2025-01-15", endDate: "2025-02-12" },
    ],
  },
]);
</script>
```

<div class="w-full h-[142px] overflow-hidden">
	<vue-gantt :data="data" start-date="2024-09-23" end-date="2025-09-23" />
</div>

## Event Handler
```vue
<template>
	<div class="w-full h-[142px] overflow-hidden">
		<vue-gantt :data="data" start-date="2024-09-23" end-date="2025-09-23"
			@dragend-bar="handleDragEnd($event.e, $event.bar, $event.barIndex, $event.rowIndex)"
			@click-bar="handleClickBar($event.e, $event.bar, $event.barIndex, $event.rowIndex)"
			@click-row="handleClickRow($event.e, $event.row, $event.time, $event.rowIndex)"
		/>
	</div>
</template>

<script setup lang="ts">
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
```

<div class="w-full h-[142px] overflow-hidden">
	<vue-gantt :data="data" start-date="2024-09-23" end-date="2025-09-23"
		@dragend-bar="handleDragEnd($event.e, $event.bar, $event.barIndex, $event.rowIndex)"
    @click-bar="handleClickBar($event.e, $event.bar, $event.barIndex, $event.rowIndex)"
    @click-row="handleClickRow($event.e, $event.row, $event.time, $event.rowIndex)"
	/>
</div>

## Custom Slots

```vue
<template>
	<div class="w-full h-[142px] overflow-hidden">
		<vue-gantt
			:data="data"
			start-date="2024-09-23"
			end-date="2025-09-23"
			@dragend-bar="handleDragEnd($event.e, $event.bar, $event.barIndex, $event.rowIndex)"
		>
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
					<div class="px-1 whitespace-nowrap overflow-hidden text-ellipsis">{{ calculateWorkingHoursForRow(row.projects) }}</div>
				</div>
			</template>
			<template #gantt-head-cell="{ cell }">
				<span class="text-zinc-400 text-sm leading-8 px-2" :title="cell.format('YYYY-MM-DD')">{{ cell.format('DD') }}</span>
			</template>
			<template #gantt-bar-content="{ project }">
				<div class="w-full h-full overflow-hidden text-sm flex justify-center items-center" :title="project.name">
					<span class="overflow-hidden whitespace-nowrap text-ellipsis">{{ `${project.startDate} : ${project.endDate}`
						}}</span>
				</div>
			</template>
		</vue-gantt>
</div>
</template>
```

<div class="w-full h-[142px] overflow-hidden">
	<vue-gantt
		:data="data"
		start-date="2024-09-23"
		end-date="2025-09-23"
		@dragend-bar="handleDragEnd($event.e, $event.bar, $event.barIndex, $event.rowIndex)"
	>
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
				<div class="px-1 whitespace-nowrap overflow-hidden text-ellipsis">{{ calculateWorkingHoursForRow(row.projects) }}</div>
			</div>
		</template>
		<template #gantt-head-cell="{ cell }">
			<span class="text-zinc-400 text-sm leading-8 px-2" :title="cell.format('YYYY-MM-DD')">{{ cell.format('DD') }}</span>
		</template>
		<template #gantt-bar-content="{ project }">
			<div class="w-full h-full overflow-hidden text-sm flex justify-center items-center" :title="project.name">
				<span class="overflow-hidden whitespace-nowrap text-ellipsis">{{ `${project.startDate} : ${project.endDate}`
					}}</span>
			</div>
		</template>
	</vue-gantt>
</div>


<script setup>
	import { reactive } from "vue"
	import dayjs from 'dayjs';

	const data = reactive([
  {
		position: "Product",
    name: "Xu Quan",
    projects: [
      { name: "Project 1", startDate: "2024-09-24", endDate: "2024-09-30" },
      { name: "Project 2", startDate: "2024-10-01", endDate: "2024-10-02" },
      { name: "Project 3", startDate: "2024-10-03", endDate: "2024-10-15" },
    ],
  },
  {
		position: "Design",
    name: "Lei Yufei",
    projects: [
      { name: "Project 1", startDate: "2024-10-05", endDate: "2024-10-28" },
      { name: "Project 2", startDate: "2024-12-12", endDate: "2025-01-09" },
      { name: "Project 3", startDate: "2025-02-01", endDate: "2025-02-27" },
    ],
  },
  {
		position: "Development",
    name: "Jing Yixian",
    projects: [
      { name: "Project 1", startDate: "2024-09-24", endDate: "2024-09-30" },
      { name: "Project 2", startDate: "2024-10-01", endDate: "2024-10-02" },
      { name: "Project 3", startDate: "2024-10-03", endDate: "2024-10-15" },
    ],
  },
  {
		position: "Testing",
    name: "Liu Xinwei",
    projects: [
      { name: "Project 1", startDate: "2024-07-20", endDate: "2024-08-18" },
      { name: "Project 2", startDate: "2024-11-10", endDate: "2024-12-07" },
      { name: "Project 3", startDate: "2025-01-15", endDate: "2025-02-12" },
    ],
  },
]);

const handleDragEnd = (
  e,
  bar,
  barIndex,
  rowIndex) => {
  console.log('---drag-end---', e, bar, barIndex, rowIndex);
  data[rowIndex].projects[barIndex] = bar;
}

const handleClickBar = (
  e,
  bar,
  barIndex,
  rowIndex) => {
  console.log('---click-bar---', e, bar, barIndex, rowIndex);
}

const handleClickRow = (
  e,
  row,
  time,
  rowIndex) => {
  console.log('---click-row---', e, row, time, rowIndex);
}

const calculateWorkingDays = (
  startDate,
  endDate
) => {
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

const calculateWorkingHoursForRow = (projects) => {
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

const isWeekday = (date) => {
  const day = date.day();
  return day !== 0 && day !== 6;
}
</script>

<template>
	<div class="size-full flex select-none">
		<div class="w-[272px] overflow-hidden">
			<Left>
				<template #gantt-left-head>
					<slot name="gantt-left-head" />
				</template>
				<template #gantt-left-row="{ row }">
					<slot name="gantt-left-row" :row="row" />
				</template>
			</Left>
		</div>
		<div class="w-[1px] h-full border-r relative overflow-visible cursor-ew-resize">
			<div class="absolute -left-3 top-0 -right-3 bottom-0"></div>
		</div>
		<div class="flex-1 overflow-auto">
			<div class="w-fit h-full relative overflow-hidden">
				<TimeHead />
				<Content>
					<template #gantt-bar-content="{ project }">
						<slot name="gantt-bar-content" :project="project" />
					</template>
				</Content>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { GanttProps, Project } from './types';
import { computed, provide, toRefs } from 'vue';
import TimeHead from './components/TimeHead.vue';
import Left from './components/Left.vue';
import Content from './components/content/index.vue';
import { CONFIG, EMIT_BAR_EVENT, WORK_DAYS } from './provider/symbols';
import { isWeekday } from './util';

const props = withDefaults(defineProps<GanttProps>(), {
	rowHeight: 36,
	headHeight: 32,
	colWidth: 32,
})

const emit = defineEmits<{
	(e: "dragend-bar", value: {
		e: MouseEvent,
		bar: Project,
		barIndex: number,
		rowIndex: number
	}): void
}>()

const workdays = computed(() => {
	let start = dayjs(props.startDate);
	const end = dayjs(props.endDate);
	const workdays: dayjs.Dayjs[] = [];

	// Loop through each day between startDate and endDate
	while (start.isBefore(end) || start.isSame(end, 'day')) {
		if (isWeekday(start)) {
			workdays.push(start);
		}
		// Move to the next day
		start = start.add(1, 'day');
	}
	return workdays;
})

const emitBarEvent = (
	e: MouseEvent,
	bar: Project,
	barIndex: number,
	rowIndex: number
) => {
	emit("dragend-bar", { e, bar, barIndex, rowIndex })
}

provide(WORK_DAYS, workdays.value);
provide(CONFIG, {
	...toRefs(props)
});
provide(EMIT_BAR_EVENT, emitBarEvent)
</script>

<template>
	<div class="size-full flex">
		<div class="w-[272px] overflow-hidden">
			<Left />
		</div>
		<div class="w-[1px] h-full border-r relative overflow-visible cursor-ew-resize">
			<div class="absolute -left-3 top-0 -right-3 bottom-0"></div>
		</div>
		<div class="flex-1 overflow-auto">
			<div class="w-fit h-full relative overflow-hidden">
				<TimeHead />
				<Content />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { GanttProps } from './types';
import { computed, provide } from 'vue';
import TimeHead from './components/TimeHead.vue';
import Left from './components/Left.vue';
import Content from './components/content/index.vue';
import { CONFIG, GANTT_DATA, WORK_DAYS } from './provider/symbols';

const props = withDefaults(defineProps<GanttProps>(), {
	startDate: dayjs().format('YYYY-MM-DD'),
	endDate: dayjs().add(3, 'month').format(),
	rowHeight: 36,
	headHeight: 32,
	colWidth: 32,
})

const workdays = computed(() => {
	let start = dayjs(props.startDate);
	const end = dayjs(props.endDate);
	const workdays: dayjs.Dayjs[] = [];

	// Loop through each day between startDate and endDate
	while (start.isBefore(end) || start.isSame(end, 'day')) {
		const dayOfWeek = start.day(); // Get the day of the week (0 for Sunday, 6 for Saturday)

		// If it's a weekday (Monday to Friday)
		if (dayOfWeek !== 0 && dayOfWeek !== 6) {
			workdays.push(start);
		}
		// Move to the next day
		start = start.add(1, 'day');
	}
	return workdays;
})

provide(GANTT_DATA, props.data);
provide(WORK_DAYS, workdays.value);
provide(CONFIG, {
	...props,
});
</script>

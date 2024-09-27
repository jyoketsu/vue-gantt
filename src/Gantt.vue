<template>
	<div class="size-full flex select-none">
		<div class="overflow-hidden" :style="{ width: `${leftWidth}px` }">
			<Left>
				<template #gantt-left-head>
					<slot name="gantt-left-head" />
				</template>
				<template #gantt-left-row="{ row }">
					<slot name="gantt-left-row" :row="row" />
				</template>
			</Left>
		</div>
		<div class="w-[1px] h-full border-r relative overflow-visible cursor-ew-resize" @mousedown="handleMouseDown">
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
import { Gantt, GanttProps, Project } from './types';
import { computed, provide, ref, toRefs } from 'vue';
import TimeHead from './components/TimeHead.vue';
import Left from './components/Left.vue';
import Content from './components/content/index.vue';
import { CONFIG, EMIT_BAR_EVENT, EMIT_ROW_EVENT, WORK_DAYS } from './provider/symbols';
import { isWeekday } from './util';
import { useThrottle } from './composables/useThrottle';

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
	(e: "click-bar", value: {
		e: MouseEvent,
		bar: Project,
		barIndex: number,
		rowIndex: number
	}): void
	(e: "click-row", value: {
		e: MouseEvent,
		row: Gantt,
		time: string,
		rowIndex: number
	}): void
}>()

const leftWidth = ref(272);
const isDragging = ref(false);
const clickX = ref(0);
const gapTime = 16.666;

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

const handleMouseDown = (e: MouseEvent) => {
	e.preventDefault()
	if (e.type === "mousedown") {
		clickX.value = e.clientX;
		window.addEventListener("mousemove", dragBar)
		window.addEventListener(
			"mouseup",
			() => {
				window.removeEventListener("mousemove", dragBar)
				isDragging.value = false
			},
			{ once: true }
		)
	}
}

const dragBar = useThrottle((e: MouseEvent) => {
	if (!isDragging.value) {
		isDragging.value = true;
	}

	const movedX = e.clientX - clickX.value;

	if (leftWidth.value + movedX > 200) {
		leftWidth.value += movedX
	}

	clickX.value = e.clientX;
}, gapTime);

const emitBarEvent = (
	type: string,
	e: MouseEvent,
	bar: Project,
	barIndex: number,
	rowIndex: number
) => {
	switch (type) {
		case 'dragend-bar':
			emit(type, { e, bar, barIndex, rowIndex })
			break;
		case 'click-bar':
			emit(type, { e, bar, barIndex, rowIndex })
			break;
		default:
			break;
	}
}

const emitRowEvent = (e: MouseEvent,
	row: Gantt,
	time: string,
	rowIndex: number) => {
	emit('click-row', { e, row, time, rowIndex })
}

provide(WORK_DAYS, workdays.value);
provide(CONFIG, {
	...toRefs(props)
});
provide(EMIT_BAR_EVENT, emitBarEvent)
provide(EMIT_ROW_EVENT, emitRowEvent)
</script>

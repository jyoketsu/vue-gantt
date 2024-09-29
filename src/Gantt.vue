<template>
	<div class="size-full flex flex-col overflow-hidden">
		<div class="flex-1 overflow-hidden flex select-none">
			<div class="h-full overflow-hidden" :style="{ width: `${leftWidth}px` }">
				<Left :scrolled-y="scrolledY">
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
			<div class="flex-1 overflow-hidden">
				<div class="w-fit h-full relative overflow-hidden" :style="{ transform: `translateX(-${scrolledX}px)` }">
					<TimeHead>
						<template #gantt-head-cell="{ cell }">
							<slot name="gantt-head-cell" :cell="cell" />
						</template>
					</TimeHead>
					<Content :scrolled-y="scrolledY">
						<template #gantt-bar-content="{ project }">
							<slot name="gantt-bar-content" :project="project" />
						</template>
					</Content>
				</div>
			</div>
			<VerticalScrollBar @scroll="(scrolled) => scrolledY = scrolled" />
		</div>
		<HorizontalScrollBar :left-width="leftWidth" @scroll="(scrolled) => scrolledX = scrolled" />
	</div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { Gantt, GanttProps, Project } from './types';
import { computed, provide, ref, toRefs } from 'vue';
import TimeHead from './components/TimeHead.vue';
import Left from './components/Left.vue';
import Content from './components/content/index.vue';
import { CONFIG, EMIT_BAR_EVENT, EMIT_ROW_EVENT, COLS } from './provider/symbols';
import { getMonthFirstDay, isWeekday } from './util';
import { useThrottle } from './composables/useThrottle';
import VerticalScrollBar from './components/VerticalScrollBar.vue';
import HorizontalScrollBar from './components/HorizontalScrollBar.vue';

const props = withDefaults(defineProps<GanttProps>(), {
	rowHeight: 36,
	headHeight: 32,
	colWidth: 32,
	rowActiveBackgroundColor: '#cbe3f1',
	rowActiveBorderColor: '#a4cee7',
	cellUnit: 'day'
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
const scrolledY = ref(0);
const scrolledX = ref(0);
const clickX = ref(0);
const gapTime = 16.666;

const cols = computed(() => {
	let start = props.cellUnit === 'day' ? dayjs(props.startDate) : dayjs(getMonthFirstDay(props.startDate));
	const end = props.cellUnit === 'day' ? dayjs(props.endDate) : dayjs(getMonthFirstDay(props.endDate));
	const cols: dayjs.Dayjs[] = [];

	// Loop through each day between startDate and endDate
	if (props.cellUnit === 'day') {
		while (start.isBefore(end) || start.isSame(end, 'day')) {
			if (isWeekday(start)) {
				cols.push(start);
			}
			// Move to the next day
			start = start.add(1, 'day');
		}
	} else {
		while (start.isBefore(end) || start.isSame(end, 'day')) {
			cols.push(start);
			start = start.add(1, 'month');
		}
	}

	return cols;
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

provide(COLS, cols);
provide(CONFIG, {
	...toRefs(props)
});
provide(EMIT_BAR_EVENT, emitBarEvent)
provide(EMIT_ROW_EVENT, emitRowEvent)
</script>

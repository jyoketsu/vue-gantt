<template>
	<div v-if="project.startDate && project.endDate && project.endDate > startDate! && project.startDate < endDate!"
		class="absolute overflow-hidden text-ellipsis whitespace-nowrap text-center" :style="{
			top: `${rowHeight! * 0.1}px`,
			left: `${xStart}px`,
			width: `${xEnd - xStart}px`,
			height: `${rowHeight! * 0.8}px`,
			lineHeight: `${rowHeight! * 0.8}px`,
			background: project.background || defaultBackground,
			color: project.color || defaultColor,
		}" @mousedown="onMouseEvent">
		<span class="text-sm px-2">{{ project.name }}</span>
		<div class="bar-handle-left absolute left-0 top-0 bottom-0 w-2 bg-white opacity-50 cursor-ew-resize"></div>
		<div class="bar-handle-right absolute right-0 top-0 bottom-0 w-2 bg-white opacity-50 cursor-ew-resize"></div>
	</div>
</template>
<script setup lang="ts">
import { Project } from '../../types';
import provideConfig from '../../provider/provideConfig';
import { onMounted, ref, toRefs, watch } from 'vue';
import useTime2Position from '../../composables/useTime2Position';
import { getDefaultStyle } from '../../util';
import dayjs from 'dayjs';
import { useThrottle } from '../../composables/useThrottle';

const props = defineProps<{
	project: Project
}>();

const config = provideConfig();
const { startDate, endDate, colWidth, rowHeight } = config;

// const { project } = toRefs(props)
const project = ref({ ...props.project })
const xStart = ref(0)
const xEnd = ref(0)
const defaultBackground = ref('');
const defaultColor = ref('');
const isDragging = ref(false);
const clickX = ref(0);
const gapTime = 16.666;
const { time2position } = useTime2Position();

watch([project, startDate, endDate, colWidth], () => {
	xStart.value = time2position(project.value.startDate, true);
	xEnd.value = time2position(project.value.endDate, false);
}, { deep: true, immediate: true })

onMounted(() => {
	if (!project.value.background || !project.value.color) {
		const style = getDefaultStyle();
		defaultBackground.value = style.background;
		defaultColor.value = style.color;
	}
})

const onMouseEvent = (e: MouseEvent) => {
	e.preventDefault()
	if (e.type === "mousedown") {
		clickX.value = e.clientX;

		let dragCallBack: (e: MouseEvent) => void;
		const mousedownType = (e.target as Element).className;
		if (mousedownType.includes('bar-handle-right')) {
			dragCallBack = dragBarByRightHandle;
		} else if (mousedownType.includes('bar-handle-left')) {
			dragCallBack = dragBarByLeftHandle;
		} else {
			dragCallBack = dragBar;
		}

		window.addEventListener("mousemove", dragCallBack) // on first mousemove event
		window.addEventListener(
			"mouseup",
			() => {
				window.removeEventListener("mousemove", dragCallBack)
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

	xStart.value += movedX;
	xEnd.value += movedX;

	clickX.value = e.clientX;
}, gapTime);

const dragBarByLeftHandle = useThrottle((e: MouseEvent) => {
	if (!isDragging.value) {
		isDragging.value = true;
	}

	const movedX = e.clientX - clickX.value;

	if (xEnd.value - (xStart.value + movedX) > colWidth.value) {
		xStart.value += movedX;
	}

	clickX.value = e.clientX;
}, gapTime);

const dragBarByRightHandle = useThrottle((e: MouseEvent) => {
	if (!isDragging.value) {
		isDragging.value = true;
	}

	const movedX = e.clientX - clickX.value;

	if (xEnd.value + movedX - (xStart.value) > colWidth.value) {
		xEnd.value += movedX;
	}

	clickX.value = e.clientX;
}, gapTime);
</script>
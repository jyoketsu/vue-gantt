<template>
	<div :id="`gantt-row-${rowIndex}-bar-${index}`"
		v-if="project.startDate && project.endDate && project.endDate > startDate! && project.startDate < endDate!"
		class="absolute overflow-hidden text-ellipsis whitespace-nowrap text-center px-2" :style="{
			top: `${rowHeight! * 0.1}px`,
			left: `${xStart}px`,
			width: `${xEnd - xStart}px`,
			height: `${rowHeight! * 0.8}px`,
			lineHeight: `${rowHeight! * 0.8}px`,
			background: project.background || defaultBackground,
			color: project.color || defaultColor,
			zIndex: isDragging ? 3 : 2,
			transition: isDragging ? 'none' : 'left 0.5s,width 0.5s'
		}" @mousedown="onMouseEvent" @click="handleClick">
		<slot name="gantt-bar-content" :project="project">
			<span class="text-sm px-2">{{ project.name }}</span>
		</slot>
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
import { useThrottle } from '../../composables/useThrottle';
import provideEmitBarEvent from '../../provider/provideEmitBarEvent';

const props = defineProps<{
	project: Project;
	rowIndex: number;
	index: number;
}>();

const emit = defineEmits<{
	(e: "dragging-start"): void
	(e: "dragging-end"): void
	(e: "dragging", value: { xStart: number; xEnd: number }): void
}>()

const config = provideConfig();
const emitBarEvent = provideEmitBarEvent();
const { startDate, endDate, colWidth, rowHeight } = config;

const { project } = toRefs(props)
// const project = ref({ ...props.project })
const xStart = ref(0)
const xEnd = ref(0)
const defaultBackground = ref('');
const defaultColor = ref('');
const isDragging = ref(false);
const clickX = ref(0);
const gapTime = 16.666;
const { time2position, position2time } = useTime2Position();

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
			(e: MouseEvent) => {
				window.removeEventListener("mousemove", dragCallBack)

				xStart.value = getRoundedPosition(xStart.value)
				xEnd.value = getRoundedPosition(xEnd.value)
				const newStartDate = position2time(xStart.value, true);
				const newEndDate = position2time(xEnd.value, false);
				if (isDragging.value) {
					emitBarEvent('dragend-bar', e, { ...project.value, startDate: newStartDate, endDate: newEndDate }, props.index, props.rowIndex);
				}
				isDragging.value = false
				emit('dragging-end')
			},
			{ once: true }
		)
	}
}

const handleClick = (e: MouseEvent) => {
	e.stopPropagation();
	emitBarEvent('click-bar', e, { ...project.value }, props.index, props.rowIndex);
}

const dragBar = useThrottle((e: MouseEvent) => {
	if (!isDragging.value) {
		isDragging.value = true;
		emit('dragging-start')
	}

	const movedX = e.clientX - clickX.value;

	if (isMovable(movedX)) {
		xStart.value += movedX;
		xEnd.value += movedX;
		emit('dragging', { xStart: xStart.value, xEnd: xEnd.value })
	}

	clickX.value = e.clientX;
}, gapTime);

const dragBarByLeftHandle = useThrottle((e: MouseEvent) => {
	if (!isDragging.value) {
		isDragging.value = true;
		emit('dragging-start')
	}

	const movedX = e.clientX - clickX.value;

	if (isMovable(movedX) && (xEnd.value - (xStart.value + movedX) > colWidth.value)) {
		xStart.value += movedX;
		emit('dragging', { xStart: xStart.value, xEnd: xEnd.value })
	}

	clickX.value = e.clientX;
}, gapTime);

const dragBarByRightHandle = useThrottle((e: MouseEvent) => {
	if (!isDragging.value) {
		isDragging.value = true;
		emit('dragging-start')
	}

	const movedX = e.clientX - clickX.value;

	if (isMovable(movedX) && (xEnd.value + movedX - (xStart.value) > colWidth.value)) {
		xEnd.value += movedX;
		emit('dragging', { xStart: xStart.value, xEnd: xEnd.value })
	}

	clickX.value = e.clientX;
}, gapTime);

const isMovable = (movedX: number) => {
	let canMove = true;
	const currentDiv = document.getElementById(`gantt-row-${props.rowIndex}-bar-${props.index}`) as HTMLElement;
	const currentLeft = currentDiv.offsetLeft;
	const currentRight = currentLeft + currentDiv.offsetWidth;

	const newLeft = currentLeft + movedX;
	const newRight = currentRight + movedX;
	const siblings = document.getElementById(`gantt-row-${props.rowIndex}`)?.children;
	if (siblings) {
		for (let i = 0; i < siblings.length; i++) {
			const sibling = siblings[i] as HTMLElement;

			// 跳过当前拖动的 div
			if (sibling === currentDiv) continue;

			// 获取其他 div 的相对位置
			const siblingLeft = sibling.offsetLeft;
			const siblingRight = siblingLeft + sibling.offsetWidth;

			// 检查是否重叠
			if (
				(newLeft < siblingRight && newRight > siblingLeft) || // 当前div的左边和其他div的右边重叠
				(newRight > siblingLeft && newLeft < siblingRight)    // 当前div的右边和其他div的左边重叠
			) {
				canMove = false;
				break;
			}
		}
	}
	return canMove;
}

const getRoundedPosition = (position: number) => {
	return Math.round(position / colWidth.value) * colWidth.value;
};
</script>
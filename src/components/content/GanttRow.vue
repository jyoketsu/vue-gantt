<template>
	<div class="w-full relative transition-colors duration-500"
		:style="{ height: `${rowHeight}px`, backgroundColor: isHover ? rowActiveBackgroundColor : 'unset' }"
		@click="handleClick" @mouseenter="isHover = true" @mouseleave="isHover = false">
		<Transition>
			<div v-if="isDragging" class="size-full flex">
				<div v-for="(col, index) in cols" :key="`${index}-${col.toString()}`"
					class="pointer-events-none h-full flex-shrink-0 border-l-2 transition-colors duration-500"
					:style="{ width: `${colWidth}px`, backgroundColor: index >= indexStart && index <= indexEnd ? rowActiveBorderColor : rowActiveBackgroundColor, borderColor: rowActiveBorderColor }">
				</div>
			</div>
		</Transition>
		<div :id="`gantt-row-${index}`">
			<GanttBar v-for="(gantt, index) in props.gantt.projects" :project="gantt" :row-index="props.index" :index="index"
				:key="index" @dragging-start="isDragging = true" @dragging-end="isDragging = false; xStart = 0; xEnd = 0;"
				@dragging="xStart = $event.xStart; xEnd = $event.xEnd">
				<template #gantt-bar-content="{ project }">
					<slot name="gantt-bar-content" :project="project" />
				</template>
			</GanttBar>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import useTime2Position from '../../composables/useTime2Position';
import provideConfig from '../../provider/provideConfig';
import provideEmitRowEvent from '../../provider/provideEmitRowEvent';
import provideCols from '../../provider/provideCols';
import { Gantt } from '../../types';
import GanttBar from './GanttBar.vue';

const props = defineProps<{
	gantt: Gantt;
	index: number;
}>();

const isDragging = ref(false);
const isHover = ref(false);
const xStart = ref(0)
const xEnd = ref(0)
const indexStart = computed(() => {
	return colWidth.value ? Math.floor(xStart.value / colWidth.value) : 0;
});

const indexEnd = computed(() => {
	return colWidth.value ? Math.floor(xEnd.value / colWidth.value) : 0;
});

const { position2time } = useTime2Position();
const { rowHeight, colWidth, rowActiveBackgroundColor, rowActiveBorderColor } = provideConfig();
const cols = provideCols()
const emitRowEvent = provideEmitRowEvent();

const handleClick = (e: MouseEvent) => {
	e.stopPropagation();
	const clickTime = position2time(e.offsetX, true)
	emitRowEvent(e, props.gantt, clickTime, props.index);
}
</script>
<style>
.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
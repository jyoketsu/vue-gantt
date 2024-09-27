<template>
	<div :id="`gantt-row-${index}`" class="w-full relative" :style="{ height: `${rowHeight}px` }" @click="handleClick">
		<GanttBar v-for="(gantt, index) in props.gantt.projects" :project="gantt" :row-index="props.index" :index="index"
			:key="index">
			<template #gantt-bar-content="{ project }">
				<slot name="gantt-bar-content" :project="project" />
			</template>
		</GanttBar>
	</div>
</template>

<script setup lang="ts">
import useTime2Position from '../../composables/useTime2Position';
import provideConfig from '../../provider/provideConfig';
import provideEmitRowEvent from '../../provider/provideEmitRowEvent';
import { Gantt } from '../../types';
import GanttBar from './GanttBar.vue';

const props = defineProps<{
	gantt: Gantt;
	index: number;
}>();

const { position2time } = useTime2Position();

const { rowHeight } = provideConfig();
const emitRowEvent = provideEmitRowEvent();

const handleClick = (e: MouseEvent) => {
	e.stopPropagation();
	const clickTime = position2time(e.offsetX, true)
	emitRowEvent(e, props.gantt, clickTime, props.index);
}
</script>
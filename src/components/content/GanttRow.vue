<template>
	<div :id="`gantt-row-${index}`" class="w-full relative" :style="{ height: `${rowHeight}px` }">
		<GanttBar v-for="(gantt, index) in props.gantt.projects" :project="gantt" :row-index="props.index" :index="index"
			:key="index">
			<template #gantt-bar-content="{ project }">
				<slot name="gantt-bar-content" :project="project" />
			</template>
		</GanttBar>
	</div>
</template>

<script setup lang="ts">
import provideConfig from '../../provider/provideConfig';
import { Gantt } from '../../types';
import GanttBar from './GanttBar.vue';

const props = defineProps<{
	gantt: Gantt;
	index: number;
}>();

const { rowHeight } = provideConfig();
</script>
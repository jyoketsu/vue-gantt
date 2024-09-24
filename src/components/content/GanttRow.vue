<template>
	<div class="w-full relative" :style="{ height: `${rowHeight}px` }">
		<GanttBar v-for="(gantt, index) in props.gantt.projects" :project="gantt" :key="index" />
	</div>
</template>

<script setup lang="ts">
import provideConfig from '../../provider/provideConfig';
import { Gantt } from '../../types';
import GanttBar from './GanttBar.vue';

const props = defineProps<{
	gantt: Gantt
}>();

const { rowHeight } = provideConfig();
</script>
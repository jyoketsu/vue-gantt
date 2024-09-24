<template>
	<div class="w-full">
		<VerticalDivider />
		<GanttRow v-for="(row, index) in data" :key="index" :gantt="row" />
	</div>
</template>

<script setup lang="ts">
import VerticalDivider from './VerticalDivider.vue';
import GanttRow from './GanttRow.vue';
import provideGanttData from '../../provider/provideData';

const data = provideGanttData();
</script>
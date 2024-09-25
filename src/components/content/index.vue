<template>
	<div class="w-full">
		<VerticalDivider />
		<GanttRow v-for="(row, index) in data" :key="index" :index="index" :gantt="row" />
	</div>
</template>

<script setup lang="ts">
import VerticalDivider from './VerticalDivider.vue';
import GanttRow from './GanttRow.vue';
import provideConfig from '../../provider/provideConfig';

const { data } = provideConfig();
</script>
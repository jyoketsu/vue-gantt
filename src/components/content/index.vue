<template>
	<div class="w-full" :style="{ transform: `translateY(-${props.scrolledY}px)` }">
		<VerticalDivider v-if="cellUnit === 'day'" />
		<GanttRow v-for="(row, index) in data" :key="index" :index="index" :gantt="row">
			<template #gantt-bar-content="{ project }">
				<slot name="gantt-bar-content" :project="project" />
			</template>
		</GanttRow>
	</div>
</template>

<script setup lang="ts">
import VerticalDivider from './VerticalDivider.vue';
import GanttRow from './GanttRow.vue';
import provideConfig from '../../provider/provideConfig';

const { data, cellUnit } = provideConfig();
const props = defineProps<{
	scrolledY: number
}>();
</script>
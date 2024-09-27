<template>
	<div class="w-fit flex border-b" :style="{ height: `${headHeight}px` }">
		<div v-for="(day, index) in cols" :key="index" class="h-full flex-shrink-0 overflow-visible"
			:style="{ width: `${colWidth}px` }">
			<slot name="gantt-head-cell" :cell="day">
				<span v-if="day.day() === 1" class="text-zinc-400 text-sm leading-8 px-2">{{ day.format('MM/DD') }}</span>
			</slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import provideCols from '../provider/provideCols';
import provideConfig from '../provider/provideConfig';

const cols = provideCols()
const { headHeight, colWidth } = provideConfig();
</script>
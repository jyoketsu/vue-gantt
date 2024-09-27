<template>
	<div class="w-fit flex border-b" :style="{ height: `${headHeight}px` }">
		<div v-for="(day, index) in workdays" :key="index" class="h-full flex-shrink-0 overflow-visible"
			:style="{ width: `${colWidth}px` }">
			<slot name="gantt-head-cell" :cell="day">
				<span v-if="day.day() === 1" class="text-zinc-400 text-sm leading-8 px-2">{{ day.format('MM/DD') }}</span>
			</slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import provideWorkDays from '../provider/provideWorkDays';
import provideConfig from '../provider/provideConfig';

const workdays = provideWorkDays()
const { headHeight, colWidth } = provideConfig();
</script>
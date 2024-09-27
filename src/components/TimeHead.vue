<template>
	<div class="w-fit flex border-b" :style="{ height: `${headHeight}px` }">
		<div v-for="(day, index) in cols" :key="index"
			class="h-full flex-shrink-0 overflow-visible transition-width duration-500"
			:class="{ 'border-r': cellUnit === 'month' }" :style="{ width: `${colWidth}px` }">
			<slot name="gantt-head-cell" :cell="day">
				<span v-if="cellUnit === 'day' && day.day() === 1" class="text-zinc-400 text-sm px-2"
					:style="{ lineHeight: `${headHeight}px` }">
					{{ day.format('MM/DD') }}
				</span>
				<span v-if="cellUnit === 'month'" class="text-zinc-400 text-sm leading-8 px-2"
					:style="{ lineHeight: `${headHeight}px` }">{{ day.month() === 0 ? day.format('YYYY-MM') : day.format('MM')
					}}</span>
			</slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import provideCols from '../provider/provideCols';
import provideConfig from '../provider/provideConfig';

const cols = provideCols()
const { headHeight, colWidth, cellUnit } = provideConfig();
</script>
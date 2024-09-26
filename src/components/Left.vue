<template>
	<div class="w-full overflow-hidden text-zinc-400 text-sm">
		<div class="w-full border-b px-2 whitespace-nowrap overflow-hidden text-ellipsis"
			:style="{ height: `${headHeight}px`, lineHeight: `${headHeight}px` }">
			<slot name="gantt-left-head">
				姓名
			</slot>
		</div>
		<div class="w-full border-b px-2 whitespace-nowrap overflow-hidden text-ellipsis"
			:style="{ height: `${rowHeight}px`, lineHeight: `${rowHeight}px` }" v-for="(row, index) in data" :key="index">
			<slot name="gantt-left-row" :row="row">
				{{ row.name }}
			</slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import provideConfig from '../provider/provideConfig';
const { rowHeight, headHeight, data } = provideConfig();
</script>
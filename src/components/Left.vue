<template>
	<div class="size-full flex flex-col overflow-hidden text-zinc-400 text-sm z-[999] bg-white">
		<div class="w-full border-b px-2 whitespace-nowrap overflow-hidden text-ellipsis"
			:style="{ height: `${headHeight}px`, lineHeight: `${headHeight}px` }">
			<slot name="gantt-left-head">
				姓名
			</slot>
		</div>
		<div class="flex-1 overflow-hidden">
			<div :style="{ transform: `translateY(-${props.scrolledY}px)` }">
				<div class="w-full border-b px-2 whitespace-nowrap overflow-hidden text-ellipsis"
					:style="{ height: `${rowHeight}px`, lineHeight: `${rowHeight}px` }" v-for="(row, index) in data" :key="index">
					<slot name="gantt-left-row" :row="row">
						{{ row.name }}
					</slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import provideConfig from '../provider/provideConfig';
const { rowHeight, headHeight, data } = provideConfig();
const props = defineProps<{ scrolledY: number }>();

</script>
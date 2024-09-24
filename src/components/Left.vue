<template>
	<div class="w-full overflow-hidden text-zinc-400 text-sm leading-8">
		<div class="w-full h-8 border-b grid grid-cols-2">
			<div class="px-2 border-r">姓名</div>
			<div class="px-2">工时</div>
		</div>
		<div class="w-full h-8 border-b grid grid-cols-2" v-for="item in props.data">
			<div class="px-2 border-r">{{ item.name }}</div>
			<div class="px-2"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Gantt } from '../types';
const props = defineProps<{
	data: Gantt[]
}>()
</script>
<template>
	<div class="w-fit h-8 flex border-b">
		<div v-for="(day, index) in props.workdays" :key="index" class="w-8 h-full flex-shrink-0 overflow-visible">
			<span v-if="day.day() === 1" class="text-zinc-400 text-sm leading-8 px-2">{{ day.format('MM/DD') }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
const props = defineProps<{ workdays: dayjs.Dayjs[] }>()
</script>
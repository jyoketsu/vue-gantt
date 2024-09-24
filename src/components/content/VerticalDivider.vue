<template>
	<div class="w-[1px] border-r absolute top-0 bottom-0" v-for="index in firdayIndexList" :key="index"
		:style="{ left: `${(index + 1) * 32}px` }"></div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { computed } from 'vue';

const props = defineProps<{ workdays: dayjs.Dayjs[]; }>()
const firdayIndexList = computed(() => {
	const indexList: number[] = [];
	for (let index = 0; index < props.workdays.length; index++) {
		const element = props.workdays[index];
		if (element.day() === 5) {
			indexList.push(index)
		}
	}
	return indexList
})
</script>

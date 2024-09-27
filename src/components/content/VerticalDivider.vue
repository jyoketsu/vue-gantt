<template>
	<div class="w-[1px] border-r absolute top-0 bottom-0" v-for="index in firdayIndexList" :key="index"
		:style="{ left: `${(index + 1) * colWidth!}px` }"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import provideCols from '../../provider/provideCols';
import provideConfig from '../../provider/provideConfig';

const cols = provideCols();
const { colWidth } = provideConfig();

const firdayIndexList = computed(() => {
	const indexList: number[] = [];
	for (let index = 0; index < cols.value.length; index++) {
		const element = cols.value[index];
		if (element.day() === 5) {
			indexList.push(index)
		}
	}
	return indexList
})
</script>

<template>
	<div class="w-full overflow-hidden text-zinc-400 text-sm leading-8">
		<div class="w-full border-b grid grid-cols-2" :style="{ height: `${headHeight}px` }">
			<div class="px-2 border-r">姓名</div>
			<div class="px-2">工时</div>
		</div>
		<div class="w-full border-b grid grid-cols-2" :style="{ height: `${rowHeight}px` }" v-for="item in data">
			<div class="px-2 border-r">{{ item.name }}</div>
			<div class="px-2"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import provideData from '../provider/provideData';
import provideConfig from '../provider/provideConfig';

const data = provideData();
const { rowHeight, headHeight } = provideConfig();
</script>
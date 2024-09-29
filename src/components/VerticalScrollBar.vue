<template>
	<div class="w-[17px] h-full overflow-y-auto overflow-x-hidden" ref="scrollContainer" @scroll="handleScroll">
		<div :style="{ height: `${data.length * rowHeight + headHeight}px` }"></div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import provideConfig from '../provider/provideConfig';
import { useThrottle } from '../composables/useThrottle';

const gapTime = 16.666;

const emit = defineEmits<{
	(e: "scroll", scrolledY: number): void
}>();

const { data, rowHeight, headHeight } = provideConfig();

const scrollContainer = ref<HTMLElement | null>(null);

const handleScroll = useThrottle(() => {
	if (scrollContainer.value) {
		const scrollTop = scrollContainer.value.scrollTop;
		// console.log('滚动位置:', scrollTop);
		// // 在这里可以处理滚动逻辑，例如调整其他内容的位置
		emit('scroll', scrollTop)
	}
}, gapTime);
</script>
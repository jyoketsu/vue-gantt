<template>
	<div class="h-[17px] w-full overflow-x-auto overflow-y-hidden" ref="scrollContainer" @scroll="handleScroll">
		<div :style="{ width: `${cols.length * colWidth + props.leftWidth - 17}px` }"></div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import provideConfig from '../provider/provideConfig';
import provideCols from '../provider/provideCols';
import { useThrottle } from '../composables/useThrottle';

const gapTime = 16.666;

const props = defineProps<{
	leftWidth: number
}>();

const emit = defineEmits<{
	(e: "scroll", scrolledY: number): void
}>();

const cols = provideCols();
const { colWidth } = provideConfig();

const scrollContainer = ref<HTMLElement | null>(null);

const handleScroll = useThrottle(() => {
	if (scrollContainer.value) {
		const scrollLeft = scrollContainer.value.scrollLeft;
		// console.log('滚动位置:', scrollTop);
		// // 在这里可以处理滚动逻辑，例如调整其他内容的位置
		emit('scroll', scrollLeft)
	}
}, gapTime);
</script>
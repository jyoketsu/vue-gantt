<template>
	<div v-if="project.startDate && project.endDate && project.endDate > startDate!" class="absolute" :style="{
		top: `${rowHeight! * 0.1}px`,
		left: `${xStart}px`,
		width: `${xEnd - xStart}px`,
		height: `${rowHeight! * 0.8}px`,
		lineHeight: `${rowHeight! * 0.8}px`,
		background: project.background || defaultBackground,
		color: project.color || defaultColor,
	}">
		<span class="text-sm px-2">{{ project.name }}</span>
	</div>
</template>
<script setup lang="ts">
import { Project } from '../../types';
import provideConfig from '../../provider/provideConfig';
import { onMounted, ref, toRefs, watch } from 'vue';
import useTime2Position from '../../composables/useTime2Position';
import { getDefaultStyle } from '../../util';

const props = defineProps<{
	project: Project
}>();

const { startDate, endDate, colWidth, rowHeight } = provideConfig();

const { project } = toRefs(props)
const xStart = ref(0)
const xEnd = ref(0)
const defaultBackground = ref('');
const defaultColor = ref('');

watch([startDate, endDate, colWidth, project], () => {
	xStart.value = useTime2Position(project.value.startDate);
	xEnd.value = useTime2Position(project.value.endDate);
}, { deep: true, immediate: true })

onMounted(() => {
	if (!project.value.background || !project.value.color) {
		const style = getDefaultStyle();
		defaultBackground.value = style.background;
		defaultColor.value = style.color;
	}
})
</script>
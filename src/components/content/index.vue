<template>
	<div class="w-fit">
		<VerticalDivider :workdays="props.workdays" />
	</div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { Gantt } from '../../types';
import { computed } from 'vue';
import VerticalDivider from './VerticalDivider.vue';


const props = defineProps<{ workdays: dayjs.Dayjs[]; data: Gantt[] }>()


</script>
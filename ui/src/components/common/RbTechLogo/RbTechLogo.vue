<template>
	<div
		:style="{
			width: `${width}px`,
			height: `${height}px`
		}"
	>
		<img :src="getImageSrc()" class="h-full w-full" />
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
	height: {
		type: Number,
		default: 48
	},
	width: {
		type: Number,
		default: 48
	},
	tech: {
		type: String as PropType<'go'>,
		required: true
	}
});

const getImageSrc = () => {
	switch (props.tech) {
		case 'go':
			return `/images/tech/go.svg`;
	}
};
</script>

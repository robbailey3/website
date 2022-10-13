<template>
	<component
		:is="is"
		:class="{
			grow,
			shrink
		}"
	>
		<slot></slot>
	</component>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
	is: {
		type: String as PropType<'div'>,
		default: 'div'
	},
	grow: {
		type: Boolean,
		default: false
	},
	shrink: {
		type: Boolean,
		default: false
	}
});
</script>

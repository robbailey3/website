<template>
	<component :is="is" class="container mx-auto"></component>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
	is: {
		type: String as PropType<'div' | 'section'>,
		default: 'div'
	}
});
</script>

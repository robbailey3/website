<template>
	<component :is="is" class="rounded shadow">
		<slot></slot>
	</component>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

defineProps({
	is: {
		type: String as PropType<'div' | 'aside' | 'article'>,
		default: 'div'
	}
});
</script>

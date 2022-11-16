<template>
	<span
		class="bg-blue-200 text-gray-800 px-2 py-1 text-sm rounded"
		:class="{
			block
		}"
		><slot></slot
	></span>
</template>

<script lang="ts" setup>
defineProps({
	block: {
		type: Boolean,
		default: false
	}
});
</script>

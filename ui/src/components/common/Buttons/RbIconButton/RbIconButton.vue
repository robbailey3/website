<template>
	<button
		class="rounded-full border-none bg-transparent hover:bg-slate-50 hover:bg-opacity-30 p-2 leading-none"
		@click="emit('click')"
	>
		<font-awesome-icon :icon="icon"></font-awesome-icon>
	</button>
</template>

<script lang="ts" setup>
defineProps<{
	icon: string;
}>();

const emit = defineEmits(['click']);
</script>

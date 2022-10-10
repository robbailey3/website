<template>
	<button
		class="bg-transparent h-12 w-12 flex items-center py-4 px-2 flex-col justify-between relative z-50 m-4 rounded-full duration-200 hover:bg-gray-300"
		@click="toggleNavigation"
	>
		<span class="sr-only">Toggle Menu</span>
		<span
			class="h-0.5 w-full relative bg-black duration-200"
			:class="{ 'translate-y-2 rotate-45': model }"
		></span>
		<span
			class="h-0.5 w-full relative bg-black duration-200"
			:class="{ 'opacity-0': model }"
		></span>
		<span
			class="h-0.5 w-full relative bg-black duration-200"
			:class="{ '-translate-y-1.5 -rotate-45': model }"
		></span>
	</button>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';

const props = defineProps<{ modelValue: boolean }>();

const emits = defineEmits(['update:modelValue']);

const model = useVModel(props, 'modelValue', emits);

const toggleNavigation = () => {
	model.value = !model.value;
};
</script>

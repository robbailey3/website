<template>
	<div v-if="open">
		<div
			class="fixed top-0 left-0 w-full h-full bg-neutral-50 opacity-5"
			data-test="backdrop"
			@click="close"
		></div>
		<div
			class="bg-neutral-800 fixed top-1/2 left-1/2 transform -tranneutral-x-1/2 -tranneutral-y-1/2 rounded-lg overflow-hidden w-1/2 max-w-2xl shadow-xl"
		>
			<div class="bg-neutral-600 bg-opacity-5 p-4 flex">
				<slot name="header"></slot>
				<div class="ml-auto">
					<RbIconButton
						data-test="close-button"
						icon="fa-solid fa-xmark"
						@click="close"
					/>
				</div>
			</div>
			<div class="p-4">
				<slot name="content"></slot>
			</div>
			<div class="bg-neutral-600 bg-opacity-5 p-4 flex justify-end">
				<slot name="buttons"></slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
defineProps<{
	open: boolean;
}>();

const emit = defineEmits(['close']);

const close = () => {
	emit('close');
};
</script>

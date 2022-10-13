<template>
	<button :class="[getButtonVariantClass(), getButtonSizeClass()]">
		<slot></slot>
	</button>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { ButtonSize } from './buttonSize';
import { ButtonVariant } from './buttonVariant';

defineProps({
	variant: {
		type: String as PropType<ButtonVariant>,
		default: 'primary'
	},
	size: {
		type: String as PropType<ButtonSize>,
		default: 'md'
	}
});

const getButtonVariantClass = () => {
	return 'bg-blue';
};

const getButtonSizeClass = () => {
	return 'p-4';
};
</script>

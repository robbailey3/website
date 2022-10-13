<template>
	<button
		:class="[getButtonVariantClass(), getButtonSizeClass(), getRoundedClass()]"
		:type="type"
		:disabled="disabled"
	>
		<template v-if="icon">
			<font-awesome-icon :icon="icon"></font-awesome-icon>
		</template>
		<slot></slot>
	</button>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { ButtonSize } from './buttonSize';
import { ButtonVariant } from './buttonVariant';

const props = defineProps({
	type: {
		type: String as PropType<'button' | 'submit' | 'reset'>,
		default: 'button'
	},
	variant: {
		type: String as PropType<ButtonVariant>,
		default: 'primary'
	},
	size: {
		type: String as PropType<ButtonSize>,
		default: 'md'
	},
	icon: {
		type: String,
		default: undefined
	},
	disabled: {
		type: Boolean,
		default: false
	},
	rounded: {
		type: Boolean,
		default: false
	}
});

const getButtonVariantClass = () => {
	return 'bg-blue-500';
};

const getButtonSizeClass = () => {
	return 'p-4';
};

const getRoundedClass = () => {
	if (props.rounded) {
		return 'rounded-full';
	}
	return 'rounded';
};
</script>

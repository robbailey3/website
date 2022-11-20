<template>
	<a
		class="duration-300"
		:class="[getButtonVariantClass(), getButtonSizeClass(), getRoundedClass()]"
		:disabled="disabled"
		:href="href"
	>
		<template v-if="icon">
			<font-awesome-icon :icon="icon"></font-awesome-icon>
		</template>
		<slot></slot>
	</a>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { ButtonSize } from '../buttonSize';
import { ButtonVariant } from '../buttonVariant';

const props = defineProps({
	href: {
		type: String,
		required: true
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
	switch (props.variant) {
		default:
			return 'bg-blue-400 hover:bg-blue-500';
	}
};

const getButtonSizeClass = () => {
	switch (props.size) {
		case 'xs':
			return 'px-1 py-0.5';
		case 'sm':
			return 'px-2 py-1';
		case 'md':
			return 'px-4 py-2';
		case 'lg':
			return 'px-6 py-3';
		case 'xl':
			return 'px-8 py-4';
	}
};

const getRoundedClass = () => {
	if (props.rounded) {
		return 'rounded-full';
	}
	return 'rounded';
};
</script>

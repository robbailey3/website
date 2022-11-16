<template>
	<component
		:is="is"
		class="flex"
		:class="[
			getAlignClass(),
			getJustifyClass(),
			{
				'flex-wrap': wrap,
				'flex-col': column
			}
		]"
		><slot></slot
	></component>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

const props = defineProps({
	is: {
		type: String as PropType<'div' | 'section'>,
		default: 'div'
	},
	column: {
		type: Boolean,
		default: false
	},
	wrap: {
		type: Boolean,
		default: false
	},
	align: {
		type: String as PropType<
			'start' | 'end' | 'center' | 'baseline' | 'stretch'
		>,
		default: ''
	},
	justify: {
		type: String as PropType<
			'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
		>,
		default: ''
	}
});

const getAlignClass = () => {
	switch (props.align) {
		case 'start':
			return 'items-start';
		case 'end':
			return 'items-end';
		case 'center':
			return 'items-center';
		case 'baseline':
			return 'items-baseline';
		case 'stretch':
			return 'items-stretch';
		default:
			return '';
	}
};

const getJustifyClass = () => {
	switch (props.justify) {
		case 'start':
			return 'justify-start';
		case 'end':
			return 'justify-end';
		case 'center':
			return 'justify-center';
		case 'between':
			return 'justify-between';
		case 'around':
			return 'justify-around';
		case 'evenly':
			return 'justify-evenly';
		default:
			return '';
	}
};
</script>

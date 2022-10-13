<template>
	<component
		:is="is"
		class="flex"
		:class="[
			getFlowDirectionClass(),
			getFlowWrapClass(),
			getAlignClass(),
			getJustifyClass()
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
	direction: {
		type: String as PropType<'row' | 'row-reverse' | 'col' | 'col-reverse'>,
		default: undefined
	},
	wrap: {
		type: String as PropType<'wrap' | 'nowrap' | 'wrap-reverse'>,
		default: undefined
	},
	align: {
		type: String as PropType<
			'start' | 'end' | 'centre' | 'baseline' | 'stretch'
		>,
		default: ''
	},
	justify: {
		type: String as PropType<
			'start' | 'end' | 'centre' | 'between' | 'around' | 'evenly'
		>,
		default: ''
	}
});

const getFlowDirectionClass = () => {
	switch (props.direction) {
		case 'row':
			return 'flex-row';
		case 'row-reverse':
			return 'flex-row-reverse';
		case 'col':
			return 'flex-col';
		case 'col-reverse':
			return 'flex-col-reverse';
		default:
			return '';
	}
};

const getFlowWrapClass = () => {
	switch (props.wrap) {
		case 'wrap':
			return 'flex-wrap';
		case 'nowrap':
			return 'flex-nowrap';
		case 'wrap-reverse':
			return 'flex-wrap-reverse';
	}
};

const getAlignClass = () => {
	switch (props.align) {
		case 'start':
			return 'items-start';
		case 'end':
			return 'items-end';
		case 'centre':
			return 'items-centre';
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
		case 'centre':
			return 'justify-centre';
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

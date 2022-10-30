import { describe, expect, it } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import { wrap } from 'module';
import RbModal from './RbModal.vue';

describe('[COMPONENT]: RbModal', () => {
	let wrapper: VueWrapper;
	const createWrapper = () => {
		wrapper = shallowMount(RbModal);
	};
});

import { describe, expect, it } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import RbModal from './RbModal.vue';

describe('[COMPONENT]: RbModal', () => {
	const createWrapper = (props: { open: boolean } = { open: false }) => {
		return shallowMount(RbModal, {
			propsData: {
				open: props.open
			}
		});
	};

	it('should emit a close event when the backdrop is clicked', () => {
		const wrapper = createWrapper({ open: true });

		wrapper.find('[data-test="backdrop"]').trigger('click');

		expect(wrapper.emitted('close')).toBeTruthy();
	});

	it('should emit a close event when the close button is clicked', () => {
		const wrapper = createWrapper({ open: true });

		wrapper.find('[data-test="close-button"]').trigger('click');

		expect(wrapper.emitted('close')).toBeTruthy();
	});
});

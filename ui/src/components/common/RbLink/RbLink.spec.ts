import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import RbLink from './RbLink.vue';

describe('[COMPONENT]: RbLink', () => {
	const createWrapper = (
		props: {
			href: string;
			target?: '_blank' | '_parent' | '_self' | '_top';
			rel?: string;
		},
		content: string = 'Link'
	) => {
		return shallowMount(RbLink, {
			propsData: props,
			slots: {
				default: content
			}
		});
	};
	it('should render an anchor element', () => {
		const wrapper = createWrapper({ href: '' });

		expect(wrapper.find('a').exists()).toBe(true);
	});

	it('should pass the href from props into the anchor element', () => {
		const wrapper = createWrapper({ href: 'https://example.com' });

		expect(wrapper.find('a').attributes('href')).toBe('https://example.com');
	});

	it('should pass the target from props into the anchor element', () => {
		const wrapper = createWrapper({
			href: 'https://example.com',
			target: '_blank'
		});

		expect(wrapper.find('a').attributes('target')).toBe('_blank');
	});

	it('should pass the rel from props into the anchor element', () => {
		const wrapper = createWrapper({
			href: 'https://example.com',
			rel: 'noopener'
		});

		expect(wrapper.find('a').attributes('rel')).toBe('noopener');
	});
});

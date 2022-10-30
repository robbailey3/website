// Button.stories.js
import { action } from '@storybook/addon-actions';
import RbModal from './RbModal.vue';

const actions = {
	close: action('close')
};

const Template = (args: { open: boolean; close: () => void }) => ({
	title: 'Example/Modal',
	components: { RbModal },
	setup() {
		return { args, ...actions };
	},
	template: `<rb-modal v-bind="args" @close="close"><template #header>Header</template><template #content>Body</template><template #buttons>Footer</template></rb-modal>`,
	parameters: {
		actions: {
			handles: ['mouseover', 'click .btn', 'close']
		}
	}
});

export const Default = Template.bind({});

export default {
	title: 'Common/Modal',
	component: RbModal,
	args: { open: false }
};

import '../src/style.css';

import { setup } from '@storybook/vue3';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import '../src/icon-library';

setup((app) => {
	app.component('font-awesome-icon', FontAwesomeIcon);
});

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/
		}
	}
};

import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { router } from './router';
import { createPinia } from 'pinia';
import { MotionPlugin } from '@vueuse/motion';

import './icon-library';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const pinia = createPinia();

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(MotionPlugin);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');

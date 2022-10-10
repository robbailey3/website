import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { router } from './router';
import { createPinia } from 'pinia';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

/* add icons to the library */
library.add(faGithub, faTwitter);

const pinia = createPinia();

const app = createApp(App);

app.use(router);
app.use(pinia);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');

import { createRouter, createWebHistory } from 'vue-router';
import Homepage from './pages/Homepage/Homepage.vue';
import Login from './pages/auth/Login.vue';
import Dashboard from './pages/admin/Dashboard.vue';
import firebase from './services/firebase';
import BlogPage from '@pages/blog/BlogPage.vue';
import PhotosPage from '@pages/photos/PhotosPage.vue';
import CvPage from '@pages/cv/CvPage.vue';

const routes = [
	{ path: '/', component: Homepage },
	{ path: '/login', component: Login },
	{ path: '/admin', component: Dashboard },
	{ path: '/blog', component: BlogPage },
	{ path: '/photos', component: PhotosPage },
	{ path: '/cv', component: CvPage },
	{
		path: '/projects',
		component: () => import('@pages/projects/ProjectsPage.vue')
	}
];

export const router = createRouter({
	history: createWebHistory(),
	routes
});

router.beforeEach((to, from, next) => {
	if (to.path.includes('admin')) {
		if (!firebase.isLoggedIn()) {
			return next('/login');
		}
	}
	return next();
});

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Homepage from '@pages/Home/HomePage/HomePage.vue';
import Login from '@pages/auth/LoginPage/LoginPage.vue';
import Dashboard from '@pages/admin/AdminDashboardPage/AdminDashboardPage.vue';
import firebase from '@services/firebase';
import BlogPage from '@pages/blog/BlogPage.vue';
import PhotosPage from '@pages/photos/PhotosPage.vue';
import CvPage from '@pages/cv/CvPage.vue';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: Homepage,
		meta: {
			title: 'Rob Bailey: Software Engineer'
		}
	},
	{
		path: '/login',
		component: Login,
		meta: {
			title: 'Login | Rob Bailey'
		}
	},
	{
		path: '/admin',
		component: Dashboard,
		meta: { title: 'Admin Dashboard | Rob Bailey' }
	},
	{ path: '/blog', component: BlogPage, meta: { title: 'Blog | Rob Bailey' } },
	{
		path: '/photos',
		component: PhotosPage,
		meta: { title: 'Photos | Rob Bailey' }
	},
	{ path: '/cv', component: CvPage, meta: { title: 'CV | Rob Bailey' } },
	{
		path: '/projects',
		component: () => import('@pages/projects/ProjectsPage.vue'),
		meta: { title: 'Projects | Rob Bailey' }
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

router.afterEach((to) => {
	document.title = <string>to.meta?.title || 'Rob Bailey: Software Engineer';
});

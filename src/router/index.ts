import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { bus } from '../main';
//import Home from '../views/Home.vue'

Vue.use(VueRouter);

function guardOffline(to: any, from: any, next: any) {
	if (localStorage.getItem('isAuthenticated')=='true')
		next();
	else 
		next('/login'); 
}


function guardOnline(to: any, from: any, next: any) {
	if (localStorage.getItem('isAuthenticated')=='true')
		next('/home');
	else 
		next(); 
}


const routes: Array<RouteConfig> = [
	{
		path: '/',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '@/views/Index.vue'),
		children: [

			{
				name: 'Home',
				path: '/home',
				component: () => import('@/views/pages/Showcase.vue')
			},
			{
				name: 'Login',
				path: '/login',
				component: () => import('@/views/pages/Login.vue'),
				beforeEnter : guardOnline
			},
			{
				name: 'Profile',
				path: '/profile',
				component: () => import('@/views/pages/Profile.vue'),
				beforeEnter : guardOffline
			},
			{
				name: 'Shop',
				path: '/shop',
				component: () => import('@/views/pages/Shop.vue'),
				beforeEnter : guardOffline
			},
			{
				name: 'Social',
				path: '/social',
				component: () => import('@/views/pages/Social.vue'),
				beforeEnter : guardOffline
			},
			{
				name: 'Chat',
				path: '/chat',
				component: () => import('@/views/pages/Chat.vue'),
				beforeEnter : guardOffline
			}
		]
	},

];

const isElectron: boolean = false; //String(process.env.IS_WEB).trim()
const router = new VueRouter({
	mode: isElectron ? 'hash' : 'history', // hash mode for electron
	base: process.env.BASE_URL,
	routes
});


export default router;

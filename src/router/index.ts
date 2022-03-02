import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { bus } from '../main';
import store from '@/store/index';
//import Home from '../views/Home.vue'

Vue.use(VueRouter);

function guardOffline(to: any, from: any, next: any) {
	let isAuthenticated = false;
	//this is just an example. You will have to find a better or 
	// centralised way to handle you localstorage data handling 
	if (localStorage.getItem('isAuthenticated'))
		isAuthenticated = true;
	else
		isAuthenticated = false;
	if (isAuthenticated) {
		next(); // allow to enter route
	}
	else {
		next('/login'); // go to '/login';
	}
}


function guardOnline(to: any, from: any, next: any) {
	let isAuthenticated = false;
	//this is just an example. You will have to find a better or 
	// centralised way to handle you localstorage data handling 
	if (localStorage.getItem('isAuthenticated'))
		isAuthenticated = true;
	else
		isAuthenticated = false;
	if (isAuthenticated) {
		next('/listPost'); // allow to enter route
	}
	else {
		next(); // go to '/login';
	}
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
				component: () => import('@/views/pages/Login.vue')
			},
			{
				name: 'Profile',
				path: '/profile',
				component: () => import('@/views/pages/Profile.vue')
			}
		]
	},
	{
		path: '/',
		redirect: '/home'
	},
	{
		path: '*',
		redirect: '/home'
	},
];

const isElectron: boolean = false; //String(process.env.IS_WEB).trim()
const router = new VueRouter({
	mode: isElectron ? 'hash' : 'history', // hash mode for electron
	base: process.env.BASE_URL,
	routes
});


export default router;

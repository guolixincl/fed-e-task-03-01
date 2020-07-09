import Vue from 'vue'
import VueRouter from './vue-router'
import Default from '../components/Default.vue'
Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: Default
	},
	{
		path: '/about',
		component: () => import('../components/About.vue')
	}
]

export default new VueRouter(routes)

import Vue from 'vue'
import Router from './router'
import Default from '../components/Default.vue'
import About from '../components/About.vue'

Vue.use(Router)

const routes = [
	{
		path: '/',
		component: Default
	},
	{
		path: '/about',
		component: About
	}
]

export default new Router(routes)

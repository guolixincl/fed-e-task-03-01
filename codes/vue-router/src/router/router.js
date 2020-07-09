let _vue = null
export default class Router {
	// 维护路由与组件的映射
	// 监听hash update事件
	// 根据路由替换组件
	constructor(options) {
		this.options = options || []
		this.data = _vue.observable({
			current: '/'
		})
		this.routeMap = {}
	}

	static install(Vue) {
		// 判断是否已安装
		if (Router.install.installed) return
		Router.install.installed = true

		// 保存Vue
		_vue = Vue

		// 给vue所有实例挂载router实例
		_vue.mixin({
			beforeCreate() {
				if (this.$options.router) {
					_vue.prototype.$router = this.$options.router
					this.$options.router.init()
				}
			}
		})
	}

	init() {
		this.initEvent()
		this.initComponents(_vue)
		this.createRouteMap()
	}

	initEvent() {
		window.addEventListener('load', () => {
			this.setCurrentRoute(window.location.href)
		})

		window.addEventListener('hashchange', (event) => {
			const newURL = event.newURL
			this.setCurrentRoute(newURL)
		})
	}

	setCurrentRoute(url) {
		const hashIndex = url.indexOf('#')
		if (hashIndex > -1) {
			const route = url.substring(hashIndex + 1)
			this.data.current = route
		}
	}

	// 创建路由路径与组件的映射
	createRouteMap() {
		this.options.forEach((route) => {
			const key = route.path
			this.routeMap[key] = route
		})
	}

	initComponents(Vue) {
		Vue.component('router-link', {
			props: {
				to: String
			},
			render(h) {
				return h(
					'a',
					{
						attrs: {
							href: '#' + this.to
						}
					},
					[ this.$slots.default ]
				)
			}
			// template: '<a :href="to"><slot></slot></a>'
		})

		const _this = this
		Vue.component('router-view', {
			render(h) {
				const current = _this.data.current
				const component = _this.routeMap[current].component
				return h(component)
			}
		})
	}
}

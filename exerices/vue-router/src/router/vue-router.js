/**
 * URL 里#
 * 监听onhashChange
 * 用对应的组件渲染
 */
class VueRouter {
	constructor(routes) {
		this.routes = routes
	}
	static install(Vue) {
		// 1. 判断是否已安装
		if (VueRouter.install.installed) {
			return
		}

		VueRouter.install.installed = true
		// 2. 把vue构造函数注册到全局变量
		// 3. 注册到vue实例
	}
}

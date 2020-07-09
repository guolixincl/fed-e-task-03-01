class Vue {
	constructor(options) {
		// 1. 通过属性保存选项的数据
		this.$options = options || {}
		this.$data = options.data || {}
		this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el

		// 2. 把data中数据转换成getter和setter，注入到vue实例
		this._proxyData(this.$data)

		// 3. 用observer对象监听数据变化
		new Observer(this.$data)

		// 4. 用compiler对象解析指令表达式
		new Compiler(this)
	}

	_proxyData(data) {
		Object.keys(data).forEach((key) => {
			Object.defineProperty(this, key, {
				enumerable: true,
				configurable: true,
				get() {
					return data[key]
				},
				set(newValue) {
					if (newValue === data[key]) return
					data[key] = newValue
				}
			})
		})
	}
}

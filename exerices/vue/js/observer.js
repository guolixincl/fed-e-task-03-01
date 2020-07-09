class Observer {
	constructor(data) {
		this.walk(data)
	}

	walk(data) {
		// 1. 判断是否为对象
		if (!data || typeof data !== 'object') return

		// 2. 遍历data对象的所有属性
		Object.keys(data).forEach((key) => {
			this.defineReactive(data, key, data[key])
		})
	}

	defineReactive(obj, key, value) {
		const self = this
		// 负责收集依赖并发送通知
		let dep = new Dep()

		// 如果value为对象，把对象内属性也转换成响应式
		self.walk(value)
		Object.defineProperty(obj, key, {
			enumerable: true,
			configurable: true,
			get() {
				// 收集依赖
				Dep.target && dep.addSub(Dep.target)
				return value
			},
			set(newValue) {
				if (newValue === value) {
					return
				}
				value = newValue

				// 新值如果是对象，把对象内属性变成响应式
				self.walk(newValue)

				// 发送通知
				dep.notify()
			}
		})
	}
}

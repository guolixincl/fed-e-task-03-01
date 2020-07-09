class Compiler {
	constructor(vm) {
		this.el = vm.$el
		this.vm = vm
		this.compile(this.el)
	}

	// 编译模板，处理文本节点和元素节点
	compile(el) {
		let childNodes = el.childNodes
		Array.from(childNodes).forEach((node) => {
			if (this.isTextNode(node)) {
				this.compileText(node)
			} else if (this.isElementNode(node)) {
				this.compileElement(node)
			}

			if (node.childNodes && node.childNodes.length) {
				this.compile(node)
			}
		})
	}

	// 编译元素节点，处理指令
	compileElement(node) {
		// 遍历所有属性
		Array.from(node.attributes).forEach((attr) => {
			if (this.isDirective(attr.name)) {
				let attrName = attr.name.substr(2)
				let isEvent = this.isEvent(attrName)
				if (isEvent) {
					let event = attrName.substr(attrName.indexOf(':') + 1)
					let handler = attr.value
					this.eventUpdate(node, event, handler)
				} else {
					let key = attr.value
					this.update(node, key, attrName)
				}
			}
		})
	}

	// 调用指令对应
	update(node, key, attrName) {
		let updateFn = this[attrName + 'Updater']
		updateFn && updateFn.call(this, node, key, this.vm[key])
	}

	// 处理v-text指令
	textUpdater(node, key, value) {
		node.textContent = value

		new Watcher(this.vm, key, (newValue) => {
			node.textContent = newValue
		})
	}

	// 处理v-model指令
	modelUpdater(node, key, value) {
		node.value = value

		new Watcher(this.vm, key, (newValue) => {
			node.value = newValue
		})

		// 双向绑定
		node.addEventListener('input', () => {
			this.vm[key] = node.value
		})
	}

	// 处理v-html指令
	htmlUpdater(node, key, value) {
		node.innerHTML = value

		new Watcher(this.vm, key, (newValue) => {
			node.innerHTML = newValue
		})
	}

	// 处理v-on指令
	eventUpdate(node, event, method) {
		method = method.trim()
		const bracketIndex = method.indexOf('(')
		const methodName = bracketIndex > -1 ? method.substr(0, method.indexOf('(')) : method
		const isVMMethod = this.vm.$options.methods[methodName]
		let handler = isVMMethod ? this.vm.$options.methods[methodName] : eval(method)
		node.addEventListener(event, handler)
	}

	// 编译文本节点，处理插值表达式
	compileText(node) {
		let reg = /\{\{(.+?)\}\}/
		let value = node.textContent
		if (reg.test(value)) {
			let key = RegExp.$1.trim()
			node.textContent = value.replace(reg, this.vm[key])

			// 创建watcher对象，更新属兔
			new Watcher(this.vm, key, (newValue) => {
				node.textContent = newValue
			})
		}
	}

	// 判断元素属性是否是指令
	isDirective(attrName) {
		return attrName.startsWith('v-')
	}

	// 是否为事件指令
	isEvent(directive) {
		return directive.indexOf(':') > -1
	}

	// 判断节点是否是文本节点
	isTextNode(node) {
		return node.nodeType === 3
	}

	// 判断节点是否是元素节点
	isElementNode(node) {
		return node.nodeType === 1
	}
}

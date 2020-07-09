import { h, init } from 'snabbdom'

// 1. Hello World
// 参数：模块数组
// 返回值：patch函数，用于对比两个vnode的差异并更新到真实DOM
const patch = init([])
// 第一个参数： 标签+选择器
// 第二个参数： 如果是字符串就是标签的内容
let vnode = h('div#container.cls', 'Hello World')
let app = document.querySelector('#app')

// 第一个参数： vnode或真实dom，内部会自动转换成vnode
// 第二个参数， vnode
// 返回值：VNode
let oldNode = patch(app, vnode)

// 更新node
vnode = h('div', 'Hello snabbdom')
oldNode = patch(oldNode, vnode)

// 2. 创建子元素
setTimeout(() => {
	vnode = h('div', [ h('h1', 'Title'), h('p', 'Hello') ])
	patch(oldNode, vnode)
}, 5000)

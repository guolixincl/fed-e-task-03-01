import { h, init } from 'snabbdom'
// 1. 导入模块
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'
// 2. 注册模块
let patch = init([ style, eventlisteners ])
// 3. h()函数第二个参数传入模块的数据
let vnode = h(
	'div',
	{
		style: {
			backgroundColor: 'red'
		},
		on: {
			click: () => {
				console.log('clicked')
			}
		}
	},
	'Hello'
)

let app = document.querySelector('#app')
patch(app, vnode)

# vue part 1
## 基础结构
两种呈现方式： el vs mount(el)
```html
<div id="#app">
    <p>{{ company.name }}</p>
    <p>{{ company.address }}</p>
</div>
<script>
  new Vue({
    el: '#app',
    data: {
      company: {
        name: 'IDS',
        address: 'Beijing China'
      }
    }
  })
</script>
```
```html
<div id="#app">
</div>
<script>
  new Vue({
    data: {
      company: {
        name: 'IDS',
        address: 'Beijing China'
      }
    },
    render(h) {
      return h('div', [
        h('p', this.company.name),
        h('p', this.company.address)
      ])
    }
  }).mount('#app')
</script>
```

## 生命周期
![生命周期图示](https://cn.vuejs.org/images/lifecycle.png)
Vue实例化过程
### 第一阶段：创建VUE实例
1. 初始化：事件、生命周期相关函数、h函数等
2. beforeCreate
3. 初始化：props、data、method、响应式
4. created

### 第二阶段：创建VDOM
将模板编译成render函数，render负责创建虚拟DOM
1. 判断是否有el选项，没有则调用vm.mount(el)
2. 判断是否有template选项，是：则将template编译到render函数；否：则将el外部的HTML作为template编译到render函数

### 第三阶段：挂载DOM
1. beforeMount： 无法获取新DOM内容
2. 创建vm.$el替换el
3. mounted：挂载完成，可获取新DOM

### 第四阶段：更新数据
1. beforeUpdate
2. 新旧VDOM对比，将差异渲染到DOM
3. updated

### 第五阶段：销毁
调用vm.$destry()时销毁实例
1. beforeDestroy
2. 销毁：解除绑定、事件监听、子组件等
3. destroyed

**备注**
如果是单文件组件，模板编译是在打包过程完成，避免运行时的编译

## 主要语法
1. 差值表达式
2. 指令
3. 计算属性和监听器
4. Class和Style
5. 条件渲染和列表渲染
6. 表单输入绑定
7. 组件
8. 插槽
9. 插件
10. 混入
11. 响应式原理
12. 不同构建版本的VUE：是否带编译器等
# 郭丽新 | Part 03 | Module 01
## 一、简答题
### 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。
``` javascript
let vm = new Vue({
 el: '#el'
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler () {
   // 该 name 属性是否是响应式的
   this.dog.name = 'Trump'
  }
 }
})
```
答案： 动态增加的成员不具有响应式。可以调用$set()实例函数将数据变为响应式。   
当给data赋值时，Vue实例过程中会自动遍历data的所有属性使用observer将其修改为响应式，若data属性值是对象，也会自动变为响应式。 但如果是后期动态增加的，vue并没有办法对其进行拦截，只能通过主动调用set函数使其调用observer将其新增对象变为响应式

### 2. 简述diff算法过程
1. diff只对同级节点进行比较，判断是否为相同节点，比如比较key值等
2. 如果新旧节点不同，则创建新节点删除旧节点
3. 如果相同，判断是否为文本节点，若文本有更新则替换新文本
4. 如果为非文本节点，则查找子节点的差异并替换

## 二、代码题
### 1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。

见 /codes/vue-router
 

### 2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。
见 /codes/vue

### 3、参考 Snabbdom 提供的电影列表的示例，实现类似的效果，如图：
见 /codes/vue-router/compoents/Default.vue
# Vue Router

## 使用方法
1. 注册组件
   Vue.use(VueRouter)

2. 路由规则
   const routers = [
     {
       path: '/my',
       name: 'my',
       component: MyComp
     }
   ]
   
3. 路由实例
   new VueRouter(router)

4. 注册路由
   new Vue({ router })

**发生了什么**
运行时，vue示例增加两个变量:   
$route: (Object) 路由规则   
$router: (VueRouter)

5. 使用路由
   <router-view>：组件替换站位符
   <router-link>: 创建连接

## 基础概念
1. 动态路由及参数传递
``` javascript
   {
     path: '/detail/:id',
     component: () => import('./detail.vue')
   }
   // detail.vue获取参数
   $route.params.id  
```
``` javascript
   {
     path: '/detail/:id',
     props: true,  // url参数转换成vue组件的props
     component: () => import('./detail.vue')
   }
   // detail.vue获取参数
   props: ['id']
```

2. 嵌套路由
``` javascript
const route = [
  {
    path: '/',
    component: Layout,
    children: {
      path: '/detail',
      component: Index
    }
  }
]
```

## 编程式导航
利用`this.$router`的函数: push, replace, go

## 导航模式
hash： 基于锚点，以onhashChange事件
history： 基于HTML5的History API。 IE10以后可用
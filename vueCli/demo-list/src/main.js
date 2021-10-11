//导入vue这个包，得到Vue构造函数
import Vue from 'vue'
// 导入App.vue根组件，景来把App.vue中的模板结构，渲染到HTML页面中
//import App from './App.vue'
import App from './Test.vue'

Vue.config.productionTip = false

// 创建Vue实例对象

// new Vue({
//   el:"#app",
//   // 把render函数指定的组件渲染到HTML页面中
//   render: h => h(App),
// })

new Vue({
  // 把render函数指定的组件渲染到HTML页面中
  render: h => h(App),
}).$mount('#app')
//Vue实例的$mount()方法 作用和el属性完全一样

# Vue专题
## 1. Vue简介
### 1.1 什么是Vue
> - 构建用户界面
> 	- 用vue往html页面中填充数据，非常方便
> - 框架
> 	- 框架是一套现成的解决方案，程序员只能遵守框架的规范，去编写自己的业务功能
> 	- 要学习vue,就是要学习vue框架中规定的用法
> 	- vue的指令、组件（是对UI结构的复用）、路由、Vuex、vue组件库
> 	- 只有掌握上述的内容，才有开发vue项目的能力
### 1.2 Vue框架的特性（最重要的是数据）
 - 数据驱动视图
	- 数据的变化会驱动视图自动更新
	- 好处：程序只管把数据维护好，那么页面结构会被vue自动渲染出来
 - 双向数据绑定
	- 网页中，form表单负责采集数据，ajax负责提交数据
	- JS数据的变化会自动渲染到页面
	- 页面上表单采集的数据发生变化时，会被vue自动获取到，并更新到js数据中
	- 好处：开发者不再需要手动操作DOM元素，来获取表单元素的最新的值
> 注意：数据驱动视图和双向数据绑定的底层原理是MVVM（Model数据源，View视图，ViewModel就是vue实例）
## 2. Vue基本使用
### 2.1 基本使用步骤
	- 导入Vue的库文件，在window全局就有了Vue这个构造函数
	- 创建vue的实例
### 2.2 指令（Directives）
> 指令是vue为开发者提供的模板语法，用于辅助开发者渲染页面的基本结构,
> 记住，指令内部“”内写JS代码
Vue中指令按照不同的用途可以分为一下6类：
- 1. 内容渲染指令
	- 输出纯文本
		- v-text： 缺点会覆盖元素内部原有的默认值
		- {{}}插值表达式【英文名为：Mustache,**在实际开发中用得最多**，只是占位符，不会覆盖原有的内容
			- 插值
	- 输出可以渲染标签
		- v-html指令的作用，可以把带有标签的字符串渲染成真正的HTML内容

- 2. 属性绑定指令
	- 【注意】{{}}插值表达式，只能用在元素的内容节点中，不能用在属性节点中
	- v-bind: 为元素的属性动态绑定值 这个指令可以简写成:
	- <div :title = "'box' + index">这是一个div</div> 使用v-bind属性绑定期间，“”代表里面写JS语句，如果绑定的内容需要动态拼接，需要写JS语句，如果要写一个字符需要写单引号
- 3. 事件绑定指令
	- v-on 事件绑定指令，辅助程序员为DOM元素绑定事件监听
	- 在绑定时间处理函数的时候，可以用（）来传递参数
	- v-on 指令，可以简写为@
	- 【注意】原生DOM对象有onclick, oninput, onkeyup等原生事件，替换为vue的事件绑定形式后，分别为： v-on:click, v-on:input, v-on:keyup
	- vue提供了内置变量，名字叫事件对象$event(类比DOM中的事件对象e)，如果事件不带（），默认会带事件对象e
	- 事件修饰符
		- event.preventDefault()或者event.stopPropagation()是非常常见的需求，vue提供了事件修饰符的概念辅助程序员更方便对事件的触发进行控制，常用的5个事件修饰符
			- .prevent 阻止默认行为（例如：阻止a链接的跳转，阻止表单的提交）
			- .stop阻止事件冒泡，绑定在作用的元素
	- 按键修饰符：监听键盘事件时，经常需要判断详细的按键，此时可以为键盘相关的事件添加按键修饰符
		- <input @keyup.enter = "submit">
		- <input @keyup.esc = "clear">
		
- 4. 双向绑定指令
	- v-model 在底层封装的时候就监听了value属性，只有表单元素使用v-model才有意义
		- input 
		- textarea
		- select
	- v-model修饰符
		- .number   <input v-model.number="number">
		- .trim     <input v-model.trim="userName">
		- .lazy	在change时update而非input的时候更新	<input v-model.lazy="userName">
- 5. 条件渲染指令（按需控制元素的显示和隐藏）
	- v-if 每次都会动态添加或者删除元素
	- v-show 原理是动态为元素添加样式display:none样式
	- 如果要频繁切换元素的显示，要使用v-show
	- v-if如果初始值是false，即某些元素不需要被展示，而且后期这个元素很可能不需要被显示出来，此时性能更好
	- 在实际开发中，绝大多数情况不需要考虑性能问题，直接使用v-if
- 6. 列表渲染指令v-for
	- v-for指令支持一个可选的第二个参数，
	- 官方建议，只要用到了v-for指令，那么一定要绑定一个:key属性，而且尽量把id作为key的值，官方对key的值得类型是要求的，只能是字符串，或者数字类型
	- key的值是不能重复的，否则终端会报错，Duplicate key

案例
```
<a @click.prevent = "handleClick">点击不跳转</a>

<div @click.prevent = "handleClick">阻止事件冒泡</div>

<div v-if="type==='A'">优秀</div>
<div v-else-if="type==='B'">良好</div>
<div v-else-if="type==='C'>及格</div>
<div v-else>及格</div>
```
### 2.3 过滤器（filters）
####  私有过滤器&全局过滤器
- 全局过滤器：独立于每个vm实例之外
- vue.filter()方法接受两个参数：第一个参数是全局过滤器的名字，第二个参数是全局过滤器的处理函数
```
	Vue.filter('capitalize',(str)=>{
		return str.chartAt(0).toUpperCase() + str.slice(1)
	})
```

**过滤器的注意点**
- 1. 要定义到filters节点下，本质是一个函数
- 2. 在过滤器函数中，一定要return值
- 3. 在过滤器的形参中，就可以获取到“管道符”前面待处理的那个值
- 4. 如果全局过滤器和私有过滤器名字一致，此时按照就近原则，调用的是私有过滤器
- 5. 过滤器可以串联使用
- 6. 【兼容性】Vue3里面没有filter只有vue1.x和vue.2.x里面有
- 7. 过滤器处理函数的参数
	- 如果需要传递多个参数，必须从第二个参数开始，因为第一个参数，永远都是“管道符”前面待处理的值
```
	Vue.filter('filterA',(msg, arg1, arg2)=>{
		//过滤器代码逻辑...
	})
```
### 2.4 Vue基础
#### 2.4.1 侦听器
> 监视数据的变化，侦听器本质是一个函数，要侦听哪个数据的变化，就把数据当做方法名即可。 
- 参数：
	- 新值在前，旧值在后
##### 侦听器的格式
- 方法格式的侦听器
	- 缺点：无法在刚进入页面的时候，自动触发
	- 缺点2： 如果侦听的是一个对象，如果对象中的属性发生了变化，不会触发侦听器
- 对象格式的侦听器
	- 好处： 可以通过immediate选项，让侦听器自动触发！！！
	- 好处2： 可以通过deep选项，让侦听器深度监听对象中的每个属性的变化
```
        watchValue(newVal,oldVal){
            console.log(`newValue ${newVal}, oldValue ${oldVal}`)
        }
```
```
        watchValue:{
            handler(newVal,oldVal){
                console.log(`newValue ${newVal}, oldValue ${oldVal}`)
            },
            // immediate选项的默认值是false
            // immediate的作用是：控制侦听器是否自动触发一次
            immediate: true
        }
```
```
        //如果要侦听的是对象的子属性的变化，则必须包裹一层单引号
        'info.username'(newValue){
            console.log(newValue)
        }
```

#### 2.4.2 计算属性
- 所有的计算属性都要定义在computed节点下
- 特点
	- 计算属性在定义（声明）的时候，要定义成“方法格式”，返回的值就是最终的计算结果
	- 用的时候当属性使用
- 好处：
	-  实现代码的复用
	- 只要计算属性中依赖的数据源变化了，则计算属性会重新求值
#### 2.4.3 vue-cli
#### 2.4.4 vue组件





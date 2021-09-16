import "./css/index.css"  // 导入样式（webpack 中一切皆模块，都可以用ES6导入语法进行导入） 如果用from接受到的成员返回的是undefined,则没有必要接受
import "./css/index.less" 
import logo from "./images/logo.jpg"
//导入的是一个路径，导出的是一个base64的字符串，这样可以减少请求

// let el = document.getElementById('main')
// el.innerHTML = 'Hello Webpack'
let el = document.getElementById('picArea')
el.setAttribute('src',logo)
// 1.定义装饰器函数
function info(targert) {
    // 为目标函数添加属性info
    targert.info = 'Person Info'
}
//3.为Person类应用装饰器
@info
class Person{}
//4. 打印Person的静态属性info
console.log(Person.info)

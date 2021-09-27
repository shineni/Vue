import "@/css/index.css"  // 导入样式（webpack 中一切皆模块，都可以用ES6导入语法进行导入） 如果用from接受到的成员返回的是undefined,则没有必要接受
import "@/css/index.less" 
import logo from "@/images/logo.jpg"
import Vue from 'vue'
import moment from 'moment'
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


const vm = new Vue({
    el:'#app',  // el属性，vm实例控制的区域
    data:{  // data就是要渲染到页面的数据
        list:[],
        productName:'',
        index:0,
        message:'hello vue.js',
        watchValue:'',
    },
    methods:{
        add(){
            if(this.productName!==''){
                let index = this.index++
                let o = {
                    id:index,
                    name:this.productName,
                    status: true,
                    time: moment().format('MM-DD-YYYY LTS'),
                }
                this.list.push(o)
                this.productName=''
            }

        },
        deleteItem(id){
            for(let i = 0; i<this.list.length;i++){
                if(this.list[i].id ===id){
                    this.list.splice(i,1) 
                }
            }

        }
    },
    watch:{
        // watchValue(newVal,oldVal){
        //     console.log(`newValue ${newVal}, oldValue ${oldVal}`)
        // }
        watchValue:{
            handler(newVal,oldVal){
                console.log(`newValue ${newVal}, oldValue ${oldVal}`)
            },
            // immediate选项的默认值是false
            // immediate的作用是：控制侦听器是否自动触发一次
            immediate: true,
            deep:true
        }
        // //如果要侦听的是对象的子属性的变化，则必须包裹一层单引号
        // 'info.username'(newValue){
        //     console.log(newValue)
        // }
    
    },
    filters:{
        capi(val){
            return val.charAt(0).toUpperCase()  + val.slice(1)
        }
    }

})
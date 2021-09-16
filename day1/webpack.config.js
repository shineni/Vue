// 导出一个配置对象
const path = require('path')
const HtmlPulgin = require('html-webpack-plugin')
const htmlPlugin = new HtmlPulgin({
    // 指定要复制的那个页面
    template:'./src/index.html',
    // 指定复制出来的文件名和存放路径
    filename:'./index.html'
})
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const cleanWebpackPlugin = new CleanWebpackPlugin()

module.exports = {
    mode:'development', // development & production
    entry: path.join(__dirname,'./src/index.js'),
    output:{
        path:path.join(__dirname,'./dist'),
        filename: 'js/bundle.js'
    },
    //插件的数组，将来webpack在运行时会加载这些并调用这些插件
    plugins:[htmlPlugin, cleanWebpackPlugin],
    devServer:{
        open:true, //初次打包完成后，自动打开浏览器
        host:'127.0.0.1', // 实时打包所使用的主机地址
        port: 8080, // 实时打包所使用的端口号，http协议中如果端口号是80，则可以被省略
    },
    module:{ //所有第三方文件模块的匹配规则
        rules:[ // 文件后缀名匹配规则
            {test:/\.css$/, use:['style-loader','css-loader']},
            {test:/\.less$/, use:['style-loader','css-loader','less-loader']},
            //在配置url-loader的时候，多个参数之间用&符号进行分隔，类比url参数
            {test:/\.jpg|png|gif$/, use:'url-loader?limit=100&outputPath=images'},
            //配置babel-loader的时候，只需要把自己写的代码转换即可，一定要排除node_modules目录下的js文件
            // 因为第三方包中的js的兼容性不需要程序员关心
            {test:/\.js$/, use:'babel-loader', exclude:/node_modules/},
        ]
    }
    

}
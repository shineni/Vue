// 导出一个配置对象
const path = require('path')
const HtmlPulgin = require('html-webpack-plugin')
const htmlPlugin = new HtmlPulgin({
    // 指定要复制的那个页面
    template:'./src/index.html',
    // 指定复制出来的文件名和存放路径
    filename:'./index.html'
})


module.exports = {
    mode:'development', // development & production
    entry: path.join(__dirname,'./src/index.js'),
    output:{
        path:path.join(__dirname,'./dist'),
        filename: 'bundle.js'
    },
    //插件的数组，将来webpack在运行时会加载这些并调用这些插件
    plugins:[htmlPlugin]

}
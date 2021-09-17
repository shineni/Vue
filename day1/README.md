### 预热
1. 初始化项目 npm init -y
2. 创建项目文件index.html index.js
3. 安装配置webpack（如何决定用-S 还是 -D通过npm 官网查看）
	- 开发和上线阶段都需要 dependecies  --save/-S
	- 开发阶段需要					--save-dev/-D
		- npm install webpack@版本号 webpack-cli@版本号 --save-D

	步骤
	1. 安装webpack: npm install webpack@版本号 webpack-cli@版本号 --save-D
	2. 配置webpack(新建一个webpack.config.js文件并配置开发模式, 开发阶段一定要使用development,因为追求的是打包速度，而不是体积，上线的时候要用production,因为追求的是打包速度而不是体积)
	3. package.json的scrips下面，配置Dev脚本,[注意：JSON文件里面记得用双引号]
	4. npm run dev 通过npm run 指定package.json 中scripts下运行的脚本

**QUESTION：**
配置文件何时被读取？

配置文件，在运行webpack脚本，执行npm run XXX 时，如果是XXX 对应的是webpack，则先去读取webpack.config.js文件，再根据配置运行webpack

### webpack 配置 (安装-->配置-->使用)
#### **【需求1：如何修改入口文件和输出文件的名字】**
1. 入口文件

path 是node.js里面的一个模块，需要用require语法引用进来
__dirname是node.js里面指定的，表示当前所在文件的根目录
```
entry: path.join(__dirname,'./src/index.js'),
```
2. 输出文件
path 存放的目录
filename 生成的文件名
```
    output:{
        path:path.join(__dirname,'./dist'),
        filename: 'bundle.js'
    }
```
#### **【需求2：如何实现热加载：修改文件后自动打包，提升体验】**

插件 webpack-dev-server:监听源代码变化，一旦有变化自动打包

【步骤】
1. 安装webpack-dev-server （npm install webpack-dev-server@3.11.2 -D）
2. 在script中添加webpack的参数  
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack serve"
  },
```
3. 运行脚本 npm run dev

【两个问题】

```
ℹ ｢wds｣: Project is running at http://localhost:8080/
ℹ ｢wds｣: webpack output is served from /
```
1. 如果用文件目录打开，则不会实时更新，因为用了webpack-dev-serve 以后用的是http协议，而文件路径打开是文件协议
2. 打包的文件默认用内存中的，而不选用物理磁盘，因为内存速度快，访问只要引用
```
<script src="/bundle.js"></script>
```

#### **【需求3：如何打开端口不要显示文件的目录】**

解决思路： 将src里面的index.html复制一份到根目录，这样打开以后，由于有index.html，会默认进入到这个网页
插件：html-webpack-plugin
【步骤】
1. 安装 npm install html-webpack-plugin@5.3.2 -D
2. 配置
	- 2.1 导入该插件，得到该插件的构造函数

	```
	const HtmlPulgin = require('html-webpack-plugin')
	```
	- 2.2 new 构造函数，得到插件的实例对象
	```
	const htmlPlugin = new HtmlPulgin({
    	// 指定要复制的那个页面
    	template:'./src/index.html',
    	// 指定复制出来的文件名和存放路径
    	filename:'./index.html'
	})
	```
	- 2.3 将插件的实例对象放到plugins（插件的数组），webpack以后在运行的时候会加载并调用这些插件
	```
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
	```

【解惑 html-webpack-plugin插件的作用】
- 1. 通过HTML插件复制到项目根目录中的index.html页面，也被放到了内存中
- 2. HTML插件在生成的index.html页面，自动注入了打包的bundle.js文件


#### **【需求4：首次加载自动打开页面，不需要手动复制地址】**

通过webpack.config.js配置文件中的devServer节点对webpack-dev-server插件进行更多的配置
```
    devServer:{
        open:true, //初次打包完成后，自动打开浏览器
        host:'127.0.0.1', // 实时打包所使用的主机地址
        port: 8080, // 实时打包所使用的端口号
    }
```

**【注意】**：如果改了webpack.config.js配置文件，或者改了package.json配置文件，都必须*重启实时打包的服务器*，否则最新的配置文件无法生效。

#### **【需求5：webpack只能打包处理.js为后缀的模块，如何处理非.js为后缀结尾的文件呢？-->loaders】**
- loader
	- loader的作用：协助webpack打包处理特定的文件模块
		- css-loader打包处理.css相关的文件
		- less-loader打包处理.less相关的文件
		- babel-loader打包处理webpack无法处理的高级JS语法

【配置css步骤】
1. 安装
```
 npm i style-loader@3.0.0 css-loader@5.2.6 -D
```
2. 配置:在webpack.config.js的module-->rules数组中，添加loader的规则如下
```
    module:{ //所有第三方文件模块的匹配规则
        rules:[ // 文件后缀名匹配规则
            {test:/\.css$/, use:['style-loader','css-loader']}
        ]
    }
```
test:表示匹配的文件类型（正则表达式），use表示对应要调用的loader 

【配置less步骤】
1. 安装: less包是less-loader的依赖项，需要安装上，但是不需要体现在配置文件中
```
npm i less-loader@10.0.1 less@4.1.1 -D
```
2. 配置
```
    module:{ //所有第三方文件模块的匹配规则
        rules:[ // 文件后缀名匹配规则
             {test:/\.less$/, use:['style-loader','css-loader','less-loader']}
        ]
    }
```

【注意】
1. use数组中指定的loader顺序是固定的
2. 多个loader调用的顺序是从后往前，具体参考图picformarkdown下的webpack执行流程图


**webpack如何处理文件模块**

1. 判断是否为js模块，如果是走2，如果不是走5
2. 是否是js高级语法，如果不是走3，如果是走4
3. webpack自行处理
4. 判断是否配置了babel,如果是调用loader处理，如果不是报错
5. 判断是否配置了相应的loader,如果是调用loader处理,如果不是报错

#### **【需求6：如何用webpack处理图片文件】**


【Hint 如何做图片的性能优化-->减少图片请求的次数】
1. 精灵图
2. base64（有一个缺点：就是转换后图片的体积会变大，因此只适用于小图片）

【步骤】
1. 安装
```
npm i url-loader@4.1.1 file-loader@6.2.0 -D
```
2. 配置(use如果用到的loader只有一个可以存成一个字符串)
```
    module:{ //所有第三方文件模块的匹配规则
        rules:[ // 文件后缀名匹配规则
            {test:/\.jpg|png|gif$/, use:'url-loader?limit=22229'}

        ]
    }
```
注意：？后面是loader的参数项
- limit用来指定图片的大小，单位是字节（byte）
- 只有小于等于limit的图片才会被转为base64格式的图片

#### **【需求7：如何使用高级的js语法】**
webpack只能打包处理一部分高级js语法，对于那些无法处理的还需要借助于babel-loader
【步骤】
1. 安装 (@babel/core 以及@babel/plugin-proposal-decorators是babel-loader的依赖项，也是插件 )
```
npm i babel-loader@8.2.2 @babel/core@7.14.6 @babel/plugin-proposal-decorators@7.14.5 -D
```
2. 配置
- webpack.config.js
	```
    module:{ //所有第三方文件模块的匹配规则
        rules:[ // 文件后缀名匹配规则
            //配置babel-loader的时候，只需要把自己写的代码转换即可，一定要排除node_modules目录下的js文件
            // 因为第三方包中的js的兼容性不需要程序员关心
            {test:/\.js$/, use:'babel-loader', exclude:/node_modules/},
        ]
    }
	```
- 创建一个babele.config.js文件，用于配置babel依赖的插件
	```
	module.exports = {
   	 //声明babel可用的插件
    // 将来webpack在调用babel-loader的时候会先加载plugins插件来使用
    	"plugins": [ ["@babel/plugin-proposal-decorators", { "legacy": true }]] 
	}
	```
	具体配置时参照babel的官网：https://babeljs.io/docs/en/babel-plugin-proposal-decorators#docsNav

#### **【需求8：如何发布】**
【步骤】
- 配置package.json的scripts节点, --mode配置的开发模式的优先级高于在webpack.config.js里面配置的优先级，开发阶段生成的文件在内存中，实际发布的时候文件存在物理磁盘上
	- --mode是一个参数项，用来指定webpack的运行模式，production是生产模式，会进行代码压缩和性能优化，development是开发模式
	- 通过--mode指定的参数项，会覆盖webpack.config.js中的mode项
```
  "scripts": {
    "dev": "webpack serve",
    "build": "webpack --mode production"
  },
```
【优化1：将js文件都放到js文件目录下，图片文件都放到images文件目录下】
- 配置webpack.config.js文件 output 以及url-loader的参数
```
module.exports = {
    mode:'development', 
    entry: path.join(__dirname,'./src/index.js'),
    output:{
        path:path.join(__dirname,'./dist'),
        filename: 'js/bundle.js'
    },
    plugins:[htmlPlugin],
    devServer:{
        open:true, 
        host:'127.0.0.1', 
        port: 8080,
    },
    module:{ 
        rules:[ 
            {test:/\.css$/, use:['style-loader','css-loader']},
            {test:/\.less$/, use:['style-loader','css-loader','less-loader']},
            //在配置url-loader的时候，多个参数之间用&符号进行分隔，类比url参数
            {test:/\.jpg|png|gif$/, use:'url-loader?limit=22229&outputPath=images'},
            {test:/\.js$/, use:'babel-loader', exclude:/node_modules/},
        ]
    }
    

}
```

【优化2:发布的时候自动清空dist目录--》插件clean-webpack-plugin】
- 步骤 查看npmjs官网
	- 安装
	```
	npm i clean-webpack-plugin@3.0.0 -D
	```
	- 配置
	```
	const CleanWebpackPlugin = require('clean-webpack-plugin')
	const cleanWebpackPlugin = new CleanWebpackPlugin()
	module.exports = {
    	//插件的数组，将来webpack在运行时会加载这些并调用这些插件
    	plugins:[htmlPlugin, cleanWebpackPlugin],
	}
	```

#### **【需求9：如何通过报错信息的提示准确定位到文件-->SourceMap】**
默认Source Map的问题：开发环境下，默认生成的Source Map，记录的是生成后的代码的位置，会导致运行时报错的行数和源代码行数不一致的问题

Source Map就是一个信息文件，里面存储着位置信息，也就是说Souce Map里面存储的是压缩混淆后的代码所对应转换前的位置，有了它，出错工具将直接显示原始代码，而不是转换后的代码，能够极大方便后期调试

【解决方案，配置webpack.config.js】
```
module.exports = {
    mode:'development', // development & production
    //在开发调试阶段，建议大家都把devtool的值设置为eval-source-map
    //devtool:'eval-source-map',
    //在实际发布的时候，建议大家都把devtool的值设置为nosource-source-map或者直接关闭SourceMap
    devtool:'nosource-source-map',
}
```	
在生产环境下，如果省略了devtool选项，则最终生成的问题件中不包含Source Map,这样能够防止原始代码通过Source Map的形式暴露给别有所图之人--》解决方案
- 只定位行数，不暴露代码：在实际发布的时候，建议大家都把devtool的值设置为nosource-source-map（devtool的值设置为source-map会即显示行数又暴露代码）

原则：开发环境下，优先考虑调试，生产环境下优先考虑安全性
- 开发环境下
	- 建议把devtool的值设置为eval-source-map
	- 好处：可以精准定位到具体的错误行
- 生产环境下
	- 建议关闭Source Map或将devtool的值设置为nosources-source-map
	- 好处：防止源码泄漏，提高网站的安全性














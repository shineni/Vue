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
####**【需求1：如何修改入口文件和输出文件的名字】**
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
####**【需求2：如何实现热加载：修改文件后自动打包，提升体验】**

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

####**【需求3：如何打开端口不要显示文件的目录】**

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









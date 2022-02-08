# 基础实践学习

使用vue3 和 webpack5搭建基础开发环境搭建,这里没有用现成的脚手架，主要是为了学习一些基础配置

## TODO
1. nodejs path知识点


## 初始化webpack5.0

#### 1. 创建项目并初始化

```js
mkdir webpack-demo && cd webpack-demo
npm init -y
```
此时已得到一个package.json文件

```js
npm i webpack webpack-cli -D
```

webpack-cli 是执行 webpack 的工具。webpack 4.x 版本以后，剥离出了 webpack-cli ，所以这里我们需要单独下载它。

根目录添加`index.html` 和 `webpack.config.js`

根目录添加`src`文件夹，并且在`src`文件夹内添加`main.js`文件


#### 2. 添加webpack基本配置


```js
// webpack.config.js 文件内容
const path = require('path')

module.exports = {
    mode: 'development', // 环境
    entry: path.resolve(__dirname, './src/main.js'), // 入口
    output: {
        path: path.resolve(__dirname, 'dist'), // 打包生成的目录文件夹
        filename: 'js/[name].js' // 打包后的js文件
    }
}
```

`package.json` 的 scripts 属性增加dev命令：
```js
"scripts": {
  "dev": "webpack --config ./webpack.config.js"
}
```

执行`npm run dev`可以看到生成了打包后的dist文件
![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/webpack/img-1.jpg)


## 引入vue3.0

```js
// 使用 vue@next 才能成功引入 Vue 3.x，否则就会引入 2.x 的最高版本
npm i vue@next -S
```

在 `src` 目录下新建 `app.vue`并添加内容：

```vue
<template>
    <div id="app">
        我有一头小毛驴呀~
    </div>
</template>
<script>
export default {
    
}
</script>
```

`src/main.js`文件内容:
```js
import { createApp } from "vue";
import App from './app.vue'

const app = createApp(App)
app.mount('#app')
```

此时执行打包命令`npm run dev`会报错:

![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/webpack/img-2.jpg)


浏览器去识别不了 .vue 结尾的文件，我们需要使用`vue-loader`解析vue文件

使用HtmlWebpackPlugin创建HTML文件

安装vue-loader和HtmlWebpackPlugin：`npm install vue-loader HtmlWebpackPlugin`


`webpack.config.js`配置`vue-loader`和`HtmlWebpackPlugin`:
```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')


module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'), // 以我们根目录创建的html为模板
            filename: 'index.html',
            title: 'webpack5.0 + vue3.0'
        }),
        new VueLoaderPlugin()
    ]
}
```

`index.html`文件内容:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

此时执行打包命令`npm run dev`后，打开dist.index.html可以看到我们的内容


![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/webpack/img-3.jpg)


## vue中使用scss

:::tip SCSS含义
SCSS是一种CSS预处理语言

定义了一种新的专门的编程语言，编译后形成正常的css文件，为css增加一些编程特性，无需考虑浏览器的兼容性（完全兼容css3），让css更加简洁、适应性更强，可读性更佳，更易于代码的维护等诸多好处。

CSS预处理语言有SCSS (SASS) 和LESS、POSTCSS

scss是sass3.0引入的语法，可以理解scss是sass的一个升级版本
:::

scss需要经过编译为css才能被浏览器识别,所以需要安装以下loader:

```js
npm install css-loader style-loader --save-dev
npm install node-sass sass-loader --save-dev
```
::: tip
`node-sass`: 它将Node.js绑定到LibSass（流行样式表预处理器Sass的C版本）。它允许用户以令人难以置信的速度将.scss文件本地编译为css，并通过连接中间件自动编译 (还是不太理解干啥的)

`sass-loader`: 把scss/sass转为css

`css-loader`: css-loader 会对 @import 和 url('@/static/img.png') 进行处理(浏览器是无法识别 @ 符)

`style-loader`: 把 CSS 插入到 DOM 中。
:::

`webpack.config.js`配置
```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')


module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(s)?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),
            filename: 'index.html',
            title: 'webpack5.0 + vue3.0'
        }),
        new VueLoaderPlugin()
    ]
}
```

`src/app.vue`添加样式
```vue
<template>
    <div class="my-app">
        我有一头小毛驴呀~
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.my-app {
    color: lightblue;
}
</style>
```
打包后打开`dist/index.hml`可以看到效果


#### 配置热更新

```js
npm install webpack-dev-server -D
```

`webpack.config.js`添加devServer配置

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')


module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, './dist')
        },
        port: 7729
    },
    module: {
        rules: [
            {
                test: /\.(s)?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),
            filename: 'index.html',
            title: 'webpack5.0 + vue3.0'
        }),
        new VueLoaderPlugin()
    ]
}
```

重新启动 `npm run dev`，访问`http://localhost:7729/`可查看页面，修改实时更新

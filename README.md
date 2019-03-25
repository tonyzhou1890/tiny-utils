# tiny-utils

> tony's utils collection: tiny-utils.js <br>
> version: 1.0.5

&emsp;&emsp;为了以后编程的方便，觉得有必要创建一个工具库，将一些写过（或者看到）的工具收藏起来。对于借鉴过来的方法，具体文件里将有说明。**指令和 UI 部分需要单独引入。详见文档。**

## 安装
```
npm install tiny-utils.js -s
```

## 配置
&emsp;&emsp;tiny-utils.js 并没有预先编译，这在低版本浏览器（比如 ie 全家）中会有兼容问题。为了解决兼容问题，需要用 babel 转译。找到 webpack 配置文件，进行如下修改：
```
{
    test: /\.js$/,
    loader: 'babel-loader',
    include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client'), resolve('node_modules/tiny-utils.js/')]
},
```

## 文档

[tiny-utils.js 文档](./docs)

## 计划
> 只代表有内容
- [x] base 部分——类型判定
- [x] string 部分——字符串方法
- [x] array 部分——数组方法
- [x] object 部分——对象方法
- [x] functions 部分——函数工具
- [x] date 部分——日期方法
- [x] validate 部分——验证方法
- [x] tree 部分——树方法
- [x] UI 部分——第三方库ui增强或自实现ui组件
- [x] directive 部分——vue指令

## 更新日志
### v1.0.0--2019.01.31
1. 创建项目，发布包。

### v1.0.1--2019.02.18
1. 整理项目。

### v1.0.2--2019.03.01
1. 将所有的 Obeject.create(null) 改成对象字面量 {}，解决创建出来的对象没有原型的问题。

### v1.0.3--2019.03.08
1. 添加时间格式化方法，将 ‘2019-01-01 11:11:11’ 这种格式转成 date 对象。
2. 添加 v-tu-loading 指令。
3. 增强 tree 模块下的 getLastLevel 函数。
4. 将 UI 模块下的 deleteInfo 函数归类到 functions 模块下。

### v1.0.4--2019.03.18
1. 修复bug：validate.js 内方法命名重复，ie 严格模式报错。

### v1.0.5--2019.03.18
1. 将开发依赖的包移到 devDependencies 下面（之前装错地方了）。
2. 添加 babel 转译说明。

### v1.0.6--2019.03.25
1. 样式用 scss 书写，并统一在 theme 文件夹下面管理。
2. 添加 v-tu-waves 指令。（指令来自于 vue-element-admin）
3. 添加 SvgIcon 组件。（组件来自于 vue-element-admin）
4. 文档放到 docs 下面。
5. 添加 v-tu-bubble 指令。
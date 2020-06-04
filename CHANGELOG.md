# 更新日志
## v2.0.0--2020.05.05
1. 采用`rollup`打包
2. 类型判断引用`lodash`里的方法
3. 删除/修改部分方法，增加`string.uuid`、`array.sort`、`math.seedRandom`等方法
4. 删除`ui`部分和指令部分

## v1.0.10--2019.04.22
1. 解决 Book 组件初始化时进度100%双页显示不正常的问题。
2. 解决 tree.getLastLevel 方法 data 未定义的问题。
3. tree.getLastLevel 在进入递归前先进行数组检查，避免抛出错误。
4. 解决 tree.setProperty 递归调用错误的问题。
5. 将 object 和 tree 中的 JSON 的深度拷贝换成 lodash 的拷贝函数（待做）。
6. 解决 tree.getLastLevel 递归没有传递参数 children 的问题。

## v1.0.9--2019.04.03
1. 解决 Book 组件初始化不触发 pageChange 事件的问题。

## v1.0.8--2019.04.02
1. 去掉 Book 组件的依赖--kim-vue-touch。
2. 修复 Book 组件bug：v-show 使元素脱离文档流导致无法获取到文本高度。

## v1.0.7--2019.04.02
1. 添加 Book 组件（需要依赖 kim-vue-touch）。

## v1.0.6--2019.03.25
1. 样式用 scss 书写，并统一在 theme 文件夹下面管理。
2. 添加 v-tu-waves 指令。（指令来自于 vue-element-admin）
3. 添加 SvgIcon 组件。（组件来自于 vue-element-admin）
4. 文档放到 docs 下面。
5. 添加 v-tu-bubble 指令。

## v1.0.5--2019.03.18
1. 将开发依赖的包移到 devDependencies 下面（之前装错地方了）。
2. 添加 babel 转译说明。

## v1.0.4--2019.03.18
1. 修复bug：validate.js 内方法命名重复，ie 严格模式报错。

## v1.0.3--2019.03.08
1. 添加时间格式化方法，将 ‘2019-01-01 11:11:11’ 这种格式转成 date 对象。
2. 添加 v-tu-loading 指令。
3. 增强 tree 模块下的 getLastLevel 函数。
4. 将 UI 模块下的 deleteInfo 函数归类到 functions 模块下。

## v1.0.2--2019.03.01
1. 将所有的 Obeject.create(null) 改成对象字面量 {}，解决创建出来的对象没有原型的问题。

## v1.0.1--2019.02.18
1. 整理项目。

## v1.0.0--2019.01.31
1. 创建项目，发布包。
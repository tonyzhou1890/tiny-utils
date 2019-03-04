# tiny-utils

> tony's utils collection: tiny utils <br>
> version: 1.0.1

&emsp;&emsp;为了以后编程的方便，觉得有必要创建一个工具库，将一些写过（或者看到）的工具收藏起来。对于借鉴过来的方法，具体文件里将有说明。

## 计划
- [x] base 部分——类型判定
- [x] string 部分——字符串方法
- [x] array 部分——数组方法
- [x] object 部分——对象方法
- [ ] functions 部分——函数工具
- [x] date 部分——日期方法
- [x] validate 部分——验证方法
- [x] tree 部分——树方法
- [x] UI 部分——第三方库ui增强或自实现ui组件

## 列表

### base

1. isNumber(data)

    判断是否是数值

2. isString(data)

    判断是否是字符串

3. isBoolean(data)

    判断是否是布尔值

4. isUndefined(data)

    判断是否未定义

5. isNull(data)

    判断是否是null

6. isObject(data)

    判断是否是对象

7. isArray(data)

    判断是否是数组

8. isFunction(data)

    判断是否是函数

### string

1. deleteSpace(data)

    删除对象或数组字符串项两侧的空白字符

2. deleteStrSpace(data)

    删除字符串两端的空白字符。这个方法没太大意义，可以直接在字符串上调用 trim 方法。

### array

1. fill(arr, value, start, end, replace)

    填充数组--返回值是原数组

    arr: 要填充的数组

    value: 要填充的值

    start: 开始填充的位置，可选，默认0

    end: 结束填充的位置，可选，默认最后一个元素

    replace: 是否替换现有值，可选，默认不替换

### object

1. filterProperties(source, reserveProperties)

    对对象/数组进行过滤，保留指定的属性。source 是源对象，reserveProperties 是字符串数组，元素是指定的属性名

2. transferProperties(source, transferProperties)

    对对象/数组进行转换，替换字段名。

### functions

### date

1. parseTime(time, cFormat)

    时间转换

    time: 时间

    cFormat: 要转换的格式--默认：'{y}-{m}-{d} {h}:{i}:{s}'

2. initDate(time)

    将字符串类型的时间‘2019-01-01 01:01:01’转成 date 对象。如果是空字符串，返回值也是空字符串。

    time：时间字符串

### validate
> 单独引入的时候用全名，全部引入的时候用简写——省略‘validate’

1. validateURL(str)

    验证url

2. validateLowerCase(str)

    验证小写字母

3. validateUpperCase(str)

    验证大写字母

4. validateAlphabets(str)

    验证大小写字母

5. validateEmail(str)

    验证邮箱

6. validateMobile(str)

    验证手机号

7. validatePositiveIntegerNonzero(str)

    验证非零正整数

8. validateNegativeIntegerNonzero(str)

    验证非零负整数

9. validatePositiveInteger(str)

    验证非负整数

10. validateNegativeInteger(str)

    验证非正整数

11. validatePwd(str)

    验证密码（6-20位数字字母）

12. validateNotEmpty(str)

    验证非空

13. validatePhone(str)

    验证联系方式（电话或手机）

14. validateLongitude(str)

    验证经度

15. validateLatitude(str)

    验证纬度

16. validateDate(str)

    验证日期

17. validateFloatZ(str)

    正浮点数验证

18. validateNumberZ(str)

    验证1-无穷大整数

### tree

1. treeSelect(obj, checkedObj, para)

    element ui tree 组件增强: 多选框选择-父子联动。

    obj: element ui tree 组件 check 事件返回的传递给 data 属性的数组中该节点所对应的对象

    checkedObj: element ui tree 组件 check 事件返回的第二个参数：树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性

    para: 自定义参数，包括 single 和 tree 两个属性。single 表明是否单选 true：单选，false：多选。tree 是 tree 组件元素的引用。比如 this.$refs.tree

2. treeSelectNoLinkage(obj, checkedObj, para)

    element ui tree 组件增强：多选框选择-父子不联动

    参数解释同上

3. showBack(tree, checked)

    element ui tree 组件增强：回显

    tree: tree 组件元素的引用。比如 this.$refs.tree

    checked: 选中节点或id数组

    ** 可以用 tree 组件的默认选择属性代替此方法

4. findNodeInTree(tree, key, value, childNodeName)

    对树进行查找，找到则返回节点，否则返回false。

    tree: 树--数据集合，不是元素引用

    key：查找键名

    value: 查找键值

    childNodeName: 子节点名称

5. findNodeInTreeDeep(tree, key, value, childNodeName)

    对树进行深度查找，找到则返回节点数组，否则返回空数组。

    参数解释同上

6. setProperty(tree, oldProperty, newProperty, childNodeName, callback)

    根据指定属性给树添加属性

    tree: 树数据

    oldProperty: 旧属性

    newProperty：新属性

    childNodeName: 子节点名称

    callback: 可选参数，转变过程中的回调函数，参数是旧值，返回值是新值

7. setPropertyFromParent(tree, parentProperty, childProperty, childNodeName)

    给树中的节点添加需要的父属性

    tree: 树数据

    parentProperty: 父节点属性名称

    childProperty: 需要添加的子节点属性名称

    childNodeName: 子节点名称

8. plainTree(tree, childNodeName)

    将树扁平化，返回元素组成的一维数组

    tree: 树数据

    childNodeName: 子节点名称

9. treeNodeNumber(tree, childNodeName)

    统计树有多少个节点

    tree: 树数据

    childNodeName: 子节点名称

10. deleteEmptyChildNode(tree, childNodeName)

    删除空的子节点--此方法不一定有用

    tree: 树数据

    childNodeName: 子节点名称

11. getLastLevel(tree)

    获取树中最后一级的节点

    tree: 树数据

### UI

1. deleteInfo(self, itemName, uuid, callback)

    element ui 增强--删除信息确认框

    self: 上下文

    itemName: 待删除信息名称

    uuid: 待删除信息uuid

    callback：请求函数

## 更新日志
### v1.0.0--2019.01.31
1. 创建项目，发布包。

### v1.0.1--2019.02.18
1. 整理项目。

### v1.0.2
1. 将所有的 Obeject.create(null) 改成对象字面量 {}，解决创建出来的对象没有原型的问题。

### v2.0.3
1. 添加时间格式化方法，将‘2019-01-01 11:11:11’这种格式转成 date 对象
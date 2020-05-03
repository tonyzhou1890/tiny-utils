(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@babel/runtime/helpers/typeof')) :
  typeof define === 'function' && define.amd ? define(['@babel/runtime/helpers/typeof'], factory) :
  (global = global || self, global.tinyUtil = factory(global._typeof));
}(this, (function (_typeof) { 'use strict';

  _typeof = _typeof && Object.prototype.hasOwnProperty.call(_typeof, 'default') ? _typeof['default'] : _typeof;

  /**
   * 定义一个 Object.prototype.toString 的简写
   */
  var toString = Object.prototype.toString;
  /**
   * 检测函数，返回类型字符串，比如：Obejct，Array
   * @param {*} data // 需要检测的值
   */

  var judge = function judge(data) {
    return toString.call(data).slice(8, -1);
  };
  /**
   * 判断是否是数字
   * @param {*} data 
   */


  function isNumber(data) {
    return judge(data) === 'Number';
  }
  /**
   * 判断是否是字符串
   * @param {*} data 
   */

  function isString(data) {
    return judge(data) === 'String';
  }
  /**
   * 判断是否是布尔值
   * @param {*} data 
   */

  function isBoolean(data) {
    return typeof data === 'boolean';
  }
  /**
   * 判断是否未定义
   * @param {*} data 
   */

  function isUndefined(data) {
    return typeof data === 'undefined';
  }
  /**
   * 判断是否是null
   * @param {*} data 
   */

  function isNull(data) {
    return data === null;
  }
  /**
   * 判断是否是对象
   * @param {*} data
   */

  function isObject(data) {
    if (isUndefined(data) || isNull(data)) {
      return false;
    }

    return judge(data) === 'Object';
  }
  /**
   * 判断是否是数组
   * @param {*} data
   */

  function isArray(data) {
    return judge(data) === 'Array';
  }
  /**
   * 判断是否是函数
   * @param {*} data 
   */

  function isFunction(data) {
    return judge(data) === 'Function';
  }
  /**
   * 导出全部
   */

  var base = {
    isNumber: isNumber,
    isString: isString,
    isBoolean: isBoolean,
    isUndefined: isUndefined,
    isNull: isNull,
    isObject: isObject,
    isArray: isArray,
    isFunction: isFunction
  };

  /**
   * 字符串相关方法
   */

  /**
   * 删除对象或数组字符串项两边的空格
   * @param {*} data
   */

  function deleteSpace(data) {
    if (!isObject(data) && !isArray(data)) {
      return data;
    }

    var keys = Object.keys(data);
    keys.map(function (key) {
      if (isString(data[key])) data[key] = data[key].trim();
      if (isObject(data) || isArray(data)) data[key] = deleteSpace(data[key]);
    });
    return data;
  }
  /**
   * 删除字符串两端空格
   * @param {*} str
   */

  function deleteStrSpace(str) {
    if (!isString(str)) return str;
    return str.trim();
  }
  /**
   * 导出全部
   */

  var string = {
    deleteSpace: deleteSpace,
    deleteStrSpace: deleteStrSpace
  };

  /**
   * 填充数组--返回值是原数组
   * @param {*} arr // 要填充的数组
   * @param {*} value // 要填充的值
   * @param {*} start // 开始填充位置，可选，默认0
   * @param {*} end // 结束填充位置，可选，默认最后一个元素
   * @param {*} replace // 是否替换现有值，可选，默认不替换
   */

  function fill(arr, value, start, end, replace) {
    if (!isArray(arr)) {
      throw new Error('第一个参数必须数组');
    }

    var s = start !== undefined && isNumber(start) ? start : 0;
    var e = end !== undefined && isNumber(end) ? end : arr.length;

    for (var i = s, len = e; i < len; i++) {
      // 如果元素未定义或为空或可以替换，则填充指定值
      if (isNull(arr[i]) || isUndefined(arr[i]) || replace) {
        arr[i] = value;
      }
    }

    return arr;
  }
  /**
   * 导出全部
   */

  var array = {
    fill: fill
  };

  /**
   * 对对象/数组进行过滤，提取需要的属性
   * @param {*} source // 【对象/数组】源对象/数组
   * @param {*} reserveProperties // 【数组】需要提取的属性
   */

  function filterProperties(source, reserveProperties) {
    var dest = null; // 类型检查

    if (!isArray(source) && !isObject(source)) {
      throw new Error('第一个参数不是对象或数组');
    }

    if (!isArray(reserveProperties)) {
      throw new Error('第二个参数不是数组');
    } // 开始过滤


    dest = filter(source, reserveProperties);
    return dest; // 过滤函数

    function filter(source, reserveProperties) {
      source = JSON.parse(JSON.stringify(source));
      var dest; // 源是否为数组

      if (isArray(source)) {
        dest = source;
        dest.map(function (element, index) {
          // 如果元素是数组或对象，继续遍历
          if (isArray(element) || isObject(element)) {
            dest[index] = filter(element, reserveProperties);
          }
        });
      } else if (isObject(source)) {
        // 源是否为对象
        dest = {};
        reserveProperties.map(function (prop) {
          // 如果属性是数组或对象，继续遍历
          if (isArray(source[prop]) || isObject(source[prop])) {
            dest[prop] = filter(source[prop], reserveProperties);
          } else if (source[prop] !== undefined) {
            dest[prop] = source[prop];
          }
        });
      }

      return dest;
    }
  }
  /**
   * 属性名转换
   * @param {*} source // 【对象/数组】源对象/数组
   * @param {*} transferProperties // 【数组】需要转换的属性，未在其中的属性默认保留。合并策略：如果两个目的属性名相同并且都是数组或对象，则合并，否则直接覆盖。如果为转换值指定了转换函数，则调用函数，否则返回原值。
   */

  function transferProperties(source, transferProperties) {
    var dest = null; // 类型检查

    if (!isArray(source) && !isObject(source)) {
      throw new Error('第一个参数不是对象或数组');
    }

    if (!isArray(transferProperties)) {
      throw new Error('第二个参数不是数组');
    } // 开始转换


    dest = transfer(source, transferProperties);
    return dest; // 转换函数

    function transfer(source, transferProperties) {
      source = JSON.parse(JSON.stringify(source));
      var dest; // 源是否为数组

      if (isArray(source)) {
        dest = source;
        dest.map(function (element, index) {
          // 如果元素是数组或对象，继续遍历
          if (isArray(element) || isObject(element)) {
            dest[index] = transfer(element, transferProperties);
          }
        });
      } else if (isObject(source)) {
        // 源是否为对象
        dest = {};
        Object.keys(source).map(function (key) {
          // 检查是否需要转换
          var newKey = inProp(key, transferProperties); // 如果需要转换并且有转换函数，则调用

          if (newKey && newKey.func) {
            source[key] = newKey.func(source[key]);
          } // 如果属性是数组或对象，继续遍历


          if (isArray(source[key]) || isObject(source[key])) {
            if (newKey) {
              var res = transfer(source[key], transferProperties);

              if (isArray(dest[newKey.new]) && isArray(res)) {
                // 如果新的属性名已经存在，并且两者都是数组，则合并
                dest[newKey.new] = dest[newKey.new].concat(res);
              } else if (isObject(dest[newKey.new]) && isObject(res)) {
                // 如果新的属性名已经存在，并且两者都是对象，则合并
                dest[newKey.new] = Object.assign(dest[newKey.new], res);
              } else {
                dest[newKey.new] = transfer(source[key], transferProperties); // 其余的情况直接覆盖
              }
            } else {
              dest[key] = transfer(source[key], transferProperties);
            }
          } else if (newKey) {
            // 如果需要转换，则转换属性名
            dest[newKey.new] = source[key];
          } else {
            // 否则，直接用原来的属性名
            dest[key] = source[key];
          }
        });
      }

      return dest;
    } // 是否需要转换


    function inProp(key, transferProperties) {
      var res = null;
      transferProperties.map(function (item) {
        if (item[0] === key) {
          res = {
            old: key,
            new: item[1],
            func: isFunction(item[2]) ? item[2] : null
          };
        }
      });
      return res;
    }
  }
  /**
   * 导出全部
   */

  var object = {
    filterProperties: filterProperties,
    transferProperties: transferProperties
  };

  /**
   * 将对象或数组通过HTML字符串表现出来(尚无法正式使用)
   * @param {object/array} data
   * @param {string} prefix
   */

  function printObjToHTML(data, prefix) {
    if (!isObject(data) && !isArray(data)) {
      throw new Error('参数不是对象或数组');
    }

    return toHTMLList(data, prefix);

    function toHTMLList(data, prefix) {
      var str = "<ul class=\"".concat(prefix ? prefix + '-' : '', "ul\">");
      Object.keys(data).map(function (key) {
        str += "<li class=\"".concat(prefix ? prefix + '-' : '', "li\">");

        if (isArray(data[key]) || isObject(data[key])) {
          str += toHTMLList(data[key], prefix);
        } else {
          str += key + "<br />" + data[key];
        }

        str += "</li>";
      });
      str += "</ul>";
      return str;
    }
  }
  /**
   * 对于element ui弹窗的封装，用于删除信息的操作提示
   */

  /**
   * 删除信息
   * @param self: 上下文
   * @param itemName: 待删除信息名称
   * @param uuid: 待删除信息uuid
   * @param callback：请求函数
   */

  function deleteInfo(self, itemName, uuid, callback) {
    return new Promise(function (resolve, reject) {
      var h = self.$createElement;
      self.$msgbox({
        title: '消息',
        message: h('p', null, [h('span', null, '确定删除 ' + itemName + ' 吗？')]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: function beforeClose(action, instance, done) {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            callback(uuid).then(function (response) {
              done();
              instance.confirmButtonLoading = false;
            }).catch(function (e) {
              instance.confirmButtonLoading = false;
              instance.confirmButtonText = '确定';
              reject(e);
            });
          } else {
            done();
            instance.confirmButtonLoading = false;
          }
        }
      }).then(function (action) {
        self.$message({
          type: 'info',
          message: '删除' + itemName + '成功'
        });
        resolve(action);
      }).catch(function (action) {
        reject(action);
      });
    });
  }
  /**
   * 导出全部
   */

  var functions = {
    printObjToHTML: printObjToHTML,
    deleteInfo: deleteInfo
  };

  /**
   * Created by jiachenpan on 16/11/18.
   * 时间转换
   * @param {*} time // 时间
   * @param {*} cFormat // 要转换的格式
   */

  function parseTime(time, cFormat) {
    if (arguments.length === 0) {
      return null;
    }

    var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    var date;

    if (_typeof(time) === 'object') {
      date = time;
    } else {
      if (('' + time).length === 10) time = parseInt(time) * 1000;
      date = new Date(time);
    }

    var formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    };
    var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, function (result, key) {
      var value = formatObj[key]; // Note: getDay() returns 0 on Sunday

      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value];
      }

      if (result.length > 0 && value < 10) {
        value = '0' + value;
      }

      return value || 0;
    });
    return time_str;
  }
  /**
   * 将时间字符串转为 date 对象。参数需要是"2019-01-01 01:01:01"格式的字符串。如果参数是空字符串，则返回值也是空字符串。
   * @param {*} time 
   */

  function initDate(time) {
    if (!isString(time) || isUndefined(time)) {
      throw new Error('参数需要是字符串');
    }

    if (time === '') {
      return '';
    }

    time = time.replace(/-/g, '/');
    return new Date(time);
  }
  /**
   * 导出全部
   */

  var date = {
    parseTime: parseTime,
    initDate: initDate
  };

  /**
   * 验证方法，部分方法来自vue-element-admin框架，部分前同事 @曹可凡 所写，部分自己所写
   */

  /* 合法uri*/
  function validateURL(textval) {
    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|top|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval);
  }
  /* 小写字母*/

  function validateLowerCase(str) {
    var reg = /^[a-z]+$/;
    return reg.test(str);
  }
  /* 大写字母*/

  function validateUpperCase(str) {
    var reg = /^[A-Z]+$/;
    return reg.test(str);
  }
  /* 大小写字母*/

  function validateAlphabets(str) {
    var reg = /^[A-Za-z]+$/;
    return reg.test(str);
  }
  /**
   * validate email
   * @param email
   * @returns {boolean}
   */

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  /* 验证手机号*/

  function validateMobile(str) {
    var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    return reg.test(str);
  }
  /* 验证非零负整数*/

  function validateNegativeIntegerNonzero(str) {
    var reg = /^-[1-9]\d*$/;
    return reg.test(str);
  }
  /* 验证非负整数*/

  function validatePositiveInteger(str) {
    var reg = /^[1-9]\d*|0$/;
    return reg.test(str);
  }
  /* 验证非正整数*/

  function validateNegativeInteger(str) {
    var reg = /^-[1-9]\d*|0$/;
    return reg.test(str);
  }
  /* 验证密码*/

  function validatePwd(str) {
    var reg = /^[0-9A-Za-z]{6,20}$/;
    return reg.test(str);
  }
  /* 验证非空*/

  function validateNotEmpty(str) {
    return !!str.length;
  }
  /* 验证联系方式（电话或手机） */

  function validatePhone(number) {
    var reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/;
    return reg.test(number);
  }
  /* 经度验证 */

  function validateLongitude(str) {
    var reg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;
    return reg.test(str);
  }
  /* 纬度验证 */

  function validateLatitude(str) {
    var reg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
    return reg.test(str);
  }
  /* 日期验证 */

  function validateDate(str) {
    var reg = /^((((19|20)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((19|20)\d{2})-(0?[469]|11)-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-(0?[1-9]|[12]\d)))$/;
    return reg.test(str);
  }
  /* 正浮点数验证（不超过两位小数） */

  function validateFloatZ(str) {
    var reg = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
    return reg.test(str);
  }
  /* 1-无穷大正整数验证 */

  function validateNumberZ(str) {
    var reg = /^[0-9]*[1-9][0-9]*$/;
    return reg.test(str);
  }
  /**
   * 全部导出
   */

  var validate = {
    URL: validateURL,
    lowerCase: validateLowerCase,
    upperCase: validateUpperCase,
    alphabets: validateAlphabets,
    email: validateEmail,
    mobile: validateMobile,
    negativeIntegerNonzero: validateNegativeIntegerNonzero,
    positiveInteger: validatePositiveInteger,
    negativeInteger: validateNegativeInteger,
    pwd: validatePwd,
    notEmpty: validateNotEmpty,
    phone: validatePhone,
    longitude: validateLongitude,
    latitude: validateLatitude,
    date: validateDate,
    floatZ: validateFloatZ,
    numberZ: validateNumberZ
  };

  /**
   * 父子联动情况下的选择
   * 响应点击复选框行为
   * 1.根据 para.single 判断是否可以复选
   * 2.根据 obj.children 判断是否包含子节点
   * 3.根据 obj.id 和 checkedObj.checkedKeys 判断是否选中
   * 4.设定除自身外的所有节点为未选中状态
   *    4.1.如果节点不包含子节点
   *        4.1.1.如果可以复选，不改变默认行为
   *        4.1.2.如果不可以复选，设定自身外的所有节点为(未)选中状态
   *    4.2.如果节点包含子节点
   *        4.2.1.如果可以复选，不改变默认行为
   *        4.2.2.如果不可以复选
   *            4.2.2.1.如果当前节点为半选，则取消选中状态
   *            4.2.2.2.如果当前为未选中状态，首先设定所有节点为未选中，然后设定后代节点中第一个节点为非父节点的为(未)选中状态
   * 5.将选中结果存入临时变量
   * 6.返回结果
   *    6.1.如果可以复选，返回obj和checkedObj组成的对象
   *    6.2.如果不可以复选，返回obj、checkObj和当前选中id组成的对象
   * @param {*} obj // element ui tree 组件 check 事件返回的传递给 data 属性的数组中该节点所对应的对象
   * @param {*} checkedObj // element ui tree 组件 check 事件返回的第二个参数：树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
   * @param {*} para // 自定义参数，包括 single 和 tree 两个属性。single 表明是否单选 true：单选，false：多选。tree 是 tree 组件元素的引用。比如 this.$refs.tree
   */

  function treeSelect(obj, checkedObj, para) {
    var single = para.single;
    var tree = para.tree;
    var temp = {
      obj: obj,
      checkedObj: checkedObj
    };

    if (!single) ; else {
      if (!obj.children) {
        checkedObj.checkedKeys.map(function (item) {
          if (item !== obj.id) {
            tree.setChecked(item, false);
          }
        });

        if (checkedObj.checkedKeys.indexOf(obj.id) !== -1) {
          tree.setChecked(obj.id, true);
          temp.id = obj.id;
        }
      } else {
        checkedObj.checkedKeys.map(function (item) {
          tree.setChecked(item, false);
        });

        if (checkedObj.checkedKeys.indexOf(obj.id) !== -1) {
          for (var tempO = obj.children;;) {
            if (tempO[0].children) {
              tempO = tempO[0].children;
              continue;
            }

            tree.setChecked(tempO[0].id, true);
            temp.id = tempO[0].id;
            break;
          }
        }
      }
    }

    return temp;
  }
  /**
   * 父子不联动情况下的选择（树组件添加 check-strictly="tree" ）
   * @param {*} obj // element ui tree 组件 check 事件返回的传递给 data 属性的数组中该节点所对应的对象
   * @param {*} checkedObj // element ui tree 组件 check 事件返回的第二个参数：树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
   * @param {*} para // 自定义参数，包括 single 和 tree 两个属性。single 表明是否单选 true：单选，false：多选。tree 是 tree 组件元素的引用。比如 this.$refs.tree
   */

  function treeSelectNoLinkage(obj, checkedObj, para) {
    var single = para.single;
    var tree = para.tree;
    var temp = {
      obj: obj,
      checkedObj: checkedObj
    };

    if (!single) ; else {
      checkedObj.checkedKeys.map(function (item) {
        if (item !== obj.id) {
          tree.setChecked(item, false);
        }
      });

      if (checkedObj.checkedKeys.indexOf(obj.id) !== -1) {
        tree.setCurrentNode(obj);
        temp.id = obj.id;
      }
    }

    return temp;
  }
  /**
   * 树回显
   * 调用 element ui tree 组件的 getCheckedKeys 方法和 setChecked 方法实现
   * @param {*} tree // tree 组件元素的引用。比如 this.$refs.tree
   * @param {*} checked // 选中节点或id数组
   */

  function showBack(tree, checked) {
    tree.getCheckedKeys().map(function (item) {
      tree.setChecked(item, false);
    });
    checked.map(function (item) {
      tree.setChecked(item, true);
    });
  }
  /**
   * 对树进行查找，找到则返回节点，否则返回false。
   * @param tree：树
   * @param key: 查找键名
   * @param value: 查找键值
   * @param childNodeName: 子节点名称
   */

  function findNodeInTree(tree, key, value, childNodeName) {
    if (!isArray(tree)) {
      throw new Error('树数据不是数组');
    }

    for (var i = 0, len = tree.length; i < len; i++) {
      if (tree[i][key] === value) {
        return tree[i];
      }

      if (tree[i][childNodeName]) {
        var temp = findNodeInTree(tree[i][childNodeName], key, value, childNodeName);

        if (temp) {
          return temp;
        }
      }
    }

    return false;
  }
  /**
   * 对树进行深度查找，找到则返回节点数组，否则返回空数组。
   * @param tree：树
   * @param key: 查找键名
   * @param value: 查找键值
   * @param childNodeName: 子节点名称
   */

  function findNodeInTreeDeep(tree, key, value, childNodeName) {
    if (!isArray(tree)) {
      throw new Error('树数据不是数组');
    }

    var res = [];
    tree.map(function (item) {
      if (item[key] === value) {
        res.push(item);
      }

      if (item[childNodeName]) {
        res = res.concat(findNodeInTreeDeep(item[childNodeName], key, value, childNodeName));
      }
    });
    return Array.from(new Set(res));
  }
  /**
   * 根据指定属性给树添加属性
   * @param {*} tree // 树
   * @param {*} oldProperty // 旧属性
   * @param {*} newProperty // 新属性
   * @param {*} childNodeName // 子节点名称
   * @param {*} callback // 可选参数，转变过程中的回调函数，参数是旧值，返回值是新值
   */

  function setProperty(tree, oldProperty, newProperty, childNodeName, callback) {
    if (!isArray(tree)) {
      throw new Error('树数据不是数组');
    }

    tree.map(function (item) {
      item[newProperty] = callback === undefined ? item[oldProperty] : callback(item[oldProperty]);

      if (item[childNodeName]) {
        setProperty(item[childNodeName], oldProperty, newProperty, childNodeName, callback);
      }
    });
  }
  /**
   * 给树中的节点添加需要的父属性
   * @param {*} tree // 树
   * @param {*} parentProperty // 父节点属性名称
   * @param {*} childProperty // 需要添加的子节点属性名称
   * @param {*} childNodeName // 子节点名称
   */

  function setPropertyFromParent(tree, parentProperty, childProperty, childNodeName) {
    if (!isArray(tree)) {
      throw new Error('树数据不是数组');
    }

    tempFunction(tree, parentProperty, null, childProperty, childNodeName);
    return tree;

    function tempFunction(tree, parentProperty, parentPropertyValue, childProperty, childNodeName) {
      tree.map(function (item) {
        item[childProperty] = parentPropertyValue;

        if (item[childNodeName] && isArray(item[childNodeName])) {
          var t = item[parentProperty];
          tempFunction(item[childNodeName], parentProperty, t, childProperty, childNodeName);
        }
      });
    }
  }
  /**
   * 将树扁平化
   * @param {*} tree // 树
   * @param {*} childNodeName // 子节点名称
   */

  function plainTree(tree, childNodeName) {
    if (!isArray(tree)) {
      throw new Error('树数据不是数组');
    }

    var res = [];
    tree.map(function (item) {
      res.push(item);

      if (item[childNodeName]) {
        res = res.concat(plainTree(item[childNodeName], childNodeName));
      }
    });
    return res;
  }
  /**
   * 统计树有多少个节点
   * @param {*} tree // 树
   * @param {*} childNodeName // 子节点名称
   */

  function treeNodeNumber(tree, childNodeName) {
    if (!isArray(tree)) {
      throw new Error('树数据不是数组');
    }

    var number = 0;
    number += tree.length;
    tree.map(function (item) {
      if (item[childNodeName]) {
        number += treeNodeNumber(item[childNodeName], childNodeName);
      }
    });
    return number;
  }
  /**
   * 删除空的子节点
   * @param {*} tree // 树
   * @param {*} childNodeName // 子节点名称
   */

  function deleteEmptyChildNode(tree, childNodeName) {
    if (!isArray(tree)) {
      throw new Error('树数据不是数组');
    }

    var temp = JSON.parse(JSON.stringify(tree));
    deleteEmpty(temp, childNodeName);
    return temp; // 删除空子节点

    function deleteEmpty(tree, childNodeName) {
      tree.map(function (item) {
        if (item[childNodeName] && isArray(item[childNodeName])) {
          if (item[childNodeName].length === 0) {
            delete item[childNodeName];
          } else {
            deleteEmpty(item[childNodeName], childNodeName);
          }
        }
      });
    }
  }
  /**
   * 获取树中最后一级的节点
   * @param {*} tree // 树
   * @param {*} childNodeName // 子节点名称，可选，，默认 ‘children’
   * @param {*} key // 筛选键名，可选
   * @param {*} value // 筛选键值，可选
   */

  function getLastLevel(tree, childNodeName, key, value) {
    if (!isArray(tree)) {
      throw new Error('树数据不是数组');
    }

    var res = []; // 确定子节点名称

    var children = childNodeName || 'children';

    for (var i = 0, len = tree.length; i < len; i++) {
      if (isArray(tree[i][children])) {
        res = res.concat(getLastLevel(tree[i][children], key, value));
      } else {
        // 键值过滤
        if (key !== undefined && value !== undefined) {
          if (tree[i][key] === value) {
            res.push(tree[i]);
          }
        } else {
          // 不过滤
          res.push(tree[i]);
        }
      }
    }

    return Array.from(new Set(res));
  }
  /**
   * 全部导出
   */

  var tree = {
    treeSelect: treeSelect,
    treeSelectNoLinkage: treeSelectNoLinkage,
    showBack: showBack,
    findNodeInTree: findNodeInTree,
    findNodeInTreeDeep: findNodeInTreeDeep,
    setProperty: setProperty,
    setPropertyFromParent: setPropertyFromParent,
    plainTree: plainTree,
    treeNodeNumber: treeNodeNumber,
    deleteEmptyChildNode: deleteEmptyChildNode,
    getLastLevel: getLastLevel
  };

  /**
   * 全部导出
   */

  var index = {
    base: base,
    string: string,
    array: array,
    object: object,
    functions: functions,
    date: date,
    validate: validate,
    tree: tree
  };

  return index;

})));

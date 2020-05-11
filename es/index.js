import isArray from 'lodash/isArray';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';
import isNumber from 'lodash/isNumber';
import isFunction from 'lodash/isFunction';
import _Object$assign from '@babel/runtime-corejs2/core-js/object/assign';
import _Object$keys from '@babel/runtime-corejs2/core-js/object/keys';
import isObject from 'lodash/isObject';
import cloneDeep from 'lodash/cloneDeep';
import isString from 'lodash/isString';
import uniq from 'lodash/uniq';
import _parseInt from '@babel/runtime-corejs2/core-js/parse-int';
import _parseFloat from '@babel/runtime-corejs2/core-js/parse-float';

/**
 * 基本方法--实际上是不好归类的方法
 * @module util
 */

/**
 * 报错
 * @memberOf module:util
 */
function error(msg) {
  throw new Error(msg || '出错了');
} // 导出全部

var util = {
  error: error
};

/**
 * 数组相关方法
 * @module array
 */
/**
 * 填充数组--返回值是原数组
 * @memberOf module:array
 * @param {Array} arr // 要填充的数组
 * @param {*} value // 要填充的值
 * @param {number} start // 开始填充位置，可选，默认0
 * @param {number} end // 结束填充位置，可选，默认最后一个元素
 * @param {boolean} replace // 是否替换现有值，可选，默认不替换
 */

function fill(arr, value, start, end, replace) {
  if (!isArray(arr)) {
    error('函数 fill 第一个参数必须是数组');
  }

  var s = isNumber(start) ? start : 0;
  var e = isNumber(end) ? end : arr.length;

  for (var i = s, len = e; i < len; i++) {
    // 如果元素未定义或为空或可以替换，则填充指定值
    if (isNull(arr[i]) || isUndefined(arr[i]) || replace) {
      arr[i] = value;
    }
  }

  return arr;
}
/**
 * 排序--返回值为原数组
 * @memberOf module:array
 * @param {Array} arr // 排序的数组
 * @param {Function} func // 比较函数：可选。参数为需要比较的两个元素，返回值为 true/false。
 */

function sort(arr, func) {
  if (!isArray(arr)) {
    error('函数 sort 第一个参数必须是数组');
  }

  for (var i = 0, len = arr.length; i < len - 1; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      var flag = false;

      if (isFunction(func)) {
        if (!func(arr[j], arr[j + 1])) {
          flag = true;
        }
      } else {
        if (arr[j] > arr[j + 1]) {
          flag = true;
        }
      }

      if (flag) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
} // 导出全部

var array = {
  fill: fill,
  sort: sort
};

/**
 * 数学相关方法
 * @module math
 */
/**
 * 种子随机数
 * @memberOf module:math
 * @param {number} seed 
 * @param {number} max 
 * @param {number} min 
 */

function seedRandom(seed, max, min) {
  var rnd = null;
  max = isNumber(max) ? max : 1;
  min = isNumber(min) ? min : 0; // 如果有传入种子，按照种子计算

  if (isNumber(seed)) {
    seed = (seed * 9301 + 49297) % 233280;
    rnd = seed / 233280.0;
  } else {
    // 否则调用原生随机数方法--不使用时间戳是因为 1ms 内计算出的随机数都是一样的
    rnd = Math.random();
  }

  return min + rnd * (max - min);
}
/**
 * 导出全部
 */

var math = {
  seedRandom: seedRandom
};

/**
 * 对对象/数组进行过滤，提取需要的属性
 * @memberOf module:object
 * @param {Object|Array} source // 【对象/数组】源对象/数组
 * @param {Array} props // 【数组】需要提取的属性
 * @returns {Object|Array} 新的对象/数组
 */

function filterProperties(source, props) {
  // 类型检查
  if (!isArray(source) && !isObject(source)) {
    error('函数 filterProperties 第一个参数需要是对象或数组');
  }

  if (!isArray(props)) {
    error('函数 filterProperties 第二个参数需要是数组');
  } // 开始过滤


  return _(source, props); // 过滤函数

  function _(source, props) {
    var dest = null; // 源是否为数组

    if (isArray(source)) {
      dest = [];

      for (var i = 0, len = source.length; i < len; i++) {
        // 如果元素是数组或对象，继续遍历
        if (isArray(source[i]) || isObject(source[i])) {
          dest[i] = _(source[i], props);
        } else {
          // 否则保留元素
          dest[i] = source[i];
        }
      }
    } else if (isObject(source)) {
      // 源是否为对象
      dest = {};

      for (var _i = 0, _len = props.length; _i < _len; _i++) {
        if (isArray(source[props[_i]]) || isObject(source[props[_i]])) {
          dest[props[_i]] = _(source[props[_i]], props);
        } else if (!isUndefined(source[props[_i]])) {
          dest[props[_i]] = source[props[_i]];
        }
      }
    }

    return dest;
  }
}
/**
 * 属性名转换
 * @memberOf module:object
 * @param {Object|Array} source // 【对象/数组】源对象/数组
 * @param {Array} props // 【数组】需要转换的属性，未在其中的属性默认保留。合并策略：如果两个目的属性名相同并且都是数组或对象，则合并，否则直接覆盖。如果为转换值指定了转换函数，则调用函数，否则返回原值。
 */

function transferProperties(source, props) {
  // 类型检查
  if (!isArray(source) && !isObject(source)) {
    error('函数 transferProperties 第一个参数需要是对象或数组');
  }

  if (!isArray(props)) {
    error('函数 transferProperties 第二个参数需要是数组');
  } // 开始转换


  return _(cloneDeep(source), props); // 转换函数

  function _(source, props) {
    var dest = null;
    var keys = null;
    var key = null; // 源是否为数组

    if (isArray(source)) {
      dest = [];

      for (var i = 0, len = source.length; i < len; i++) {
        // 如果元素是数组或对象，继续遍历
        if (isArray(source[i]) || isObject(source[i])) {
          dest[i] = _(source[i], props);
        } else {
          // 否则保留元素
          dest[i] = source[i];
        }
      }
    } else if (isObject(source)) {
      // 源是否为对象
      dest = {};
      keys = _Object$keys(source);

      for (var _i2 = 0, _len2 = keys.length; _i2 < _len2; _i2++) {
        key = keys[_i2]; // 检查是否需要转换

        var newKey = inProp(key, props); // 如果需要转换并且有转换函数，则调用

        if (newKey && newKey.func) {
          source[key] = newKey.func(source[key]);
        } // 如果属性是数组或对象，继续遍历


        if (isArray(source[key]) || isObject(source[key])) {
          if (newKey) {
            var res = _(source[key], props);

            if (isArray(dest[newKey["new"]]) && isArray(res)) {
              // 如果新的属性名已经存在，并且两者都是数组，则合并
              dest[newKey["new"]] = dest[newKey["new"]].concat(res);
            } else if (isObject(dest[newKey["new"]]) && isObject(res)) {
              // 如果新的属性名已经存在，并且两者都是对象，则合并
              dest[newKey["new"]] = _Object$assign(dest[newKey["new"]], res);
            } else {
              dest[newKey["new"]] = _(source[key], props); // 其余的情况直接覆盖
            }
          } else {
            dest[key] = _(source[key], props);
          }
        } else if (newKey) {
          // 如果需要转换，则转换属性名
          dest[newKey["new"]] = source[key];
        } else {
          // 否则，直接用原来的属性名
          dest[key] = source[key];
        }
      }
    }

    return dest;
  } // 是否需要转换


  function inProp(key, props) {
    var item = null;

    for (var i = 0, len = props.length; i < len; i++) {
      item = props[i];

      if (item[0] === key) {
        return {
          old: key,
          "new": item[1],
          func: isFunction(item[2]) ? item[2] : null
        };
      }
    }
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
 * 删除对象或数组字符串项两边的空格
 * @memberOf module:string
 * @param {Object|Array} data
 */

function trimAll(data) {
  if (!isObject(data) && !isArray(data)) {
    return data;
  }

  var keys = _Object$keys(data);

  keys.map(function (key) {
    if (isString(data[key])) data[key] = data[key].trim();
    if (isObject(data) || isArray(data)) data[key] = trimAll(data[key]);
  });
  return data;
}
/**
 * 生成 uuid
 * @memberOf module:string
 * @param {number} len uuid 长度：可选，默认 36 位
 * @param {number} radix 基数：可选--2（进制）、10（进制）、16（进制）等
 */

function uuid(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  var i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radix];
    }
  } else {
    // rfc4122, version 4 form
    var r; // rfc4122 requires these characters

    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4'; // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}
/**
 * 导出全部
 */

var string = {
  trimAll: trimAll,
  uuid: uuid
};

/**
 * 验证方法
 * 全局引入的情况下使用的时候去掉 validate
 * @module validate
 */

/**
 * 合法 uri
 * @memberOf module:validate
 * @param {string} textval 
 */
function validateURL(textval) {
  // const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|top|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  var reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
  return reg.test(textval);
}
/**
 * 小写字母
 * @memberOf module:validate
 * @param {string} str 
 */

function validateLowerCase(str) {
  var reg = /^[a-z]+$/;
  return reg.test(str);
}
/**
 * 大写字母
 * @memberOf module:validate
 * @param {string} str 
 */

function validateUpperCase(str) {
  var reg = /^[A-Z]+$/;
  return reg.test(str);
}
/**
 * 大小写字母
 * @memberOf module:validate
 * @param {string} str 
 */

function validateAlphabets(str) {
  var reg = /^[A-Za-z]+$/;
  return reg.test(str);
}
/**
 * 邮箱
 * @memberOf module:validate
 * @param email
 * @returns {boolean}
 */

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
/**
 * 手机号
 * @memberOf module:validate
 * @param {string} str 
 */

function validateMobile(str) {
  var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
  return reg.test(str);
}
/**
 * 正整数
 * @memberOf module:validate
 * @param {string} str 
 */

function validatePositiveInteger(str) {
  var reg = /^[1-9]\d*$/;
  return reg.test(str);
}
/**
 * 负整数
 * @memberOf module:validate
 * @param {string} str 
 */

function validateNegativeInteger(str) {
  var reg = /^-[1-9]\d*$/;
  return reg.test(str);
}
/**
 * 非正整数
 * @memberOf module:validate
 * @param {string} str 
 */

function validateNotPositiveInteger(str) {
  var reg = /^(-[1-9]\d*|0)$/;
  return reg.test(str);
}
/**
 * 非负整数
 * @memberOf module:validate
 * @param {string} str 
 */

function validateNotNegativeInteger(str) {
  var reg = /^([1-9]\d*|0)$/;
  return reg.test(str);
}
/**
 * 正浮点数验证（不超过n位小数--默认2）
 * @memberOf module:validate
 * @param {string} str 
 * @param {number} n 
 */

function validateFloatZ(str, n) {
  var reg = new RegExp("^([1-9][\\d]{0,7}|0)(\\.[\\d]{1,".concat(n || 2, "})?$"));
  return reg.test(str);
}
/**
 * 密码
 * @memberOf module:validate
 * @param {string} str 
 */

function validatePwd(str) {
  var reg = /^[0-9A-Za-z]{6,20}$/;
  return reg.test(str);
}
/**
 * 非空
 * @memberOf module:validate
 * @param {string} str 
 */

function validateNotEmpty(str) {
  return !!(str !== null && str !== undefined && str !== '');
}
/**
 * 联系方式（电话或手机）
 * @memberOf module:validate
 * @param {string} number 
 */

function validatePhone(number) {
  var reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/;
  return reg.test(number);
}
/**
 * 经度
 * @memberOf module:validate
 * @param {string} str 
 */

function validateLongitude(str) {
  var reg = /^(-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;
  return reg.test(str);
}
/**
 * 维度
 * @memberOf module:validate
 * @param {string} str 
 */

function validateLatitude(str) {
  var reg = /^(-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
  return reg.test(str);
}
/**
 * 日期验证
 * @memberOf module:validate
 * @param {string} str 
 */

function validateDate(str) {
  var reg = /^((((19|20)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((19|20)\d{2})-(0?[469]|11)-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-(0?[1-9]|[12]\d)))$/;
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
  positiveInteger: validatePositiveInteger,
  negativeInteger: validateNegativeInteger,
  notPositiveInteger: validateNotPositiveInteger,
  notNegativeInteger: validateNotNegativeInteger,
  floatZ: validateFloatZ,
  pwd: validatePwd,
  notEmpty: validateNotEmpty,
  phone: validatePhone,
  longitude: validateLongitude,
  latitude: validateLatitude,
  date: validateDate
};

/**
 * 树结构相关方法
 * @module tree
 */
/**
 * 对树进行查找，找到则返回节点数组，否则返回空数组。
 * @memberOf module:tree
 * @param {Array} tree：树
 * @param {string} key: 查找键名，不包括 undefined、null、''
 * @param {primitive} value: 查找键值--只支持基本值，不包括 undefined、null、''
 * @param {string} childNodeName: 子节点名称，可选
 * @param {Boolean} deep: 是否深度查找--默认不深度查找。不深度查找的话，找到第一个即返回结果数组
 * @returns {Array} 结果数组，没找到为空数组
 */

function findNode(tree, key, value, childNodeName, deep) {
  if (!isArray(tree)) {
    error('函数 findNode 树数据需要是数组');
  } // 如果键名/键值为空，直接返回空数组


  if (!validateNotEmpty(key) || !validateNotEmpty(value)) return [];
  childNodeName = isString(childNodeName) ? childNodeName : 'children';
  var res = [];
  var item = null;

  for (var i = 0, len = tree.length; i < len; i++) {
    item = tree[i]; // 检查是否满足条件

    if (item[key] === value) {
      res[res.length] = item; // 如果非深度查找，直接返回

      if (!deep) return res;
    } // 是否有子节点


    if (isArray(item[childNodeName])) {
      res = res.concat(findNode(item[childNodeName], key, value, childNodeName, deep));
    }
  }

  return uniq(res);
}
/**
 * 根据指定属性给树添加属性--改变原数据
 * @memberOf module:tree
 * @param {Array} tree // 树
 * @param {string} oldProperty // 旧属性，不包括 undefined、null、''
 * @param {string} newProperty // 新属性，不包括 undefined、null、''
 * @param {string} childNodeName // 子节点名称，可选
 * @param {Function} callback // 可选参数，转变过程中的回调函数，参数是旧值和节点，返回值是新值
 * @returns {Array} 修改后的原数据
 */

function setProperty(tree, oldProperty, newProperty, childNodeName, callback) {
  if (!isArray(tree)) {
    error('函数 setProperty 树数据需要是数组');
  } // 如果键名为空，直接返回原数组


  if (!validateNotEmpty(oldProperty) || !validateNotEmpty(newProperty)) return tree;
  childNodeName = isString(childNodeName) ? childNodeName : 'children';
  var item = null;

  for (var i = 0, len = tree.length; i < len; i++) {
    item = tree[i];
    item[newProperty] = isFunction(callback) ? callback(item[oldProperty], item) : item[oldProperty]; // 是否有子节点

    if (isArray(item[childNodeName])) {
      setProperty(item[childNodeName], oldProperty, newProperty, childNodeName, callback);
    }
  }

  return tree;
}
/**
 * 给树中的节点添加需要的父属性--改变原数据
 * @memberOf module:tree
 * @param {Array} tree // 树
 * @param {string} parentProperty // 父节点属性名称，不包括 undefined、null、''
 * @param {string} childProperty // 需要添加的子节点属性名称，不包括 undefined、null、''
 * @param {string} childNodeName // 子节点名称，可选
 * @returns {Array} 修改后的原数据
 */

function setPropertyFromParent(tree, parentProperty, childProperty, childNodeName) {
  if (!isArray(tree)) {
    error('函数 setPropertyFromParent 树数据需要是数组');
  } // 如果键名为空，直接返回原数组


  if (!validateNotEmpty(parentProperty) || !validateNotEmpty(childProperty)) return tree;
  childNodeName = isString(childNodeName) ? childNodeName : 'children';

  _(tree, null);

  return tree;

  function _(tree, parentPropertyValue) {
    var item = null;

    for (var i = 0, len = tree.length; i < len; i++) {
      item = tree[i];
      item[childProperty] = parentPropertyValue;

      if (isArray(item[childNodeName])) {
        var t = item[parentProperty];

        _(item[childNodeName], t);
      }
    }
  }
}
/**
 * 将树扁平化
 * @memberOf module:tree
 * @param {Array} tree // 树
 * @param {string} childNodeName // 子节点名称
 */

function plain(tree, childNodeName) {
  if (!isArray(tree)) {
    error('函数 plain 树数据需要是数组');
  }

  childNodeName = isString(childNodeName) ? childNodeName : 'children';
  var res = [];
  var item = null;

  for (var i = 0, len = tree.length; i < len; i++) {
    item = tree[i];
    res[res.length] = item;

    if (isArray(item[childNodeName])) {
      res = res.concat(plain(item[childNodeName], childNodeName));
    }
  }

  return res;
}
/**
 * 统计树有多少个节点
 * @memberOf module:tree
 * @param {Array} tree // 树
 * @param {string} childNodeName // 子节点名称
 */

function nodeNumber(tree, childNodeName) {
  if (!isArray(tree)) {
    error('函数 nodeNumber 树数据需要是数组');
  }

  childNodeName = isString(childNodeName) ? childNodeName : 'children';
  var number = 0;
  number += tree.length;

  for (var i = 0, len = tree.length; i < len; i++) {
    if (isArray(tree[i][childNodeName])) {
      number += nodeNumber(tree[i][childNodeName], childNodeName);
    }
  }

  return number;
}
/**
 * 删除空的子节点
 * @memberOf module:tree
 * @param {Array} tree // 树
 * @param {string} childNodeName // 子节点名称
 * @returns {Array} 返回新的树
 */

function deleteEmptyChildNode(tree, childNodeName) {
  if (!isArray(tree)) {
    error('函数 deleteEmptyChildNode 树数据需要是数组');
  }

  childNodeName = isString(childNodeName) ? childNodeName : 'children';
  var temp = cloneDeep(tree);

  _(temp);

  return temp; // 删除空子节点

  function _(tree) {
    for (var i = 0, len = tree.length; i < len; i++) {
      if (isArray(tree[i][childNodeName])) {
        if (tree[i][childNodeName].length === 0) {
          delete tree[i][childNodeName];
        } else {
          _(tree[i][childNodeName]);
        }
      }
    }
  }
}
/**
 * 获取树中最后一级的节点
 * @memberOf module:tree
 * @param {Array} tree // 树
 * @param {string} childNodeName // 子节点名称，可选，默认 ‘children’
 * @param {string} key // 筛选键名，可选，不包括 undefined、null、''
 * @param {primitive} value // 筛选键值，可选，不包括 undefined、null、''
 * @returns {Array} 节点数组
 */

function getLastLevel(tree, childNodeName, key, value) {
  if (!isArray(tree)) {
    error('函数 getLastLevel 树数据需要是数组');
  }

  var res = []; // 确定子节点名称

  childNodeName = isString(childNodeName) ? childNodeName : 'children';

  for (var i = 0, len = tree.length; i < len; i++) {
    if (isArray(tree[i][childNodeName])) {
      res = res.concat(getLastLevel(tree[i][childNodeName], childNodeName, key, value));
    } else {
      // 键值过滤
      if (validateNotEmpty(key) && validateNotEmpty(value)) {
        if (tree[i][key] === value) {
          res.push(tree[i]);
        }
      } else {
        // 不过滤
        res.push(tree[i]);
      }
    }
  }

  return uniq(res);
}
/**
 * 全部导出
 */

var tree = {
  findNode: findNode,
  setProperty: setProperty,
  setPropertyFromParent: setPropertyFromParent,
  plain: plain,
  nodeNumber: nodeNumber,
  deleteEmptyChildNode: deleteEmptyChildNode,
  getLastLevel: getLastLevel
};

// from zrender

/**
 * 颜色相关方法
 * @module color
 */
var kCSSColorTable = {
  'transparent': [0, 0, 0, 0],
  'aliceblue': [240, 248, 255, 1],
  'antiquewhite': [250, 235, 215, 1],
  'aqua': [0, 255, 255, 1],
  'aquamarine': [127, 255, 212, 1],
  'azure': [240, 255, 255, 1],
  'beige': [245, 245, 220, 1],
  'bisque': [255, 228, 196, 1],
  'black': [0, 0, 0, 1],
  'blanchedalmond': [255, 235, 205, 1],
  'blue': [0, 0, 255, 1],
  'blueviolet': [138, 43, 226, 1],
  'brown': [165, 42, 42, 1],
  'burlywood': [222, 184, 135, 1],
  'cadetblue': [95, 158, 160, 1],
  'chartreuse': [127, 255, 0, 1],
  'chocolate': [210, 105, 30, 1],
  'coral': [255, 127, 80, 1],
  'cornflowerblue': [100, 149, 237, 1],
  'cornsilk': [255, 248, 220, 1],
  'crimson': [220, 20, 60, 1],
  'cyan': [0, 255, 255, 1],
  'darkblue': [0, 0, 139, 1],
  'darkcyan': [0, 139, 139, 1],
  'darkgoldenrod': [184, 134, 11, 1],
  'darkgray': [169, 169, 169, 1],
  'darkgreen': [0, 100, 0, 1],
  'darkgrey': [169, 169, 169, 1],
  'darkkhaki': [189, 183, 107, 1],
  'darkmagenta': [139, 0, 139, 1],
  'darkolivegreen': [85, 107, 47, 1],
  'darkorange': [255, 140, 0, 1],
  'darkorchid': [153, 50, 204, 1],
  'darkred': [139, 0, 0, 1],
  'darksalmon': [233, 150, 122, 1],
  'darkseagreen': [143, 188, 143, 1],
  'darkslateblue': [72, 61, 139, 1],
  'darkslategray': [47, 79, 79, 1],
  'darkslategrey': [47, 79, 79, 1],
  'darkturquoise': [0, 206, 209, 1],
  'darkviolet': [148, 0, 211, 1],
  'deeppink': [255, 20, 147, 1],
  'deepskyblue': [0, 191, 255, 1],
  'dimgray': [105, 105, 105, 1],
  'dimgrey': [105, 105, 105, 1],
  'dodgerblue': [30, 144, 255, 1],
  'firebrick': [178, 34, 34, 1],
  'floralwhite': [255, 250, 240, 1],
  'forestgreen': [34, 139, 34, 1],
  'fuchsia': [255, 0, 255, 1],
  'gainsboro': [220, 220, 220, 1],
  'ghostwhite': [248, 248, 255, 1],
  'gold': [255, 215, 0, 1],
  'goldenrod': [218, 165, 32, 1],
  'gray': [128, 128, 128, 1],
  'green': [0, 128, 0, 1],
  'greenyellow': [173, 255, 47, 1],
  'grey': [128, 128, 128, 1],
  'honeydew': [240, 255, 240, 1],
  'hotpink': [255, 105, 180, 1],
  'indianred': [205, 92, 92, 1],
  'indigo': [75, 0, 130, 1],
  'ivory': [255, 255, 240, 1],
  'khaki': [240, 230, 140, 1],
  'lavender': [230, 230, 250, 1],
  'lavenderblush': [255, 240, 245, 1],
  'lawngreen': [124, 252, 0, 1],
  'lemonchiffon': [255, 250, 205, 1],
  'lightblue': [173, 216, 230, 1],
  'lightcoral': [240, 128, 128, 1],
  'lightcyan': [224, 255, 255, 1],
  'lightgoldenrodyellow': [250, 250, 210, 1],
  'lightgray': [211, 211, 211, 1],
  'lightgreen': [144, 238, 144, 1],
  'lightgrey': [211, 211, 211, 1],
  'lightpink': [255, 182, 193, 1],
  'lightsalmon': [255, 160, 122, 1],
  'lightseagreen': [32, 178, 170, 1],
  'lightskyblue': [135, 206, 250, 1],
  'lightslategray': [119, 136, 153, 1],
  'lightslategrey': [119, 136, 153, 1],
  'lightsteelblue': [176, 196, 222, 1],
  'lightyellow': [255, 255, 224, 1],
  'lime': [0, 255, 0, 1],
  'limegreen': [50, 205, 50, 1],
  'linen': [250, 240, 230, 1],
  'magenta': [255, 0, 255, 1],
  'maroon': [128, 0, 0, 1],
  'mediumaquamarine': [102, 205, 170, 1],
  'mediumblue': [0, 0, 205, 1],
  'mediumorchid': [186, 85, 211, 1],
  'mediumpurple': [147, 112, 219, 1],
  'mediumseagreen': [60, 179, 113, 1],
  'mediumslateblue': [123, 104, 238, 1],
  'mediumspringgreen': [0, 250, 154, 1],
  'mediumturquoise': [72, 209, 204, 1],
  'mediumvioletred': [199, 21, 133, 1],
  'midnightblue': [25, 25, 112, 1],
  'mintcream': [245, 255, 250, 1],
  'mistyrose': [255, 228, 225, 1],
  'moccasin': [255, 228, 181, 1],
  'navajowhite': [255, 222, 173, 1],
  'navy': [0, 0, 128, 1],
  'oldlace': [253, 245, 230, 1],
  'olive': [128, 128, 0, 1],
  'olivedrab': [107, 142, 35, 1],
  'orange': [255, 165, 0, 1],
  'orangered': [255, 69, 0, 1],
  'orchid': [218, 112, 214, 1],
  'palegoldenrod': [238, 232, 170, 1],
  'palegreen': [152, 251, 152, 1],
  'paleturquoise': [175, 238, 238, 1],
  'palevioletred': [219, 112, 147, 1],
  'papayawhip': [255, 239, 213, 1],
  'peachpuff': [255, 218, 185, 1],
  'peru': [205, 133, 63, 1],
  'pink': [255, 192, 203, 1],
  'plum': [221, 160, 221, 1],
  'powderblue': [176, 224, 230, 1],
  'purple': [128, 0, 128, 1],
  'red': [255, 0, 0, 1],
  'rosybrown': [188, 143, 143, 1],
  'royalblue': [65, 105, 225, 1],
  'saddlebrown': [139, 69, 19, 1],
  'salmon': [250, 128, 114, 1],
  'sandybrown': [244, 164, 96, 1],
  'seagreen': [46, 139, 87, 1],
  'seashell': [255, 245, 238, 1],
  'sienna': [160, 82, 45, 1],
  'silver': [192, 192, 192, 1],
  'skyblue': [135, 206, 235, 1],
  'slateblue': [106, 90, 205, 1],
  'slategray': [112, 128, 144, 1],
  'slategrey': [112, 128, 144, 1],
  'snow': [255, 250, 250, 1],
  'springgreen': [0, 255, 127, 1],
  'steelblue': [70, 130, 180, 1],
  'tan': [210, 180, 140, 1],
  'teal': [0, 128, 128, 1],
  'thistle': [216, 191, 216, 1],
  'tomato': [255, 99, 71, 1],
  'turquoise': [64, 224, 208, 1],
  'violet': [238, 130, 238, 1],
  'wheat': [245, 222, 179, 1],
  'white': [255, 255, 255, 1],
  'whitesmoke': [245, 245, 245, 1],
  'yellow': [255, 255, 0, 1],
  'yellowgreen': [154, 205, 50, 1]
};

function clampCssByte(i) {
  // Clamp to integer 0 .. 255.
  i = Math.round(i); // Seems to be what Chrome does (vs truncation).

  return i < 0 ? 0 : i > 255 ? 255 : i;
}

function clampCssAngle(i) {
  // Clamp to integer 0 .. 360.
  i = Math.round(i); // Seems to be what Chrome does (vs truncation).

  return i < 0 ? 0 : i > 360 ? 360 : i;
}

function clampCssFloat(f) {
  // Clamp to float 0.0 .. 1.0.
  return f < 0 ? 0 : f > 1 ? 1 : f;
}

function parseCssInt(str) {
  // int or percentage.
  if (str.length && str.charAt(str.length - 1) === '%') {
    return clampCssByte(_parseFloat(str) / 100 * 255);
  }

  return clampCssByte(_parseInt(str, 10));
}

function parseCssFloat(str) {
  // float or percentage.
  if (str.length && str.charAt(str.length - 1) === '%') {
    return clampCssFloat(_parseFloat(str) / 100);
  }

  return clampCssFloat(_parseFloat(str));
}

function cssHueToRgb(m1, m2, h) {
  if (h < 0) {
    h += 1;
  } else if (h > 1) {
    h -= 1;
  }

  if (h * 6 < 1) {
    return m1 + (m2 - m1) * h * 6;
  }

  if (h * 2 < 1) {
    return m2;
  }

  if (h * 3 < 2) {
    return m1 + (m2 - m1) * (2 / 3 - h) * 6;
  }

  return m1;
}

function lerpNumber(a, b, p) {
  return a + (b - a) * p;
}

function setRgba(out, r, g, b, a) {
  out[0] = r;
  out[1] = g;
  out[2] = b;
  out[3] = a;
  return out;
}

function copyRgba(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * 颜色解析--将颜色字符串解析为 rgba 数组
 * @param {string} colorStr 颜色字符串--red/blue之类的，或者 #123/#abc123之类的，又或者(12, 12, 12)/(12, 12, 12, 1)之类的
 * @param {Array.<number>} rgbaArr 输出rgba数组：可选--改变原值
 * @return {Array.<number>} rgba数组
 * @memberOf module:color
 */


function parse(colorStr, rgbaArr) {
  if (!colorStr) {
    return;
  }

  rgbaArr = rgbaArr || []; // colorStr may be not string

  colorStr = colorStr + ''; // Remove all whitespace, not compliant, but should just be more accepting.

  var str = colorStr.replace(/ /g, '').toLowerCase(); // Color keywords (and transparent) lookup.

  if (str in kCSSColorTable) {
    copyRgba(rgbaArr, kCSSColorTable[str]);
    return rgbaArr;
  } // #abc and #abc123 syntax.


  if (str.charAt(0) === '#') {
    if (str.length === 4) {
      var iv = _parseInt(str.substr(1), 16); // TODO(deanm): Stricter parsing.


      if (!(iv >= 0 && iv <= 0xfff)) {
        setRgba(rgbaArr, 0, 0, 0, 1);
        return; // Covers NaN.
      }

      setRgba(rgbaArr, (iv & 0xf00) >> 4 | (iv & 0xf00) >> 8, iv & 0xf0 | (iv & 0xf0) >> 4, iv & 0xf | (iv & 0xf) << 4, 1);
      return rgbaArr;
    } else if (str.length === 7) {
      var _iv = _parseInt(str.substr(1), 16); // TODO(deanm): Stricter parsing.


      if (!(_iv >= 0 && _iv <= 0xffffff)) {
        setRgba(rgbaArr, 0, 0, 0, 1);
        return; // Covers NaN.
      }

      setRgba(rgbaArr, (_iv & 0xff0000) >> 16, (_iv & 0xff00) >> 8, _iv & 0xff, 1);
      return rgbaArr;
    }

    return;
  }

  var op = str.indexOf('(');
  var ep = str.indexOf(')');

  if (op !== -1 && ep + 1 === str.length) {
    var fname = str.substr(0, op);
    var params = str.substr(op + 1, ep - (op + 1)).split(',');
    var alpha = 1; // To allow case fallthrough.

    switch (fname) {
      case 'rgba':
        if (params.length !== 4) {
          setRgba(rgbaArr, 0, 0, 0, 1);
          return;
        }

        alpha = parseCssFloat(params.pop());
      // jshint ignore:line
      // Fall through.

      case 'rgb':
        if (params.length !== 3) {
          setRgba(rgbaArr, 0, 0, 0, 1);
          return;
        }

        setRgba(rgbaArr, parseCssInt(params[0]), parseCssInt(params[1]), parseCssInt(params[2]), alpha);
        return rgbaArr;

      case 'hsla':
        if (params.length !== 4) {
          setRgba(rgbaArr, 0, 0, 0, 1);
          return;
        }

        params[3] = parseCssFloat(params[3]);
        hsla2rgba(params, rgbaArr);
        return rgbaArr;

      case 'hsl':
        if (params.length !== 3) {
          setRgba(rgbaArr, 0, 0, 0, 1);
          return;
        }

        hsla2rgba(params, rgbaArr);
        return rgbaArr;

      default:
        return;
    }
  }

  setRgba(rgbaArr, 0, 0, 0, 1);
  return;
}
/**
 * hsla 转换成 rgba
 * @param {Array.<number>} hsla hsla 数组
 * @param {Array.<number>} rgba 输出 rgba 数组：可选--改变原值
 * @return {Array.<number>} rgba数组
 * @memberOf module:color
 */

function hsla2rgba(hsla, rgba) {
  var h = (_parseFloat(hsla[0]) % 360 + 360) % 360 / 360; // 0 .. 1
  // NOTE(deanm): According to the CSS spec s/l should only be
  // percentages, but we don't bother and let float or percentage.

  var s = parseCssFloat(hsla[1]);
  var l = parseCssFloat(hsla[2]);
  var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
  var m1 = l * 2 - m2;
  rgba = rgba || [];
  setRgba(rgba, clampCssByte(cssHueToRgb(m1, m2, h + 1 / 3) * 255), clampCssByte(cssHueToRgb(m1, m2, h) * 255), clampCssByte(cssHueToRgb(m1, m2, h - 1 / 3) * 255), 1);

  if (hsla.length === 4) {
    rgba[3] = hsla[3];
  }

  return rgba;
}
/**
 * rgba 转换成 hsla
 * @param {Array.<number>} rgba rgba 数组
 * @param {Array.<number>} hsla 输出 hsla 数组：可选--改变原值
 * @return {Array.<number>} hsla数组
 * @memberOf module:color
 */

function rgba2hsla(rgba, hsla) {
  if (!rgba) {
    return;
  }

  hsla = hsla || []; // RGB from 0 to 255

  var R = rgba[0] / 255;
  var G = rgba[1] / 255;
  var B = rgba[2] / 255;
  var vMin = Math.min(R, G, B); // Min. value of RGB

  var vMax = Math.max(R, G, B); // Max. value of RGB

  var delta = vMax - vMin; // Delta RGB value

  var L = (vMax + vMin) / 2;
  var H;
  var S; // HSL results from 0 to 1

  if (delta === 0) {
    H = 0;
    S = 0;
  } else {
    if (L < 0.5) {
      S = delta / (vMax + vMin);
    } else {
      S = delta / (2 - vMax - vMin);
    }

    var deltaR = ((vMax - R) / 6 + delta / 2) / delta;
    var deltaG = ((vMax - G) / 6 + delta / 2) / delta;
    var deltaB = ((vMax - B) / 6 + delta / 2) / delta;

    if (R === vMax) {
      H = deltaB - deltaG;
    } else if (G === vMax) {
      H = 1 / 3 + deltaR - deltaB;
    } else if (B === vMax) {
      H = 2 / 3 + deltaG - deltaR;
    }

    if (H < 0) {
      H += 1;
    }

    if (H > 1) {
      H -= 1;
    }
  }

  hsla[0] = H * 360;
  hsla[1] = S;
  hsla[2] = L; // hsla = [H * 360, S, L];

  if (rgba[3] != null) {
    hsla.push(rgba[3]);
  }

  return hsla;
}
/**
 * 提高亮度
 * @param {string} color 颜色字符串--同 parse 参数
 * @param {number} level 提高等级
 * @return {string} rgba/rga 字符串
 * @memberOf module:color
 */

function lift(color, level) {
  var colorArr = parse(color);

  if (colorArr) {
    for (var i = 0; i < 3; i++) {
      if (level < 0) {
        colorArr[i] = colorArr[i] * (1 - level) | 0;
      } else {
        colorArr[i] = (255 - colorArr[i]) * level + colorArr[i] | 0;
      }

      if (colorArr[i] > 255) {
        colorArr[i] = 255;
      } else if (color[i] < 0) {
        colorArr[i] = 0;
      }
    }

    return stringify(colorArr, colorArr.length === 4 ? 'rgba' : 'rgb');
  }
}
/**
 * 转为十六进制
 * @param {string} color 颜色字符串--同 parse 参数
 * @return {string}
 * @memberOf module:color
 */

function toHex(color) {
  var colorArr = parse(color);

  if (colorArr) {
    return ((1 << 24) + (colorArr[0] << 16) + (colorArr[1] << 8) + +colorArr[2]).toString(16).slice(1);
  }
}
/**
 * 快速插值
 * @param {number} normalizedValue 0-1之间的浮点数
 * @param {Array.<Array.<number>>} colors 颜色数组，元素是 rgba 颜色数组
 * @param {Array.<number>} [out] 输出 rgba 数组：可选--改变原值
 * @return {Array.<number>} 如果输入值非法，将返回 null/undefined
 */

function fastLerp(normalizedValue, colors, out) {
  if (!(colors && colors.length) || !(normalizedValue >= 0 && normalizedValue <= 1)) {
    return;
  }

  out = out || [];
  var value = normalizedValue * (colors.length - 1);
  var leftIndex = Math.floor(value);
  var rightIndex = Math.ceil(value);
  var leftColor = colors[leftIndex];
  var rightColor = colors[rightIndex];
  var dv = value - leftIndex;
  out[0] = clampCssByte(lerpNumber(leftColor[0], rightColor[0], dv));
  out[1] = clampCssByte(lerpNumber(leftColor[1], rightColor[1], dv));
  out[2] = clampCssByte(lerpNumber(leftColor[2], rightColor[2], dv));
  out[3] = clampCssFloat(lerpNumber(leftColor[3], rightColor[3], dv));
  return out;
}
/**
 * 插值
 * @param {number} normalizedValue 0-1之间的浮点数
 * @param {Array.<string>} colors 颜色数组，元素是 rgba 颜色数组
 * @param {boolean=} fullOutput 是否输出完整值
 * @return {(string|Object)} Result color. If fullOutput,
 *                           return {color: ..., leftIndex: ..., rightIndex: ..., value: ...},
 * @memberOf module:color
 */

function lerp(normalizedValue, colors, fullOutput) {
  if (!(colors && colors.length) || !(normalizedValue >= 0 && normalizedValue <= 1)) {
    return;
  }

  var value = normalizedValue * (colors.length - 1);
  var leftIndex = Math.floor(value);
  var rightIndex = Math.ceil(value);
  var leftColor = parse(colors[leftIndex]);
  var rightColor = parse(colors[rightIndex]);
  var dv = value - leftIndex;
  var color = stringify([clampCssByte(lerpNumber(leftColor[0], rightColor[0], dv)), clampCssByte(lerpNumber(leftColor[1], rightColor[1], dv)), clampCssByte(lerpNumber(leftColor[2], rightColor[2], dv)), clampCssFloat(lerpNumber(leftColor[3], rightColor[3], dv))], 'rgba');
  return fullOutput ? {
    color: color,
    leftIndex: leftIndex,
    rightIndex: rightIndex,
    value: value
  } : color;
}
/**
 * 改变 hsl
 * @param {string} color 颜色字符串--同 parse 参数
 * @param {number=} h 色相：0 ~ 360
 * @param {number=} s 饱和度：0 ~ 1
 * @param {number=} l 亮度：0 ~ 1
 * @return {string} rgba格式的颜色字符串
 * @memberOf module:color
 */

function modifyHSL(color, h, s, l) {
  color = parse(color);

  if (color) {
    color = rgba2hsla(color);
    h != null && (color[0] = clampCssAngle(h));
    s != null && (color[1] = parseCssFloat(s));
    l != null && (color[2] = parseCssFloat(l));
    return stringify(hsla2rgba(color), 'rgba');
  }
}
/**
 * 改变透明度
 * @param {string} color 颜色字符串--同 parse 参数
 * @param {number=} alpha 透明度：0 ~ 1
 * @return {string} rgba格式的颜色字符串
 * @memberOf module:color
 */

function modifyAlpha(color, alpha) {
  color = parse(color);

  if (color && alpha != null) {
    color[3] = clampCssFloat(alpha);
    return stringify(color, 'rgba');
  }
}
/**
 * 字符串化
 * @param {Array.<number>} arrColor like [12,33,44,0.4]
 * @param {string} type 'rgba', 'hsva', 'hsla'
 * @return {string} Result color. (If input illegal, return undefined).
 */

function stringify(arrColor, type) {
  if (!arrColor || !arrColor.length) {
    return;
  }

  var colorStr = arrColor[0] + ',' + arrColor[1] + ',' + arrColor[2];

  if (type === 'rgba' || type === 'hsva' || type === 'hsla') {
    colorStr += ',' + arrColor[3];
  }

  return type + '(' + colorStr + ')';
} // 导出全部

var color = {
  parse: parse,
  hsla2rgba: hsla2rgba,
  rgba2hsla: rgba2hsla,
  toHex: toHex,
  lift: lift,
  fastLerp: fastLerp,
  lerp: lerp,
  modifyHSL: modifyHSL,
  modifyAlpha: modifyAlpha,
  stringify: stringify
};

/**
 * @module index
 * @file 入口文件
 */
/**
 * 版本
 * @member
 */

var version = '1.1.0';
/**
 * 全部导出
 */

var index = {
  version: version,
  array: array,
  util: util,
  math: math,
  object: object,
  string: string,
  tree: tree,
  validate: validate,
  color: color
};

export default index;

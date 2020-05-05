import isArray from 'lodash/isArray';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';
import isNumber from 'lodash/isNumber';
import isFunction from 'lodash/isFunction';
import _Date$now from '@babel/runtime-corejs2/core-js/date/now';
import _Object$assign from '@babel/runtime-corejs2/core-js/object/assign';
import _Object$keys from '@babel/runtime-corejs2/core-js/object/keys';
import isObject from 'lodash/isObject';
import cloneDeep from 'lodash/cloneDeep';
import isString from 'lodash/isString';
import uniq from 'lodash/uniq';

/**
 * 基本方法--实际上是不好归类的方法
 * @module error
 */

/**
 * 报错
 * @memberOf module:error
 */
function error(msg) {
  throw new Error(msg || '出错了');
} // 导出全部

var base = {
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
 * 种子随机数
 * @memberOf module:math
 * @param {number} seed 
 * @param {number} max 
 * @param {number} min 
 */

function seedRandom(seed, max, min) {
  seed = isNumber(seed) ? seed : _Date$now();
  max = isNumber(max) ? max : 1;
  min = isNumber(min) ? min : 0;
  seed = (seed * 9301 + 49297) % 233280;
  var rnd = seed / 233280.0;
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
  var uuid = [],
      i;
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
  var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|top|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
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
 * 非负整数
 * @memberOf module:validate
 * @param {string} str 
 */

function validateNotPositiveInteger(str) {
  var reg = /^[1-9]\d*|0$/;
  return reg.test(str);
}
/**
 * 非正整数
 * @memberOf module:validate
 * @param {string} str 
 */

function validateNotNegativeInteger(str) {
  var reg = /^-[1-9]\d*|0$/;
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
 * 正浮点数验证（不超过n位小数--默认2）
 * @memberOf module:validate
 * @param {string} str 
 * @param {number} n 
 */

function validateFloatZ(str, n) {
  var reg = new RegExp("/^([1-9][\\d]{0,7}|0)(\\.[\\d]{1,".concat(n || 2, "})?$/"));
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
  pwd: validatePwd,
  notEmpty: validateNotEmpty,
  phone: validatePhone,
  longitude: validateLongitude,
  latitude: validateLatitude,
  date: validateDate,
  floatZ: validateFloatZ
};

/**
 * 树结构相关方法
 * @module tree
 */
/**
 * 对树进行查找，找到则返回节点数组，否则返回空数组。
 * @memberOf module:tree
 * @param {Array} tree：树
 * @param {string} key: 查找键名
 * @param {primitive} value: 查找键值--只支持基本值
 * @param {string} childNodeName: 子节点名称
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

  for (var i = 0, len = tree.lengt; i < len; i++) {
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
 * @param {string} oldProperty // 旧属性
 * @param {string} newProperty // 新属性
 * @param {string} childNodeName // 子节点名称
 * @param {Function} callback // 可选参数，转变过程中的回调函数，参数是旧值和节点，返回值是新值
 * @returns {Array} 修改后的原数据
 */

function setProperty(tree, oldProperty, newProperty, childNodeName, callback) {
  if (!isArray(tree)) {
    error('函数 setProperty 树数据需要是数组');
  } // 如果键名为空，直接返回空数组


  if (!validateNotEmpty(oldProperty) || !validateNotEmpty(newProperty)) return [];
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
 * @param {string} parentProperty // 父节点属性名称
 * @param {string} childProperty // 需要添加的子节点属性名称
 * @param {string} childNodeName // 子节点名称
 * @returns {Array} 修改后的原数据
 */

function setPropertyFromParent(tree, parentProperty, childProperty, childNodeName) {
  if (!isArray(tree)) {
    error('函数 setPropertyFromParent 树数据需要是数组');
  } // 如果键名为空，直接返回空数组


  if (!validateNotEmpty(parentProperty) || !validateNotEmpty(childProperty)) return [];
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
    var item = null;

    for (var i = 0, len = tree.length; i < len; i++) {
      if (isArray(item[childNodeName])) {
        if (item[childNodeName].length === 0) {
          delete item[childNodeName];
        } else {
          _(item[childNodeName]);
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
 * @param {string} key // 筛选键名，可选
 * @param {primitive} value // 筛选键值，可选
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

/**
 * @module index
 * @file 入口文件
 */
/**
 * 全部导出
 */

var index = {
  array: array,
  base: base,
  math: math,
  object: object,
  string: string,
  tree: tree,
  validate: validate
};

export default index;

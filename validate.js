/**
 * 验证方法，部分方法来自vue-element-admin框架，部分前同事 @曹可凡 所写，部分自己所写
 */

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|top|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/* 验证手机号*/
export function validateMobile(str) {
  const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
  return reg.test(str)
}

/* 验证非零正整数*/
export function validatePositiveIntegerNonzero(str) {
  const reg = /^[1-9]\d*$/
  return reg.test(str)
}

/* 验证非零负整数*/
export function validateNegativeIntegerNonzero(str) {
  const reg = /^-[1-9]\d*$/
  return reg.test(str)
}

/* 验证非负整数*/
export function validatePositiveInteger(str) {
  const reg = /^[1-9]\d*|0$/
  return reg.test(str)
}

/* 验证非正整数*/
export function validateNegativeInteger(str) {
  const reg = /^-[1-9]\d*|0$/
  return reg.test(str)
}

/* 验证密码*/
export function validatePwd(str) {
  const reg = /^[0-9A-Za-z]{6,20}$/
  return reg.test(str)
}

/* 验证非空*/
export function validateNotEmpty(str) {
  return !!str.length
}

/* 验证联系方式（电话或手机） */
export function validatePhone(number) {
  const reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/
  return reg.test(number)
}

/* 经度验证 */
export function validateLongitude(str) {
  const reg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/
  return reg.test(str)
}

/* 纬度验证 */
export function validateLatitude(str) {
  const reg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/
  return reg.test(str)
}

/* 日期验证 */
export function validateDate(str) {
  const reg = /^((((19|20)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((19|20)\d{2})-(0?[469]|11)-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-(0?[1-9]|[12]\d)))$/
  return reg.test(str)
}

/* 正浮点数验证（不超过两位小数） */
export function validateFloatZ(str) {
  const reg = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/
  return reg.test(str)
} 

/* 1-无穷大正整数验证 */
export function validateNumberZ(str) {
  const reg = /^[0-9]*[1-9][0-9]*$/
  return reg.test(str)
}

/**
 * 全部导出
 */
export default {
  URL: validateURL,
  lowerCase: validateLowerCase,
  upperCase: validateUpperCase,
  alphabets: validateAlphabets,
  email: validateEmail,
  mobile: validateMobile,
  negativeIntegerNonzero: validateNegativeIntegerNonzero,
  negativeIntegerNonzero: validateNegativeInteger,
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
}
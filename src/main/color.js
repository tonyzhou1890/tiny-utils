// from zrender
/**
 * 颜色相关方法
 * @module color
 */
const kCSSColorTable = {
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

function clampCssByte(i) { // Clamp to integer 0 .. 255.
  i = Math.round(i); // Seems to be what Chrome does (vs truncation).
  return i < 0 ? 0 : i > 255 ? 255 : i;
}

function clampCssAngle(i) { // Clamp to integer 0 .. 360.
  i = Math.round(i); // Seems to be what Chrome does (vs truncation).
  return i < 0 ? 0 : i > 360 ? 360 : i;
}

function clampCssFloat(f) { // Clamp to float 0.0 .. 1.0.
  return f < 0 ? 0 : f > 1 ? 1 : f;
}

function parseCssInt(str) { // int or percentage.
  if (str.length && str.charAt(str.length - 1) === '%') {
    return clampCssByte(parseFloat(str) / 100 * 255);
  }
  return clampCssByte(parseInt(str, 10));
}

function parseCssFloat(str) { // float or percentage.
  if (str.length && str.charAt(str.length - 1) === '%') {
    return clampCssFloat(parseFloat(str) / 100);
  }
  return clampCssFloat(parseFloat(str));
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
 * @param {string} colorStr 颜色字符串--red/blue之类的，或者 #123/#abc123之类的，又或者rgb(12, 12, 12)/rgba(12, 12, 12, 1)/hsl(1, 1, 1)/hsla(1, 1, 1, 1)之类的
 * @param {Array.<number>} rgbaArr 输出rgba数组：可选--改变原值
 * @return {Array.<number>} rgba数组
 * @memberOf module:color
 */
export function parse(colorStr, rgbaArr) {
  if (!colorStr) {
    return;
  }
  rgbaArr = rgbaArr || [];

  // colorStr may be not string
  colorStr = colorStr + '';
  // Remove all whitespace, not compliant, but should just be more accepting.
  let str = colorStr.replace(/ /g, '').toLowerCase();

  // Color keywords (and transparent) lookup.
  if (str in kCSSColorTable) {
    copyRgba(rgbaArr, kCSSColorTable[str]);
    return rgbaArr;
  }

  // #abc and #abc123 syntax.
  if (str.charAt(0) === '#') {
    if (str.length === 4) {
      let iv = parseInt(str.substr(1), 16); // TODO(deanm): Stricter parsing.
      if (!(iv >= 0 && iv <= 0xfff)) {
        setRgba(rgbaArr, 0, 0, 0, 1);
        return; // Covers NaN.
      }
      setRgba(rgbaArr,
        ((iv & 0xf00) >> 4) | ((iv & 0xf00) >> 8),
        (iv & 0xf0) | ((iv & 0xf0) >> 4),
        (iv & 0xf) | ((iv & 0xf) << 4),
        1
      );
      return rgbaArr;
    } else if (str.length === 7) {
      let iv = parseInt(str.substr(1), 16); // TODO(deanm): Stricter parsing.
      if (!(iv >= 0 && iv <= 0xffffff)) {
        setRgba(rgbaArr, 0, 0, 0, 1);
        return; // Covers NaN.
      }
      setRgba(rgbaArr,
        (iv & 0xff0000) >> 16,
        (iv & 0xff00) >> 8,
        iv & 0xff,
        1
      );
      return rgbaArr;
    }

    return;
  }
  let op = str.indexOf('(');
  let ep = str.indexOf(')');
  if (op !== -1 && ep + 1 === str.length) {
    let fname = str.substr(0, op);
    let params = str.substr(op + 1, ep - (op + 1)).split(',');
    let alpha = 1; // To allow case fallthrough.
    switch (fname) {
      case 'rgba':
        if (params.length !== 4) {
          setRgba(rgbaArr, 0, 0, 0, 1);
          return;
        }
        alpha = parseCssFloat(params.pop()); // jshint ignore:line
        // Fall through.
      case 'rgb':
        if (params.length !== 3) {
          setRgba(rgbaArr, 0, 0, 0, 1);
          return;
        }
        setRgba(rgbaArr,
          parseCssInt(params[0]),
          parseCssInt(params[1]),
          parseCssInt(params[2]),
          alpha
        );
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
export function hsla2rgba(hsla, rgba) {
  let h = (((parseFloat(hsla[0]) % 360) + 360) % 360) / 360; // 0 .. 1
  // NOTE(deanm): According to the CSS spec s/l should only be
  // percentages, but we don't bother and let float or percentage.
  let s = parseCssFloat(hsla[1]);
  let l = parseCssFloat(hsla[2]);
  let m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
  let m1 = l * 2 - m2;

  rgba = rgba || [];
  setRgba(rgba,
    clampCssByte(cssHueToRgb(m1, m2, h + 1 / 3) * 255),
    clampCssByte(cssHueToRgb(m1, m2, h) * 255),
    clampCssByte(cssHueToRgb(m1, m2, h - 1 / 3) * 255),
    1
  );

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
export function rgba2hsla(rgba, hsla) {
  if (!rgba) {
    return;
  }

  hsla = hsla || []

  // RGB from 0 to 255
  let R = rgba[0] / 255;
  let G = rgba[1] / 255;
  let B = rgba[2] / 255;

  let vMin = Math.min(R, G, B); // Min. value of RGB
  let vMax = Math.max(R, G, B); // Max. value of RGB
  let delta = vMax - vMin; // Delta RGB value

  let L = (vMax + vMin) / 2;
  let H;
  let S;
  // HSL results from 0 to 1
  if (delta === 0) {
    H = 0;
    S = 0;
  } else {
    if (L < 0.5) {
      S = delta / (vMax + vMin);
    } else {
      S = delta / (2 - vMax - vMin);
    }

    let deltaR = (((vMax - R) / 6) + (delta / 2)) / delta;
    let deltaG = (((vMax - G) / 6) + (delta / 2)) / delta;
    let deltaB = (((vMax - B) / 6) + (delta / 2)) / delta;

    if (R === vMax) {
      H = deltaB - deltaG;
    } else if (G === vMax) {
      H = (1 / 3) + deltaR - deltaB;
    } else if (B === vMax) {
      H = (2 / 3) + deltaG - deltaR;
    }

    if (H < 0) {
      H += 1;
    }

    if (H > 1) {
      H -= 1;
    }
  }

  hsla[0] = H * 360
  hsla[1] = S
  hsla[2] = L
  // hsla = [H * 360, S, L];

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
export function lift(color, level) {
  let colorArr = parse(color);
  if (colorArr) {
    for (let i = 0; i < 3; i++) {
      if (level < 0) {
        colorArr[i] = colorArr[i] * (1 - level) | 0;
      } else {
        colorArr[i] = ((255 - colorArr[i]) * level + colorArr[i]) | 0;
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
export function toHex(color) {
  let colorArr = parse(color);
  if (colorArr) {
    return ((1 << 24) + (colorArr[0] << 16) + (colorArr[1] << 8) + (+colorArr[2])).toString(16).slice(1);
  }
}

/**
 * 快速插值
 * @param {number} normalizedValue 0-1之间的浮点数
 * @param {Array.<Array.<number>>} colors 颜色数组，元素是 rgba 颜色数组
 * @param {Array.<number>} [out] 输出 rgba 数组：可选--改变原值
 * @return {Array.<number>} 如果输入值非法，将返回 null/undefined
 */
export function fastLerp(normalizedValue, colors, out) {
  if (!(colors && colors.length) ||
    !(normalizedValue >= 0 && normalizedValue <= 1)
  ) {
    return;
  }

  out = out || [];

  let value = normalizedValue * (colors.length - 1);
  let leftIndex = Math.floor(value);
  let rightIndex = Math.ceil(value);
  let leftColor = colors[leftIndex];
  let rightColor = colors[rightIndex];
  let dv = value - leftIndex;
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
export function lerp(normalizedValue, colors, fullOutput) {
  if (!(colors && colors.length) ||
    !(normalizedValue >= 0 && normalizedValue <= 1)
  ) {
    return;
  }

  let value = normalizedValue * (colors.length - 1);
  let leftIndex = Math.floor(value);
  let rightIndex = Math.ceil(value);
  let leftColor = parse(colors[leftIndex]);
  let rightColor = parse(colors[rightIndex]);
  let dv = value - leftIndex;

  let color = stringify(
    [
      clampCssByte(lerpNumber(leftColor[0], rightColor[0], dv)),
      clampCssByte(lerpNumber(leftColor[1], rightColor[1], dv)),
      clampCssByte(lerpNumber(leftColor[2], rightColor[2], dv)),
      clampCssFloat(lerpNumber(leftColor[3], rightColor[3], dv))
    ],
    'rgba'
  );

  return fullOutput ?
    {
      color: color,
      leftIndex: leftIndex,
      rightIndex: rightIndex,
      value: value
    } :
    color;
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
export function modifyHSL(color, h, s, l) {
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
export function modifyAlpha(color, alpha) {
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
export function stringify(arrColor, type) {
  if (!arrColor || !arrColor.length) {
    return;
  }
  let colorStr = arrColor[0] + ',' + arrColor[1] + ',' + arrColor[2];
  if (type === 'rgba' || type === 'hsva' || type === 'hsla') {
    colorStr += ',' + arrColor[3];
  }
  return type + '(' + colorStr + ')';
}

// 导出全部
export default {
  parse,
  hsla2rgba,
  rgba2hsla,
  toHex,
  lift,
  fastLerp,
  lerp,
  modifyHSL,
  modifyAlpha,
  stringify
}
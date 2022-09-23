"use strict";
exports.__esModule = true;
/**
 * 字符串编码
 * @param {String} str 字符串
 * @returns {data:编码集,key:解码key}
 */
function encode(str) {
    var data = "", key = "";
    if (!Boolean(str)) {
        return { data: data, key: key };
    }
    var length = 0, number = 0;
    for (var i = 0; i < str.length; i++) {
        var s_1 = str.charCodeAt(i).toString(16);
        data += s_1;
        if (length === s_1.length) {
            number += 1;
        }
        else {
            if (length) {
                var s_2 = "@".concat(length, "@").concat(number);
                key += "#".concat(s_2.length, "#").concat(s_2);
            }
            length = s_1.length;
            number = 1;
        }
    }
    var s = "@".concat(length, "@").concat(number);
    key += "#".concat(s.length, "#").concat(s);
    return { data: data, key: key };
}
/**
 * 解码
 * @param {String} data 编码集
 * @param {String} key 解码key
 * @returns 解码后的字符串
 */
function decode(data, key) {
    var str = "", lengths = __deKey(key);
    if (!Boolean(data) || !Boolean(key)) {
        return str;
    }
    for (var index = 0, i = 1; i < lengths.length; i += 2) {
        for (var n = 0; n < Number(lengths[i + 1]); n++) {
            var endIndex = index + Number(lengths[i]);
            var code = data.slice(index, endIndex);
            str += String.fromCharCode(parseInt(code, 16));
            index = endIndex;
        }
    }
    return str;
}
/**
 * 解析key
 * @param {String} key
 * @returns
 */
function __deKey(key) {
    var keys = key.split("#"), lengths = "";
    for (var i = 1; i < keys.length; i += 2) {
        lengths += keys[i + 1];
    }
    return lengths.split("@");
}
exports["default"] = { encode: encode, decode: decode };

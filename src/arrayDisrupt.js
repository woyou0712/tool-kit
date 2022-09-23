"use strict";
exports.__esModule = true;
var $md5 = require("js-md5");
/**
 * 使用固定的顺序打乱数组
 * @param {any[]} list 原数组
 * @param {string} key 打乱所依赖的key
 * @returns list 返回被打乱的原数组
 */
function default_1(list, key) {
    if (!Array.isArray(list) || !list.length) {
        return [];
    }
    // 如果没有key，则随机打乱
    var str = String(key ? key : Math.random());
    str = $md5(str); // 将key值使用MD5加密
    var decode = ""; // 将序列化的字符串转换成code编码并拼接储存
    for (var i = 0; i < str.length; i++) {
        decode += String(str[i].charCodeAt(0));
    }
    // i:遍历数组,num:记录decode取值的位置
    for (var i = 0, num = 0; i < list.length; i++) {
        var index = 0;
        for (var j = num; i < decode.length; j++) {
            // 如果当前值小于数组长度,则取当前值为下标
            if (Number(decode[j]) < list.length) {
                index = Number(decode[j]);
                num = j + 1; // 下次从下一个地方开始遍历
                break;
            }
        }
        var item = list.splice(index, 1)[0];
        list.push(item);
    }
    return list;
}
exports["default"] = default_1;

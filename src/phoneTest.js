"use strict";
exports.__esModule = true;
/**
 * 验证联系方式
 * @param {String} phone 联系号码字符串
 * @returns Boolean
 * */
function default_1(phone) {
    if (!phone) {
        return false;
    }
    phone = String(phone);
    var reg = /^((0|(\+86))\s?)?1[3-9]\d{9}$/; // 手机
    // let reg2 = /^([0,4,8]\d{2,3}(\-|\s)?)?\d{7,8}$/; // 座机
    return reg.test(phone);
}
exports["default"] = default_1;

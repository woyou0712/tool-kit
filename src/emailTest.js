"use strict";
exports.__esModule = true;
/**
 * 验证电子邮箱
 * @param {String} email 电子邮箱
 * @returns Boolean
 * */
function default_1(email) {
    if (!email) {
        return false;
    }
    email = String(email);
    var reg = /^[\w\.\-]+@\w+\.\w+$/; // email
    return Boolean(reg.test(email));
}
exports["default"] = default_1;

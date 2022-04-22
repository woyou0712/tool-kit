/**
 * 验证电子邮箱
 * @param {String} email 电子邮箱
 * @returns Boolean
 * */
module.exports = function (email) {
  if (!email) {
    return false
  }
  email = String(email);
  let reg = /^[\w\.\-]+@\w+\.\w+$/; // email
  return Boolean(reg.test(email))
}

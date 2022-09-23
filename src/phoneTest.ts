/**
 * 验证联系方式
 * @param {String} phone 联系号码字符串
 * @returns Boolean
 * */
export default function (phone: string): boolean {
  if (!phone) {
    return false
  }
  phone = String(phone);
  let reg = /^((0|(\+86))\s?)?1[3-9]\d{9}$/; // 手机
  // let reg2 = /^([0,4,8]\d{2,3}(\-|\s)?)?\d{7,8}$/; // 座机
  return reg.test(phone)
}

const $md5 = require("js-md5")
/**
 * 使用固定的顺序打乱数组
 * @param {Array} list 原数组
 * @param {String} key 打乱所依赖的key
 * @returns list 返回被打乱的原数组
 */
module.exports = function (list, key) {
  if (!Array.isArray(list) || !list.length) {
    return []
  }
  // 如果没有key，则随机打乱
  if (!key) {
    key = Math.random()
  }
  if (typeof key !== "string") {
    key = JSON.stringify(key)
  }
  key = $md5(key) // 将key值使用MD5加密
  let decode = ""; // 将序列化的字符串转换成code编码并拼接储存
  for (let i of key) {
    decode += String(i.codePointAt())
  }
  // i:遍历数组,num:记录decode取值的位置
  for (let i = 0, num = 0; i < list.length; i++) {
    let index = 0;
    for (let j = num; i < decode.length; j++) {
      // 如果当前值小于数组长度,则取当前值为下标
      if (decode[j] < list.length) {
        index = decode[j];
        num = j + 1; // 下次从下一个地方开始遍历
        break
      }
    }
    let item = list.splice(index, 1)[0]
    list.push(item)
  }
  return list
}

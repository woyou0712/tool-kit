/**
 * 字符串编码
 * @param {String} str 字符串
 * @returns {data:编码集,key:解码key}
 */
function encode(str) {
  let data = "", key = "";
  for (var i = 0; i < str.length; i++) {
    let s = str.charCodeAt(i).toString(16);
    data += s;
    key += s.length;
  }
  return { data, key }
}
/**
 * 解码
 * @param {String} data 编码集
 * @param {String} key 解码key
 * @returns 解码后的字符串
 */
function decode(data, key) {
  let str = ""
  for (let index = 0, i = 0; i < key.length; index += Number(key[i]), i++) {
    let code = data.slice(index, index + Number(key[i]));
    str += String.fromCharCode(parseInt(code, 16));
  }
  return str
}

module.exports = { encode, decode }
/**
 * 字符串编码
 * @param {String} str 字符串
 * @returns {data:编码集,key:解码key}
 */
function encode(str) {
  let data = "", key = "";
  let length = null, number = 0;
  for (var i = 0; i < str.length; i++) {
    let s = str.charCodeAt(i).toString(16);
    data += s;
    if (length === s.length) {
      number += 1;
    } else {
      if (length) {
        let s = `@${length}@${number}`
        key += `#${s.length}#${s}`
      }
      length = s.length;
      number = 1;
    }
  }
  let s = `@${length}@${number}`
  key += `#${s.length}#${s}`
  return { data, key }
}


/**
 * 解码
 * @param {String} data 编码集
 * @param {String} key 解码key
 * @returns 解码后的字符串
 */
function decode(data, key) {
  let str = "", lengths = __deKey(key);
  for (let index = 0, i = 1; i < lengths.length; i += 2) {
    for (let n = 0; n < lengths[i + 1]; n++) {
      let endIndex = index + Number(lengths[i])
      let code = data.slice(index, endIndex);
      str += String.fromCharCode(parseInt(code, 16));
      index = endIndex;
    }
  }
  return str
}
/**
 * 解析key
 * @param {String} key 
 * @returns 
 */
function __deKey(key) {
  let keys = key.split("#"), lengths = "";
  for (let i = 1; i < keys.length; i += 2) {
    lengths += keys[i + 1];
  }
  lengths = lengths.split("@")
  return lengths;
}

module.exports = { encode, decode }
/**
 * 字符串编码
 * @param {String} str 字符串
 * @returns {data:编码集,key:解码key}
 */
function encode(str: string): { data: string; key: string } {
  let data = "", key = "";
  if (!Boolean(str)) {
    return { data, key }
  }
  let length = 0, number = 0;
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
function decode(data: string, key: string): string {
  let str = "", lengths = __deKey(key);
  if (!Boolean(data) || !Boolean(key)) {
    return str
  }
  for (let index = 0, i = 1; i < lengths.length; i += 2) {
    for (let n = 0; n < Number(lengths[i + 1]); n++) {
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
function __deKey(key: string): string[] {
  let keys = key.split("#"), lengths = "";
  for (let i = 1; i < keys.length; i += 2) {
    lengths += keys[i + 1];
  }

  return lengths.split("@");
}

export default { encode, decode }
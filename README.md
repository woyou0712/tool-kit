# Js常用工具集合

## 简易的字符串加密和解码
```
const { encode, decode } = require("mini-toolkit")

var text = '字符串可以存储一系列字符，如 "John Doe"。';
var { data, key } = encode(text);
console.log(data, key) // 5b577b264e3253ef4ee55b5850a84e007cfb52175b577b26ff0c598220224a6f686e20446f65223002 34143211241
var str = decode(data, key);
console.log(str) // 字符串可以存储一系列字符，如 "John Doe"。
```

## Array打乱
- list: 要打乱顺序的数组
- key: String 非必传，打乱顺序依赖，不传则每次都随机打乱顺序
```
const { arrayDisrupt } = require("mini-toolkit");
arrayDisrupt(list [,key]);
```

## 校验联系方式
- phone: String
```
const { phoneTest } = require("mini-toolkit");
phoneTest(phone);
```


## 浏览器复制字符串到剪切板
```
const { copy } = require("mini-toolkit");
copy(String);
```


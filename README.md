# Js常用工具集合
- 安装
```
$ npm install -S mini-toolkit
```
## 引入方式
- `HTML`引入
```
<script src="./dist/main.min.js" ></script>
<script>
  window.onload = function(){
    const {exportExcel, readFileData, setXlsxCode, encode, decode, arrayDisrupt, copy, phoneTest, emailTest} = $toolkit;
  }
</script>
```
- `require`引入
```
const {exportExcel, readFileData, setXlsxCode, encode, decode, arrayDisrupt, copy, phoneTest, emailTest} = require("mini-toolkit");
```
- `import`引入
```
import {exportExcel, readFileData, setXlsxCode, encode, decode, arrayDisrupt, copy, phoneTest, emailTest} from "mini-toolkit";
```
## 简易的字符串加密和解码
```

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
arrayDisrupt(list [,key]);
```

## 校验联系方式
- phone: String
```
phoneTest(phone);
```

## 校验电子邮箱
- email: String
```
emailTest(email);
```


## 浏览器复制字符串到剪切板
```
copy(String);
```
## 导出表格
```
let datas = [
  {name:'表1',data : [['姓名', '年龄'],['隔壁老王', 30],['小三', '20'],['老表', '25'],]},
  {name:'表2',data : [["姓名",'体重', '身高'],['隔壁老王',120, 180],['老表',180, 160],]},
]
// 第二个参数为文件名称，非必传
exportExcel(datas)
```
## 解析表格数据
```
function inputFileChange(e) {
  // 第二个参数为表名称数组，非必传
  readFileData(e.target.files[0]).then(res=>{
    console.log(res)
  })
}
```
## 数值转换XLSX列头
```
let code = setXlsxCode(number);
```

"use strict";
exports.__esModule = true;
var xlsx_1 = require("xlsx");
var __arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
/**
 * 根据列数计算对应列的XLSX列编码
 * @param n
 * @returns
 */
function __calculate(n) {
    var str = '';
    if (n > __arr.length) {
        var rem = parseInt(String((n - 1) / 26));
        str = __arr[(n - 1) % 26] + str;
        if (rem > __arr.length) {
            return __calculate(rem);
        }
        else {
            str = __arr[rem - 1] + str;
            return str;
        }
    }
    else {
        return __arr[n - 1];
    }
}
// 使用xlsx-style来将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
function __sheet2blob(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i)
        view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
// 使用xlsx-style来导出表格
function __saveAs(obj, fileName) {
    var tmpa = document.createElement('a');
    tmpa.download = fileName || '未命名';
    tmpa.href = URL.createObjectURL(obj);
    tmpa.click();
    setTimeout(function () {
        URL.revokeObjectURL(tmpa.href);
    }, 100);
}
/**
 * 导出表格
 * @param {Datas} datas 表格数据
 * @param {string} tableName 文件名称
 */
function exportExcel(datas, tableName) {
    /*
        datas = [
          {name:'表1',data : [['姓名', '年龄'],['隔壁老王', 30],['小三', '20'],['老表', '25'],]},
          {name:'表2',data : [['体重', '身高'],[120, 180],[180, 160],]},
        ]
    */
    var tmpWB = {
        SheetNames: [],
        Sheets: {}
    };
    datas.forEach(function (table) {
        var sheet = xlsx_1.utils.aoa_to_sheet(table.data);
        for (var i in sheet) {
            if (i.indexOf('!') == -1) {
                sheet[i].s = { border: { bottom: { style: 'thin', color: { rgb: '000000' } }, top: { style: 'thin', color: { rgb: '000000' } }, left: { style: 'thin', color: { rgb: '000000' } }, right: { style: 'thin', color: { rgb: '000000' } } } }; //为所有单元格添加边框
                //获取列头
                var colArr = i.match(/^[A-Z]+/);
                var colIndex = colArr ? colArr[0] : "";
                //获取行数
                var rowArr = i.match(/\d+$/);
                var rowNum = rowArr ? Number(rowArr[0]) : 0;
                // 第一列 或者 第一行 加粗居中
                if (colIndex == 'A' || rowNum == 1) {
                    sheet[i].s.alignment = { vertical: 'center', horizontal: 'center' };
                    sheet[i].s.font = { bold: 'true' };
                }
            }
        }
        tmpWB.SheetNames.push(table.name);
        tmpWB.Sheets[table.name] = sheet;
    });
    //这里的数据是用来定义导出的格式类型  
    var n = (0, xlsx_1.write)(tmpWB, { bookType: ('xlsx'), bookSST: false, type: 'binary' });
    var tmpDown = new Blob([__sheet2blob(n)], { type: '' });
    __saveAs(tmpDown, "".concat(tableName ? tableName : Date.now(), ".xlsx"));
}
/**
 * 读取本地excel文件中的数据
 * @param { File } file 文件
 * @param { String[]? } tNames 表名称列表
 * @returns
 */
function readFileData(file, tNames) {
    return new Promise(function (next, error) {
        var reader = new FileReader();
        reader.onload = function (e) {
            try {
                var data = e.target ? e.target.result : new ArrayBuffer(0);
                var workbook = (0, xlsx_1.read)(data, { type: 'binary' });
                console.log(workbook.Sheets);
                var datas = [];
                // 如果需要读取指定表名称内容
                if (tNames && tNames.length) {
                    for (var i = 0; i < tNames.length; i++) {
                        var name_1 = tNames[i];
                        if (workbook.SheetNames.indexOf(name_1) == -1) {
                            return error("\u8BE5\u6587\u4EF6\u4E2D\u4E0D\u5B58\u5728\u540D\u79F0\u4E3A\u300A".concat(name_1, "\u300B\u7684\u8868\u683C"));
                        }
                        var data_1 = xlsx_1.utils.sheet_to_json(workbook.Sheets[name_1]);
                        datas.push({ name: name_1, data: data_1 });
                    }
                }
                else {
                    // 读取文件中所有表内容
                    for (var i = 0; i < workbook.SheetNames.length; i++) {
                        var name_2 = workbook.SheetNames[i];
                        var data_2 = xlsx_1.utils.sheet_to_json(workbook.Sheets[name_2]);
                        datas.push({ name: name_2, data: data_2 });
                    }
                }
                next(datas);
            }
            catch (e) {
                error(e);
            }
        };
        reader.readAsBinaryString(file);
    });
}
// 计算每一列对应的编码从1开始
function setXlsxCode(n) {
    return __calculate(n);
}
exports["default"] = { exportExcel: exportExcel, readFileData: readFileData, setXlsxCode: setXlsxCode };

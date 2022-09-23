import { WorkBook, utils, write, read } from "xlsx";


/**
 * 数据结构
 */
type Datas = { name: string, data: string[][] }[];



const __arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
/**
 * 根据列数计算对应列的XLSX列编码
 * @param n 
 * @returns 
 */
function __calculate(n: number): string {
  let str = '';
  if (n > __arr.length) {
    let rem = parseInt(String((n - 1) / 26));
    str = __arr[(n - 1) % 26] + str;
    if (rem > __arr.length) {
      return __calculate(rem);
    } else {
      str = __arr[rem - 1] + str;
      return str;
    }
  } else {
    return __arr[n - 1];
  }
}


// 使用xlsx-style来将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
function __sheet2blob(s: string): ArrayBuffer {
  let buf = new ArrayBuffer(s.length);
  let view = new Uint8Array(buf);
  for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}
// 使用xlsx-style来导出表格
function __saveAs(obj: Blob, fileName: string) {
  let tmpa = document.createElement('a');
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
function exportExcel(datas: Datas, tableName?: string) {
  /* 
      datas = [
        {name:'表1',data : [['姓名', '年龄'],['隔壁老王', 30],['小三', '20'],['老表', '25'],]},
        {name:'表2',data : [['体重', '身高'],[120, 180],[180, 160],]},
      ]
  */
  let tmpWB: WorkBook = {
    SheetNames: [],
    Sheets: {}
  }
  datas.forEach(table => {
    let sheet = utils.aoa_to_sheet(table.data);
    for (let i in sheet) {
      if (i.indexOf('!') == -1) {
        sheet[i].s = { border: { bottom: { style: 'thin', color: { rgb: '000000' } }, top: { style: 'thin', color: { rgb: '000000' } }, left: { style: 'thin', color: { rgb: '000000' } }, right: { style: 'thin', color: { rgb: '000000' } } } }//为所有单元格添加边框
        //获取列头
        let colArr = i.match(/^[A-Z]+/);
        let colIndex = colArr ? colArr[0] : "";
        //获取行数
        let rowArr = i.match(/\d+$/);
        let rowNum = rowArr ? Number(rowArr[0]) : 0;
        // 第一列 或者 第一行 加粗居中
        if (colIndex == 'A' || rowNum == 1) {
          sheet[i].s.alignment = { vertical: 'center', horizontal: 'center' }
          sheet[i].s.font = { bold: 'true' }
        }
      }
    }
    tmpWB.SheetNames.push(table.name);
    tmpWB.Sheets[table.name] = sheet;
  });
  //这里的数据是用来定义导出的格式类型  
  let n: string = write(tmpWB, { bookType: ('xlsx'), bookSST: false, type: 'binary' });
  let tmpDown = new Blob([__sheet2blob(n)], { type: '' });
  __saveAs(tmpDown, `${tableName ? tableName : Date.now()}.xlsx`)
}


/**
 * 读取本地excel文件中的数据
 * @param { File } file 文件
 * @param { String[]? } tNames 表名称列表
 * @returns 
 */
function readFileData(file: File, tNames: string[]): Promise<Datas> {
  return new Promise((next, error) => {
    let reader = new FileReader();
    reader.onload = function (e) {
      try {
        let data = e.target ? e.target.result : new ArrayBuffer(0);
        let workbook = read(data, { type: 'binary' });
        console.log(workbook.Sheets)
        let datas: Datas = [];
        // 如果需要读取指定表名称内容
        if (tNames && tNames.length) {
          for (let i = 0; i < tNames.length; i++) {
            let name = tNames[i];
            if (workbook.SheetNames.indexOf(name) == -1) {
              return error(`该文件中不存在名称为《${name}》的表格`);
            }
            let data: string[][] = utils.sheet_to_json(workbook.Sheets[name])
            datas.push({ name, data });
          }
        } else {
          // 读取文件中所有表内容
          for (let i = 0; i < workbook.SheetNames.length; i++) {
            let name = workbook.SheetNames[i];
            let data: string[][] = utils.sheet_to_json(workbook.Sheets[name])
            datas.push({ name, data });
          }
        }
        next(datas);
      } catch (e) {
        error(e);
      }
    }
    reader.readAsBinaryString(file);
  })
}


// 计算每一列对应的编码从1开始
function setXlsxCode(n: number) {
  return __calculate(n);
}

export default { exportExcel, readFileData, setXlsxCode }
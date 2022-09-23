import $encode from "./encode";
import $arrayDisrupt from "./arrayDisrupt";
import $copy from "./copy";
import $phoneTest from "./phoneTest";
import $emailTest from "./emailTest";
import $enXlsx from "./enXlsx";

(window as any).$toolkit = {
  exportExcel: $enXlsx.exportExcel,
  readFileData: $enXlsx.readFileData,
  setXlsxCode: $enXlsx.setXlsxCode,
  encode: $encode.encode,
  decode: $encode.decode,
  arrayDisrupt: $arrayDisrupt,
  copy: $copy,
  phoneTest: $phoneTest,
  emailTest: $emailTest
};

export const exportExcel = $enXlsx.exportExcel;
export const readFileData = $enXlsx.readFileData;
export const setXlsxCode = $enXlsx.setXlsxCode;
export const encode = $encode.encode;
export const decode = $encode.decode;
export const arrayDisrupt = $arrayDisrupt;
export const copy = $copy;
export const phoneTest = $phoneTest;
export const emailTest = $emailTest;

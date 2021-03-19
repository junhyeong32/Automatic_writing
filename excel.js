//Todo
//1. 엑셀파일 만들기
//2. 엑셀 파일 값 클립보드에 넣기
//3. puppeteer로 크롤링
const XLSX = require("xlsx");
const table = XLSX.readFile("sheetjs.xlsx");
const sheet = table.Sheets[table.SheetNames[0]];

let data;

const exportExcel = (data) => {
  /* const table = XLSX.readFile("sheetjs.xlsx");
  const sheet = table.Sheets[table.SheetNames[0]]; */
  // step 1. workbook 생성
  var ws = XLSX.utils.json_to_sheet(data);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "account");

  console.log(sheet);
};
console.log(document);
const copyExcelData = () => {
  //   let revision = worksheet["H9"].v;
  //   let om = worksheet["D10"].v;
  //   let date_number = worksheet["D11"].v;
  //   let tag = worksheet["G14"].v;
  //   const id = sheet.A2.v;
  //   const password = sheet.B2.v;
};

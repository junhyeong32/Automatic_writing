//Todo
//1. 엑셀파일 만들기
//2. 엑셀 파일 값 클립보드에 넣기
//3. puppeteer로 크롤링
const clipboardy = require("clipboardy");
const XLSX = require("xlsx");
const table = XLSX.readFile("sheetjs.xlsx");
const sheet = table.Sheets[table.SheetNames[0]];
let data;

// console.log(XLSX);

const exportExcel = (data) => {
  /* const table = XLSX.readFile("sheetjs.xlsx");
  const sheet = table.Sheets[table.SheetNames[0]]; */
  // step 1. workbook 생성
  var ws = XLSX.utils.json_to_sheet(data);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "account");

  console.log(table);
};

const copyEmail = async (emailCount) => {
  let count = emailCount();
  const id = sheet[`A${count}`].v;
  clipboardy.writeSync(id);
  clipboardy.readSync();
};

const copyPassword = async (passwordCount) => {
  let count = passwordCount();
  const password = sheet[`B${count}`].v;

  clipboardy.writeSync(password);
  clipboardy.readSync();
};

const copyTitle = async () => {
  let count = 1;
  const title = sheet[`C${count}`].v;

  clipboardy.writeSync(title);
  clipboardy.readSync();
};

const copyBody = async () => {
  let count = 1;
  const body = sheet[`D${count}`].v;

  clipboardy.writeSync(body);
  clipboardy.readSync();
};

module.exports = { copyEmail, copyPassword, copyTitle, copyBody };

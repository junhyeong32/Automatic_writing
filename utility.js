const puppeteer = require("puppeteer");
const getAccount = require("./excel");
let loginCount1 = 1;
let loginCount2 = 1;
let codeCount1 = 1;
let titleCount1 = 1;
let bodyCount1 = 1;

const utility = async () => {
  let emailCount = () => {
    return (loginCount1 += 1);
  };

  let passwordCount = () => {
    return (loginCount2 += 1);
  };

  let titleCount = () => {
    return (titleCount1 += 1);
  };

  let bodyCount = () => {
    return (bodyCount1 += 1);
  };

  let codeCount = () => {
    return (codeCount1 += 1);
  };

  let resetCount = () => {
    return (codeCount1 = 1), (titleCount1 = 1), (bodyCount1 = 1);
  };

  let code = await getAccount.getCode(codeCount);

  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--single-process",
      "--no-zygote",
      "--no-sandbox",
      "--window-size=1920,1080",
    ],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });

  //TODO
  //종목코드는 1~ 10번까지 돌아가게 만약에 5개까지 있으면 5까지
  //내용은 그 종목 코드 갯수에 맞게 하나씩

  //네이버 아이디 복사

  //naver url 접속 및 로그인
  const login = async () => {
    try {
      getAccount.copyEmail(emailCount);

      console.log(
        `https://finance.naver.com/item/board_write_edit.nhn?code=${code}&mode=write`
      );
      await page.goto(
        `https://finance.naver.com/item/board_write_edit.nhn?code=${code}&mode=write`,
        { waitUntil: "networkidle2" }
      );
      //const pageIWannaGo = '/dir/page.html'
      //await page.goto(baseURL + pageIWannaGo);

      await page.waitFor(2000);

      await page.click("#id");

      await page.keyboard.down("Control");
      await page.keyboard.press("V");
      await page.keyboard.up("Control");

      await getAccount.copyPassword(passwordCount);

      await page.click("#pw");
      await page.waitFor(1000);

      await page.keyboard.down("Control");
      await page.keyboard.press("V");
      await page.keyboard.up("Control");

      await page.click(".btn_global");

      //TODO
      //login 값이 true / false 구분해서 글 작성
      //code 값 받아와서 write loop 굴리기
      await page.waitFor(3000);

      if (
        page.url() ===
        `https://finance.naver.com/item/board_write_edit.nhn?code=${code}&mode=write`
      ) {
        await write();
      } else {
        login();
      }

      await page.waitFor(5000);

      setInterval(loopWrite, 65000);
    } catch (e) {
      console.log(e);
    }
  };

  const loopWrite = async () => {
    //글쓰기 창 들어와서 작성
    try {
      code = await getAccount.getCode(codeCount);
      if (code === undefined) {
        resetCount();
        code = await getAccount.getCode(codeCount);
      }

      console.log(code);

      await page.goto(
        `https://finance.naver.com/item/board_write_edit.nhn?code=${code}&mode=write`,
        { waitUntil: "networkidle2" }
      );
      write();
    } catch (e) {
      console.log(e);
    }
  };

  const write = async () => {
    try {
      await page.waitForSelector("iframe");
      const elementHandle = await page.$(
        `iframe[src="/item/board_write.nhn?code=${code}&nid=&mode=write"]`
      );
      await getAccount.copyTitle(titleCount);
      const frame = await elementHandle.contentFrame();
      await frame.type("#title", "", { delay: 100 });

      await page.waitFor(1000);

      await page.keyboard.down("Control");
      await page.keyboard.press("V");
      await page.keyboard.up("Control");

      await getAccount.copyBody(bodyCount);
      await frame.type("#body", "", { delay: 100 });
      await page.waitFor(1000);

      await page.keyboard.down("Control");
      await page.keyboard.press("V");
      await page.keyboard.up("Control");

      await frame.click("#submit_btn");
    } catch (e) {
      console.log(e);
    }
  };

  await login();
};

utility();

const puppeteer = require("puppeteer");
const getAccount = require("./excel");
let loginCount1 = 1;
let loginCount2 = 1;

const utility = async () => {
  let emailCount = () => {
    return (loginCount1 += 1);
  };

  let passwordCount = () => {
    return (loginCount2 += 1);
  };

  let code = "005930";

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

  //네이버 아이디 복사

  //naver url 접속 및 로그인
  const login = async () => {
    try {
      getAccount.copyEmail(emailCount);

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
      await page.waitFor(500);

      if (
        page.url ===
        `https://finance.naver.com/item/board_write_edit.nhn?code=${code}&mode=write`
      ) {
        await write();
      } else {
        await page.goto(
          `https://finance.naver.com/item/board_write_edit.nhn?code=${code}&mode=write`,
          { waitUntil: "networkidle2" }
        );

        login();
      }

      // await page.waitForResponse((response) => {
      //   if (response.url().slice(0, 27) === "https://nid.naver.com/login") {
      //     return true;
      //   }
      // });
      // await page.goto(`https://google.com`, { waitUntil: "networkidle2" });
    } catch (e) {
      console.log(e);
    }
  };

  const write = async () => {
    try {
      for (let i = 0; i++; i < 10) {
        await page.waitForSelector("iframe");
        const elementHandle = await page.$(
          `iframe[src="/item/board_write.nhn?code=${code}&nid=&mode=write"]`
        );

        await getAccount.copyTitle();
        const frame = await elementHandle.contentFrame();
        await frame.type("#title", "", { delay: 100 });

        await page.waitFor(1000);

        await page.keyboard.down("Control");
        await page.keyboard.press("V");
        await page.keyboard.up("Control");

        await bodyCopy();

        await getAccount.copybody();
        await frame.type("#body", "", { delay: 100 });
        await page.waitFor(1000);

        await page.keyboard.down("Control");
        await page.keyboard.press("V");
        await page.eyboard.up("Control");

        await frame.click("#submit_btn");
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  await login();
  // await write();
};

utility();

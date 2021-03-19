const puppeteer = require("puppeteer");
let loginCount1 = 0;
let loginCount2 = 0;
let emailCount = () => {
  return (loginCount1 += 1);
};
let passwordCount = () => {
  return (loginCount2 += 1);
};

const idCopy = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page2 = await browser.newPage();

    await page2.goto("http://127.0.0.1:5501/copy.html");
    const selector = `#email${emailCount()}`;

    console.log(selector);
    console.log("실행");
    const rect = await page2.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const { x, y } = element.getBoundingClientRect();
      return { x, y };
    }, selector);

    if (rect) {
      await page2.mouse.click(rect.x, rect.y, { clickCount: 2 });
    } else {
      console.error("Element Not Found");
    }

    await page2.keyboard.down("Control");
    await page2.keyboard.press("C");
    await page2.keyboard.up("Control");
    browser.disconnect();
    await write();
  } catch (e) {
    console.log(e);
  }
};

const passwordCopy = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page2 = await browser.newPage();
    await page2.setViewport({
      width: 1280,
      height: 1080,
    });

    await page2.goto("http://127.0.0.1:5501/copy.html");

    const selector = `#password${passwordCount()}`;
    console.log(selector);
    console.log("실행2");
    const rect = await page2.evaluate((selector) => {
      const element = document.querySelector(selector);
      console.log(element);
      if (!element) return null;
      const { x, y } = element.getBoundingClientRect();
      return { x, y };
    }, selector);

    if (rect) {
      await page2.mouse.click(rect.x, rect.y, { clickCount: 2 });
    } else {
      console.error("Element Not Found");
    }

    await page2.keyboard.down("Control");
    await page2.keyboard.press("C");
    await page2.keyboard.up("Control");

    // return await page2.close();
  } catch (e) {
    console.log(e);
  }
};

const titleCopy = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page2 = await browser.newPage();
    await page2.setViewport({
      width: 1280,
      height: 1080,
    });

    await page2.goto("http://127.0.0.1:5501/copy.html");

    const selector = ".title";

    const rect = await page2.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const { x, y } = element.getBoundingClientRect();
      return { x, y };
    }, selector);

    if (rect) {
      await page2.mouse.click(rect.x, rect.y, { clickCount: 3 });
    } else {
      console.error("Element Not Found");
    }

    await page2.keyboard.down("Control");
    await page2.keyboard.press("C");
    await page2.keyboard.up("Control");

    return await page2.close();
  } catch (e) {
    console.log(e);
  }
};

const bodyCopy = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page2 = await browser.newPage();
    await page2.setViewport({
      width: 1280,
      height: 1080,
    });

    await page2.goto("http://127.0.0.1:5501/copy.html");

    const selector = ".body";

    const rect = await page2.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const { x, y } = element.getBoundingClientRect();
      return { x, y };
    }, selector);

    if (rect) {
      await page2.mouse.click(rect.x, rect.y, { clickCount: 3 });
    } else {
      console.error("Element Not Found");
    }

    await page2.keyboard.down("Control");
    await page2.keyboard.press("C");
    await page2.keyboard.up("Control");

    return await page2.close();
  } catch (e) {
    console.log(e);
  }
};

const write = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--window-size=1920,1080"],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto(
      " https://finance.naver.com/item/board_write_edit.nhn?code=252670&mode=write",
      { waitUntil: "networkidle2" }
    );

    //const pageIWannaGo = '/dir/page.html'
    //await page.goto(baseURL + pageIWannaGo);

    await page.waitFor(2000);

    await page.click("#id");

    await page.keyboard.down("Control");
    await page.keyboard.press("V");
    await page.keyboard.up("Control");

    await passwordCopy();

    await page.click("#pw");
    await page.waitFor(1000);

    await page.keyboard.down("Control");
    await page.keyboard.press("V");
    await page.keyboard.up("Control");

    await page.click(".btn_global");

    await page.waitForResponse((response) => {
      response.url().slice(0, 21);
      if (response.url().slice(0, 21) === "https://nid.naver.com") {
        page.close();
        return idCopy();
      }
    });

    await page.waitFor(2000);

    await titleCopy();

    await page.waitForSelector("iframe");
    const elementHandle = await page.$(
      `iframe[src="/item/board_write.nhn?code=252670&nid=&mode=write"]`
    );

    const frame = await elementHandle.contentFrame();
    await frame.type("#title", "", { delay: 100 });

    await page.waitFor(1000);

    await page.keyboard.down("Control");
    await page.keyboard.press("V");
    await page.keyboard.up("Control");

    await bodyCopy();

    await frame.type("#body", "", { delay: 100 });
    await page.waitFor(1000);

    await page.keyboard.down("Control");
    await page.keyboard.press("V");
    await page.eyboard.up("Control");

    await frame.click("#submit_btn");
  } catch (e) {
    console.log(e);
  }
};
(async () => {
  await idCopy();
})();

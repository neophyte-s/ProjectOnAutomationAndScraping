let puppeteer = require("puppeteer");
let cFile = process.argv[2];
let fs = require("fs");


(async function () {
  try {
    let data = await fs.promises.readFile(cFile);
    let { url1, url2, user, pwd ,add} = JSON.parse(data);
    let browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized", "--disable-notifications"]
    });
    let pages = await browser.pages();
    let page = pages[0];
    //************** */
    await page.goto(url1, { waitUntil: "load", timeout: 0 });
    console.log("Evaluating");
    // await page.waitForSelector("._1iULI");
    let news = await page.evaluate(() => {
      return document.querySelector("._1KydD div p b").innerText;
    })
    console.log("News is :" + news);
    fs.writeFile("news.json", JSON.stringify(news), function (err) {
      if (err)
        {console.log(err);}
      else
        {console.log("Saved the data!");}});
      await page.goto(url2, { waitUntil: "load"});
      console.log("Site loaded");
    //****************** */
      // await page.click("._1HunhFR-0b-AYs0WG9mU_P._3Wg53T10KuuPmyWOMWsY2F._2nelDm85zKKmuD94NequP0");
      await page.waitForSelector("input[id=loginUsername",{visible:true});
      await page.type("input[id=loginUsername]", user, { delay: 120 });
      await page.type("input[id=loginPassword]", pwd, { delay: 120 });
      await Promise.all([
        page.click("button[class='AnimatedForm__submitButton']"), page.waitForNavigation({
          waitUntil: "networkidle2"
        })
      ])

      await page.waitForSelector(".zgT5MfUrDMC54cpiCpZFu",{visible:true});
      await page.click(".zgT5MfUrDMC54cpiCpZFu",{delay:10000});
      await page.waitForSelector("._1MHSX9NVr4C2QxH2dMcg4M",{visible:true});
      await page.waitForSelector("._15FJlGHQ_lg8wmnMsXlnes.XHbKeEqnW58ib9mTN6jnS.u_kypUXmB-k1A5TcC8MI9",{visible:true});      
      await page.click(".anPJr_ybRailY8NbAunl2");
      await page.type("._1MHSX9NVr4C2QxH2dMcg4M","u/tyleryellow1\n");
      console.log(1);
      await page.click(".PqYQ3WC15KaceZuKcFI02._1ec_Oj5SWdypd8L-VELKg-");
      await page.type(".PqYQ3WC15KaceZuKcFI02._1ec_Oj5SWdypd8L-VELKg-","CoronaVirus Latest Update",{delay:50});
      await page.click(".notranslate.public-DraftEditor-content");
      await page.type(".notranslate.public-DraftEditor-content",news,{delay:50});
      await page.type(".notranslate.public-DraftEditor-content",add,{delay:50});
      await page.click('button[class="_2JBsHFobuapzGwpHQjrDlD _18Bo5Wuo3tMV-RDB8-kh8Z "]');


      // await page.click("#logoutMenu",{delay:500});
      // await page.click('a[class="_1d6h"]',{delay:3000});
      // await page.waitForSelector(".uiScrollableAreaContent");
      // await page.click('.54ni.navSubmenu._MenuItem',{delay:150});

      // await page.waitForSelector("._4bl9._42n-",{visible:true});
      // await Promise.all([page.click('._4bl9._42n-'),page.type("._3nd0",news,{delay:50}),page.type("._3nd0",add,{delay:50}),page.click('button[class="_1mf7 _4jy0 _4jy3 _4jy1 _51sy selected _42ft _42fr"]',{delay:150})]);
      
      // await browser.close();
      // console.log("Browser Closed");


  } catch (err) {
    console.log("Error is :" + err);

  }
})();
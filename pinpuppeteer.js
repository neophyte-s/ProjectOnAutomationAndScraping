let puppeteer=require("puppeteer");
let cFile=process.argv[2];
let fs=require("fs");
let oFile=process.argv[3];
(async function(){
  try{
    let data=await fs.promises.readFile(cFile);
    let odata=await fs.promises.readFile(oFile);
    let {url,user,pwd}=JSON.parse(data);
    let {nPost,searchInput}=JSON.parse(odata);
    let browser=await puppeteer.launch({
      headless:false,
      defaultViewport:null,
      args:["--start-maximized", "--disable-notifications"]
    });
    let pages=await browser.pages();
    let page=pages[0];
    await page.goto(url,{waitUntil:"load",timeout:0 });
    await page.waitForSelector("#email");
    await page.type("#email",user,{delay:150});
    await page.type("#password",pwd,{delay:150});
    await Promise.all([page.click(".red.SignupButton.active"),page.waitForNavigation({waitUntil:"load"})]);
    // await page.waitForNavigation({waitUntil:"load"});
    await page.waitForSelector('input[name="searchBoxInput"]');
    await page.type('input[name="searchBoxInput"]',searchInput,{delay:150});
    await page.keyboard.press('Enter');
    let idx = 0;
    do { 
      await page.waitForSelector(".vbI.XiG");
      console.log("Inside the loop");
      // await page.waitForSelector(".vbI.XiG");
      let elements = await page.$$(".Yl-.MIw.Hb7") ;
      console.log("Elements are: "+elements);
      let pic = elements[idx];
      await Promise.all([pic.click({delay:150}),page.waitForNavigation({waitUntil:"load"})]);
      // await page.waitForSelector('button[data-test-id="lego-button"]');
      // let op=await page.$('button[data-test-id="lego-button"]');
      // console.log("options are "+op);
      // await op.click({delay:3000});
      // let dwndOption=await page.evaluate(()=>{
        // return document.querySelectorAll(".F6l.Fje.Jea.fZz.hA-.hs0.k1A.sLG.zI7.iyn.Hsu");});
      // console.log("Download option menu "+dwndOption);
      // let dwnd=JSON.stringify(dwndOption);
      // console.log("dwnd is "+dwnd);
      // await dwndOption[0].click({delay:3000});
      // console.log("Image "+idx+" saved!!");
      await page.waitForSelector('button[class="PinBetterSave__Button PinBetterSave__Button--lego"]');
      await page.click('button[class="PinBetterSave__Button PinBetterSave__Button--lego"]');
      idx++;
    } while (idx < nPost)
    console.log("Posts Saved!!");
    await browser.close();
  }
  catch(err){
    console.log("Error is: "+err);
  }
})
()

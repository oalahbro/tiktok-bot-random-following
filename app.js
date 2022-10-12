const puppeteer = require('puppeteer-extra')
const { scrollPageToBottom } = require('puppeteer-autoscroll-down')
const fs = require('fs').promises; //for working with files

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
// save cookie function
// const saveCookie = async (page) => {
//     const cookies = await page.cookies();
//     const cookieJson = JSON.stringify(cookies, null, 2);
//     await fs.writeFile('cookies.json', cookieJson);
// }

// //load cookie function
// const loadCookie = async (page) => {
//     const cookieJson = await fs.readFile('cookies.json');
//     const cookies = JSON.parse(cookieJson);
//     await page.setCookie(...cookies);
// }
function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

async function main() {
  const browser = await puppeteer.launch({headless: true, userDataDir: '/home/eclipse/Documents/Default',
    executablePath: '/usr/bin/google-chrome',
    // args:[
    // '--user-data-dir=/home/eclipse/.config/google-chrome/',
    // '--user-profile=eka'
    //   ]
    });
  const page = await browser.newPage();

async function loop(){
  poss()
}
async function poss(){
  try{
  await page.goto('https://www.tiktok.com/', {timeout: 90000});
  let seleksi = '#app > div.tiktok-19fglm-DivBodyContainer.e1irlpdw0 > div.tiktok-1id9666-DivMainContainer.ec6jhlz0 > div:nth-child(1) > div:nth-child(1) > div > div.tiktok-kd7foj-DivVideoWrapper.e1bh0wg716 > div.tiktok-1lh5noh-DivVideoCardContainer.e1bh0wg77'
  await page.click(seleksi)

  await delay(1500);
  let link = page.url();
  // await loadCookie(page); //load cookie
  await page.goto(link, {timeout: 90000});
  // await saveCookie(page); //save cookie
  
  await page.setUserAgent(
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.0 Safari/537.36'
   )
  //   await browser.close();
  await delay(3000);
  await page.evaluate(() => {
    let example = document.querySelector('#app > div.tiktok-ywuvyb-DivBodyContainer.e1irlpdw0 > div.tiktok-2vzllv-DivMainContainer.elnrzms0 > div.tiktok-19j62s8-DivVideoDetailContainer.ege8lhx0 > div.tiktok-12kupwv-DivContentContainer.ege8lhx6 > div.tiktok-1senhbu-DivLeftContainer.ege8lhx7 > div.tiktok-phmoj-DivAuthorContainer.ege8lhx8');
  
    example.parentNode.removeChild(example);
  });
  // await page
  //   .waitForSelector('div.tiktok-1mf23fd-DivContentContainer.e1g2efjf1 > a > span')
  //   .then(() => console.log('got it'));
  // await delay(2000);
  let imageItems = await page.$$('div.tiktok-1mf23fd-DivContentContainer.e1g2efjf1 > a > span');
  let iterations = imageItems.length;
  if (!iterations)loop()
  console.log(imageItems)
    for (let image of imageItems) {
      
      await image.hover();
      await delay(2000);
      const [button] = await page.$x("//button[contains(., 'Ikuti')]");
  
      await page.waitForSelector('div.tiktok-1mf23fd-DivContentContainer.e1g2efjf1 > a > span',{timeout:3000}).catch(() => loop());
      if (button) {
        await button.click();
      }
      await page.mouse.move(500, 100);
      await scrollPageToBottom(page, {
        size: 500,
        delay: 50
      })
      if (!--iterations)
      loop()
      console.log(image + " => This is the last iteration...");
  }  
  }catch(err) {
    loop()
  }
    
}
poss()
};
main()
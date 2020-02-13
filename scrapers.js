const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const [el] = await page.$x('/html/body/div/div/article/div/section[1]/div/div/figure[1]/div/div/div/div/img');
  const src = await el.getProperty('src');
  const imgURL = await src.jsonValue();

  const [el2] = await page.$x('//*[@id="6464"]/h1');
  const txt = await el2.getProperty('textContent');
  const title = await txt.jsonValue();

  const [el3] = await page.$x('//*[@id="root"]/div/article/div/section[1]/div/div/div/div[2]/div/div[1]/div[2]/div/div/span/div/span/a');
  const txt2 = await el3.getProperty('textContent');
  const author = await txt2.jsonValue();

  console.log({imgURL, title, author});

  browser.close();
}

scrapeProduct('https://medium.com/javascript-in-plain-english/introduction-to-javascript-callbacks-4bcfd0ffd84d');

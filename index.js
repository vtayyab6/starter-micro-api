var http = require('http');
const puppeteer = require('puppeteer');

http.createServer(async function (req, res) {
    console.log(`Just got a request at ${req.url}!`);
    
    if (req.url === "/scrape") {
        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        await page.goto('https://www.vrlgroup.in/track_consignment.aspx?lrtrack=1&lrno=111');
        const content = await page.content();
        await browser.close();

        res.write(content);
    } else {
        res.write('Yo!');
    }
    
    res.end();
}).listen(process.env.PORT || 3000);

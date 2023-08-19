const http = require('http');
const puppeteer = require('puppeteer-core');

http.createServer(async function (req, res) {
    console.log(`Just got a request at ${req.url}!`);
    
    if(req.url === '/scrape') {
        try {
            // This is a hopeful step. It assumes Cyclic.sh has Chrome/Chromium installed.
            const browser = await puppeteer.launch({
                executablePath: 'google-chrome-stable', 
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });

            const page = await browser.newPage();
            await page.goto('https://www.vrlgroup.in/track_consignment.aspx?lrtrack=1&lrno=111');
            
            const content = await page.content();
            await browser.close();
            
            res.write(content);
            res.end();
        } catch(error) {
            res.write('Error occurred: ' + error.message);
            res.end();
        }
    } else {
        res.write('Yo!');
        res.end();
    }
    
}).listen(process.env.PORT || 3000);

const { asyncDisposeSymbol } = require("puppeteer");
const puppeteer = require ("puppeteer");

(async ()=> {
    try {
        const browser = await puppeteer.launch({headless :false});
        const page = await browser.newPage();
        await page.goto("https://www.lamode.tn/")
        await page.screenshot({path: 'impress.png'});
        await browser.close();
        
    } catch (error) {
        console.log("erreur  d'affichage")
    }
   

})();

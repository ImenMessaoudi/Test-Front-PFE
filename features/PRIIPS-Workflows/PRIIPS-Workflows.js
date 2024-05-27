/* const download = async (document) => {
    const path = require("path")
    const downloadPath = path.resolve("./Downloads")
   
    //let src = await page.$('h2 a').getAttribute("href")
   
    let sel = await page.waitForSelector("h2 a")
   
    let src = await page.evaluate((sel) => sel.getAttribute("href"), sel)
   
    let docName = `/${document}`
    let docName = `${document}`
   
    if (src.includes(docName)) {
      await page._client.send("Page.setDownloadBehavior"), {
        behavior: "allow",
        downloadPath: downloadPath,
   
      const client = await page.target().createCDPSession();
      await client.send('Page.setDownloadBehavior', 
      behavior: 'allow',
      downloadPath: downloadPath,
      })
   
      await sel.click()
    } else {
      throw "Cant download document"
    }
   
  }
}
  When("I download {}", async (document) => {
    await download(document)
  }) */
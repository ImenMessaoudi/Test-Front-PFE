const { expect } = require("chai")
const component = require("./components")
const fs = require('fs')


global.verifyDownloadedFile = async (DocPath) => {

        if (!(fs.existsSync(DocPath))) {
            throw `Error the document does not exist`
        }
}

global.clickOnStepName = async(StepActionName) => {

    var stepNameList = await page.$$('.no-fullscreen .action .name')
      
    for (i=0 ; i< stepNameList.length; i++ ) {

     let theStepName = stepNameList[i]
     var stepLabel = await page.evaluate((stepNameList)=> stepNameList.innerText,theStepName)
       if (stepLabel==StepActionName){
        await page.evaluate((theStepName)=> theStepName.click(), theStepName )
        
        break
        
        
   }
  }
}

global.changePrio = async (Priority,selector) => {


  let  prioButtons = await page.$$(selector)

  for (let i=0 ;i<prioButtons.length;i++){
      let thePrioB = prioButtons[i]
      let prioLabel = await page.evaluate((thePrioB) => thePrioB.attributes[0].value,thePrioB)
      if (prioLabel==Priority){
        await page.evaluate((thePrioB) => thePrioB.click(), thePrioB) 
      }
  }
  
  }
  global.ConfirmAlerts = async() => {
      try{
          await page.once('dialog', async dialog => {
          await dialog.accept()
          console.log(dialog.message());
          })                    
          
          } catch{
            throw "Alert Confirmation Failure !"
          }
  }
  
  global.ChooseStatus = async (buttonName) => {
      if (buttonName== 'Validate') {
  
          await ConfirmAlerts()
          await page.click('.row.expand [*|href="#pt-icon-tick"]')
        
  
      } 
      else if (buttonName =='Disapprove') {
          
          await ConfirmAlerts()
          await page.click('.row.expand [*|href="#pt-icon-cross"]')
      }
      
     else if (buttonName =='Skip') {
  
          await ConfirmAlerts()
          await page.click('.row.expand [*|href="#ic_redo"]')
        
        }
       else if (buttonName == "passer") {
        await ConfirmAlerts()
        await page.click('[*|href="#ic_redo"]')
      } 
      else {
          await ConfirmAlerts()
          await page.click('.row.expand [*|href="#pt-icon-play"]')
        }
  
  }
  global.selectFromDDownList = async (selector,button) => {

    let options = await page.$$(selector)

    for (let i =0;i<options.length;i++){
    
    let theOption = options[i]

    let optionName = await page.evaluate((options) => options.innerText,theOption)

    if (optionName.toLowerCase().includes(button.toLowerCase())){

        return theOption.select(button) 
 }}
}
const component = require("./components")
const path = require("path")
const downloadsFolder = require("downloads-folder")
const downloadPath = path.resolve("./Downloads")
const fs = require("fs")
var dateTimeSys
const moment = require("moment")

let { NodeSSH } = require("node-ssh")
const shell = require("shelljs")
const exec = require("node-ssh-exec")

let scenarioName = ""
Before(async function (scenario) {
  scenarioName = scenario.pickle.name
  this.attach(new Date().toISOString())

  let path = "https://refprod-priips-test.bams.corp/impress/#/"

  await page.goto(path)
  //Connexion SSH 
  const sshConnection = await connectSSH()
 
    const updateCommand = `docker exec -i postgres psql -U postgres -c "update data set value = '110' where path = 'data.download_closing_months';"`;
    try {
        await executeCommand(sshConnection, updateCommand, 'Psql command executed successfully', 'Psql command failed');
    } catch (error) {
       throw error
    }
  
})

After(async function () {
 
  let retry = 0
  while (++retry <= 3) {
    try {
      await page.evaluate(() => logout())
      break
    } catch (e) {
      if (retry === 5) throw e
    }
  } 
await page.waitForTimeout(20000)
 
this.attach(new Date().toISOString())
 
})

Given("I am logged out", async function () {
  await logout(scenarioName)
  await page.waitForTimeout(5000)
})

global.login = async (user, password) => {
  let logoSelector = `.login-pf-page-header img`
  await page.waitForSelector(logoSelector,  { timeout: 60000 })
 
  let usernameInput = `#username`
  let passwordInput = `#password`
 
  await page.waitForSelector(usernameInput)
  await page.waitForSelector(passwordInput)
 
  if (user) await page.type(usernameInput, user.toString())
  if (password) await page.type(passwordInput, password.toString())
 
  const loginForm = await page.$('#kc-form-login')
  await loginForm.evaluate((form) => form.submit())
 
  try {
    await page.waitForNavigation({ waitUntil: "load", timeout: 60000 });
  } catch (error) {
    logger.error("Login failure");
    throw "Login Failure!";
  }
  await page.waitForSelector('.search-wrapper', { timeout: 60000 })

 
};

global.searchForCriteria = async (criteria, values) => {
  await component.Search.advancedSearch(criteria, values)
}

global.CheckFollowUP = async (language, spreadsheetHeader) => {
  if (language == "english") {
    await component.NavBottom.ChooseLanguage("en")
  }

  let headerLine_array = await page.$$(".line.header .cell")

  let spreadsheetHeader_array = spreadsheetHeader.split(";")
  for (let i = 0; i < spreadsheetHeader_array.length; i++) {
    let theHeaderLine = spreadsheetHeader_array[i]

    for (let j = 2; j < headerLine_array.length - 1; j++) {
      let lab = headerLine_array[j]
      let labelText = await page.evaluate((lab) => lab.innerText, lab)
      if (
        !(labelText.toLowerCase() === spreadsheetHeader_array[i].toLowerCase())
      ) {
        throw "error"
      } else {
        i++
      }
    }
  }
}
global.SelectWorkflow = async (Status) => {
  await page.select(
    ".row.hbar-overflow .hbar-block select",
    "functional_status"
  )
  if (Status == "Wait validation") {
    await page.click(".hbar .wait_validation.active .key")
  } else if (Status == "Error") {
    await page.click(".hbar .error.active .key")
  } else if (Status == "Skipped") {
    await page.click(".hbar .skipped.active .key")
  }

  global.ErrorRow = await page.$(".hbar .row.error .value")
  global.SuccessRow = await page.$(".hbar .row.success .value")
  global.waitForValRow = await page.$(".hbar .row.wait_validation .value")

  global.oldErrorNumber = parseInt(
    await page.evaluate((ErrorRow) => ErrorRow.innerText, ErrorRow)
  )
  global.oldSuccessNumber = parseInt()
  //await page.evaluate((SuccessRow) => SuccessRow.innerText, SuccessRow)

  global.oldWaitValNumber = parseInt(
    await page.evaluate(
      (waitForValRow) => waitForValRow.innerText,
      waitForValRow
    )
  )
}

global.getWorkflowsNumberPerStatus = async () => {
  global.ErrorRow = await page.$(".hbar .row.error .value")
  global.SuccessRow = await page.$(".hbar .row.success .value")
  global.waitForValRow = await page.$(".hbar .row.wait_validation .value")

  global.oldErrorNumber = parseInt(
    await page.evaluate((ErrorRow) => ErrorRow.innerText, ErrorRow)
  )
  global.oldSuccessNumber = parseInt()
  // await page.evaluate((SuccessRow) => SuccessRow.innerText, SuccessRow)

  global.oldWaitValNumber = parseInt(
    await page.evaluate(
      (waitForValRow) => waitForValRow.innerText,
      waitForValRow
    )
  )
}

global.VerifyWorkflowsNumber = async (NewStatus, number) => {
  num = parseInt(number)

  if (NewStatus == "Success") {
    /*     try {
      await page.waitForFunction(
        (oldSuccessNumber, SuccessRow,num) => (parseInt(SuccessRow.innerText)) === oldSuccessNumber + num ,
        { timeout: 45000 },
        oldSuccessNumber,
        SuccessRow,
        num
      )
      return true
    } catch (error) {
      throw `ERROR : le number of successfull workflows is different from ${oldSuccessNumber} + ${num}`
    } */
  } else if (NewStatus == "Error") {
    try {
      await page.waitForFunction(
        (oldErrorNumber, ErrorRow, num) =>
          parseInt(ErrorRow.innerText) === oldErrorNumber + num,
        { timeout: 180000 },
        oldErrorNumber,
        ErrorRow,
        num
      )
      return true
    } catch (error) {
      throw `ERROR : le number of erroneous workflows is different from ${oldErrorNumber} + ${num}`
    }
  }
}

const VerifyWorkflowNum = async (Status, number) => {
  num = parseInt(number)
  if (Status == "Wait validation") {
    try {
      await page.waitForFunction(
        (oldWaitValNumber, waitForValRow, num) =>
          parseInt(waitForValRow.innerText) === oldWaitValNumber - num,
        { timeout: 180000 },
        oldWaitValNumber,
        waitForValRow,
        num
      )
      return true
    } catch (error) {
      throw `ERROR : le number of waiting workflows is different from ${oldWaitValNumber} - ${num}`
    }
  } else if (Status == "Error") {
    try {
      await page.waitForFunction(
        (oldErrorNumber, ErrorRow, num) =>
          parseInt(ErrorRow.innerText) === oldErrorNumber - num,
        { timeout: 180000 },
        oldErrorNumber,
        ErrorRow,
        num
      )
      return true
    } catch (error) {
      throw `ERROR : le number of erroneous workflows is different from ${oldErrorNumber} - ${num}`
    }
  }
}

global.navigateToScreen = async (screen) => {
  await page.waitForSelector(".retract-button")
  await page.click(".retract-button")
  await page.waitForSelector(".links a")
  let links = await page.$$(".links a")
  for (let i = 0; i < links.length; i++) {
    let linkText = await page.evaluate(
      (sel) => sel.querySelector("span").innerText,
      links[i]
    )
    if (linkText.toLowerCase() == screen.toLowerCase())
      return await links[i].click()
  }
}

global.ConfirmAlerts = async () => {
  try {
    await page.once("dialog", async (dialog) => {
      await dialog.accept()
    })
  } catch {
    throw `Could not confirm alert`
  }
}

clickButtonName = async (buttonName) => {
  if (
    buttonName == "Accept" ||
    buttonName == "Reject" ||
    buttonName == "Accepter" ||
    buttonName == "Rejeter" ||
    buttonName == "Relancer"
  ) {
    await component.WorkflowSteps.validationButton(buttonName)
  } else if (buttonName == "Skip") {
    await component.WorkflowSteps.skipButton()
  } else if (
    buttonName == "Validate" ||
    buttonName == "Disapprove" ||
    buttonName == "passer" ||
    buttonName == "relancer"
  ) {
    await ChooseStatus(buttonName)
  } else if (buttonName == "export") {
    await page._client.send("Page.setDownloadBehavior", {
      behavior: "allow",
      downloadPath: downloadPath,
    })
    await page.click('[*|href="#pt-icon-export"]')
  } else if (buttonName == "Passer") {
    await ConfirmAlerts()
    await page.click('[*|href="#ic_redo"]', { delay: 1000 })
  } else if (buttonName == "Relancer la dernière action") {
    await ConfirmAlerts()
    await page.click('[*|href="#pt-icon-play"]', { delay: 1000 })
  } else if (buttonName == "Archive") {
    await ConfirmAlerts()
    await page.click(".row.center button.trash", { delay: 1000 })
  } else if (buttonName == "Assign") {
    await ConfirmAlerts()
    await page.click(".row.center button.icon", { delay: 1000 })
  } else if (
    buttonName == "emergency" ||
    buttonName == "high" ||
    buttonName == "low"
  ) {
    await changePrio(buttonName, ".select_action .priority button")
  } else if (buttonName == "Relaunch") {
    await ConfirmAlerts()
    await changePrio(buttonName, " .select_action button")
  } else if (buttonName == "Relaunch last action") {
    await page.click('[*|href="#pt-icon-export"]')
  } else if (buttonName == "favorite") {
    await page.click(".star")
  } else if (buttonName == "search") {
    await page.click('[*|href="#ic_search"]')
  } else if (buttonName == "advanced filter") {
    await page.click('[*|href="#nx-chevron"]')
  } else if (buttonName == "fullScreen") {
    await page.click(".expand .dark")
  }
}

const CheckEventFileDownload = async (file_name) => {
  // file_name = file_name.split(".")[0]
  let download_path = downloadPath
  const fileNames = fs.readdirSync(download_path)
  for (var i = 0; i < fileNames.length; i++) {
    const fileName = fileNames[i]
    var stats = fs.statSync(download_path + "/" + fileName)
    var mtime = moment(stats.mtime).format("DD MM YYYY, HH:mm")
    dateTimeSys = moment().format("DD MM YYYY, HH:mm")
    if (fileName.includes(file_name) && mtime === dateTimeSys) {
      return true
    }
  }
}

Given("I am logged in with {} and {}", async (user, password) => {
  await login(user, password, scenarioName)
  // await login(user, password)
})

When("I search for criteria {} and {}", async (criteria, values) => {
  await searchForCriteria(criteria, values)
})

Given(
  "I am on {} follow-up screen containing {}",
  async (language, spreadsheetHeader) => {
    await CheckFollowUP(language, spreadsheetHeader)
  }
)

When("I select workflow {}", async (Status) => {
  await SelectWorkflow(Status)
})

When("I get the workflows number in each status", async () => {
  await getWorkflowsNumberPerStatus()
})

Then(
  "I verify the workflows number of {} is incremented by {}",
  async (NewStatus, number) => {
    await VerifyWorkflowsNumber(NewStatus, number)
  }
)

When("I navigate to the screen {}", async (screen) => {
  await navigateToScreen(screen)
})

When("I click on button {}", async (buttonName) => {
  await clickButtonName(buttonName)
})

const accessDetails = async () => {
  await page.waitForSelector(".spreadsheet-inner a")
  await page.click(".spreadsheet-inner a")
}

Given("I access to details of the first result", async () => {
  await accessDetails()
})

Given("I relaunch the workflow from {}", async (stepName) => {
  await component.WorkflowSteps.relaunchWorkflow(stepName)
})

Then("{} file download is done", async (file_name) => {
  await CheckEventFileDownload(file_name)
})

const clickStep = async (StepActionName) => {
  await component.WorkflowSteps.clickOnStepName(StepActionName)
}

Given("I click on step {}", async (StepActionName) => {
  await clickStep(StepActionName)
})

const waitStepStatus = async (StepActionName, StepStatus, timeOut) => {
  if (StepStatus == "wait validation") {
    StepStatus = StepStatus.toLowerCase().replace(" ", "_")
  } else if (StepStatus == "waiting") {
    StepStatus = StepStatus.replace("ing", "_predecessor")
  } else {
    StepStatus = StepStatus
  }

  var stepLabel = await component.WorkflowSteps.getStepName(StepActionName)

  var Status = await component.WorkflowSteps.getStepStatus(StepStatus, timeOut)
  if (!(stepLabel == true) && Status == true) {
    throw `Error : StepStatus is not ${StepStatus} `
  }
}

global.clickOnLink = async (linkName) => {
  if (linkName == "Sortie") {
    let links = await page.$$(".column .link")

    for (let i = 0; links.length; i++) {
      let theLink = links[i]
      let linkValue = await page.evaluate(
        (theLink) => theLink.innerText,
        theLink
      )

      if (linkValue == linkName) {
        await theLink.click()
        break
      }
    }
  }
}

Given(
  "{} switchs to {} status before {}",
  async (StepActionName, StepStatus, timeOut) => {
    await waitStepStatus(StepActionName, StepStatus, timeOut)
  }
)

const verifyOtherStepStatus = async (steps, OtherStepStatus, timeOut) => {
  steps_array = steps.split(";")
  step_status = OtherStepStatus.split(";")

  for (j = 0; j < steps_array.length; j++) {
    let theStep = steps_array[j]
    
    let theStepStatus = step_status[j]

    if (theStepStatus == "waiting") {
      theStepStatus = theStepStatus.replace("ing", "_predecessor")
    }

    var stepLabel = await component.WorkflowSteps.getStepName(theStep)

    if (stepLabel) {
      await component.WorkflowSteps.getStepStatus(theStepStatus, timeOut)
    }
  }
}
const pickPeriod = async (period) => {
  await page.waitForSelector(".block-custom.block-no-title h4 select")
  await page.click(".block-custom.block-no-title h4 select")
  await page.select(".block-custom.block-no-title h4 select", period)
}

const verifyAllValidationPhases = async () => {
  let Allsteps = await page.$$(".step")

  for (let i = 0; i < Allsteps.length; i++) {
    let theStep = Allsteps[i]

    var tasksPerStep = await page.evaluate((theStep) => {
      const tasks = theStep.querySelectorAll(".task")
      return Object.values(tasks)
    }, theStep)

    for (let j = 0; j < tasksPerStep.length; j++) {
      try {
        await page.waitForFunction(
          (theStep, index) => {
            var taskStatus =
              theStep.querySelectorAll(".task")[index].classList[1]

            return taskStatus === "success" || taskStatus === "finished"
          },
          { timeout: 1800000 },
          theStep,
          j
        )
      } catch (error) {
        console.error("Error occurred:", error)
        throw "ERROR: The step status is neither successful nor finished"
      }
    }
  }
}
const testLogout = async () => {
  await page.waitForSelector(".retract-button")
  await page.click(".retract-button")
  await page.waitForSelector("a.user")
  await page.click("a.user")
  await page.waitForSelector(".link-logout")
  await page.click(".link-logout")
}

const CheckFilteredWorkflows = async (columns, values) => {
  let columnList = columns.split(";")
  let valuesList = values.split(";")

  let lines = await page.$$(".line:not(.header)")
  let headerColumns = await page.$$(
    ".line.header .cell:not(.cell-check):not(.cell-details)"
  )

  for (let i = 0; i < lines.length; i++) {
    let theLine = lines[i]

    let columns = await theLine.$$(".cell:not(.cell-check):not(.cell-details)")
    let languageColumn = await theLine.$(
      ".cell-countries:not(.cell-check):not(.cell-details)"
    )

    for (let j = 0; j < headerColumns.length; j++) {
      let columnName = await page.evaluate(
        (headerColumns) => headerColumns.innerText,
        headerColumns[j]
      )

      TTValue = await page.evaluate(
        (columns) => columns.querySelector("div").attributes[0].value,
        columns[j]
      )

      ColumnsLabel = await page.evaluate(
        (columns) => columns.innerText,
        columns[j]
      )
      LanguageValue = await page.evaluate(
        (languageColumn) =>
          languageColumn.querySelectorAll(".row .icon_box")[1].attributes[0]
            .value,
        languageColumn
      )

      for (let k = 0; k < columnList.length; k++) {
        if (columnName == columnList[k]) {
          if (
            TTValue == valuesList[k] ||
            ColumnsLabel == valuesList[k] ||
            LanguageValue == valuesList[k]
          ) {
            return true
          }
        }
      }
    }
  }
}

Then(
  "I verifiy that {} status is {} before {}",
  async (steps, OtherStepStatus, timeOut) => {
    await verifyOtherStepStatus(steps, OtherStepStatus, timeOut)
  }
)
Then(
  "The correspondent workflows {} are filled with correspondent {}",
  async (columns, values) => {
    await CheckFilteredWorkflows(columns, values)
  }
)
When("I activate button {} of {} filter", async (filterButton, filter) => {
  await component.Filters.QuickGroupingFiltersOn(filterButton, filter)
})

When(
  "I pick a period {} from the period list in the select box",
  async (period) => {
    await pickPeriod(period)
  }
)

Then(
  "I verify the workflows number of {} is decremented by {}",
  async (Status, number) => {
    await VerifyWorkflowNum(Status, number)
  }
)

Then(
  "I verify that the status of all steps in each validation phase is success",
  async () => {
    await verifyAllValidationPhases()
  }
)

When("I logout", async () => {
  await testLogout()
})

When("I click on link {}", async (linkName) => {
  await clickOnLink(linkName)
})

const clickStepUncertified = async (StepActionName) => {
  await component.WorkflowSteps.clickOnUncertifiedStep(StepActionName)
}
const clickStepCertified = async (StepActionName) => {
  await component.WorkflowSteps.clickOnCertifiedStep(StepActionName)
}

When(
  "I click on the step {} of uncertified reports",
  async (StepActionName) => {
    await clickStepUncertified(StepActionName)
  }
)
When("I click on the {} step of certified report", async (StepActionName) => {
  await clickStepCertified(StepActionName)
})

const waitCertifiedStepStatus = async (StepActionName, StepStatus, timeOut) => {
  if (StepStatus == "wait validation") {
    StepStatus = StepStatus.toLowerCase().replace(" ", "_")
  } else if (StepStatus == "waiting") {
    StepStatus = StepStatus.replace("ing", "_predecessor")
  } else {
    StepStatus = StepStatus
  }

  var stepLabel = await component.WorkflowSteps.getCertifiedStepName(
    StepActionName
  )

  var Status = await component.WorkflowSteps.getCertifiedStepStatus(
    StepStatus,
    timeOut
  )
  if (!(stepLabel = true) && (Status = true)) {
    throw `Error : StepStatus is not ${StepStatus} `
  }
}
const waitUncertifiedStepStatus = async (
  StepActionName,
  StepStatus,
  timeOut
) => {
  if (StepStatus == "wait validation") {
    StepStatus = StepStatus.toLowerCase().replace(" ", "_")
  } else if (StepStatus == "waiting") {
    StepStatus = StepStatus.replace("ing", "_predecessor")
  } else {
    StepStatus = StepStatus
  }

  var stepLabel = await component.WorkflowSteps.getUncertifiedStepName(
    StepActionName
  )

  var Status = await component.WorkflowSteps.getUncertifiedStepStatus(
    StepStatus,
    timeOut
  )
  if (!(stepLabel = true) && (Status = true)) {
    throw `Error : StepStatus is not ${StepStatus} `
  }
}

When(
  "The step {} of the uncertified reports switch to the {} status Before {}",
  async (StepActionName, StepStatus, timeOut) => {
    await waitUncertifiedStepStatus(StepActionName, StepStatus, timeOut)
  }
)
When(
  "The {} of the certified reports switch to status {} Before {}",
  async (StepActionName, StepStatus, timeOut) => {
    await waitCertifiedStepStatus(StepActionName, StepStatus, timeOut)
  }
)


const displayedTotSteps = async (StepsTotal) => {
  let total = await page.$(".cell-steps.string")

  let displayedTotal = await page.evaluate((elm) => elm.innerText, total)
  displayedTotal = displayedTotal.split("/")

  if (displayedTotal[1] != StepsTotal) {
    throw `The right steps total ${StepsTotal} is not displayed correctly`
  }
}

const displayCodeWorkflow = async (CodeWorkflow) => {
  await page.waitForSelector(".left .value")
  let workflow = await page.$(".left .value")
  let codeWkf = await page.evaluate((elm) => elm.innerText, workflow)
  if (codeWkf == CodeWorkflow) {
    await component.ElementVisibility.select.elementIsVisible(workflow)
  } else {
    throw `The ${CodeWorkflow} is not displayed !`
  }
}
const displayCodeAction = async (CodeAction) => {
  let codeAct = await page.$(".column.around.left")
  let code = await page.evaluate(
    (elm) => elm.lastChild.querySelector(".value").innerText,
    codeAct
  )
  if (code == CodeAction) {
    await component.ElementVisibility.select.elementIsVisible(codeAct)
  } else {
    throw `The ${CodeAction} is not displayed !`
  }
}
When(
  "Final reports {} are successfully added to the new directory {}",
  async (FinalReports, directory) => {
    await connectSSH(FinalReports, directory)
  }
)
When(
  "I check the total of steps {} of the first result displayed in the follow up screen",
  async (StepsTotal) => {
    await displayedTotSteps(StepsTotal)
  }
)
Then(
  "I verify that the code workflow {} is displayed",
  async (CodeWorkflow) => {
    await displayCodeWorkflow(CodeWorkflow)
  }
)
Then("I verify that the code action {} is displayed", async (CodeAction) => {
  await displayCodeAction(CodeAction)
})

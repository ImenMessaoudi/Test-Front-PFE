var SelectAllWorkflows = async () => {
  let clickCheckInput = await page.click(".cell-check input")

  if (clickCheckInput) {
    let workflows = await page.$$(".spreadsheet .line:not(.header)")
    for (var i = 0; i < workflows.length; i++) {
      let workf = workflows[i]

      var sel = await page.evaluate(
        (workf) => workf.querySelectorAll(".cell-check input"),
        workf
      )

      for (var i = 0; i < sel.length; i++) {
        if (!sel[i].checked) {
        }
      }
    }
  }
}

var DeselectAllWorkflows = async () => {
  // let checked = await page.evaluate(".cell-check input".checked)
  let checked = await page.evaluate(
    () => document.querySelector(".cell-check input").checked
  )

  if (checked) {
    await page.click(".cell-check input")

    let workflows = await page.$$(".spreadsheet .line:not(.header)")
    for (var i = 0; i < workflows.length; i++) {
      let workf = workflows[i]

      var sel = await page.evaluate(
        (workf) => workf.querySelectorAll(".cell-check input"),
        workf
      )
      for (var j = 0; j < sel.length; j++) {
        if (!sel[j].checked) {
          throw "workflows are not selected"
        }
      }
    }
  }
}

var SelectColumn = async (column1) => {
  let selector = `.line.header .cell-${column1}`
  await page.waitForSelector(selector)
}

var MoveColumns = async (column1, column2) => {
  const origin = await page.$(`.line.header .cell-${column1}`)
  const destination = await page.$(`.line.header .cell-${column2}`)
  const ob = await origin.boundingBox()
  const db = await destination.boundingBox()

  await page.mouse.move(ob.x + ob.width / 2, ob.y + ob.height / 2)
  await page.mouse.down()

  await page.mouse.move(db.x + db.width / 2, db.y + db.height / 2)
  await page.mouse.up()
}

var AccessRun = async () => {
  await page.waitForSelector(".cell-details a")
  await page.click(".cell-details a")
}

var ClickColumn = async (column) => {
  let selector = `.line.header .cell-${column}`
  await page.waitForSelector(selector)
  await page.click(selector)
}

var DoubleClickColumn = async (column) => {
  let selector = `.line.header .cell-${column}`
  await page.click(selector)
  await page.click(selector)
}

var CheckColumnsOrder = async (columns) => {
  let columnsList = columns.split(",")
  let selector = `.line.header .cell`
  await page.waitForSelector(selector)
  let cellsLength = await page.evaluate(
    (selector) => $$(selector).length,
    selector
  )
  let displayedColumns = []

  for (let i = 1; i < cellsLength; i++) {
    columnName = await page.evaluate(
      (selector, i) => {
        if (getComputedStyle($$(selector)[i]).display != "none") {
          return $$(selector)[i].querySelector("div").innerText
        }
      },
      selector,
      i
    )

    if (columnName) {
      displayedColumns.push(columnName)
    }
  }
}

var ResizeColumns = async (column) => {
  const origin = await page.$(`.line.header .cell-${column}`)

  const ob = await origin.boundingBox()

  await page.mouse.move(ob.x + (3 * ob.width) / 4, ob.y)
  await page.mouse.down()
  await page.mouse.move(ob.x + (3 * ob.width) / 4 + 500, ob.y)
  await page.mouse.down()
}

var ClickOnIcon = async (selector) => {
  await page.waitForSelector(selector)
  await page.click(selector)
}

var ClickOnCancelSearch = async () => {
  await page.click('[*|href="#pt-icon-cross)"]')
}

var suggList = async (selector, value) => {
  let sugg = await page.$$(selector)
  for (let k = 0; k < sugg.length; k++) {
    let suggValue = await page.evaluate((sugg) => sugg.innerText, sugg[k])

    if (suggValue == value) {
      await sugg[k].click()
    }
  }
}

var advancedSearch = async (criteria, values) => {

  //const selector = 'use[xlink\\:href="#nx-chevron"]'
  //await click(selector)
  await ClickOnIcon('[*|href="#nx-chevron"]')

  let val_array = values.split(";")
  let crit_array = criteria.split(";")
  //La  liste  recupere  plusieurs  d'ou cette  ecriture (label)
  //let label_array = await page.$$(".advanced:not(.search-wrapper) label")
  let label_array = await page.$$(".advanced:not(.search-wrapper) label")

  for (let i = 0; i < crit_array.length; i++) {
    let theCriteria = crit_array[i]
    let theValue = val_array[i]

    for (let j = 0; j < label_array.length; j++) {
      let lab = label_array[j]
     // labelText = page.$$(".advanced:not(.search-wrapper) label")   
     //labelText.map(label => label.innerText)
      let labelText = await page.evaluate((lab) => lab.innerText, lab)
      let found = false
      if (labelText.toLowerCase() == theCriteria.toLowerCase()) {
        await page.evaluate((lab) => lab.querySelector("input").click(), lab)
        await page.keyboard.type(theValue)

        await suggList(".suggestion.active", theValue)

        found = true
        break
      }
    }
  }
  await page.click('[*|href="#nx-chevron"]')
}

var search = async (criteria, values) => {
  let val_array = values.split(";")
  let crit_array = criteria.split(";")
  let label_array = await page.$$(".advanced:not(.search-wrapper) label")

  for (let i = 0; i < crit_array.length; i++) {
    let theCriteria = crit_array[i]
    let theValue = val_array[i]

    for (let j = 0; j < label_array.length; j++) {
      let lab = label_array[j]
      let labelText = await page.evaluate((lab) => lab.innerText, lab)
      let found = false
      if (labelText.toLowerCase() == theCriteria.toLowerCase()) {
        await page.evaluate((lab) => lab.querySelector("input").click(), lab)
        await page.keyboard.type(theValue)

        await suggList(".suggestion.active", theValue)

        found = true
        break
      }
    }
  }
}

var SerachByFavList = async (criteria, values) => {
  let val_array = values.split(";")
  let crit_array = criteria.split(";")

  let suggestionList = await page.$$(".list .suggestion")

  let SuggListLength = suggestionList.length

  for (let i = 0; i < SuggListLength; i++) {
    let theSugg = suggestionList[i]

    let filters = await theSugg.$$(".filter")

    if (val_array.length == filters.length) {
      for (let j = 0; j < val_array.length; j++) {
        let Keys = await theSugg.$$(".filter .key")

        let Values = await theSugg.$$(".filter .value")

        let TheKeyLabel = await page.evaluate((Keys) => Keys.innerText, Keys[j])

        let TheValueLabel = await page.evaluate(
          (Values) => Values.innerText,
          Values[j]
        )

        if (TheKeyLabel == crit_array[j] && TheValueLabel == val_array[j]) {
          await page.evaluate((theSugg) => theSugg.click(), theSugg)
        } else {
          throw `the correspondant favorite list does not exist`
        }
      }
    } else {
      throw `there's no favorite list found`
    }
  }
}

var getAccount = async () => {
  let account = await page.$(".account")
  let accountVersion = await page.evaluate(
    (account) => account.innerText,
    account
  )
  return accountVersion
}

var clickOnFollowUPLink = async () => {
  await page.click("a.slash")
}

var clickOnDashboard = async () => {
  await page.waitForSelector(".retract-button")
  await page.click(".retract-button")
  await page.click("a.dashboard")
}

var clickOnAuthorities = async () => {
  await page.click(
    'a[href="#/authorities-statuses?dashboard_filters=off&grouping=splitted&break_umbrellas=row"]'
  )
}

var clickOnActivity = async () => {
  await page.click(".links a.activity")
}

var clickOnDocument = async () => {
  await page.click(
    'a[href="#/documents?dashboard_filters=off&grouping=splitted&break_umbrellas=row"]'
  )
}

var ChooseLanguage = async (language) => {
  await page.select("#lang", language)
}

var HoverFirstLine = async () => {
  await page.waitForSelector(".cell-details a")
  await page.hover(".cell-details a")
}

var GetSelectedDocs = async () => {
  var scope = await page.$$(".scope div")
  let selectedRows = scope[0]
  let selectedRowsLabel = await page.evaluate(
    (selectedRows) => selectedRows.innerText,
    selectedRows
  )
  let theSelectedRow = selectedRowsLabel.split(": ")[1].split("/")[0]

  return theSelectedRow
}

var GetFiltredWorkflows = async () => {
  var scope = await page.$$(".scope div")
  let filtredRows = scope[0]

  let filtredRowsLabel = await page.evaluate(
    (filtredRows) => filtredRows.innerText,
    filtredRows
  )

  let theFiltredRows = filtredRowsLabel.split(": ")[1].split("/")[1]

  return theFiltredRows
}

var GetTotalRows = async () => {
  var scope = await page.$$(".scope div")
  let TotalRows = scope[1]
  let TotalRowsLabel = await page.evaluate(
    (TotalRows) => TotalRows.innerText,
    TotalRows
  )

  let theTotalNumbrOfDocs = TotalRowsLabel.split(": ")[1]

  return theTotalNumbrOfDocs
}

var QuickGroupingFiltersOn = async (filterButton, filter) => {
  let labelList = await page.$$(".grouping label")

  for (let i = 0; i < labelList.length; i++) {
    let theLabel = labelList[i]

    let LabelText = await page.evaluate(
      (theLabel) => theLabel.innerText,
      theLabel
    )

    if (LabelText.includes(filter)) {
      let filters = await theLabel.$$("a")

      for (let j = 0; j < filters.length; j++) {
        let filtersLabel = await page.evaluate(
          (filters) => filters.innerText,
          filters[j]
        )

        if (filtersLabel == filterButton) {
          await page.evaluate((filters) => filters.click(), filters[j])

          if (!(filterButton == "Off")) {
            await page.waitForSelector(".row select", { timeout: 36000 })
          }

          break
        }
      }
      break
    }
  }
}

var clickOnStepName = async (StepActionName) => {
  StepsArr = await page.$$(".no-fullscreen .action .name")

  for (let i = 0; i < StepsArr.length; i++) {
    let stpName = StepsArr[i]

    let name = await page.evaluate((stpName) => stpName.innerText, stpName)
    if (name == StepActionName) {
      await page.evaluate((stpName) => stpName.click(), stpName)
    }
  }
}
var getStepName = async (stepName) => {
  var stepNameList = await page.$$(".no-fullscreen .action .name")

  for (i = 0; i < stepNameList.length; i++) {
    let theStepName = stepNameList[i]
    var stepLabel = await page.evaluate(
      (stepNameList) => stepNameList.innerText,
      theStepName
    )
    if (stepLabel == stepName) {
      return true
    }
  }
}

var getStepStatus = async (stepStatus, timeOut) => {
  let stepStatusList = await page.$$(".no-fullscreen .action .task")

  let theStepStatus = stepStatusList[i]

  try {
    await page.waitForFunction(
      (stepStatus, theStepStatus) => stepStatus === theStepStatus.classList[1],
      { timeout: 1800000 },
      stepStatus,
      theStepStatus
    )
    return true
  } catch (error) {
    throw ` Step Status is different from ${stepStatus}`
  }
}

var relaunchWorkflow = async (stepName) => {
  await clickOnStepName(stepName)
  await page.click(".box-form button")
  await page.waitForSelector(".workflow .task.running", { timeout: 360000 })
}

var validationButton = async (buttonName) => {
  if (buttonName == "Accept" || buttonName == "Accepter") {
    await page.waitForSelector(".column button", { timeout: 240000 })
    await page.click(".column button", { timeout: 240000 })
  } else if (buttonName == "Reject" || buttonName == "Rejeter") {
    await page.waitForSelector("button.ghost")
    await page.click("button.ghost")
  } else if (buttonName == "Relancer") {
    await page.waitForSelector(".action_buttons button")
    await page.click(".action_buttons button")
  }
}

var skipButton = async () => {
  await page.waitForSelector(".column button")
  let buttons = await page.$$(".column button")
  for (let i = 0; i < buttons.length; i++) {
    let theButton = buttons[i]

    let buttonName = await page.evaluate(
      (theButton) => theButton.innerText,
      theButton
    )

    if (buttonName == "Passer") {
      await page.evaluate((theButton) => theButton.click(), theButton)
    }
  }
}

var elementIsVisible = async (elm) => {
  let isVisible = await page.evaluate((elm) => {
    if (!elm) return false
    const style = getComputedStyle(elm)
    return style.display !== "none"
  }, elm)
  if (!isVisible) {
    throw " Element is not displayed"
  }
}

var clickOnUncertifiedStep = async (StepActionName) => {
  StepsArr = await page.$$(".workflow.no-fullscreen :nth-child(4) .name")

  for (let i = 0; i < StepsArr.length; i++) {
    let stpName = StepsArr[i]

    let name = await page.evaluate((stpName) => stpName.innerText, stpName)
    if (name == StepActionName) {
      await page.evaluate((stpName) => stpName.click(), stpName)
    }
  }
}
var getUncertifiedStepName = async (stepName) => {
  var stepNameList = await page.$$(
    ".workflow.no-fullscreen :nth-child(4) .name"
  )

  for (i = 0; i < stepNameList.length; i++) {
    let theStepName = stepNameList[i]
    var stepLabel = await page.evaluate(
      (stepNameList) => stepNameList.innerText,
      theStepName
    )
    if (stepLabel == stepName) {
      return true
    }
  }
}
var getUncertifiedStepStatus = async (stepStatus) => {
  let stepStatusList = await page.$$(
    ".no-fullscreen :nth-child(4) .action .task"
  )

  let theStepStatus = stepStatusList[i]

  try {
    await page.waitForFunction(
      (stepStatus, theStepStatus) => stepStatus === theStepStatus.classList[1],
      { timeout: 3000000 },
      stepStatus,
      theStepStatus
    )
    return true
  } catch (error) {
    throw ` Step Status is different from ${stepStatus}`
  }
}

var getCertifiedStepStatus = async (stepStatus) => {
  let stepStatusList = await page.$$(
    ".no-fullscreen :nth-child(6) .action .task"
  )

  let theStepStatus = stepStatusList[i]

  try {
    await page.waitForFunction(
      (stepStatus, theStepStatus) => stepStatus === theStepStatus.classList[1],
      { timeout: 3000000 },
      stepStatus,
      theStepStatus
    )
    return true
  } catch (error) {
    throw ` Step Status is different from ${stepStatus}`
  }
}
var clickOnCertifiedStep = async (StepActionName) => {
  StepsArr = await page.$$(".workflow.no-fullscreen :nth-child(6) .name")

  for (let i = 0; i < StepsArr.length; i++) {
    let stpName = StepsArr[i]

    let name = await page.evaluate((stpName) => stpName.innerText, stpName)
    if (name == StepActionName) {
      await page.evaluate((stpName) => stpName.click(), stpName)
    }
  }
}
var getCertifiedStepName = async (stepName) => {
  var stepNameList = await page.$$(
    ".workflow.no-fullscreen :nth-child(6) .name"
  )

  for (i = 0; i < stepNameList.length; i++) {
    let theStepName = stepNameList[i]
    var stepLabel = await page.evaluate(
      (stepNameList) => stepNameList.innerText,
      theStepName
    )
    if (stepLabel == stepName) {
      return true
    }
  }
}

Search = {
  ClickOnIcon: async (selector) => {
    return await ClickOnIcon(selector)
  },

  ClickOnCancelSearch: async () => {
    return await ClickOnCancelSearch()
  },

  suggList: async (selector, value) => {
    return await suggList(selector, value)
  },

  SerachByFavList: async (criteria, values) => {
    return await SerachByFavList(criteria, values)
  },
  advancedSearch: async (criteria, values) => {
    return await advancedSearch(criteria, values)
  },
  search: async (criteria, values) => {
    return await search(criteria, values)
  },
}

Hover = {
  HoverFirstLine: async () => {
    return await HoverFirstLine()
  },
}

Filters = {
  QuickGroupingFiltersOn: async (filter, filterButton) => {
    return await QuickGroupingFiltersOn(filter, filterButton)
  },
}

WorkflowSteps = {
  getStepName: async (stepName) => {
    return await getStepName(stepName)
  },
  getUncertifiedStepName: async (stepName) => {
    return await getUncertifiedStepName(stepName)
  },
  getCertifiedStepName: async (stepName) => {
    return await getCertifiedStepName(stepName)
  },

  getStepStatus: async (stepStatus, timeOut) => {
    return await getStepStatus(stepStatus, timeOut)
  },

  getUncertifiedStepStatus: async (stepStatus) => {
    return await getUncertifiedStepStatus(stepStatus)
  },
  getCertifiedStepStatus: async (stepStatus) => {
    return await getCertifiedStepStatus(stepStatus)
  },

  relaunchWorkflow: async (stepName) => {
    return await relaunchWorkflow(stepName)
  },
  validationButton: async (buttonName) => {
    return await validationButton(buttonName)
  },

  skipButton: async () => {
    return await skipButton()
  },
  clickOnStepName: async (StepActionName) => {
    return await clickOnStepName(StepActionName)
  },

  clickOnUncertifiedStep: async (StepActionName) => {
    return await clickOnUncertifiedStep(StepActionName)
  },
  clickOnCertifiedStep: async (StepActionName) => {
    return await clickOnCertifiedStep(StepActionName)
  },
}

RowCenter = {
  GetSelectedDocs: async () => {
    return await GetSelectedDocs()
  },
  GetFiltredWorkflows: async () => {
    return await GetFiltredWorkflows()
  },

  GetTotalRows: async () => {
    return await GetTotalRows()
  },
}

NavBottom = {
  getAccount: async () => {
    return await getAccount()
  },
  clickOnFollowUPLink: async () => {
    return await clickOnFollowUPLink()
  },
  clickOnDashboard: async () => {
    return await clickOnDashboard()
  },
  clickOnAuthorities: async () => {
    return await clickOnAuthorities()
  },
  clickOnActivity: async () => {
    return await clickOnActivity()
  },
  clickOnDocument: async () => {
    return await clickOnDocument()
  },
  ChooseLanguage: async (language) => {
    return await ChooseLanguage(language)
  },
}
spreadsheet = {
  select: {
    SelectAllWorkflows: async () => {
      return await SelectAllWorkflows()
    },
    DeselectAllWorkflows: async () => {
      return await DeselectAllWorkflows()
    },
    SelectColumn: async (column1) => {
      return await SelectColumn(column1)
    },
    MoveColumns: async (column1, column2) => {
      return await MoveColumns(column1, column2)
    },
    AccessRun: async () => {
      return await AccessRun()
    },
    ClickColumn: async (column) => {
      return await ClickColumn(column)
    },
    DoubleClickColumn: async (column) => {
      return await DoubleClickColumn(column)
    },
    CheckColumnsOrder: async (columns) => {
      return await CheckColumnsOrder(columns)
    },
    ResizeColumns: async (column) => {
      return await ResizeColumns(column)
    },
  },
}
Download = {
  select: {
    Download: async () => {
      return await Download()
    },
  },
}

ElementVisibility = {
  select: {
    elementIsVisible: async (elm) => {
      return await elementIsVisible(elm)
    },
  },
}

module.exports = {
  Search,
  spreadsheet,
  Download,
  WorkflowSteps,
  RowCenter,
  Hover,
  Filters,
  NavBottom,
  ElementVisibility,
}

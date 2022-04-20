if (!window.DHTMLSuite) var DHTMLSuite = new Object()
DHTMLSuite.progressBar = function () {
  let progressBar_steps
  let div_progressPane
  let div_progressBar_bg
  let div_progressBar_outer
  let div_progressBar_txt
  let progressBarWidth
  let currentStep
  let layoutCSS
  this.progressBar_steps = 50
  this.progressPane = false
  this.progressBar_bg = false
  this.progressBar_outer = false
  this.progressBar_txt = false
  this.currentStep = 0
  this.layoutCSS = 'progress-bar.css'
  try {
    if (!standardObjectsCreated) DHTMLSuite.createStandardObjects()
  } catch (e) {
    alert('Include the dhtmlSuite-common.js file')
  }
}
DHTMLSuite.progressBar.prototype = {
  setSteps: function (numberOfSteps) {
    this.progressBar_steps = numberOfSteps
  },
  init: function () {
    document.body.style.width = '100%'
    document.body.style.height = '100%'
    document.documentElement.style.overflow = 'hidden'
    DHTMLSuite.commonObj.loadCSS(this.layoutCSS)
    this.__createDivElementsForTheProgressBar()
  },
  moveProgressBar: function (steps) {
    this.progressBarWidth = this.div_progressBar_bg.clientWidth
    if (!steps) {
      this.div_progressBar_outer.style.width = progressBarWidth + 'px'
      this.div_progressBar_txt.innerHTML = '100%'
      this.__hideProgressBar()
    } else {
      this.currentStep += steps
      if (this.currentStep > this.progressBar_steps) {
        this.currentStep = this.progressBar_steps
      }
      const width = Math.ceil(
        this.progressBarWidth * (this.currentStep / this.progressBar_steps)
      )
      this.div_progressBar_outer.style.width = width + 'px'
      const percent = Math.ceil(
        (this.currentStep / this.progressBar_steps) * 100
      )
      this.div_progressBar_txt.innerHTML = percent + '%'
      if (this.currentStep == this.progressBar_steps) {
        this.__hideProgressBar()
      }
    }
  },
  __hideProgressBar: function () {
    document.body.style.width = null
    document.body.style.height = null
    document.documentElement.style.overflow = ''
    setTimeout(
      'document.getElementById("DHTMLSuite_progressPane").style.display="none"',
      50
    )
  },
  __createDivElementsForTheProgressBar: function () {
    this.div_progressPane = document.createElement('DIV')
    this.div_progressPane.id = 'DHTMLSuite_progressPane'
    document.body.appendChild(this.div_progressPane)
    this.div_progressBar_bg = document.createElement('DIV')
    this.div_progressBar_bg.id = 'DHTMLSuite_progressBar_bg'
    this.div_progressPane.appendChild(this.div_progressBar_bg)
    this.div_progressBar_outer = document.createElement('DIV')
    this.div_progressBar_outer.id = 'DHTMLSuite_progressBar_outer'
    this.div_progressBar_bg.appendChild(this.div_progressBar_outer)
    const div = document.createElement('DIV')
    div.id = 'DHTMLSuite_progressBar'
    this.div_progressBar_outer.appendChild(div)
    this.div_progressBar_txt = document.createElement('DIV')
    this.div_progressBar_txt.id = 'DHTMLSuite_progressBar_txt'
    this.div_progressBar_txt.innerHTML = '0 %'
    this.div_progressBar_bg.appendChild(this.div_progressBar_txt)
  }
}

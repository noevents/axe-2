import './../styles/main.scss'

import paper from 'paper'

if (process.env.NODE_ENV !== 'production') {
  require('./../index.pug')
}

class App {
  constructor () {
    // coordinates of 0 on canvas axe
    this.zeroX = 36
    this.zeroY = 176
    // array of points on axe
    this.points = []
    // arrows
    this.arcs = []

    this.axe = document.getElementById('axe')
    this.initBtn = document.getElementById('init-btn')
    this.firstDigit = document.getElementById('first-digit')
    this.secondDigit = document.getElementById('second-digit')
    this.inputContainer = document.getElementById('input-container')
    this.result = document.getElementById('result')
    // actual values
    this.aVal = null
    this.bVal = null
  }
  randomInteger (min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand)
    return rand
  }

  raiseError (where) {
    this[where].style.backgroundColor = 'orange'
  }
  resetStyle (where) {
    this[where].style.backgroundColor = ''
  }
  // creates input field for number
  createInput (positionX, positionY, which) {
    let valueInput = document.createElement('input')
    valueInput.className = 'value-input'
    valueInput.style.top = `${positionY}px`
    valueInput.style.left = `${positionX}px`
    valueInput.addEventListener('input', (e) => {
      e.preventDefault()
      this.inputChecker(e.target.value, valueInput, which)
    })
    return valueInput
  }
  // creates arrow
  renderArc (from, to, height) {
    let through = new paper.Point(from.x + ((to.x - from.x) / 2), height)

    let vector = to.subtract(through)
    let center = new paper.Point((vector.angle < 39) ? to.x - 2 : to.x, to.y - 5)
    let sides = 3
    let radius = 5
    let triangle = new paper.Path.RegularPolygon(center, sides, radius)
    triangle.rotate(vector.angle + 5)
    triangle.fillColor = 'red'

    let path = new paper.Path.Arc(from, through, to)
    path.strokeColor = 'red'
    this.arcs.push(path)
    this.arcs.push(triangle)
    return through
  }
  inputChecker (val, input, digit) {
    let check = (digit === 'firstDigit') ? this.aVal : this.bVal
    if (+val !== check) {
      this.raiseError(digit)
      input.style.color = 'red'
    } else {
      this.resetStyle(digit)
      // render value
      let inputReplacer = document.createElement('span')
      inputReplacer.className = input.className
      inputReplacer.style.top = input.style.top
      inputReplacer.style.left = input.style.left
      inputReplacer.innerHTML = val
      input.parentNode.replaceChild(inputReplacer, input)

      this.nextState(digit)
    }
  }
  initialState () {
    // clear previous
    this.result = document.getElementById('result')
    this.result.innerHTML = '?'
    this.firstDigit.innerHTML = this.aVal
    this.secondDigit.innerHTML = this.bVal
    while (this.inputContainer.firstChild) {
      this.inputContainer.removeChild(this.inputContainer.firstChild)
    }
    this.arcs.map(arc => arc.remove())

    let through = this.renderArc(this.points[0], this.points[this.aVal], 80)
    this.inputContainer.appendChild(this.createInput(through.x - 10, 0, 'firstDigit'))
  }

  nextState (currentDigit) {

    if (currentDigit === 'firstDigit') {
      let through = this.renderArc(this.points[this.aVal], this.points[this.bVal + this.aVal], 120)
      this.inputContainer.appendChild(this.createInput(through.x - 10, 40, 'secondDigit'))
    } else {
      // show final input

      let finalInput = document.createElement('input')
      finalInput.className = this.result.className

      finalInput.addEventListener('input', (e) => {
        e.preventDefault()
        finalInput.style.color = ''

        if (e.target.value.length < 2) return

        if (+e.target.value === +this.aVal + this.bVal) {
          let finalInputReplacer = document.createElement('span')
          finalInputReplacer.className = this.result.className
          finalInputReplacer.id = this.result.id
          finalInputReplacer.innerHTML = e.target.value
          finalInput.parentNode.replaceChild(finalInputReplacer, finalInput)
        } else {
          finalInput.style.color = 'red'
        }
      })

      this.result.parentNode.replaceChild(finalInput, this.result)
    }
  }

  init () {
    this.initBtn.addEventListener('click', () => {
      this.aVal = this.randomInteger(6, 9)
      this.bVal = this.randomInteger(11, 14) - this.aVal
      this.initialState()
    })

    paper.setup(this.axe)
    let raster = new paper.Raster('axe-sprite')
    raster.position = paper.view.center

    // point 0 on axe
    this.points.push(new paper.Point(this.zeroX, this.zeroY))

    // filling array of points
    for (let i = 0; i < 20; i++) {
      this.points.push(new paper.Point(this.zeroX = this.zeroX + 39, this.zeroY))
    }

    paper.view.draw()
  }
}

let app = new App()

app.init()

import './../styles/main.scss'
/* eslint-disable */

import paper from 'paper'

if (process.env.NODE_ENV !== 'production') {
  require('./../index.pug')
}

let aVal
let bVal
// array of points on axe 
let points = []
let arcs = []

initApp()

function initApp(){
  const axe = document.getElementById('axe')
  let submit = document.getElementById('submit')
  
  function handler(){
    let pointA = document.getElementById('a')
    let pointB = document.getElementById('b')
    aVal = pointA.value
    bVal = pointB.value
    initialState(aVal, bVal)
      .then(()=>{
        console.log('done')
      })
  }

  submit.addEventListener('click', handler)
  
  paper.setup(axe)
  let raster = new paper.Raster('axe-sprite')
  raster.position = paper.view.center

  let a
  // coordinates of 0 on axe
  let zeroX = 36
  const zeroY = 176
  // points to 0 on axe
  points.push(new paper.Point(zeroX, zeroY))
  
  //filling array of points
  for(let i=0; i<20; i++){
    points.push(new paper.Point(zeroX=zeroX+39, zeroY))
  }
  paper.view.draw()
}

// let state = 'init'

function initialState(pointA, pointB) {
  let inputContainer = document.getElementById('input-container')
  while (inputContainer.firstChild) {
    inputContainer.removeChild(inputContainer.firstChild);
  }
  return new Promise((resolve, reject)=>{
    arcs.map( arc => arc.remove())
    let through = new paper.Point((points[pointA].x - points[0].x)/2, 80)
    let path = new paper.Path.Arc(points[0], through, points[pointA])
    path.strokeColor = 'red';
    arcs.push(path)
    
    let valueInput = document.createElement('input')
    valueInput.className = 'value-input'
    valueInput.style.left = `${through.x+20}px`
    valueInput.addEventListener('input', (e)=>{
      e.preventDefault()
      if(e.data !== aVal) {
        raiseError()
      } else {
        // render value
        resolve()
      }
    })
    inputContainer.appendChild(valueInput)
  })
}

function raiseError(){
  
}


// handlers for different stages of the app
function secondStage(){
  
}
function finalStage(){
  
}


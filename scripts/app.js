// !----- constants -----*/
const startPosition = 40
let currentPosition = startPosition




// !----- state variables -----*/
let cells = []
const width = 11
const height = 11
const cellCount = width * height


// !----- cached elements  -----*/
const grid = document.querySelector('.grid')
document.addEventListener('keydown', handleMovement)

// !----- event listeners -----*/


// !----- functions -----*/

// Function that initializes game
function init() {
  renderGrid()
  snakeHead(startPosition)
  handleMovement()
}

//creates our grid to show/ use indexes at beginning to help visualise
function renderGrid() {
 for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    cell.innerText = i
    cell.dataset.index = i
    cell.style.height = `${100 / height}%`
    cell.style.width = `${100 / width}%`
    grid.appendChild(cell)
    cells.push(cell)
 }
  snakeHead(startPosition)
}

//adds snakehead to grid
function snakeHead(position) {
  console.log('Sneakhead is here--->', position)
  console.log("Guys string", cells[position])
  cells[position].classList.add('square')
}

function handleMovement(event){
  const key = event.keyCode

  const up = 38
  const upWasd = 87
  const down = 40
  const downWasd = 83
  const left = 37
  const leftWasd = 65
  const right = 39
  const rightWasd = 68

  if (key === upWasd || key === up && currentPosition >= width) {
    console.log('UP')
    currentPosition -= width
  } else if (key === downWasd || key === down && currentPosition + width <= cellCount - 1) {
    console.log('DOWN')
    currentPosition += width
  } else if (key === leftWasd || key === left && currentPosition % width !== 0) {
    currentPosition--
    console.log('LEFT')
  } else if (key === rightWasd || key === right && currentPosition % width !== width - 1) {
    console.log('RIGHT')
    currentPosition++
    console.log(currentPosition)
  } else {
    console.log('INVALID KEY')
  }

  // Add cat class once currentPosition has been updated
  snakeHead(currentPosition)
  
}



window.addEventListener('DOMContentLoaded', init)
function init() {
  

  // !----- constants -----*/
  const startPosition = 95
  let currentPosition = startPosition
  const AUDIO = new Audio('scripts/642314__zagalo75__vibration.wav')
  const AUDIO_01 = new Audio('scripts/475347__fupicat__videogame-death-sound.wav')
  
  
  
  
  
  
  // !----- state variables -----*/
  let cells = []
  const width = 20
  const height = 20
  const cellCount = width * height
  let snakeTimer;
  // let snakeMovement = [startPosition]
  let snakeDirection = -1 ///-- mean right ++ left up -.width down up- +.width
  let snake = [93, 94, 95]
  let score = 0
  let gameStart = false
  
  

  
  
  
  
  // !----- cached elements  -----*/
  const grid = document.querySelector('.grid')
  const gameOverText = document.querySelector('.game-over')
  const scoreText = document.querySelector('.score-count')
  const resetButton = document.querySelector('.button')
  
  
  // !----- event listeners -----*/
  document.addEventListener('keydown', handleDirection)
  document.addEventListener('click', resetGame)

  
  // !----- functions -----*/
  
  
  //creates our grid to show/ use indexes at beginning to help visualise
  function renderGrid() {
   for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      // cell.innerText = i
      cell.dataset.index = i
      cell.style.height = `${100 / height}%`
      cell.style.width = `${100 / width}%`
      grid.appendChild(cell)
      cells.push(cell)
   }
   
    renderSnake(startPosition)
  }
  renderGrid()

  function borderFoodChecker() {
  for (let i = 0; i < cells.length; i++) {
    if (i < width || i % width === 0 || i > (width ** 2) - width - 1 || i % width === width - 1) {
      cells[i].classList.add('border')
      let gridBorderCells = cells[i]
      if (cells[i].classList.contains('food') && cells[i].classList.contains('border')) {
        console.log("hit")
        resetFood()
      }
    }
  }
  }
  //add food to the game and also uses math.random to generate food elsewhere once eaten.
  function renderFood() {
    const randomPosition = Math.floor(Math.random() * cellCount)
    // console.log("im here", randomPosition)
    cells[randomPosition].classList.add('food')

  }
  renderFood()

  //removes food once food is eaten
  function eatFood() {
    const foodSquare = document.querySelector('.food')
    if (foodSquare)
    { foodSquare.classList.remove('food')

    }
  }
   //resets the food once eaten then renders it again
  function resetFood() {
    eatFood()
    renderFood()
    
  }
  
  //renders the snakehead and snake onto the grid
  function renderSnake() {
    const [snakeHead, ...snakeBody] = snake
    cells[snakeHead].classList.add('snake-head')
    snakeBody.forEach(snakeIndex => {
    cells[snakeIndex].classList.add('square')
    
    })
  }
    //removes snake from current cell
    function snakeRemove() {
      const [snakeHead, ...snakeBody] = snake
      cells[snakeHead].classList.remove('snake-head')
      snakeBody.forEach(snakeIndex => {
      cells[snakeIndex].classList.remove('square')
      })
    }
  

  
  // creates controls to direct the snake
  function handleDirection(event){
    event.preventDefault()
    const key = event.keyCode
    const up = 38
    const upWasd = 87
    const down = 40
    const downWasd = 83
    const left = 37
    const leftWasd = 65
    const right = 39
    const rightWasd = 68
    
    if (key === upWasd || key === up && snakeDirection !== 20) {
      snakeDirection = -20
    } else if (key === downWasd || key === down && snakeDirection !== -20) {
      snakeDirection = 20
    } else if (key === leftWasd || key === left && snakeDirection !== 1) {
      snakeDirection = -1
    } else if (key === rightWasd || key === right && snakeDirection !== -1) {
      snakeDirection = 1
    }   
  }

  // is working as a setinterval timer for automatic snake movement and game loop.
  function snakeTrail() {
    clearInterval(snakeTimer)
    AUDIO.currentTime = 0;
    snakeTimer = setInterval(() => {
      borderFoodChecker()
      snakeRemove()
      if (!cells[snake[0] +snakeDirection].classList.contains('food')) {
        snake.pop()
      } else {
        AUDIO.play()
        resetFood()
        scoreAdder()
      }
      snake.unshift(snake[0] + snakeDirection)
      renderSnake()
      gameOver()
    }, 400)
  }
  snakeTrail()
  
  ///game over function
  function gameOver() {
    let currentPosition = snake[0]
    const newPosition = snake[0] + snakeDirection
    //upper
    if (snakeDirection === -width && newPosition < cells[0].dataset.index) {
      console.log("gameovr")
      return gameOverMessage()
    //downer
    } else if (snakeDirection === width && newPosition >= cellCount) {
      return gameOverMessage()
    //lefter
    } else if (snakeDirection === 1 && (currentPosition % width === width - 1)) {
      return gameOverMessage()
    //righter
    } else if (snakeDirection === -1 && (currentPosition % width === 0)) {
      return gameOverMessage()
    } else if (cells[snake[0]].classList.contains('square')) {
      return gameOverMessage()
    }
  }
 
 //creates game over message.
  function gameOverMessage() {
    gameOverText.style.display = 'block'
    AUDIO_01.play()
    clearInterval(snakeTimer)
  }

  //adds scores
  function scoreAdder() {
    score++
    scoreText.innerText = score
    // console.log("string here",score)
  }

  function resetGame(){
   if (gameStart == true)
   { location.reload()}
    gameStart = true
  }
  


  
 
  
 
   
  

  
  

}
  window.addEventListener('DOMContentLoaded', init)
  

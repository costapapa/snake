# snake

Description:
My first project on the General Assembly Software Engineering Immersive Course was to create a fully functioning web-browser 
game. The game I chose to code was ‘Snake’. The reason for choosing snake was because it was one of the first mobile games I 
played.

Timeframe & Working Team:
I was given just under a week to code the browser-game. I worked on this as a solo project.

Technologies:
HTML, CSS, JavaScript and Visual Studio Code. 

Brief:
- Render a game in the browser
- Include win/loss logic in HTML
- Include separate HTML, CSS & JavaScript Files
- Use vanilla JavaScript
- Have properly indented HTML, CSS & JavaScript. In addition, vertical whitespace needs to be consistent
- No remaining unused or commented out code.
- Have function and variables that are named sensibly
- Coded in a consistent manner
- Be deployed online using GitHub

Planning:
My sketch below was created on excalidraw:

<img width="290" alt="Screenshot 2023-08-03 at 12 57 38" src="https://github.com/costapapa/snake/assets/130251744/f41a3a5d-3852-4852-9832-0fc63b6b4cce">

1. Pseudocode, this was written before I began programming but a lot changed during the process.
2. Create/Config Board with grid and index all to make the game easier to identify the cells.
3. Code the snakehead to show on the board.
4. Give the snake some movement controls, Up, Down, Left, Right Arrow. I also want to add the option to use WASD to move 5. the snake.
6. Begin programming the snake to move vertically and horizontally along the grid.
7. Automate the snake so it moves itself after a key is pressed. To do this i will use setInterval()
8. Render the food on the grid and also add the Math.Floor(Math.Random) method, so the food is generated in random places 
   on the grid.
9. Create the Snake/Length Body so it becomes longer once it eats the food. This will most likely be an Array that uses 
   pop/push/unshift method to add on the length.
10. Code the snakehead so when it lands on the same grid as the food it lengthens in size.
11. Create some collisions, when the snake hits the border or itself the game ends.
12. Add a gameOver function. Which display in HTML Game Over once one of the collisions above happends.
13. Create a score total so when a food gets eaten the points are tallied up.

Stretch goals
1. Speed of the snake gets faster once a certain amount of points have been reached.
2. As the Excalidraw image shows, have the snake game displayed in a Nokia Phone so it gives it an original ‘feel’.

Code Process:
After setting up some basic HTML and CSS I then coded a render grid function:
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

This gave my browser game a grid, with indexes as they would have been helpful throughout the game build.

I created the render snake function which used the ClassLists to .add the snakehead and square. I used array destructuring to separate the snake(‘square’) from the snakeHead

function renderSnake() {
   const [snakeHead, ...snakeBody] = snake
   cells[snakeHead].classList.add('snake-head')
   snakeBody.forEach(snakeIndex => {
   cells[snakeIndex].classList.add('square')
  
   })
 }

<img width="215" alt="Screenshot 2023-08-03 at 13 03 13" src="https://github.com/costapapa/snake/assets/130251744/04a6a801-138b-45b0-a6e3-75cc43363973">

handleDirection function which gave the snake controls and what way to move in with a press of a key.

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

I then realised the ‘square’ would create a trail over the grid so had to add a snakeRemove function to remove the snakehead from the current cell of the grid it came from.

renderFood function which was similar to the rendersnake Function which included Math.floor(Math.Random) calculation so the food would spawn in random places on the grid.

snakeTrail function which created the interval of the game, this eventually ended up working as a loop for the game.

 function snakeTrail() {
   clearInterval(snakeTimer)
   snakeTimer = setInterval(() => {
     snakeRemove()
     if (!cells[snake[0] +snakeDirection].classList.contains('food')) {
       snake.pop()
     } else {
       resetFood()
       scoreAdder()
     }
     snake.unshift(snake[0] + snakeDirection)
     renderSnake()
     gameOver()
    
   }, 400)
 }
 snakeTrail()

 The loop includes adding to the length of the snake and resetting the Food once it has been eaten.

 function resetFood() {
   eatFood()
   renderFood()
 }

gameOver function to stop the game once the snake hits a wall or itself.

 function gameOver() {
   let currentPosition = snake[0]
   const newPosition = snake[0] + snakeDirection
   //upper
   if (snakeDirection === -width && newPosition < cells[0].dataset.index) {
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


Then I created a gameOver Message function which use a cached element and displayed a game over message to the left of the board once one of the above criterias were met. 
const gameOverText = document.querySelector('.game-over')
//creates game over message.
 function gameOverMessage() {
   gameOverText.style.display = 'block'
   clearInterval(snakeTimer)
 }


<img width="188" alt="Screenshot 2023-08-03 at 13 13 34" src="https://github.com/costapapa/snake/assets/130251744/a1a07f4d-d4cc-48c4-9db0-d72e5e2c7297">

I noticed that the game would carry on once the gameOver display was shown so I added clearInterval to stop this happening. The CSS added for the above is actually a display as none so once gameOverMessage is called it appears by using display: block;
 .game-over {
   display: none;
   align-items: center;
   position: absolute;
   top: 40vmin;
   left: 15vmin;
   right: 0vmin;
   width: 20vmin;
   height: 20vmin;


 }

Finally, I added a similar function to the above to add the score to the right of the game. This function is included in the game loop.

 //adds scores
 function scoreAdder() {
   score++
   scoreText.innerText = score
   // console.log("string here",score)
 }

Once the game functionality was finished, I noticed the snake could not go along the end cells of the grid. I then changed the border to a different color to avoid this happening. 
This also created another issue as the i then had to create a borderFoodChecker function which would ensure the food was not ever generated on the border itself. 
 function borderFoodChecker() {
 for (let i = 0; i < cells.length; i++) {
   if (i < width || i % width === 0 || i > (width ** 2) - width - 1 || i % width === width - 1) {
     cells[i].classList.add('border')
     if (cells[i].classList.contains('food') && cells[i].classList.contains('border')) {
       resetFood()
     }
   }
 }

Finally, i styled the CSS added some Google fonts and added some sounds to my game.
const AUDIO = new Audio('scripts/642314__zagalo75__vibration.wav')
 const AUDIO_01 = new Audio('scripts/475347__fupicat__videogame-death-sound.wav')

As we were given an extra day to submit our game i also added a reset button, to reset the game once you have reach Game Over
 function resetGame(){
  if (gameStart == true)
  { location.reload()}
   gameStart = true
 }

The final version of the game looked like this:

<img width="613" alt="Screenshot 2023-08-03 at 13 15 04" src="https://github.com/costapapa/snake/assets/130251744/3fc1fa5c-cb19-43a8-95b1-d9ffeecb7206">

Challenges:

The gameOver function was not working correctly when the snake hit the top of the grid and bottom of the grid. Especially the top collision took some time to work out. In the end i used the datacell.index to solve this issue. 
As originally programmed the snake would always generate a game over message if it was to go into the last cell of the grid. To solve this I created a border around the grid, however this then created another problem. The renderfood 

function sometimes generates on the border. To solve this I added a borderFoodChecker() function. 
 if (snakeDirection === -width && newPosition < cells[0].dataset.index) {
     return gameOverMessage()

Wins:

One of the major wins for me was definitely the borderFoodChecker function. This solved the problem I had by thinking of a different solution to just concentrating on why the snake was not moving along the end grid cells. 
Using destructuring arrays to separate the snakeHead and snake body (‘square’) was a nice way to code the function.

My key learning takeaways from this project was the basics of Javascript and understanding how to manipulate the DOM. I also learnt that coding itself can take a lot of time to implement even the simplest of features. 

Future Improvements:

I would like to deconstruct the gameloop/set interval function so it is all in one function. This would help my stretch goal of adding speed to the snake. 

I would also like to create a landing page which gives a description of the game/controls ,etc.









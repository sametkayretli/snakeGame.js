import {update as updateSnake, draw as drawSnake, snakeSpeed, getSnakeHead, snakeIntersection} from './snake.js';
import {update as updateFood, draw as drawFood} from './food.js';
import {outsideGrid} from './grid.js'

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');

const main = (currentTime) => {

   if(gameOver){
      if(confirm('Game over! press ok to start.')){
         window.location = '/';
      }
      return
   }

   window.requestAnimationFrame(main);
   //console.log(currentTime);
   const secsSinceLastRender = (currentTime - lastRenderTime) / 1000;
   
   if(secsSinceLastRender < (1 / snakeSpeed)) return

   //console.log("render");
   lastRenderTime = currentTime;

   update();
   draw();
};

window.requestAnimationFrame(main);

const update = () => {
   updateSnake();
   updateFood();
   checkDeath();
}

const draw = () => {
   gameBoard.innerHTML = '';
   drawSnake(gameBoard);
   drawFood(gameBoard);

}

function checkDeath(){
   gameOver = snakeIntersection();
}


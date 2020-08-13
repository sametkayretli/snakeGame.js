import { getInputDirection } from "./input.js";

export let snakeSpeed = 2;
const snakeBody = [{x: 11, y: 11}];
let newSegments = 0;

export const update = () => {

   addSegments();
   console.log("speed: "+snakeSpeed);
   console.log(snakeBody[0]);

   for(let i = snakeBody.length -2; i >= 0; i--){
      snakeBody[i + 1] = {...snakeBody[i]};
   }

   const inputDirection = getInputDirection();

   snakeBody[0].x += inputDirection.x;
   snakeBody[0].y += inputDirection.y;
   snakeBodyOutside(); 
 
   

}

export const draw = (gameBoard) => {
   snakeBody.forEach(segment =>{
      const snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = segment.y;
      snakeElement.style.gridColumnStart = segment.x;
      snakeElement.classList.add('snake');
      gameBoard.appendChild(snakeElement);
   }); 
}

export const expandSnake = (amount) => {
   newSegments += amount;
   snakeSpeed += 1;
}

export const onSnake = (position, { ignoreHead = false } = {}) => {
   return snakeBody.some((segment, index) => {
      if(ignoreHead && index === 0) return false;
      return equalPositions(segment, position);
   })
}

const equalPositions = (pos1, pos2) => {
   return pos1.x === pos2.x && pos1.y === pos2.y;
}

const addSegments = () => {
   for(let i =0; i < newSegments; i++){
      snakeBody.push({...snakeBody[snakeBody.length - 1]});
   }

   newSegments = 0;
}

export const getSnakeHead = () => {
   
   return snakeBody[0];
}

export const snakeIntersection = () => {
   return onSnake(snakeBody[0], {ignoreHead: true})
}

const snakeBodyOutside = () => {

   if(snakeBody[0].x > 21){
      snakeBody[0].x = 1;
   }
   if(snakeBody[0].x < 1){
      snakeBody[0].x = 21;
   }
   if(snakeBody[0].y > 21){
      snakeBody[0].y = 1;
   }
   if(snakeBody[0].y < 1){
      snakeBody[0].y = 21;
   }
}
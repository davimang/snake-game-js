const gameBoard = document.getElementById('game-canvas');
const gameBoard2d = gameBoard.getContext("2d");
const gameScore = document.getElementById('score');
const board_border = 'black';
const board_background = "lightgreen";
const snake_col = 'darkgreen';
const snake_border = 'darkblue';
let currDirection = "right";
document.addEventListener("keydown", shiftSnake);
let apple_x = Math.ceil(Math.round(Math.random() * (400)) / 10) * 10;
let apple_y = Math.ceil(Math.round(Math.random() * (400)) / 10) * 10;
let score = 0;
let snake  = [ {x : 200, y: 200}, {x : 190, y: 200}, {x : 180, y: 200}, {x : 170, y: 200}, {x : 160, y: 200}];


main();

let dx = 10;
let dy = 0;

function drawSnakePart(snakepart){
    gameBoard2d.fillStyle = 'darkgreen';
    gameBoard2d.strokestyle = 'darkgreen';
    gameBoard2d.fillRect(snakepart.x, snakepart.y, 10, 10);  
    gameBoard2d.strokeRect(snakepart.x, snakepart.y, 10, 10);
}

function drawSnake(){
    snake.forEach(drawSnakePart);
}
function main(){
    if(collisionCheck()) return;
    displayScore();
    setTimeout(function interval() {
        emptyCanvas();
        slide();
        drawSnake();
        drawApple(apple_x, apple_y);
        eatApple();
        main();
    }, 100)
}

function emptyCanvas() {
    //  Select the colour to fill the drawing
    gameBoard2d.fillStyle = board_background;
    //  Select the colour for the border of the canvas
    gameBoard2d.strokestyle = board_border;
    // Draw a "filled" rectangle to cover the entire canvas
    gameBoard2d.fillRect(0, 0, gameBoard.width, gameBoard.height);
    // Draw a "border" around the entire canvas
    gameBoard2d.strokeRect(0, 0, gameBoard.width, gameBoard.height);
    
  }

  function slide() {
    const front = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(front);
    snake.pop();
  }  


function shiftSnake(event){
    let code = event.keyCode;

    if(code == 37 && dx <= 0){
        dx = -10;
        dy = 0;
        currDirection = "left";
    }
    else if(code == 38 && dy <= 0){
        dx = 0;
        dy = -10;
        currDirection = "up";
    }
    else if(code == 39 && dx >= 0){
        dx = 10;
        dy = 0;
        currDirection = "right";
    }
    else if(code == 40 && dy >= 0){
        dx = 0;
        dy = 10;
        currDirection = "down";
    }
}

function collisionCheck(){
    const head = snake[0];
    if(head.x > 400 || head.x < 0 || head.y > 400 || head.y < 0){
        return true;
    }
    for(let i = 1; i < snake.length; i++){
        if(head.x == snake[i].x && head.y == snake[i].y) return true;
    }
    return false;
}

function drawApple(x, y){
    gameBoard2d.fillStyle = 'red';
    gameBoard2d.strokestyle = 'darkred';
    gameBoard2d.fillRect(x, y, 10, 10);  
    gameBoard2d.strokeRect(x, y, 10, 10);
}


function eatApple(){
    const head = snake[0];
    if(head.x == apple_x && head.y == apple_y){
        score+=1;
        apple_x = Math.ceil(Math.round(Math.random() * (300)) / 10) * 10;
        apple_y = Math.ceil(Math.round(Math.random() * (300)) / 10) * 10;
        growSnake();
    }
}

function growSnake(){
    const tail = snake[snake.length-1];
 
    if(currDirection == "right"){
        snake.push({x:tail.x - 10, y:tail.y});
    }
    else if(currDirection == "left"){
        snake.push({x:tail.x + 10, y:tail.y});
    }
    else if(currDirection == "up"){
        snake.push({x:tail.x, y:tail.y + 10});
    }
    else{
        snake.push({x:tail.x, y:tail.y - 10});
    }

}

function displayScore(){
    gameScore.innerHTML = score;
    console.log("Change branch 2");
}





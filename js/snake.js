//Make a game board
//Game board is a set of 0's, 1's and 2's
//0 is empty space
//1 is snake
//2 is food

//Graphics
//The game board and graphics need to update in sync 

//Define a snake object that has a length and movement direction
//Snake needs a head which leads movement

//Define game rules
//If head collides with another part of the snake (a 1), game over
//If head collides with wall, game over

//Controls
//Use wasd for controls
//W moves up
//A moves left
//S moves down
//D moves right

//Snake directions
//0 = none
//1 = left
//2 = right
//3 = up
//4 = down

//Classes

//Board (grid)
    //Constructor
    //Methods
        //Get value of coordinates x and y
        //Set value of coordinates x and y
//Snake (stack)
    //Constructor
    //Methods
        //moveSnake(direction) Move snake in direction
            //Move the head of the snake, followed by the rest of its body
        //isDead() Is the snake's head touching a wall or itself?

var gameBoard = document.getElementById("gameBoard");
var gameBoardContext = gameBoard.getContext("2d");
let x = 0;
let y = 0;

let foodLoc = [];

addRandomFood();

let snake = {
    head: [x, y],
    direction: 1,
    body: [[0, 0],[16, 0]],
    moveSnake() {
        while (this.direction > 0) {
        if (this.direction == 1) {
            this.moveLeft();
            this.renderSnake();
        }
        if (this.direction == 2) {
            this.moveRight();
            this.renderSnake();
        }
        if (this.direction == 3) {
            this.moveUp();
            this.renderSnake();
        }
        if (this.direction == 4) {
            this.moveDown();
            this.renderSnake();
        }
        }
    },
    setDirection(value) {
        this.direction = value; 
    },
    addTail(x, y) {
        this.body.push({x, y});
    },
    getLength() {
        return this.body.length + 1;
    },
    setHead(x, y) {
        this.head = [x, y];
    },
    moveLeft() {
        if (!isHeadTouchingFood()) this.body.pop();
        this.setHead(snake.head[0] - 16, snake.head[1]);
        this.body.unshift(snake.head);
        this.setDirection(1);
    },
    moveRight() {
        if (!isHeadTouchingFood()) this.body.pop();
        this.setHead(snake.head[0] + 16, snake.head[1]);
        this.body.unshift(snake.head);
        this.setDirection(2);
    },
    moveUp() {
        if (!isHeadTouchingFood()) this.body.pop();
        this.setHead(snake.head[0], snake.head[1] - 16);
        this.body.unshift(snake.head);
        this.setDirection(3);
    },
    moveDown() {
        if (!isHeadTouchingFood()) this.body.pop();
        this.setHead(snake.head[0], snake.head[1] + 16);
        this.body.unshift(snake.head);
        this.setDirection(4);
    },
    renderSnake() {
        gameBoardContext.fillStyle = "#00FF00";
        gameBoardContext.clearRect(0, 0, gameBoard.width, gameBoard.height);
        this.body.forEach(part => {
            gameBoardContext.fillRect(part[0], part[1], 16, 16);
        })
        gameBoardContext.fillStyle = "#FF0000";
        gameBoardContext.fillRect(foodLoc[0], foodLoc[1], 16, 16);
    }
};

function isHeadTouchingFood() {
    if (snake.head[0] === foodLoc[0] && snake.head[1] === foodLoc[1]) {
        addRandomFood();
        return true;
    } else {
        return false;
    }
}

function addRandomFood() {
    gameBoardContext.fillStyle = "#FF0000";
    let width = getRandomNumber(gameBoard.width);
    let widthRounded = Math.round(width / 16) * 16;
    let height = getRandomNumber(gameBoard.height);
    let heightRounded = Math.round(height / 16) * 16;
    foodLoc = [widthRounded, heightRounded];
    gameBoardContext.fillRect(widthRounded, heightRounded, 16, 16);
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

window.addEventListener("keydown", onKeyDown);

function onKeyDown(event) {
    let keyCode = event.keyCode;
    if (snake.direction === 0) {
        snake.moveSnake();
    }
    switch(keyCode) {
        case 87: 
            snake.setDirection(3);
            break;
        case 83: 
            snake.setDirection(4);
            break;
        case 65: 
            snake.setDirection(1);
            break;
        case 68: 
            snake.setDirection(2);
            break;
    }
}
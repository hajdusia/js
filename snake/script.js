(function SnakeGame() {
	var boardHandler = document.getElementById('board');
	var context = boardHandler.getContext('2d');


	/* Board Class */
	function Board(fieldSize, boardSize) {
		this.height = boardSize;
		this.width = boardSize;
		this.size = fieldSize;
	}
//Render board on the canvas
Board.prototype.render = function (context) {
	context.fillStyle = 'black';
	context.fillRect(0, 0, this.width, this.height);
};

var directions = {
   RIGHT: 'RIGHT',
   LEFT: 'LEFT',
   TOP: 'TOP',
   BOTTOM: 'BOTTOM'
};

/* Snake Class */
var Snake = function (size, length) {
   this.snakePos = [];
   this.size = size;
   for (var i = length - 1; i >= 0; i--) {
       this.snakePos.push({x: i, y: 0});
   }
   this.snakeDirection = directions.RIGHT;
   this.setUpdateSnakePosition();
};


//Render snake on the canvas
Snake.prototype.render = function (context) {
   for (var i = 0; i < this.snakePos.length; i++) {
       context.fillStyle = 'white';
       context.fillRect(this.snakePos[i].x * this.size, this.snakePos[i].y * this.size, this.size, this.size);
   }
};

//Updates the position of the snake
Snake.prototype.updateSnakePosition = function (food, board) {
   var headX = this.snakePos[0].x,
       headY = this.snakePos[0].y;

       switch (this.snakeDirection) {
       case directions.RIGHT:
           headX = headX + 1;
           break;
       case directions.LEFT:
           headX = headX - 1;
           break;
       case directions.TOP:
           headY = headY - 1;
           break;
       case directions.BOTTOM:
           headY = headY + 1;
           break;
   }

   //Remove last field and add new
   var newHead = {x: headX, y: headY};
   this.snakePos.unshift(newHead);
   this.snakePos.pop();

  

};

//Adds event listeners
Snake.prototype.setUpdateSnakePosition = function () {
   var that = this;
   window.addEventListener('keydown', function (key) {
       switch (key.keyCode) {
           case 37:
               that.snakeDirection = directions.LEFT;
               break;
           case 38:
               that.snakeDirection = directions.TOP;
               break;
           case 39:
               that.snakeDirection = directions.RIGHT;
               break;
           case 40:
               that.snakeDirection = directions.BOTTOM;
               break;
       }
   });
};

Snake.prototype.checkCollisionWithFood = function (food) {
   var snakeHead = this.snakePos[0];
   return snakeHead.x === food.x && snakeHead.y === food.y;
};

/* Food Class */
function Food(board) {
   this.size = board.size;
   this.x = Math.round(Math.random() * (board.width - this.size) / this.size);
   this.y = Math.round(Math.random() * (board.height - this.size) / this.size);
}

//Renders food on the canvas
Food.prototype.render = function (context) {
   context.fillStyle = 'white';
   context.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
};

var score = 0;
//Base elements
var food, board, snake;


//Initiator of the games
function initGame() {
	board = new Board(10, 300); //fieldSize, boardSize	
	food = new Food(board);
	snake = new Snake(10, 10); //fieldSize, length	
}

//Main render loop
function renderLoop() {
   board.render(context);
   food.render(context);
   snake.updateSnakePosition();
   snake.render(context);

}

initGame();
renderLoop();
setInterval(renderLoop, 100);

})();

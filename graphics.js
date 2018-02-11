/*
* Responsible for handling game logic and updating the GUI. Built using the Module
* pattern for code structure.
*/

const drawModule = (function () {
	/**
	* This function draws the background and border of the canvas.
	*/
	const drawBackground = function () {
		ctx.fillStyle = "#F5F5F5";
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);

		ctx.strokeStyle = "#808080";
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	}

	/**
	* This function initializes the snake array. The snake has a length of four at the
	* beginning of the game.
	*/
	const initSnake = function () {
		const snakeLength = 4;
		snake = [];

		// push 5 elements inside array (squares)
		for (let i = snakeLength; i >= 0; i--) {
			snake.push({x:i, y:0});
		}
	}

	/**
	* This function draws a single segment of the snake body. Location of segment is
	* indicated by the parameters.
	*/
	const drawSnake = function () {
		for (let i = 0; i < snake.length; i++) {
			ctx.fillStyle = "#66a3ff";
			ctx.fillRect(snake[i].x * snakeSize, snake[i].y * snakeSize, snakeSize, snakeSize);
			ctx.strokeStyle = "#3385ff";
			ctx.strokeRect(snake[i].x * snakeSize, snake[i].y * snakeSize, snakeSize, snakeSize);
		}
	}

	/**
	* This function randomly generates a new location for the snake food. It makes sure
	* that the food does not appear directly on top of the snake body.
	*/
	const createFood = function () {
		food = {
			x: Math.floor(Math.random() * maximumX + 1),
			y: Math.floor(Math.random() * maximumY + 1)
		}

		let onSnakeBody = true;
		while (onSnakeBody) {
			onSnakeBody = false;
			for (let i = 0; i < snake.length && !onSnakeBody; i++) {
				let snakeX = snake[i].x;
				let snakeY = snake[i].y;

				if (food.x === snakeX || food.y === snakeY) {
					onSnakeBody = true;
				}
			}

			if (onSnakeBody) {
				food.x = Math.floor(Math.random() * maximumX + 1);
				food.y = Math.floor(Math.random() * maximumY + 1);
			}
		}
	}

	/**
	* This function draws a piece of food at the location indicated by the function
	* parameters.
	*/
	const drawFood = function (x, y) {
		ctx.fillStyle = "#ffcc00";
		ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
		ctx.fillStyle = "#ff9933";
		ctx.fillRect(x * snakeSize + 1, y * snakeSize + 1, snakeSize - 2, snakeSize - 2);
	}

	/**
	* This function updates the score on the GUI.
	*/
	const updateScore = function (x, y) {
		const scoreText = "SCORE: " + score;
		ctx.font = "1em Optima";
		ctx.fillStyle = "black";
		ctx.fillText(scoreText, 5, canvasHeight - 5);
	}

	/**
	* This function checks if the specified coordinates fall on top of the snake body.
	* If so, it returns true. Otherwise, it returns false.
	*/
	const checkSelfCollision = function (x, y) {
		for (let i = 0; i < snake.length; i++) {
			if (snake[i].x === x && snake[i].y === y) {
				return true;
			}
		}
		return false;
	}

	/**
	* This function determines where the snake is headed based on the coordinates of the leading
	* segment and the snake's current direction. If the snake is about to touch the edge of the
	* canvas or a part of its own body, this function ends the game. If the snake is about to
	* touch the food, this function adds a new segment to the snake's body and increments the
	* player's score. Otherwise, this function pops the tail of the snake and moves it to the
	* beginning of the array (to create the illusion of movement). At the end of the function,
	* the GUI is updated so the player can see the changes.
	*/
	const updateGUI = function () {
		drawBackground();

		let snakeX = snake[0].x;
		let snakeY = snake[0].y;

		if (direction === "right") {
			snakeX++;
		} else if (direction === "left") {
			snakeX--;
		} else if (direction === "up") {
			snakeY--;
		} else if (direction === "down") {
			snakeY++;
		}

		// If the snake touches the edge of the canvas or itself, end the game.
		if (snakeX < 0 || snakeX > maximumX || snakeY < 0 || snakeY > maximumY || checkSelfCollision(snakeX, snakeY, snake)) {
			ctx.clearRect(0, 0, canvasWidth, canvasHeight);
			gameLoop = clearInterval(gameLoop);
			startButton.removeAttribute('disabled', true);
			init();
			return;
		}

		// If the snake successfully reaches the food, increase the length of the snake body
		// and increment the score. Otherwise, pop the tail of the snake and move it to the
		// front (to create the illusion of movement).
		if (snakeX === food.x && snakeY === food.y) {
			var tail = {
				x: snakeX,
				y: snakeY
			}
			score++;
			createFood();
		} else {
			var tail = snake.pop();
			tail.x = snakeX;
			tail.y = snakeY;
		}
	    snake.unshift(tail);

		drawSnake();
		drawFood(food.x, food.y);
		updateScore();
	}

	const init = function () {
		drawBackground();

		initSnake();
		drawSnake();

		createFood();
		drawFood(food.x, food.y);

		score = 0;
		updateScore();
	}

	const startGame = function () {
		startButton.setAttribute("disabled", true);
		direction = "down";
		gameLoop = setInterval(updateGUI, 80);
	}

	return {
		init: init,
		startGame: startGame
	};
}());
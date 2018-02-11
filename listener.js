(function (window, document, graphicsModule) {
	graphicsModule.init(); // init GUI

	// when the start button is clicked, the game begins
	const startButton = document.getElementById("startButton");
	startButton.addEventListener("click", function () {
		graphicsModule.startGame();
	});

	// change direction of snake according to the player's key presses
	document.onkeydown = function (event) {
		const LEFT = 37;
		const RIGHT = 39;
		const UP = 38;
		const DOWN  = 40;

		let key = event.which;
		if (key === LEFT && direction != "right") {
			direction = "left";
		} else if (key === RIGHT && direction != "left") {
			direction = "right";
		} else if (key === UP && direction != "down") {
			direction = "up";
		} else if (key === DOWN && direction != "up") {
			direction = "down";
		}
	}
})(window, document, graphicsModule);
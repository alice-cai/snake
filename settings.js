const canvas = document.getElementById("snakeCanvas");
const ctx = snakeCanvas.getContext("2d");
const canvasWidth = 400;
const canvasHeight = 400;

const snakeSize = 10; // size of each snake unit
let snake; // snake array
let food; // current food object
let score = 0; // user score

// maximum coordinates for snake or food
const maximumX = canvasWidth / snakeSize - 1;
const maximumY = canvasHeight / snakeSize - 1;
var c, ctx;
let ballX = 75;
let ballY = 75;
let ballSpeedX = 10;
let ballSpeedY = 15;

const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;
let brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
let bricksLeft = 0;

function brickReset() {
	bricksLeft = 0;
	let i;
	for (i=0; i<3 * BRICK_COLS; i++) {
		brickGrid[i] = false;
	};
	for (; i<BRICK_COLS * BRICK_ROWS; i++) {
		brickGrid[i] = true;
		bricksLeft++;
	};
};

let mouseX;
let mouseY;

const PADDLE_WIDTH = 100;
const  PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 60;

let paddleX = 400;

function updateMousePos(evt) {
	let rect = c.getBoundingClientRect();
	let root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	paddleX = mouseX - PADDLE_WIDTH/2;
// debug cheats
	// ballX = mouseX;
	// ballY = mouseY;
	// ballSpeedX = 4;
	// ballSpeedY = -4;
};

window.onload = function() {
	c = document.getElementById('gameCanvas');
	ctx = c.getContext('2d');

	let framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);
	c.addEventListener('mousemove', updateMousePos)
	brickReset();
	ballReset();
};

function updateAll() {
	moveAll();
	drawAll();
};

function ballReset() {
	ballX = c.width/2;
	ballY = c.height/2;
};

function isBrickAtRowCol(col,row){
	if (col >= 0 && col < BRICK_COLS &&
		row >= 0 && row < BRICK_ROWS) {
		let brickIndexUnderCoord = rowColToArrayIndex(col,row);
		return brickGrid[brickIndexUnderCoord];
	} else {
		return false;
	}
};

function ballBrickHandling() {
	let ballBrickCol = Math.floor(ballX / BRICK_W);
	let ballBrickRow = Math.floor(ballY / BRICK_H);
	let brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);


	if (ballBrickCol >= 0 && ballBrickCol < BRICK_COLS &&
		ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS) {

		if (isBrickAtRowCol(ballBrickCol,ballBrickRow)) {
			brickGrid[brickIndexUnderBall] = false;
			bricksLeft--;

			let prevBallX = ballX - ballSpeedX;
			let prevBallY = ballY - ballSpeedY;
			let prevBrickCol = Math.floor(prevBallX / BRICK_W);
			let prevBrickRow = Math.floor(prevBallY / BRICK_H);

			let bothTestsFailed = true;

			if (prevBrickCol != ballBrickCol) {
				if(isBrickAtRowCol(prevBrickCol,prevBrickRow) == false) {
					ballSpeedX *= -1;
					bothTestsFailed = false;
				}
			}
			if (prevBrickRow != ballBrickRow) {
				if(isBrickAtRowCol(prevBrickCol,prevBrickRow) == false) {
				ballSpeedY *= -1;
				bothTestsFailed = false;
				}
			}
			if(bothTestsFailed) {
				ballSpeedX *= -1;
				ballSpeedY *= -1;
			}
		}

	};
}

function ballMove() {
	ballX += ballSpeedX;
	ballY += ballSpeedY;
	if (ballX > c.width && ballSpeedX > 0.0) {
		ballSpeedX *= -1; // ball right
	} else if (ballX < 0 && ballSpeedX < 0.0) {
		ballSpeedX *= -1; // ball left
	}
	else if (ballY > c.height) {
		ballReset();
		brickReset();
	} 
	else if (ballY < 0 && ballSpeedY < 0.0) { // ball top
		ballSpeedY *= -1;
	};	
}

function ballPaddleHandling() {
	let paddleTopEdgeY = c.height-PADDLE_DIST_FROM_EDGE;
	let paddleBottomEdgeY = c.height-PADDLE_THICKNESS;
	let paddleLeftEdgeX = paddleX;
	let paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;
	if (ballY > paddleTopEdgeY && //below the top of paddle
		ballY < paddleBottomEdgeY && // above bottom of paddle
		ballX > paddleLeftEdgeX && // right of the left side of paddle
		ballX < paddleRightEdgeX) { // left of the right side of paddle

		ballSpeedY *= -1;

		let centerOfPaddleX = paddleX + PADDLE_WIDTH/2;
		let ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
		ballSpeedX = ballDistFromPaddleCenterX * 0.35;

		if (bricksLeft == 0) {
			brickReset();
		}
	};
};


function moveAll() {
	ballMove();
	ballBrickHandling();
	ballPaddleHandling();
};



	

function rowColToArrayIndex(col, row) {
	return col + BRICK_COLS * row ;
}

function drawBricks() {
	for(eachRow=0;eachRow<BRICK_ROWS;eachRow++) {
		for (eachCol=0; eachCol<BRICK_COLS; eachCol++) {

			let arrayIndex = rowColToArrayIndex(eachCol, eachRow);

			if (brickGrid[arrayIndex]) {
				colorRect(BRICK_W*eachCol,BRICK_H*eachRow, BRICK_W-BRICK_GAP, BRICK_H-BRICK_GAP, 'blue');
			};
		};
	};
};

function drawAll() {
	colorRect(0, 0, c.width, c.height, 'black'); //clear screen
	colorCircle(ballX,ballY, 10, 'white'); //draw ball
	colorRect(paddleX,c.height-PADDLE_DIST_FROM_EDGE,
				PADDLE_WIDTH,PADDLE_THICKNESS, 'white');
	drawBricks();


};

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor){
	ctx.fillStyle = fillColor;
	ctx.fillRect(topLeftX,topLeftY,boxWidth,boxHeight);
};

function colorCircle(centerX,centerY, radius, fillColor) {
	ctx.fillStyle = fillColor;
	ctx.beginPath();
	ctx.arc(centerX,centerY, radius, 0, Math.PI*2, true);
	ctx.fill();
};

function colorText(message, textX,textY, fillColor) {
	ctx.fillStyle = fillColor;
	ctx.fillText(message, textX,textY);
}
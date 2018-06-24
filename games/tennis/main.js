let canvas;
let canvasContext;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 15;
let ballSpeedY = 4;

let paddle1Y = 250;
let paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;

player1Score = 0;
player2Score = 0;
const WINNING_SCORE = 3;

let showingWinScreen = false;

function calculateMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    }
};

function handleMouseClick(evt) {
    if (showingWinScreen) {
        player1Score = 0;
        player2Score = 0;
        showingWinScreen = false;
    }
};


window.onload = function() {
    console.log('Hello World');
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    let framesPerSecond = 30;
    setInterval(() => {
        moveEverything();
        drawEverything();
    }
        , 1000/framesPerSecond);
    canvas.addEventListener('mousemove',
        function(evt) {
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
        });
    canvas.addEventListener('mousedown',handleMouseClick);
};

function ballReset() {
    if (player1Score >= WINNING_SCORE ||
        player2Score >= WINNING_SCORE) {
            showingWinScreen = true;
        };
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function computerMovement() {
    let paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
    if (paddle2YCenter < ballY - 35) {
        paddle2Y += 5;
    } else if (paddle2YCenter > ballY + 35) {
        paddle2Y -= 5;
    }
};

function moveEverything() {
    if (showingWinScreen) {
        return
    };
    computerMovement();
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    } else if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballX > canvas.width) {
        if (ballY > paddle2Y &&
            ballY < paddle2Y + PADDLE_HEIGHT) {
                ballSpeedX = -ballSpeedX;
                let deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
                ballSpeedY = deltaY * 0.35;
        } else {
            player1Score++; // must be before ball reset
            ballReset();
        }
    } else if (ballX < 0) {
        if (ballY > paddle1Y &&
            ballY < paddle1Y+PADDLE_HEIGHT) {
                ballSpeedX = -ballSpeedX;
                let deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
                ballSpeedY = deltaY * 0.35;
            } else {
                player2Score++; // must be before ball reset
                ballReset();
            }
    }
};

function drawNet() {
    for (i=0; i<canvas.height; i+=40) {
        colorRect(canvas.width/2-1, i, 2, 20,'white');
    }
};

function drawEverything() {
    // set background to black
    colorRect(0,0,canvas.width,canvas.height,'black');
    // draw left paddle
    colorRect(0,paddle1Y,PADDLE_WIDTH,PADDLE_HEIGHT,'white');
    // draw right paddle
    colorRect(canvas.width-PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
    // draw ball
    colorCircle(ballX, ballY, 10, 'white');
    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, canvas.width-100, 100);
    if (showingWinScreen) {
            if (player1Score >= WINNING_SCORE) {
                canvasContext.fillText('Left Won!', 200, 175);
            } else if (player2Score >= WINNING_SCORE) {
                canvasContext.fillText('Right Won!', 400, 175);
            };
        canvasContext.fillStyle = 'white';
        canvasContext.fillText('Click to continue', 350, 100);
        return
    };
    drawNet();
};

function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
};

function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
};
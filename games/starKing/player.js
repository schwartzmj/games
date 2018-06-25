let Player = {
    'playerWidth': 0.05,
    'playerHeight': 0.05,
    'playerX': 0.5,
    'playerY': 0.5,
    'playerSpeed': 0.005,
    'playerColor': 'blue',
    'life': 1000,
    'score': 0
};

let keyMap = {
    'up': false,
    'down': false,
    'left': false,
    'right': false
};

let bullets = [];

function drawPlayer() {
    // To be responsive:
    // player X and Y coordinates are values from 0-1 (e.g. 0.5 0.284)
    // player Speed is also a value (e.g. 0.005 (5%))
    // here, we are converting these percentages into actual number coordinates on canvas
    let playerXFromPercentToActual = Player.playerX * c.width;
    let playerYFromPercentToActual = Player.playerY * c.height;
    // same for player width and height
    let playerWidthFromPercentToActual = Player.playerWidth * c.width;
    // let playerHeightFromPercentToActual = Player.playerHeight * c.height;
    // draw it
    ctx.fillStyle = Player.playerColor;
    ctx.fillRect(playerXFromPercentToActual, playerYFromPercentToActual,
        playerWidthFromPercentToActual, playerWidthFromPercentToActual / 2);
    ctx.fill();
};

class Bullet {
    constructor() {
        this.id = Date.now() + Math.random();
        this.xPos = Player.playerX;
        this.yPos = Player.playerY;
        this.width = 0.01;
        this.color = 'purple';
    }
}



function generateBullet() {
    let newBullet = new Bullet();
    bullets.push(newBullet);

}



function drawBullets() {
    bullets.forEach((ele) => {
        ele.yPos -= .01;

        let nonPercentXPos = ele.xPos * c.width;
        let nonPercentYPos = ele.yPos * c.height;
        let nonPercentRadius = ele.width * c.width;

        ctx.fillStyle = ele.color;
        ctx.beginPath();
        ctx.arc(nonPercentXPos, nonPercentYPos, nonPercentRadius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    })
};
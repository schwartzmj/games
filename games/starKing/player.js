let Player = {
    'playerWidth': 0.05,
    'playerHeight': 0.05,
    'playerX': 0.5,
    'playerY': 0.5,
    'bulletDX': .005,
    'bulletDY': .005,
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
        this.x = Player.playerX;
        this.y = Player.playerY;
        this.dx = Player.bulletDX;
        this.dy = Player.bulletDY;
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
        ele.y -= Player.bulletDY;

        let bulletXActual = ele.x * c.width;
        let bulletYActual = ele.y * c.height;
        let radiusActual = ele.width * c.width;

        ctx.fillStyle = ele.color;
        ctx.beginPath();
        ctx.arc(bulletXActual, bulletYActual, radiusActual, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();


        //DEBUGGING
        if (debug === true) {
            ctx.font = "12px Georgia";
            ctx.fillStyle = 'white';
            ctx.fillText(('x%: ' + ele.xPos + ' y%: ' + ele.yPos), bulletXActual, bulletYActual + 40);
            ctx.fillText(('x No%: ' + bulletXActual + ' y No%: ' + bulletYActual), bulletXActual, bulletYActual - 20);


            //draw hitbox? -- enter x, y, w, h
            //ctx.fillRect(x, y,
            //    w, h);
            }
    })



};
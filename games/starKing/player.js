let Player = {
    'playerWidth': 0.05,
    'playerHeight': 0.05,
    'playerX': 0.5,
    'playerY': 0.5,
    'bulletDX': .0005,
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

let basicProjectile = {
    'type': 'basic',
    'size': 0.01,
    'display': 'purple',
    'damage': 1,
    'speedModifier': 1
};

let shotgunProjectile = {
    'type': 'shotgun',
    'size': 0.005,
    'display': 'white',
    'damage': 0.25,
    'numberOf': 6,
    'speedModifier': 2
};

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
    constructor({type, size, display, damage, numberOf, speedModifier}) {
        this.id = Date.now() + Math.random();
        this.type = type;
        this.spawnTime = Date.now();
        this.x = Player.playerX;
        this.y = Player.playerY;
        this.dx = Player.bulletDX;
        this.dy = Player.bulletDY;
        this.width = size;
        this.color = display;
        this.damage = damage;
        this.numberOf = numberOf;
        this.speedModifier = speedModifier;
    };
};

class DuplicateBullet extends Bullet {
    constructor(bulletType, placement) {
        super(bulletType);
        this.placement = placement;
    };
};


function generateBullet(bulletType) {
    let newBullet = new Bullet(bulletType);
    if (newBullet.numberOf > 0) {
        for (i=0; i<newBullet.numberOf; i++) {
            let newBulletDuplicate = new DuplicateBullet(bulletType, i);
            bullets.push(newBulletDuplicate);
        } 
    } else {
        bullets.push(newBullet);
    };
};



function drawBullets() {
    bullets.forEach((ele) => {
        if (ele.placement) {
            for (i=0; i<ele.placement; i++) {
                    if (ele.placement % 2 == 0) {
                        let placementDifference = Player.bulletDX;
                        ele.x -= placementDifference;
                    } else {
                        let placementDifference = Player.bulletDX;
                        ele.x += placementDifference;
                    }
            }
        }
                ele.y -= Player.bulletDY * ele.speedModifier;

                let bulletXActual = ele.x * c.width;
                let bulletYActual = ele.y * c.height;
                let radiusActual = ele.width * c.width;
                let playerWidthActual = Player.playerWidth * c.width;

                ctx.fillStyle = ele.color;
                ctx.beginPath();
                ctx.arc(bulletXActual+playerWidthActual/2, bulletYActual, radiusActual, 0, 2 * Math.PI);
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
                };
    })
};
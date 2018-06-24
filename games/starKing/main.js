let c = document.getElementById('canvas');
let ctx = c.getContext('2d');

let Player = {
    'playerWidth': 0.05,
    'playerHeight': 0.05,
    'playerX': 0.5,
    'playerY': 0.5,
    'playerSpeed': 0.005,
    'playerColor': 'blue'
};

let keyMap = {
    'up': false,
    'down': false,
    'left': false,
    'right': false
};

let enemies = [];
let bullets = [];

// on window load, start game engine, add event listeners
window.onload = function() {
    // game engine / tick rate
    let framesPerSecond = 60;
    setInterval(()=>{
        drawEverything();
        moveEverything();
    }, 1000/framesPerSecond);

    // move player event listeners (WASD)
    document.addEventListener('keydown', function(evt) {
        let keyName = evt.key;

        switch (keyName) {
            case 'w':
                keyMap.up = true;
                break;
            case 's':
                keyMap.down = true;
                break;
            case 'a':
                keyMap.left = true;
                break;
            case 'd':
                keyMap.right = true;
                break;
        }
    });
        document.addEventListener('keyup', function (evt) {
            let keyName = evt.key;

            switch (keyName) {
                case 'w':
                    keyMap.up = false;
                    break;
                case 's':
                    keyMap.down = false;
                    break;
                case 'a':
                    keyMap.left = false;
                    break;
                case 'd':
                    keyMap.right = false;
                    break;
            }
        });
        document.addEventListener('keydown', function (evt) {
            let keyName = evt.key;
            if (keyName == 'ArrowUp') {
                generateBullet();
            } 
        });
    
        document.addEventListener('touchstart', function (evt) {
                generateBullet();
        });

};


function drawEverything() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    drawPlayer();
    drawEnemies();
    drawBullets();
    checkBulletCollision();
    removeOldBullets();
};

function moveEverything() {
    if (keyMap.up) {
        Player.playerY -= Player.playerSpeed;
    }
    if (keyMap.down) {
        Player.playerY += Player.playerSpeed;
    }
    if (keyMap.left) {
        Player.playerX -= Player.playerSpeed;
    }
    if (keyMap.right) {
        Player.playerX += Player.playerSpeed;
    }
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

function drawEnemies() {

    enemies.forEach((ele) => {
        let enemyXFromPercentToActual = ele.xPos * c.width;
        let enemyYFromPercentToActual = ele.yPos * c.height;

        let enemyWidthFromPercentToActual = ele.width * c.width;
        ctx.fillStyle = ele.color;
        ctx.fillRect(enemyXFromPercentToActual, enemyYFromPercentToActual,
            enemyWidthFromPercentToActual, enemyWidthFromPercentToActual / 2);

    })
}

class Enemy {
    constructor() {
        this.id = Date.now() + Math.random();
        this.xPos = Math.random() * 0.8;
        this.yPos = Math.random() * 0.3;
        this.width = 0.1;
        this.color = 'red';
    }
};

var enemy1 = new Enemy();
var enemy2 = new Enemy();

enemies.push(enemy1);
enemies.push(enemy2);






class Bullet {
    constructor() {
        this.id = Date.now() + Math.random();
        this.xPos = Player.playerX;
        this.yPos = Player.playerY;
        this.width = 0.01;
        this.color = 'green';
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

function removeOldBullets() {
    bullets.forEach((ele) => {
        if (ele.yPos <= 0) {
            let index = bullets.indexOf(ele);
            bullets.splice(index, 1);
        }
    });
};

function checkBulletCollision() {
    bullets.forEach((bullet) => {
        enemies.forEach((enemy) => {
            // console.log('bullet xPos: ' + bullet.xPos + ' /enemy xPos: ' + enemy.xPos);
            // console.log('bullet yPos: ' + bullet.yPos + ' /enemy yPos: ' + enemy.yPos);
            let enemyWidth = enemy.width * c.width;
            let enemyXPos = enemy.xPos * c.width;
            let enemyYPos = enemy.yPos * c.width;
            let bulletXPos = bullet.xPos * c.width;
            let bulletYPos = bullet.yPos * c.height;
            let enemyHeight = enemyWidth/2;

            if 
                (((bulletXPos <= (enemyXPos + enemyWidth)) && (bulletXPos >= enemyXPos))
                && 
                ((bulletYPos <= (enemyYPos + enemyHeight)) && (bulletYPos >= enemyYPos))) 
            {
                    let indexBullet = bullets.indexOf(bullet);
                    let indexEnemy = enemies.indexOf(enemy);
                    bullets.splice(indexBullet, 1);
                    enemies.splice(indexEnemy, 1);
            }
        })
    })
}
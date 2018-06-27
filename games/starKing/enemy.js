//array to hold all enemies that are spawned (they get removed when they die)
let enemies = [];
//array to hold all enemy projectiles that are spawned (removed when hit or go off screen)
let enemyProjectiles = [];

let basicEnemy = {
    'x': 0.5,
    'y': 0.5,
    'dx': 0,
    'dy': 0,
    'width': 0.1,
    'height': 0.05,
    'display': 'yellow',
    'projectileDX': .003,
    'projectileDY': .01,
    'projectileSize': .01,
    'projectileDisplay': 'green',
    'fireRate': 2000,
    'damage': 1,
    'points': 1,
    'life': 3
};

let fastEnemy = {
    'x': 0.5,
    'y': 0.5,
    'dx': 0,
    'dy': 0,
    'width': 0.05,
    'height': 0.025,
    'display': 'orange',
    'projectileDX': .006,
    'projectileDY': .015,
    'projectileSize': .007,
    'projectileDisplay': 'red',
    'fireRate': 3000,
    'damage': 2,
    'points': 2,
    'life': 2
};











function drawEnemies() {
    enemies.forEach((ele) => {
        //convert % x and y coordinates into actual canvas coordinates
        let enemyXActual = ele.x * c.width;
        let enemyYActual = ele.y * c.height;
        //convert % width to actual width to be placed on canvas
        let enemyWidthActual = ele.width * c.width;
        let enemyHeightActual = ele.height * c.height;
        // fill enemy with display color
        ctx.fillStyle = ele.display;
        //draw the enemy
        ctx.fillRect(enemyXActual, enemyYActual,
            enemyWidthActual, enemyHeightActual);
        // write enemy HP at middle of enemy
        ctx.font = (enemyWidthActual*0.1 + "px Georgia");
        ctx.fillStyle = 'black';
        ctx.fillText(ele.life.toFixed(1) + "/" + ele.maxLife + " " +
            Math.floor(ele.life/ele.maxLife*100) + "%",
            enemyXActual+enemyWidthActual/3, enemyYActual+enemyHeightActual/1.75);


        //DEBUGGING
        // if (debug === true) {
        // ctx.font = "12px Georgia";
        // ctx.fillStyle = 'white';
        // ctx.fillText(('x%: ' + ele.x + ' y%: ' + ele.y), enemyXActual, enemyYActual + 120);
        // ctx.fillText(('x No%: ' + enemyXActual  + ' y No%: ' + enemyYActual), enemyXActual, enemyYActual - 20);
        // }
    })
};

function generateNewEnemy({x, y, dx, dy, width, height, display, projectileDX, projectileDY,
    projectileSize, projectileDisplay, fireRate, damage, points, life}) {
    //generate random x and y coordinates, place into new Enemy() argument
    if (debugPause === false) {
        x = Math.random() * 0.8;
        y = Math.random() * 0.4;
        let newEnemy = new Enemy(
            x, y, dx, dy, width, height, display, projectileDX, projectileDY,
            projectileSize, projectileDisplay, fireRate, damage, points, life
        );
        enemies.push(newEnemy);
        newEnemy.id = setInterval(() => {
            newEnemy.newEnemyProjectile()
        }, newEnemy.fireRate);
    }
};

function drawEnemyProjectiles() {
    enemyProjectiles.forEach((ele) => {
        ele.y += ele.dy;
        // this += ele.dx wont be helpful if we dont change it to something useful
        // possibly using an if statement to home in on the player?
        if (ele.x !== 0) {
            if (ele.x <= Player.playerX) {
                ele.x += ele.dx;
            } else if (ele.x >= Player.playerX) {
                ele.x -= ele.dx;
            }
        };
        

        let nonPercentXPos = ele.x * c.width;
        let nonPercentYPos = ele.y * c.height;
        let nonPercentRadius = ele.size * c.width;

        ctx.fillStyle = ele.display;
        ctx.beginPath();
        ctx.arc(nonPercentXPos, nonPercentYPos, nonPercentRadius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    })
};

function moveEnemies() {
    if (debugPause === false) {
        enemies.forEach((enemy) => {
            let movePositive = Math.random() / 10;
            let moveNegative = -(Math.random() / 10);
            let move = movePositive + moveNegative;
            enemy.x += move;
        });
    }
};

class Enemy {
    constructor(x, y, dx, dy, width, height, display, projectileDX, projectileDY, projectileSize, projectileDisplay, fireRate, damage, points, life) {
        this.enemyId = Date.now() + Math.random();
        this.spawnTime = Date.now();
        // spawn x and y coordinates
        this.x = x;
        this.y = y;
        // x movement speed and y movement speed
        this.dx = dx;
        this.dy = dy;
        // size
        this.width = width;
        this.height = height;
        // display = color
        this.display = display;
        // projectile information
        this.projectileDX = projectileDX;
        this.projectileDY = projectileDY;
        this.projectileSize = projectileSize;
        this.projectileDisplay = projectileDisplay;
        this.fireRate = fireRate;
        this.damage = damage;
        // last projectile fired timestamp
        this.lastFire = Date.now();
        // points for killing and HP
        this.points = points;
        this.life = life;
        this.maxLife = life;
    }
    newEnemyProjectile() {
        // start by make starting x coord for projectile the center of enemy
        let x = (this.x + (this.width/2))
        let enemyProjectile = {
            'enemyId': this.enemyId,
            'projectileId': (Date.now() + Math.random()),
            'spawnTime': Date.now(),
            'x': x,
            'y': this.y,
            'dx': this.projectileDX,
            'dy': this.projectileDY,
            'size': this.projectileSize,
            'display': this.projectileDisplay,
            'damage': this.damage
        }
        enemyProjectiles.push(enemyProjectile);
    }
};

// example enemy spawn (would need to push into enemy array after)
//let enemy1 = new Enemy(0.5, 0.5, 0, 0, 0.1, 0.05, 'yellow', .01, .01, .01, 'green', 2000, 1, 1, 1);

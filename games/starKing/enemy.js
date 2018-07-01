function drawEnemies() {
    enemies.forEach((ele) => {
        //convert % x and y coordinates into actual canvas coordinates
        let enemyXActual = ele.x * c.width;
        let enemyYActual = ele.y * c.height;
        //convert % width to actual width to be placed on canvas
        let enemyWidthActual = ele.width * c.width;
        let enemyHeightActual = ele.height * c.height;
        // fill enemy with display color
        if (debug === true) {
            ctx.fillStyle = 'pink';
        } else {
            ctx.fillStyle = 'transparent';
        }
        
        //draw the enemy
        ctx.fillRect(enemyXActual, enemyYActual,
            enemyWidthActual, enemyHeightActual);
        ctx.drawImage(ele.display, enemyXActual, enemyYActual, enemyWidthActual, enemyHeightActual);

    let enemyPercentLife = ele.life/ele.maxLife;
    let enemyLifeBarFillStyle;
    let getEnemyLifeBarFillStyle = () => {
        if (enemyPercentLife >= 0.95) {return enemyLifeBarFillStyle = 'green'};
        if (enemyPercentLife >= 0.66) {return enemyLifeBarFillStyle = 'yellow'};
        if (enemyPercentLife >= 0.25) {return enemyLifeBarFillStyle = 'orange'};
        if (enemyPercentLife >= 0) {return enemyLifeBarFillStyle = 'red'};
    };
    getEnemyLifeBarFillStyle();
    ctx.fillStyle = enemyLifeBarFillStyle;
    ctx.fillRect(enemyXActual+(enemyWidthActual*.2), enemyYActual-enemyHeightActual*0.2,
        (enemyWidthActual*.6)*enemyPercentLife, enemyHeightActual*0.1);






        // write enemy HP above enemy
        // ctx.font = (enemyWidthActual*0.2 + "px Georgia");
        // ctx.fillStyle = 'white';
        // ctx.fillText(ele.life.toFixed(1) + "/" + ele.maxLife + " " +
        //     Math.floor(ele.life/ele.maxLife*100) + "%",
        //     enemyXActual+enemyWidthActual/3, enemyYActual-enemyHeightActual*0.25);


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
evilBlastSprite

    enemyProjectiles.forEach((ele) => {
        ele.y += ele.dy;
        // 
        //aim at the player
        // then continue homing
        if (ele.dx !== 0) {
            
            if (ele.x <= Player.x) {
                ele.x += ele.dx;
            } else if (ele.x >= Player.x) {
                ele.x -= ele.dx;
            }
        };
        

        let nonPercentXPos = ele.x * c.width;
        let nonPercentYPos = ele.y * c.height;
        let nonPercentRadius = ele.size * c.width;

        if (debug === true) {
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(nonPercentXPos, nonPercentYPos, nonPercentRadius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
        };

    ctx.drawImage(ele.display, nonPercentXPos - nonPercentRadius, nonPercentYPos - nonPercentRadius, nonPercentRadius * 2, nonPercentRadius * 2);

    });
};

function moveEnemies() {
    enemies.forEach((enemy) => {
        if (enemy.x >= 1 || enemy.x <= 0) {
            enemy.dx *= -1;
        };
        if (enemy.y >= 1 || enemy.y <= 0){
            enemy.dy *= -1;
        };
        enemy.x += enemy.dx;
            // let randomBoolean = Math.random() >= 0.5;
            // let randomNum = Math.random();
            // if (randomBoolean) {
            //     enemy.x += enemy.dx;
            // } else {
            //     enemy.x -= enemy.dx;
            // }
    });
};

class Enemy {
    constructor(x, y, dx, dy, width, height, display, projectileDX, projectileDY, projectileSize, projectileDisplay, fireRate, damage, points, life) {
        this.enemyId = now + Math.random();
        this.spawnTime = now;
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
        this.lastFire = now;
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
            'projectileId': (now + Math.random()),
            'spawnTime': now,
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

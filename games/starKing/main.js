let c = document.getElementById('canvas');
let ctx = c.getContext('2d');

// on window load, start game engine, add event listeners
window.onload = function() {
    // game engine / tick rate
    let framesPerSecond = 60;
    setInterval(()=>{
        if (debugPause === false) {
            drawEverything();
            moveEverything();
        }
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
        debugInit();
};

function drawEverything() {
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        drawPlayer();
        drawEnemies();
        drawBullets();
        drawEnemyProjectiles();
        checkBulletCollision();
        drawPlayerInfo();
        removeOldBullets();
        if (debug === true) {
            ctx.font = "12px Georgia";
            ctx.fillStyle = 'white';
            ctx.fillText(('x:' + mousePos.x + ' y:' + mousePos.y), mousePos.x, mousePos.y);
        }
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

function removeOldBullets() {
    bullets.forEach((ele) => {
        if (ele.y <= 0) {
            let index = bullets.indexOf(ele);
            bullets.splice(index, 1);
        }
    });
    enemyProjectiles.forEach((ele) => {
        if (ele.y >= 1) {
            let index = enemyProjectiles.indexOf(ele);
            enemyProjectiles.splice(index, 1);
        }
    });
};

function checkBulletCollision() {
    bullets.forEach((bullet) => {
        enemies.forEach((enemy) => {
            // console.log('bullet xPos: ' + bullet.xPos + ' /enemy xPos: ' + enemy.xPos);
            // console.log('bullet yPos: ' + bullet.yPos + ' /enemy yPos: ' + enemy.yPos);
            let enemyWidth = enemy.width * c.width;
            let enemyHeight = enemy.height * c.height;
            let enemyX = enemy.x * c.width;
            let enemyY = enemy.y * c.height;
            let bulletX = bullet.x * c.width;
            let bulletY = bullet.y * c.height;

            if 
                (((bulletX <= (enemyX + enemyWidth)) && (bulletX >= enemyX))
                && 
                ((bulletY <= (enemyY + enemyHeight)) && (bulletY >= enemyY))) 
            {
                console.log('Collision debug// bulletX: ' + bulletX + ' <= enemyX + enemyWidth '
                    + enemyX + ' + ' + enemyWidth + "(" + (enemyX + enemyWidth) + ") AND bulletX: "
                    + bulletX + " is >= enemyX: " + enemyX);
                console.log("//AND// bulletY: " + bulletY + " <= enemyY ("
                    + enemyY + "+ enemyHeight(" + enemyHeight + ") (" + (enemyY + enemyHeight) +
                    " AND bulletY: " + bulletY + " >= enemyY: " + enemyY);
                console.log("//OBJECTS// ===Enemy:=== " + JSON.stringify(enemy) + " ===Bullet:=== " + JSON.stringify(bullet));
                    let indexBullet = bullets.indexOf(bullet);
                    let indexEnemy = enemies.indexOf(enemy);
                    bullets.splice(indexBullet, 1);

                    Player.score += enemy.points;
                    
                    clearInterval(enemy.id);
                    enemies.splice(indexEnemy, 1);
            }
        })
    })
    enemyProjectiles.forEach((enemyBullet) => {
        if (((enemyBullet.x <= (Player.playerX + Player.playerWidth)) && (enemyBullet.x >= Player.playerX)) &&
            ((enemyBullet.y <= (Player.playerY + Player.playerHeight)) && (enemyBullet.y >= Player.playerY))) {
                let indexEnemyBullet = enemyProjectiles.indexOf(enemyBullet);
                enemyProjectiles.splice(indexEnemyBullet, 1);
                Player.life -= enemyBullet.damage;
        };
    });
};



function drawPlayerInfo() {
    ctx.font="20px Georgia";
    ctx.fillStyle = 'white';
    ctx.fillText('Life: ' + Player.life, 10, 40);
    ctx.fillText('Score: ' + Player.score, 10, 60);
    ctx.font="12px Georgia";
    ctx.fillText('WASD to move, ArrowUp to fire', 10, 80);

}


generateNewEnemy(basicEnemy);
setInterval(() => {
    generateNewEnemy(basicEnemy)
}, 8000);
setInterval(moveEnemies, 1500);
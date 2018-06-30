let c = document.getElementById('canvas');
let ctx = c.getContext('2d');
let then = 0;
let framesPerSecond = 60;

// on window load, start game engine, add event listeners
window.onload = function() {
    // game engine / tick rate
    setInterval(()=>{
        if (debugPause === false) {
            drawEverything();
            moveEverything();
            then = now;
            now += 1000/framesPerSecond;
        }
    }, 1000/framesPerSecond);

    // keydown event listeners
    document.addEventListener('keydown', function(evt) {
        console.log(evt.key);
        let keyName = evt.key;
        if (keyMap.hasOwnProperty(keyName)) {
            keyMap[keyName].isPressed = true;
        };
    });
    // keyup event listeners
    document.addEventListener('keyup', function (evt) {
        let keyName = evt.key;
        if (keyMap.hasOwnProperty(keyName)) {
            keyMap[keyName].isPressed = false;
        };
    });
    debugInit();
}

function drawEverything() {
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        ctx.clearRect(0,0,c.width,c.height);
        drawPlayer();
        drawInventory();
        moveEnemies();
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
        };
};

function moveEverything() {
    Object.keys(keyMap).forEach((key) => {
        if (keyMap[key].isPressed === true) {

        keyMap[key].binding();



            // checkObjectCooldown(keyMap[key].)
            // let lastPressTime = keyMap[key].lastPressTime;
            // let binding = keyMap[key].binding;
            // console.log(binding);
            // keyMap[key].use(lastPressTime, binding);
            // keyMap[key].use(binding);
        }
    });
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
            let enemyWidth = enemy.width * c.width;
            let enemyHeight = enemy.height * c.height;
            let enemyX = enemy.x * c.width;
            let enemyY = enemy.y * c.height;
            let bulletX = bullet.x * c.width;
            let bulletY = bullet.y * c.height;
            if 
                // (((bulletX <= (enemyX + enemyWidth)) && (bulletX >= enemyX))
                // && 
                // ((bulletY <= (enemyY + enemyHeight)) && (bulletY >= enemyY)))

                (((bullet.x <= (enemy.x + enemy.width)) && (bullet.x >= enemy.x)) &&
                ((bullet.y <= (enemy.y + enemy.height)) && (bullet.y >= enemy.y)))
            { 
                //collision detected
                
                //remove the bullet from the array of bullets
                    let indexBullet = bullets.indexOf(bullet);
                    bullets.splice(indexBullet, 1);

                    //enemy opacity change -- currently unused
                    let percentDamagePerBullet = Bullet.damage / enemy.maxLife;
                    let enemyPercentLife = enemy.life / enemy.maxLife;

                enemy.life -= bullet.damage;
                    if (enemy.life <= 0) {

                        Player.score += enemy.points;

                        let indexEnemy = enemies.indexOf(enemy);
                        clearInterval(enemy.id);
                        enemies.splice(indexEnemy, 1);
                    }
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
    ctx.fillText('WASD to move. NumPad 4, 5 and 9 for weapons', 10, 80);
};


generateNewEnemy(basicEnemy);
setInterval(() => {
    generateNewEnemy(basicEnemy)
}, 3000);
// setInterval(moveEnemies, 1500);






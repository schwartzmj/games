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
    checkBulletCollision();
    drawPlayer();
    drawInventory();
    moveEnemies();
    drawEnemies();
    drawBullets();
    drawEnemyProjectiles();
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

function collisionMath(bullet, obj) {
    let distX = Math.abs(bullet.x - obj.x - obj.width / 2);
    let distY = Math.abs(bullet.y - obj.y - obj.height / 2);
    // size in this case is radius... not sure if works with non-circle projectiles
    // not colliding X and Y checks
    if (distX > (obj.width / 2 + bullet.size)) {
        return false;
    };
    if (distY > (obj.height / 2 + bullet.size)) {
        return false;
    };
    // colliding X and Y checks
    if (distX <= (obj.width / 2)) {
        return true;
    };
    if (distY <= (obj.height / 2)) {
        return true;
    };
    let dx = distX - obj.width / 2;
    let dy = distY - obj.height / 2;
    return (dx * dx + dy * dy <= (bullet.size * bullet.size));
}

function checkBulletCollision() {
    bullets.forEach((bullet) => {
        enemies.forEach((enemy) => {
            //  if collision detected (true)
            if (collisionMath(bullet, enemy)) {                     
                //remove the bullet from the array of bullets
                let indexBullet = bullets.indexOf(bullet);
                bullets.splice(indexBullet, 1);

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
        if (collisionMath(enemyBullet, Player)) {
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
setInterval(() => {
    generateNewEnemy(fastEnemy)
}, 5000);
// setInterval(moveEnemies, 1500);





function getEleCanvasActualFromPercent(ele) {
    let eleCanvasActual = {
        x: ele.x * c.width,
        y: ele.y * c.height,
        width: ele.width * c.width,
        height: ele.height * c.height
    };
    return eleCanvasActual;
};
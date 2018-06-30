// player sprite
let playerSprite = new Image();
playerSprite.src = 'images/x-wing.png';
playerSprite.addEventListener('load', function () {
    ctx.drawImage(playerSprite, Player.x, Player.y, Player.width, Player.height);
});

// enemy sprites
let fastEnemySprite = new Image();
fastEnemySprite.src = 'images/tie-fighter.png';
fastEnemySprite.addEventListener('load', function () {
    ctx.drawImage(fastEnemySprite, 0, 0, 0, 0);
});
let destroyerSprite = new Image();
destroyerSprite.src = 'images/destroyer.png';
destroyerSprite.addEventListener('load', function () {
    ctx.drawImage(destroyerSprite, 0, 0, 0, 0);
});

// projectiles

let greyBulletSprite = new Image();
greyBulletSprite.src = 'images/grey-bullet.png';
greyBulletSprite.addEventListener('load', function () {
    ctx.drawImage(greyBulletSprite, 0, 0, 0, 0);
});
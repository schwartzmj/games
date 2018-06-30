// player sprite
let playerSprite = new Image();
playerSprite.src = 'images/x-wing.png';
playerSprite.addEventListener('load', function () {
    ctx.drawImage(playerSprite, Player.x, Player.y, Player.width, Player.height);
});

let schwartzXSprite = new Image();
schwartzXSprite.src = 'images/schwartz-x.png';
schwartzXSprite.addEventListener('load', function () {
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

let ionBlastSprite = new Image();
ionBlastSprite.src = 'images/ion-blast.png';
ionBlastSprite.addEventListener('load', function () {
    ctx.drawImage(ionBlastSprite, 0, 0, 0, 0);
});

let arrowHeadSprite = new Image();
arrowHeadSprite.src = 'images/arrow-head.png';
arrowHeadSprite.addEventListener('load', function () {
    ctx.drawImage(arrowHeadSprite, 0, 0, 0, 0);
});

// power ups

let healthPackSprite = new Image();
healthPackSprite.src = 'images/health-pack.png';
healthPackSprite.addEventListener('load', function () {
    ctx.drawImage(healthPackSprite, 0, 0, 0, 0);
});








//========//
// Sounds //
//========//

const fireSound = new Howl({
    src: ['sounds/pop.mp3']
});

const tripSound = new Howl({
    src: ['sounds/trip.mp3']
});

const cokezsSound = new Howl({
    src: ['sounds/cokezs.mp3']
});
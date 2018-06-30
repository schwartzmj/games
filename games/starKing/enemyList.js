//array to hold all enemies that are spawned (they get removed when they die)
let enemies = [];
//array to hold all enemy projectiles that are spawned (removed when hit or go off screen)
let enemyProjectiles = [];

let basicEnemy = {
    'x': 0.5,
    'y': 0.5,
    'dx': 0.0002,
    'dy': 0.0001,
    'width': 0.1,
    'height': 0.05,
    'display': destroyerSprite,
    'projectileDX': .0025,
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
    'dx': 0.005,
    'dy': 0.002,
    'width': 0.05,
    'height': 0.05,
    'display': fastEnemySprite,
    'projectileDX': .006,
    'projectileDY': .015,
    'projectileSize': .007,
    'projectileDisplay': 'red',
    'fireRate': 3000,
    'damage': 2,
    'points': 2,
    'life': 2
    // ratio not correct, divide other way ratio: 0.8411111073691013
};
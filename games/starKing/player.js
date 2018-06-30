let playerSprite = new Image();
playerSprite.src = 'images/x-wing.png';
playerSprite.addEventListener('load', function() {
    ctx.drawImage(playerSprite, Player.playerX, Player.playerY, Player.playerWidth, Player.playerHeight);
});

let basicProjectile = {
    projectile: 'yes',
    'type': 'basic',
    'size': 0.01,
    'display': 'purple',
    'damage': 3,
    'speedModifier': 1,
    'cooldown': 1000,
    lastUseTime: 0
};

let shotgunProjectile = {
    projectile: 'yes',
    'type': 'shotgun',
    'size': 0.005,
    'display': 'white',
    'damage': 0.25,
    'numberOf': 6,
    'speedModifier': 2,
    'cooldown': 500,
    lastUseTime: 0
};

let meatballShot = {
    projectile: 'yes',
    'type': 'basic',
    'size': 0.05,
    'display': 'pink',
    'damage': 50,
    'numberOf': 0,
    'speedModifier': 0.25,
    'cooldown': 30000,
    lastUseTime: 0
};

function useBinding(binding) {
    binding();
}

let bullets = [];

class Bullet {
    constructor({
        type,
        size,
        display,
        damage,
        numberOf,
        speedModifier,
    }) {
        this.id = now + Math.random();
        this.type = type;
        this.spawnTime = now;
        this.x = Player.playerX + Player.playerWidth / 2;
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
    'score': 0,
    'cooldownModifier': 1,
    inventory: [
        basicProjectile,
        shotgunProjectile,
        meatballShot
    ]
};

function drawInventory() {
    let playerHeightActual = Player.playerHeight * c.height;
    let playerWidthActual = Player.playerWidth * c.width;
    let playerXActual = Player.playerX * c.width;
    let playerYActual = Player.playerY * c.height;

    let inventoryXGap = playerWidthActual / 2;
    let inventoryStart = playerXActual - inventoryXGap;

    Player.inventory.forEach((item) => {
    let timeOffCooldown = (now - item.lastUseTime);

    ctx.font = "12px Georgia";
    ctx.fillStyle = 'red';

    if (timeOffCooldown >= item.cooldown) {
        timeOffCooldown = item.cooldown;
        ctx.fillStyle = 'lightgreen';
    };
    timeOffCooldown /= 1000;
    ctx.fillText(timeOffCooldown.toFixed(1), inventoryStart+=inventoryXGap, playerYActual + playerHeightActual * 1.5);
    });
};

function checkPlayerInBounds(dir) {

        if ((dir==='up')
            && (Player.playerY <= 0)) {
            return false;
        } else if ((dir === 'down') &&
            (Player.playerY >= 1 - Player.playerHeight)) {
                return false;
        } else if ((dir === 'left')
            && (Player.playerX <= 0)) {
            return false;
        } else if ((dir === 'right')
            && (Player.playerX >= 1 - Player.playerWidth)) {
                return false;
        } else return true;
}

//????????????????????????
// IDEA: if check below fails, set a variable like
// "offRightEdge" to true, then when drawing inventory cooldowns
// we will offset so you can still see the inventory cooldowns
//????????????????????????
let Bindings = {
    playerUp: () => {
        if (checkPlayerInBounds('up')) {
            Player.playerY -= Player.playerSpeed;
        };
    },
    playerDown: () => {
        if (checkPlayerInBounds('down')) {
            Player.playerY += Player.playerSpeed;
        };
    },
    playerLeft: () => {
        if (checkPlayerInBounds('left')) {
            Player.playerX -= Player.playerSpeed;
        };
    },
    playerRight: () => {
        if (checkPlayerInBounds('right')) {
            Player.playerX += Player.playerSpeed;
        };
    },
    useInventory0: () => {
        useInventory(0)
    },
    useInventory1: () => {
        useInventory(1)
    },
    useInventory2: () => {
        useInventory(2)
    }
};

// function useInventory(inventorySlotNumber) {
//     checkKeyBindingCooldown(Player.inventory[inventorySlotNumber]);
// };


function checkKeyBindingCooldown(inventoryItem) {
    let dTime = (now - inventoryItem.lastUseTime);
    if (dTime >= inventoryItem.cooldown) {
        return 'offCooldown';
    } else {
        return 'onCooldown';
    }
};

function useInventory(inventoryItemNum) {

    ////WHY DOESNT THIS WORK
    let inventoryItem = Player.inventory[inventoryItemNum];
    let keyBindingCooldownCheck = checkKeyBindingCooldown(inventoryItem);
    if (keyBindingCooldownCheck === 'offCooldown') {
        if (inventoryItem.projectile === 'yes') {
            generatePlayerProjectile(inventoryItem);
        };
    } else {
    };
};

function generatePlayerProjectile(inventoryItem) {
    // ===============================  //
    //  THIS USED TO BE "generateBullet()"
    // ===============================  //
    let newBullet = new Bullet(inventoryItem);
    if (newBullet.numberOf > 0) {
        for (i = 0; i < newBullet.numberOf; i++) {
            let newBulletDuplicate = new DuplicateBullet(inventoryItem, i);
            bullets.push(newBulletDuplicate);
        }
    } else {
        bullets.push(newBullet);
    };
    inventoryItem.lastUseTime = now;
}

//keyMap helps with telling us what keys the user is pressing AND
// also helps assign inventory to keys (use items/shoot bullets)
let keyMap = {
    w: {
        isPressed: false,
        lastPressTime: 0,
        binding: Bindings.playerUp
    },
    s: {
        isPressed: false,
        lastPressTime: 0,
        binding: Bindings.playerDown,
        use: (binding) => {
            keyMap[binding].binding
        }
    },
    a: {
        isPressed: false,
        lastPressTime: 0,
        binding: Bindings.playerLeft
    },
    d: {
        isPressed: false,
        lastPressTime: 0,
        binding: Bindings.playerRight
    },
    9: {
        cooldown: () => {checkKeyBindingCooldown(binding)},
        isPressed: false,
        lastPressTime: 0,
        binding: Bindings.useInventory2
    },
    8: {
        isPressed: false,
        lastPressTime: 0,
        binding: () => console.log('placeholder')
    },
    7: {
        isPressed: false,
        lastPressTime: 0,
        binding: () => console.log('placeholder')
    },
    6: {
        isPressed: false,
        lastPressTime: 0,
        binding: () => console.log('placeholder')
    },
    5: {
        isPressed: false,
        lastPressTime: 0,
        binding: Bindings.useInventory0
    },
    4: {
        isPressed: false,
        lastPressTime: 0,
        binding: Bindings.useInventory1
    },
    0: {
        isPressed: false,
        lastPressTime: 0,
        binding: () => console.log('placeholder')
    },
    Enter: {
        isPressed: false,
        lastPressTime: 0,
        binding: () => console.log('placeholder')
    }
};












function drawBullets() {
    bullets.forEach((ele) => {
        let bulletXActual = ele.x * c.width;
        let bulletYActual = ele.y * c.height;
        let radiusActual = ele.width * c.width;
         
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

                

                ctx.fillStyle = ele.color;
                ctx.beginPath();
                ctx.arc(bulletXActual, bulletYActual, radiusActual, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fill();


            //DEBUGGING
            if (debug === true) {
                ctx.font = "12px Georgia";
                ctx.fillStyle = 'white';
                ctx.fillText(('x%: ' + ele.x + ' y%: ' + ele.y), bulletXActual, bulletYActual + 40);
                ctx.fillText(('x No%: ' + bulletXActual + ' y No%: ' + bulletYActual), bulletXActual, bulletYActual - 20);


                //draw hitbox? -- enter x, y, w, h
                //ctx.fillRect(x, y,
                //    w, h);
                };
    })
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
    let playerHeightFromPercentToActual = Player.playerHeight * c.height;
    // draw it
    if (debug === true) {
        ctx.fillStyle = Player.playerColor;
    } else {
        ctx.fillStyle = 'transparent';
    }

    ctx.fillRect(playerXFromPercentToActual, playerYFromPercentToActual,
        playerWidthFromPercentToActual, playerWidthFromPercentToActual / 2);
    // ctx.fill();
    ctx.drawImage(playerSprite, playerXFromPercentToActual, playerYFromPercentToActual, playerWidthFromPercentToActual, playerHeightFromPercentToActual);
};
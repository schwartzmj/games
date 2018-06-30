let basicProjectile = {
    projectile: 'yes',
    'type': 'basic',
    'size': 0.01,
    'display': ionBlastSprite,
    'damage': 3,
    'speedModifier': 1,
    'cooldown': 1000,
    lastUseTime: 0,
    sound: () => {fireSound.play();},
    name: 'Basic Shot'
};

let shotgunProjectile = {
    projectile: 'yes',
    'type': 'shotgun',
    'size': 0.005,
    'display': greyBulletSprite,
    'damage': 0.25,
    'numberOf': 6,
    'speedModifier': 2,
    'cooldown': 500,
    lastUseTime: 0,
    sound: () => {fireSound.play();},
    name: 'Shotgun'
};

let ionBlast = {
    projectile: 'yes',
    'type': 'basic',
    'size': 0.05,
    'display': ionBlastSprite,
    'damage': 50,
    'numberOf': 0,
    'speedModifier': 0.25,
    'cooldown': 10000,
    lastUseTime: 0,
    sound: () => {tripSound.play();},
    name: 'Ion Blast'
};

let laser = {
    projectile: 'yes',
    'type': 'basic',
    'size': 0.008,
    'display': laserSprite,
    'damage': 1,
    'numberOf': 0,
    'speedModifier': 5,
    'cooldown': 75,
    lastUseTime: 0,
    sound: () => {laserSound.play();},
    name: 'Laser'
};

let arrowHead = {
    projectile: 'yes',
    'type': 'basic',
    'size': 0.008,
    'display': arrowHeadSprite,
    'damage': 1,
    'numberOf': 0,
    'speedModifier': 2,
    'cooldown': 200,
    lastUseTime: 0,
    sound: () => {fireSound.play();},
    name: 'Arrowhead'
};

let bullets = [];
let firedShots = 0;
let hitShots = 0;
let missedShots = 0;
let accuracy = 0;

function calculateShotAccuracy() {
    accuracy = ((hitShots / firedShots) * 100).toFixed(0);
}

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
        this.x = Player.x + Player.width / 2;
        this.y = Player.y;
        this.dx = Player.bulletDX;
        this.dy = Player.bulletDY;
        this.size = size;
        this.display = display;
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
    'width': 0.05,
    'height': 0.05,
    'x': 0.5,
    'y': 0.5,
    'bulletDX': .0005,
    'bulletDY': .005,
    'playerSpeed': 0.005,
    display: playerSprite,
    'life': 1000,
    'score': 0,
    'cooldownModifier': 1,
    inventory: [
        basicProjectile,
        shotgunProjectile,
        ionBlast,
        laser,
        arrowHead
    ]
};

function drawInventory() {
    let heightActual = Player.height * c.height;
    let widthActual = Player.width * c.width;
    let xActual = Player.x * c.width;
    let yActual = Player.y * c.height;

    let inventoryXGap = widthActual / 2;
    let inventoryStart = xActual - inventoryXGap;

    Player.inventory.forEach((item) => {
    let timeOffCooldown = (now - item.lastUseTime);

    ctx.font = "12px Georgia";
    ctx.fillStyle = 'red';

    if (timeOffCooldown >= item.cooldown) {
        timeOffCooldown = item.cooldown;
        ctx.fillStyle = 'lightgreen';
    };
    timeOffCooldown /= 1000;
    
    ctx.fillText(timeOffCooldown.toFixed(1), inventoryStart+=inventoryXGap, yActual + heightActual * 1.5);
    });
};

function checkPlayerInBounds(dir) {

        if ((dir==='up')
            && (Player.y <= 0)) {
            return false;
        } else if ((dir === 'down') &&
            (Player.y >= 1 - Player.height)) {
                return false;
        } else if ((dir === 'left')
            && (Player.x <= 0)) {
            return false;
        } else if ((dir === 'right')
            && (Player.x >= 1 - Player.width)) {
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
            Player.y -= Player.playerSpeed;
        };
    },
    playerDown: () => {
        if (checkPlayerInBounds('down')) {
            Player.y += Player.playerSpeed;
        };
    },
    playerLeft: () => {
        if (checkPlayerInBounds('left')) {
            Player.x -= Player.playerSpeed;
        };
    },
    playerRight: () => {
        if (checkPlayerInBounds('right')) {
            Player.x += Player.playerSpeed;
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
    },
    useInventory3: () => {
        useInventory(3)
    },
    useInventory4: () => {
        useInventory(4)
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
            firedShots += 1;
            inventoryItem.sound();
        }
    } else {
        bullets.push(newBullet);
        firedShots += 1;
        fireSound.play();
        inventoryItem.sound();
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
        isPressed: false,
        lastPressTime: 0,
        binding: Bindings.useInventory2
    },
    8: {
        isPressed: false,
        lastPressTime: 0,
        binding: Bindings.useInventory3
    },
    7: {
        isPressed: false,
        lastPressTime: 0,
        binding: Bindings.useInventory4
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
        let radiusActual = ele.size * c.width;
         
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

    
    if (debug === true) {
    ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(bulletXActual, bulletYActual, radiusActual, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }

    ctx.drawImage(ele.display, bulletXActual-radiusActual, bulletYActual-radiusActual, radiusActual*2, radiusActual*2);


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
    let eleC = getEleCanvasActualFromPercent(Player);
    
    if (debug === true) {
        ctx.fillStyle = 'blue';
    } else {
        ctx.fillStyle = 'transparent';
    }

    ctx.fillRect(eleC.x, eleC.y,
        eleC.width, eleC.height);
    ctx.drawImage(Player.display, eleC.x, eleC.y, eleC.width, eleC.height);
};
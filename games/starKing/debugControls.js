let mousePos;
let debug = false;

function debugInit() {
    let debugMenu = document.getElementById('debugMenu');
    let debugButton = document.getElementById('debugButton');
    debugMenu.style.display = 'none';
    debugButton.addEventListener('click', function(){
        if (debugMenu.style.display === "none") {
            debugMenu.style.display = "block";
            debug = true;
        } else {
            debugMenu.style.display = "none";
            debug = false;
        }
    });
    c.addEventListener('mousemove', function (evt) {
        mousePos = getMousePos(c, evt);
        ctx.font = "12px Georgia";
        ctx.fillStyle = 'white';
        ctx.fillText(('x:' + mousePos.x + ' y:' + mousePos.y), mousePos.x, mousePos.y);
    }, false);
}

function getMousePos(c, evt) {
    var rect = c.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

let spawnBasicButton = document.getElementById('spawnBasic');
spawnBasicButton.addEventListener('click', function(){
    generateNewEnemy(basicEnemy);
});

let spawnFastButton = document.getElementById('spawnFast');
spawnFastButton.addEventListener('click', function () {
    generateNewEnemy(fastEnemy);
});
let mousePos;
let debug = false;
let debugPause = false;

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

let debugPauseButton = document.getElementById('debugPause');
debugPauseButton.addEventListener('click', function () {
    debugPause = !debugPause;
});

let patchNotesButton = document.getElementById('patchNotesButton');
patchNotesButton.addEventListener('click', function () {
    debugPause = !debugPause;
    showPatchNotes();
});

let notesToggle = false;
function showPatchNotes() {
    notesToggle = !notesToggle;
    let patchNotesEle = document.createElement('div');
    patchNotesEle.id = 'patchNotes';
    patchNotesEle.innerHTML = patchNotes;
    let body = document.getElementsByTagName("body")[0]
    if (notesToggle) {
        body.appendChild(patchNotesEle);
    } else {
        patchNotesEle = document.getElementById('patchNotes');
        body.removeChild(patchNotesEle);
    };
};

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "patch-notes.md");
oReq.send();

let patchNotes = '';
function reqListener() {
    patchNotes = this.responseText;
};
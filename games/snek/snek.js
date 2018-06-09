time = 0;
tickRate = 1000;
var snekLength = 0;
var direction = "up";
var generateBodyCheck = false;
//no longer used
// var snekLastAppleCoords = [];
var snekBodyArr = [];
// these get unshifted into b/c body generates at [0,1] each time
var appleCoords = [];
var currentAppleCoords = [];

var gameArea = document.querySelector("#gameArea");
var snekHead = document.querySelector("#snekHead");
var snekBody = document.querySelector(".snekBody");
var apple = document.querySelector(".apple");
var score = document.querySelector("#score");
var snekBody = document.querySelector(".snekBody");

init();

function clock(){
    time += tickRate / 1000;
    move(snekHead);
    if (generateBodyCheck === true) {
        generateBody();
        generateBodyCheck = false;
    };
    generateApple();
    checkCollision();
}

function init() {
    setInterval(clock, tickRate);

}

function endGame(str){
    alert("Game over! " + str);
}

//
//Get Coords on grid of element
//
function getCoords(elem) {
    // Get Row Start and End
    elemGridRow = window.getComputedStyle(elem).gridRow;
    gridRowStart = Number(elemGridRow.substring(0, elemGridRow.indexOf('/') - 1));
    gridRowEnd = Number(elemGridRow.substring(elemGridRow.indexOf('/') + 2, elemGridRow.length));
    // Get Column Start and End
    elemGridCol = window.getComputedStyle(elem).gridColumn;
    gridColStart = Number(elemGridCol.substring(0, elemGridCol.indexOf('/') - 1));
    gridColEnd = Number(elemGridCol.substring(elemGridCol.indexOf('/') + 2, elemGridCol.length));
    return [gridRowStart, gridRowEnd, gridColStart, gridColEnd];
}
//
//*Snake only - Do math and update direction before drawing)
//
function move(elem) {
    newGridRowStart = getCoords(elem)[0];
    newGridRowEnd = getCoords(elem)[1];
    newGridColStart = getCoords(elem)[2];
    newGridColEnd = getCoords(elem)[3];
    if (direction === "up") {
        newGridRowStart -= 1;
        newGridRowEnd -= 1;
    }else if (direction === "down") {
        newGridRowStart += 1;
        newGridRowEnd += 1;
    }else if (direction === "left") {
        newGridColStart -= 1;
        newGridColEnd -= 1;
    }else if (direction === "right") {
        newGridColStart += 1;
        newGridColEnd += 1;
    }
    drawElem(elem);
        if ((getCoords(elem)[0] === 0) || (getCoords(elem)[0] === 11) || 
            (getCoords(elem)[2] === 0) || (getCoords(elem)[2] === 11)) {
            endGame("You went out of bounds!");
        }
};
//
//Draw element on grid
//
function drawElem(elem) {
    elem.style.gridRow = newGridRowStart + "/" + newGridRowEnd;
    elem.style.gridColumn = newGridColStart + "/" + newGridColEnd;
}

function generateApple(){
    if (window.getComputedStyle(apple).display === "none") {
    var appleX = Math.floor(Math.random() * 10) + 1;
    var appleY = Math.floor(Math.random() * 10) + 1;
    apple.style.gridRow = appleX + "/" + (appleX + 1);
    apple.style.gridColumn = appleY + "/" + (appleY + 1);
    apple.style.display = "block";
    currentAppleCoords.shift(appleX, appleY);
    }
};

function checkCollision(){
    var snekRowStart = getCoords(snekHead)[0];
    var snekColStart = getCoords(snekHead)[2];
    var appleRowStart = getCoords(apple)[0];
    var appleColStart = getCoords(apple)[2];
    if ((snekRowStart === appleRowStart) && (snekColStart === appleColStart)) {
        apple.style.display = "none";
        generateApple();
        snekLength++;
        score.innerHTML = snekLength;
        generateBodyCheck = true;
        appleCoords.unshift(snekRowStart, snekColStart);
        console.log(snekLength);
        console.log("Snek ate an apple.");
    }
}

function generateBody() {
    var bodyRowStart = appleCoords[0];
    var bodyRowEnd = (bodyRowStart + 1)
    var bodyColStart = appleCoords[1];
    var bodyColEnd = (bodyColStart + 1);
    gameArea.insertAdjacentHTML('beforeend', "<div class='snekBody' id='snekBody" + snekLength + "' style='grid-row: " + bodyRowStart +
        "/" + bodyRowEnd + "; grid-column: " + bodyColStart + "/" + bodyColEnd + ";'></div>");
    snekBodyArr.push(document.querySelector("#snekBody" + snekLength));
    console.log("#snekBody" + snekLength + " added to snekBodyArr array: " + snekBodyArr[snekLength]);
};

document.addEventListener('keypress', function(){
    var keyName = event.key;
    
    switch (keyName) {
        case 'w':
            direction = "up";
            break;
        case 's':
            direction = "down";
            break;
        case 'a':
            direction = "left";
            break;
        case 'd':
            direction = "right";
            break;
    }
});




//get max grid -- need to figure out later, if possible at all. this would be for setting custom size and grabbing
// max dynamically to calculate out of bounds areas
// function getMaxGrid() {
//         gameAreaGridRow = window.getComputedStyle(gameArea).gridTemplateColumns;
//         gridRowStart = Number(gameAreaGridRow.substring(0, gameAreaGridRow.indexOf('/') - 1));
//         gridRowEnd = Number(gameAreaGridRow.substring(gameAreaGridRow.indexOf('/') + 2, gameAreaGridRow.length));
//         // Get Column Start and End
//         gameAreaGridCol = window.getComputedStyle(gameArea).gridTemplateRows;
//         gridColStart = Number(gameAreaGridCol.substring(0, gameAreaGridCol.indexOf('/') - 1));
//         gridColEnd = Number(gameAreaGridCol.substring(gameAreaGridCol.indexOf('/') + 2, gameAreaGridCol.length));
// }

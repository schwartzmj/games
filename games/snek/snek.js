time = 0;
tickRate = 500;
var snekLength = 0;
var direction = "up";
var generateBodyCheck = false;
//no longer used
// var snekLastAppleCoords = [];
var snekBodyArr = [];
// these get unshifted into b/c body generates at [0,1] each time
var appleCoords = [];
var currentAppleCoords = [];
var snekMovements = [];

var gameArea = document.querySelector("#gameArea");
var snekHead = document.querySelector("#snekHead");
var snekBody = document.querySelector(".snekBody");
var apple = document.querySelector(".apple");
var score = document.querySelector("#score");
var snekBody = document.querySelector(".snekBody");
var tickRateRange = document.getElementById("tickRateRange");
var tickRateDisplay = document.getElementById("tickRateDisplay");
var startButton = document.querySelector("#start");

startButton.addEventListener("click",function(){
    init();
})

function captureSnekMovements(time){
    var xStart = getCoords(snekHead)[0];
    var xEnd = getCoords(snekHead)[1];
    var yStart = getCoords(snekHead)[2];
    var yEnd = getCoords(snekHead)[3];
    time = [xStart, xEnd, yStart, yEnd];
    snekMovements.unshift(time);
};
//
//Game Options and Start
//

tickRateRange.oninput = function () {
    tickRateDisplay.innerHTML = this.value;
    tickRate = this.value;
    console.log(tickRate);
}
function clock(){
    // getGameSpeed();
    time += tickRate / 1000;
    captureSnekMovements(time);
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
    newGridRowStart = (getCoords(elem)[0]);
    newGridRowEnd = (getCoords(elem)[1]);
    newGridColStart = (getCoords(elem)[2]);
    newGridColEnd = (getCoords(elem)[3]);
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
        if ((newGridRowStart === 0) || (newGridRowStart === 11) ||
            (newGridColStart === 0) || (newGridColStart === 11)) {
            endGame("You went out of bounds!");
        }
    //
    //tail code
    //
    $(".snekBody").remove();
    for (i = 0; i <= snekLength; i++) {
        gameArea.insertAdjacentHTML('beforeend', "<div class='snekBody' id='snekBody" + snekLength + "'  style='grid-row: " + snekMovements[i][0] +
            "/" + snekMovements[i][1] + "; grid-column: " + snekMovements[i][2] + "/" + snekMovements[i][3] + ";'></div>");
        snekBodyArr.push(document.querySelector("#snekBody" + snekLength));
    }
};
    // for (i = 0; i <= snekLength; i++) {
    //     function removeElement(elementId) {
    //         // Removes an element from the document
    //         var element = document.getElementById(elementId);
    //         element.parentNode.removeChild(element);
    //     }

  
//
//Draw element on grid
//
function drawElem(elem) {
    elem.style.gridRow = newGridRowStart + "/" + newGridRowEnd;
    elem.style.gridColumn = newGridColStart + "/" + newGridColEnd;
}

function generateApple(){
    var appleReadyToDraw = true;
    if (window.getComputedStyle(apple).display === "none") {
    var appleX = Math.floor(Math.random() * 10) + 1;
    var appleY = Math.floor(Math.random() * 10) + 1;
    //re-generate if Apple lands on snake body (add head too later?)
        for (i = 0; i <= snekLength; i++) {
            if ((appleX === snekMovements[i][0]) && (appleY === snekMovements[i][2])) {
                console.log("apple was randomized on to body, starting genApple function");
                appleReadyToDraw = false;
            }
        }
        if ((appleX === getCoords(snekHead)[0]) && (appleY === getCoords(snekHead)[2])) {
            console.log("apple was randomized on HEAD. restarting gen apple");
            appleReadyToDraw = false;
        }
        if (appleReadyToDraw === true){
            drawApple(appleX, appleY);
        } else {
            generateApple();
        }
    }   
};

function drawApple(appleX, appleY){
    apple.style.gridRow = appleX + "/" + (appleX + 1);
    apple.style.gridColumn = appleY + "/" + (appleY + 1);
    apple.style.display = "block";
    currentAppleCoords.unshift(appleX, appleY);
}

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
    for (i = 0; i <= snekLength; i++) {
       if ((snekRowStart === snekMovements[i][0]) && (snekColStart === snekMovements[i][2])) {
        endGame("That's a long johnson");
       }
        
    }
    
}

//========Does this code not matter anymore with the tail code "for" loops in "move()"?
//========
function generateBody() {}
//     // var bodyRowStart = appleCoords[0];
//     // var bodyRowEnd = (bodyRowStart + 1)
//     // var bodyColStart = appleCoords[1];
//     // var bodyColEnd = (bodyColStart + 1);
//     // gameArea.insertAdjacentHTML('beforeend', "<div class='snekBody' id='snekBody" + snekLength + "' style='grid-row: " + bodyRowStart +
//     //     "/" + bodyRowEnd + "; grid-column: " + bodyColStart + "/" + bodyColEnd + ";'></div>");
//     // snekBodyArr.push(document.querySelector("#snekBody" + snekLength));
//     // console.log("#snekBody" + snekLength + " added to snekBodyArr array: " + snekBodyArr[snekLength]);
// };

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

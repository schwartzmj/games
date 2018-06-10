var gameArea = document.querySelector("#gameArea");
var availablePiecesArea = document.querySelector("#availablePiecesArea");
var timeDisplay = document.querySelector("#timeDisplay");
var startButton = document.querySelector("#startButton");

var time = 0;
var pipeBoxArr = [];
var pipePieces = ["verticalStraight","horizontalStraight","cross","topCurveLeft","topCurveRight","bottomCurveLeft","bottomCurveRight","leftCurveTop"
                    , "leftCurveBottom", "rightCurveTop", "rightCurveBottom"];
var availablePieces = [];
var gooFaucetPieces = ["gooFaucetTop", "gooFaucetBottom", "gooFaucetLeft", "gooFaucetRight"];
var gooDrainPieces = ["gooDrainTop", "gooDrainBottom", "gooDrainLeft", "gooDrainRight"];
var nextPiece = "";
var gooDirection = "";
// ===========================
// valid movement check arrays
// ===========================
var validEnterFromTopPieces = ["verticalStraight", "cross", "topCurveLeft",
    "topCurveRight", "leftCurveTop", "rightCurveTop"
];
var validEnterFromBottomPieces = ["verticalStraight", "cross", "bottomCurveLeft",
    "bottomCurveRight", "leftCurveBottom", "rightCurveBottom"
];
var validEnterFromLeftPieces = ["horizontalStraight", "cross", "topCurveLeft",
    "bottomCurveLeft", "leftCurveTop", "leftCurveBottom"
];
var validEnterFromRightPieces = ["horizontalStraight", "cross",
    "topCurveRight", "bottomCurveRight", "rightCurveBottom", "rightCurveTop"
];
// ===========================
// END valid movement check arrays
// ===========================

startButton.addEventListener("click", function () {
    init();
})

function init(){
    generateBoard();
    generateAvailablePieces();
    drawAvailablePieces();
    generateGooFaucet();
    setInterval(clock, 1000);
    setInterval(gooPiece, 5000);
}

function win(){
    alert("Winner");
}


//add event listener to all pipeboxes
// on click - change class to pipePiece class that is at end of availablePieces arr
//////logic to see if already occupied etc




//==========================
//  Set Up
//==========================

function clock(){
    time++;
    timeDisplay.innerHTML = time;
}

function generateBoard() {
    for (i = 1; i <= 100; i++) {
        gameArea.insertAdjacentHTML('beforeend', "<div class='pipeBox pipeBox" + i + "'  style='grid-row: " + "auto" +
            "/" + "auto" + "; grid-column: " + "auto" + "/" + "auto" + ";'></div>");
        console.log(".pipeBox" + i);
        newPipeBox = ".pipeBox" + i
        pipeBoxArr.push(document.querySelector(".pipeBox" + i));
        // add "click" event listeners to every div generated
        document.querySelector(newPipeBox).addEventListener("click", boardClicked, false);
    };
};

function boardClicked(){
    if (this.classList.contains("piecebox")) {
        console.log("You clicked a box that already contains a piece. Try again.");
    } else if (this.classList.contains("gooFaucet")) {
        console.log("You clicked a box that already contains a piece. Try again.");
    } else if (this.classList.contains("gooDrain")) {
        console.log("You clicked a box that already contains a piece. Try again.");
    } else {
        // set var j to index of last piece of availablePieces arr
        j = availablePieces.length - 1;
        // set value of nextPiece to last index of availablePieces arr
        nextPiece = availablePieces[j];
        // add class "nextPiece" to "this"(element clicked). This will set bg image, etc.
        this.classList.add(nextPiece);
        this.classList.add("piecebox");
        // remove the item we used from the array
        availablePieces.pop();
        //generate a replacement piece
        generateBackfillPiece();
        // delete last div child of availablePiecesArea
        $("#availablePiecesArea :last-child").remove();
        // generate new one
        console.log("piece to insert: " + availablePieces[0] + "random num for availablePieces (j) for getNextAvailable: " + j);
        availablePiecesArea.insertAdjacentHTML('afterbegin', "<div class='pieceBox " + availablePieces[0] + "'  style='grid-row: " + "auto" +
            "/" + "auto" + "; grid-column: " + "auto" + "/" + "auto" + ";'></div>");
    }
}

function generateAvailablePieces() {
    for (i = 1; i <= 5; i++) {
        j = Math.floor(Math.random() * (pipePieces.length));
        console.log(pipePieces[j]);
        availablePieces.push(pipePieces[j]);
    };
};

function generateGooFaucet() {
    //generate location
    j = Math.floor((((Math.random() * 100) + 1)));
    console.log("random number to generate faucet: " + j);
    gooFaucet = document.querySelector(".pipeBox" + j);
    gooFaucet.classList.add("gooFaucet");
    h = Math.floor((((Math.random() * (gooFaucetPieces.length)))));
    console.log(h);
    gooFaucet.classList.add(gooFaucetPieces[h]);
    gooFaucet.id = "gooPiece";
    // set gooDirection
    if (gooFaucetPieces[h] === "gooFaucetTop"){
        gooDirection = "up";
    } else if (gooFaucetPieces[h] === "gooFaucetBottom") {
        gooDirection = "down";
    } else if (gooFaucetPieces[h] === "gooFaucetLeft") {
        gooDirection = "left";
    } else if (gooFaucetPieces[h] === "gooFaucetRight") {
        gooDirection = "right";
    }
    generateGooDrain(j);
};

function generateGooDrain(j) {
    k = Math.floor((((Math.random() * 100) + 1)));
    if (k != j) {
        console.log("random number to generate drain: " + k);
        gooDrain = document.querySelector(".pipeBox" + k);
        // generate direction of drain and add class
        m = Math.floor((((Math.random() * (gooDrainPieces.length)))));
        console.log("random num for gooDrain Piece: " + m);
        gooDrain.classList.add(gooDrainPieces[m]);
        // add generic gooDrain class
        gooDrain.classList.add("gooDrain");
        //else, repeat to generate new number b/c it matched with goofaucet
    } else generateGooDrain(j);
}

function gooPiece() {
    // get old goo piece ID to be able to perform movement math on it
    oldGooPieceID = (document.querySelector("#gooPiece").classList[1]).replace(/[^\d\.\-]/g, "");

    if (gooDirection === "up") {
        newGooPieceID = Number(oldGooPieceID) - 10;
    } else if (gooDirection === "down") {
        newGooPieceID = Number(oldGooPieceID) + 10;
    } else if (gooDirection === "left") {
        newGooPieceID = Number(oldGooPieceID) - 1;
    } else if (gooDirection === "right") {
        newGooPieceID = Number(oldGooPieceID) + 1;
    }
    //add "oldGooPiece" class so background color stays green after we remove gooPiece ID
    document.querySelector("#gooPiece").classList.add("oldGooPiece");
    //remove #gooPiece id from old gooPiece
    document.querySelector("#gooPiece").removeAttribute("id");
    //add new #gooPiece id to new gooPiece
    newGooPiece = document.querySelector(".pipeBox" + newGooPieceID);
    document.querySelector(".pipeBox" + newGooPieceID).id = "gooPiece";
    //if doc.queryselec"pipebox" + newgood pieceid) .classlist contains
    if (document.querySelector(".pipeBox" + newGooPieceID).classList.contains("gooDrain")){
        if ((gooDirection === "up") && (newGooPiece.classList.contains("gooDrainBottom"))) {
            win();
        } else if ((gooDirection === "down") && (newGooPiece.classList.contains("gooDrainTop"))) {
            win();
        } else if ((gooDirection === "left") && (newGooPiece.classList.contains("gooDrainRight"))) {
            win();
        } else if ((gooDirection === "right") && (newGooPiece.classList.contains("gooDrainLeft"))) {
            win();
        } else {
            alert("You missed the drain!")
        }
    }

    // set goo direction based on pipe piece? if new goo piece class list of pipe piece ===
    
    getNewGooDirection();
    // is this a valid connector? if new goo piece class list of pipe piece ===
    // if (document.querySelector(".pipeBox" + newGooPieceID).classList[2]) ===
}

function getNewGooDirection() {
    newGooPipeClass = (document.querySelector(".pipeBox" + newGooPieceID).classList[2]);
    validateGooMovement(newGooPipeClass);
}

function validateGooMovement(newGooPipeClass){
    if ((gooDirection === "up") && (!validEnterFromBottomPieces.includes(newGooPipeClass))) {
        alert("Your goo spilled! Game Over!");
    } else if ((gooDirection === "down") && (!validEnterFromTopPieces.includes(newGooPipeClass))) {
        alert("Your goo spilled! Game Over!");
    } else if ((gooDirection === "left") && (!validEnterFromRightPieces.includes(newGooPipeClass))) {
        alert("Your goo spilled! Game Over!");
    } else if ((gooDirection === "right") && (!validEnterFromLeftPieces.includes(newGooPipeClass))) {
        alert("Your goo spilled! Game Over!");
    }
    changeGooDirection(newGooPipeClass);
}

function changeGooDirection(newGooPipeClass){
    if (gooDirection === "up") {
        if ((["verticalStraight", "cross"].includes(newGooPipeClass))) {
            gooDirection = "up"
        } else if ((["bottomCurveLeft", "leftCurveBottom"].includes(newGooPipeClass))) {
            gooDirection = "left"
        } else if ((["bottomCurveRight", "rightCurveBottom"].includes(newGooPipeClass))) {
            gooDirection = "right"
        }
    } else if (gooDirection === "down") {
        if ((["verticalStraight", "cross"].includes(newGooPipeClass))) {
            gooDirection = "down"
        } else if ((["topCurveLeft", "leftCurveTop"].includes(newGooPipeClass))) {
            gooDirection = "left"
        } else if ((["topCurveRight", "rightCurveTop"].includes(newGooPipeClass))) {
            gooDirection = "right"
        }
    } else if (gooDirection === "left") {
        if ((["topCurveRight", "rightCurveTop"].includes(newGooPipeClass))) {
            gooDirection = "up"
        } else if ((["rightCurveBottom", "bottomCurveRight"].includes(newGooPipeClass))) {
            gooDirection = "down"
        } else if ((["horizontalStraight", "cross"].includes(newGooPipeClass))) {
            gooDirection = "left"
        }
    } else if (gooDirection === "right") {
        if ((["topCurveLeft", "leftCurveTop"].includes(newGooPipeClass))) {
            gooDirection = "up"
        } else if ((["bottomCurveLeft", "leftCurveBottom"].includes(newGooPipeClass))) {
            gooDirection = "down"
        } else if ((["horizontalStraight", "cross"].includes(newGooPipeClass))) {
            gooDirection = "right"
        }
    }
};







    
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

//==========================
//  END Set Up
//==========================

//==========================
//  Draw Pipe Piece Functions
//==========================
function drawAvailablePieces() {
    for (i = 0; i <= availablePieces.length; i++){
        console.log(i);
      availablePiecesArea.insertAdjacentHTML('beforeend', "<div class='pieceBox " + availablePieces[i] + "'  style='grid-row: " + "auto" +
          "/" + "auto" + "; grid-column: " + "auto" + "/" + "auto" + ";'></div>");
    }
}




//==========================
//  END Draw Pipe Piece Functions
//==========================

//==========================
//  Generate new piece to fill piece array
//==========================
function generateBackfillPiece() {
    j = Math.floor(Math.random() * (pipePieces.length));
    availablePieces.unshift(pipePieces[j]);
    console.log("piece generated to be inserted (pushed to end): " + pipePieces[j] + "random num generated for pipePieces[j] is " + j);
};
//==========================
//  END Generate new piece to fill piece array
//==========================
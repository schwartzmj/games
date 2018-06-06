// bullseyeArr = [];
// arr = [1,2];
anyClick = 0;
hitScore = 0;
missScore = 0;

survivalScore = 10;

var hitSound = new Howl({
  		src: ['piston-1.mp3']
});

//all game modes = defaultMode, survivalMode
var gameMode = "survival";

init();

function init() {
	if (gameMode === "survival") {
		survivalSetUp();
	}
};

function survivalSetUp() {
	$("#gameArea").append("<div id='survivalCircle'></div>");
};


function getCanvasWidth() {
	return $("#gameArea").width();
};

function getCanvasHeight() {
	return $("#gameArea").height();
};

function coordinateMax() {
	return [getCanvasWidth(), getCanvasHeight()];
};

function getBullseyeWidth() {
	return parseFloat($(".bullseye").css("width"));

};

function getBullseyeHeight() {
	return parseFloat($(".bullseye").css("height"));
};


function generateCoordinate() {
	var x = Math.random() * getCanvasWidth();
	var y = Math.random() * getCanvasHeight();
	return [calculateTargetX(x), calculateTargetY(y)];
};

function calculateTargetX(x) {
	if (x > (getCanvasWidth() - getBullseyeWidth())) {
		x -= getBullseyeWidth();
		return x;	
	} 
	else {
		return x;
	}
};

function calculateTargetY(y) {
	if (y > (getCanvasHeight() - getBullseyeHeight())) {
		y -= getBullseyeHeight();
		return y;	
	} else {
		return y;
	}
};

function generateBullseye() {
	xCoordinate = generateCoordinate()[0];
	yCoordinate = generateCoordinate()[1];
	if (gameMode === "survival") {
		//********************************************************************
		//USE THESE NUMBERS TO ADJUST SURVIVAL MODE "NO SPAWN ZONE" IN MIDDLE
		//********************************************************************
		if (((xCoordinate < (getCanvasWidth() * 0.3)) || (xCoordinate > (getCanvasWidth() * 0.65))) 
			|| ((yCoordinate < (getCanvasHeight() * 0.3)) || (yCoordinate > (getCanvasHeight() * 0.65)))) {
			drawBullseye(xCoordinate, yCoordinate);
		} else {
			generateBullseye();	
		}
	} else {
		drawBullseye();
	}
};

function drawBullseye(xCoordinate, yCoordinate) {
	$("#gameArea").append("<div class='bullseye' style='margin-left:" + xCoordinate + "px;margin-top:" + yCoordinate + "px',></div>");
}

// function addBullseyeToArray() {
// 	// $("#gameArea").html("<div class='bullseye' style='margin-left:" + generateCoordinate()[0] + "px;margin-top:" + generateCoordinate()[1] + "px',></div>");
// 	var bullseye = "<div class='bullseye' style='margin-left:" + generateCoordinate()[0] + "px;margin-top:" + generateCoordinate()[1] + "px',></div>";
// 	bullseyeArr.push(bullseye);
// 	console.log(bullseyeArr);
// }

setInterval(generateBullseye, 1000);

$("#gameArea").on("click",".bullseye",function(ev){
	hitScore += 1;
	$("#score").text(hitScore);
	// console.log(hitScore);
	// console.log("clicked circle");
	// $(this).css("backgroundColor","blue");
	// $(this).addClass("bullseyeHit");
	$(this).hide();
	hitSound.play();
	//stop propagation doenst do anything(?)
	ev.stopPropagation();
});

// (Not sure if this actually matters now that I think of it: use "CLICK" and not "ON"
//because "ON" sets to future elements, "CLICK" only does existing
// elements on load. If we do "ON" then it will apply to DIVs too
$("#gameArea").click(function(){
		missScore++
		// anyClick++;
		// missScore = anyClick - hitScore;
		$("#misses").text(missScore);
		// console.log("miss score:" + missScore);
		// console.log("clicked");
		$("body").prepend("<div id='missArea'style='display:block;'></div>");
});

// survivalCounter = 5000;

// mouseLeaveInterval = 5000;


// $("#survivalCircle").one("mouseleave", function(){

// 	console.log(mouseLeaveInterval);

// 		var interval = setInterval(function(){
// 			mouseLeaveInterval -= 1000;
// 			// survivalCounter -= 1;
// 			// console.log(survivalCounter);
// 		}, 1000);
// 		$("#survivalCircle").fadeOut(mouseLeaveInterval);
// 		console.log('LEAVE');
// 		console.log(interval);
// });

// function mouseEnter(interval){ $("#survivalCircle").on("mouseenter", function(){
// 		$("#survivalCircle").stop();
// 		clearInterval(interval);
// 				console.log(interval + "enter interval log");
// 		console.log('ENTER');
// 	});
// };

//
// **** USE "ONE" INSTEAD OF "ON" FOR ONLY ONE EVENT GENERATION ON MOUSE LEAVE
//



// bullseyeArr = [];
// arr = [1,2];
anyClick = 0;
hitScore = 0;
missScore = 0;

clock = 0;

survivalScore = 10;

var hitSound = new Howl({
  		src: ['piston-1.mp3']
});

//all game modes = defaultMode, survivalMode
var gameMode = "default";


generateBullseyeInterval = 1500;




function init() {
	if (gameMode === "survival") {
		survivalSetUp();
	}
	setInterval(generateBullseye, generateBullseyeInterval);
	setInterval(clockCount, 1000);
};

function clockCount() {
	clock += 1;
	$("#time").text(clock);
	cleanUpBullseyes();
}

function cleanUpBullseyes() {
	bullseyeArr = $(".bullseye").toArray();
	for (i = 0; i < bullseyeArr.length; i++) {
		if ($(bullseyeArr[i]).css('opacity') == 0) {
			$(bullseyeArr[i]).remove();
		}
	}
};

function survivalSetUp() {
	$("#gameArea").append("<div id='survivalCircle'></div>");
};


function getGameAreaWidth() {
	return $("#gameArea").width();
};

function getGameAreaHeight() {
	return $("#gameArea").height();
};

function coordinateMax() {
	return [getGameAreaWidth(), getGameAreaHeight()];
};

function getBullseyeWidth() {
	return parseFloat($(".bullseye").css("width"));

};

function getBullseyeHeight() {
	return parseFloat($(".bullseye").css("height"));
};


function generateCoordinate() {
	var x = Math.random() * getGameAreaWidth();
	var y = Math.random() * getGameAreaHeight();
	return [calculateTargetX(x), calculateTargetY(y)];
};

function calculateTargetX(x) {
	if (x > (getGameAreaWidth() - getBullseyeWidth())) {
		x -= getBullseyeWidth();
		return x;	
	} 
	else {
		return x;
	}
};

function calculateTargetY(y) {
	if (y > (getGameAreaHeight() - getBullseyeHeight())) {
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
		if (((xCoordinate < (getGameAreaWidth() * 0.3)) || (xCoordinate > (getGameAreaWidth() * 0.65))) 
			|| ((yCoordinate < (getGameAreaHeight() * 0.3)) || (yCoordinate > (getGameAreaHeight() * 0.65)))) {
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

$("#startGame").on("click",function(){
	$("#splashPageContainer").remove();
	init();
})

//
// GAME MODE SELECTORS
//
$("#default").on("click",function(){
	gameMode = "default";
	console.log(gameMode)
})

$("#survival").on("click",function(){
	gameMode = "survival";
	console.log(gameMode)
})


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



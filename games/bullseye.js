// bullseyeArr = [];
// arr = [1,2];
anyClick = 0;
hitScore = 0;
missScore = 0;
var hitSound = new Howl({
  		src: ['piston-1.mp3']
});

function getCanvasWidth() {
	return $("#gameArea").width();
}

function getCanvasHeight() {
	return $("#gameArea").height();
}

function coordinateMax() {
	return [getCanvasWidth(), getCanvasHeight()];
}

function generateCoordinate() {
	var x = Math.random() * getCanvasWidth();
	var y = Math.random() * getCanvasHeight();
	return [x, y];
}

function generateBullseye() {
	$("#gameArea").append("<div class='bullseye' style='margin-left:" + generateCoordinate()[0] + "px;margin-top:" + generateCoordinate()[1] + "px',></div>");
};


// function addBullseyeToArray() {
// 	// $("#gameArea").html("<div class='bullseye' style='margin-left:" + generateCoordinate()[0] + "px;margin-top:" + generateCoordinate()[1] + "px',></div>");
// 	var bullseye = "<div class='bullseye' style='margin-left:" + generateCoordinate()[0] + "px;margin-top:" + generateCoordinate()[1] + "px',></div>";
// 	bullseyeArr.push(bullseye);
// 	console.log(bullseyeArr);
// }

setInterval(generateBullseye, 1000);

$("#gameArea").on("click",".bullseye",function(){
	hitScore += 1;
	$("#score").text(hitScore);
	// console.log(hitScore);
	// console.log("clicked circle");
	// $(this).css("backgroundColor","blue");
	// $(this).addClass("bullseyeHit");
	$(this).hide();
	hitSound.play()
});

// (Not sure if this actually matters now that I think of it: use "CLICK" and not "ON"
//because "ON" sets to future elements, "CLICK" only does existing
// elements on load. If we do "ON" then it will apply to DIVs too
$("#gameArea").click(function(){
		anyClick++;
		missScore = anyClick - hitScore;
		$("#misses").text(missScore);
		// console.log("miss score:" + missScore);
		// console.log("clicked");
		$(this).addClass("miss");
});




bullseyes = [];

hitScore = 0;

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
	$("#gameArea").html("<div class='bullseye' style='margin-left:" + generateCoordinate()[0] + "px;margin-top:" + generateCoordinate()[1] + "px',></div>");
}

setInterval(generateBullseye, 1000);

$("#gameArea").on("click",".bullseye",function(){
	hitScore += 1;
	$("#score").text(hitScore);
	console.log(hitScore);
	console.log("clicked circle");
});
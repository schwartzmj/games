

function debugInit() {
    let debugMenu = document.getElementById('debugMenu');
    let debugButton = document.getElementById('debugButton');
    debugMenu.style.display = 'none';
    debugButton.addEventListener('click', function(){
        if (debugMenu.style.display === "none") {
            debugMenu.style.display = "block";
        } else {
            debugMenu.style.display = "none";
        }
    });
}

let spawnBasicButton = document.getElementById('spawnBasic');
spawnBasicButton.addEventListener('click', function(){
    generateNewEnemy(basicEnemy);
});
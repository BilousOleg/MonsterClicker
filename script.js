let start = document.querySelector(".start");
let startButton = document.querySelector("#start-button");
let gameField = document.querySelector("#game-area");
let gameTimer = document.querySelector("#game-timer");
let gamePoints = document.querySelector("#game-points");

let monsterArray = [];

let options = {
    monsterDelay: 1,    //Seconds
    timerCounter: 30,    //Seconds
    monsterCap: 5,
    monsterJumpDelay: 2,    //Seconds
    pointsToWin: 15
}

function func1() {
    document.body.removeChild(start);

    let points = 0;
    let spawnInter = setInterval(()=> {
        if (monsterArray.length == options.monsterCap) {
            console.log(1);
        }
        else {
            let monsterVar = document.createElement("div");
            monsterArray.push(monsterVar);
            gameField.appendChild(monsterVar);
            monsterVar.classList.add("monster");
            monsterVar.style.left = `${Math.random() * (90.08-0) + 0}%`;
            monsterVar.style.top = `${Math.random() * (82.55-0) + 0}%`;

            monsterVar.addEventListener ("click", ()=> {
                points++;
                gamePoints.textContent = `Очки: ${points}`;
                gameField.removeChild(monsterVar);
                monsterArray.splice(monsterArray.indexOf(monsterVar), 1);
                if (points >= options.pointsToWin) {
                    let end = document.createElement("div");
                    let endMessage = document.createElement("div");
                    end.classList.add("end-back");
                    endMessage.classList.add("end-message");
                    gameField.classList.add("gameEndArea");
                    gameField.appendChild(end);
                    gameField.appendChild(endMessage);
                    endMessage.textContent = "Победа!";
                    clearInterval(timerInter);
                    clearInterval(spawnInter);
                    clearInterval(jumpInter);
                    clearTimeout(gameTimeout);
                }
            })
        }
    }, options.monsterDelay * 1000);

    let jumpInter = setInterval (() => {
        for (i = 0; i < options.monsterCap; i++) {
            if (monsterArray.includes(monsterArray[i])){
                monsterArray[i].style.left = `${Math.random() * (90.08-0) + 0}%`;
                monsterArray[i].style.top = `${Math.random() * (82.55-0) + 0}%`;
            }
        }
    }, options.monsterJumpDelay * 1000);
    
    let timerInter = setInterval(() => {
        gameTimer.textContent = options.timerCounter - 1;
        options.timerCounter--;
    }, 1000);

    let gameTimeout = setTimeout(() => {
        let end = document.createElement("div");
        let endMessage = document.createElement("div");
        end.classList.add("end-back");
        endMessage.classList.add("end-message");
        gameField.classList.add("gameEndArea");
        gameField.appendChild(end);
        gameField.appendChild(endMessage);
        endMessage.textContent = "Поражение...";
        clearInterval(timerInter);
        clearInterval(spawnInter);
        clearInterval(jumpInter);
    }, `${options.timerCounter * 1000}`);

}

startButton.addEventListener("click", func1);
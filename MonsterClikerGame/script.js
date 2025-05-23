const start = document.querySelector(".start");

const startButton = document.querySelector("#start-button");
const gameField = document.querySelector("#game-area");
const gameOptions = document.querySelector("#game-options");
const background = document.body;
const gameTimer = document.querySelector("#game-timer");
const gamePoints = document.querySelector("#game-points");
const userRecord = document.querySelector("#user-record");

let assetsFolder = "assets"

startButton.style.backgroundImage = `url("./${assetsFolder}/images/background-button-start.jpg")`;
gameField.style.backgroundImage = `url("./${assetsFolder}/images/background-field.png")`;
gameOptions.style.backgroundImage = `url("./${assetsFolder}/images/background-options.png")`;
background.style.backgroundImage = `url("./${assetsFolder}/images/background-global.jpg")`;

const monsterArray = [];

let points = 0;

class Monster{
    constructor(points, jumpDelay, image, sound, size){
        this.points = points;
        this.jumpDelay = jumpDelay;
        this.image = image;
        this.Audio = new Audio(`./${assetsFolder}/audio/${sound}.mp3`);
        this.size = size;
        this.element = this.generateDOM();
        this.isDead = false;
        this.jumpInter = setInterval(()=> {
            this.element.style.left = `${Math.random() * (90.08-0) + 0}%`;
            this.element.style.top = `${Math.random() * (82.55-0) + 0}%`;
        }, this.jumpDelay * 1000);
    }

    generateDOM() {
        let element = document.createElement("div");
        element.classList.add("monster");
        gameField.appendChild(element);
        element.style.width = `${10 * this.size}%`;
        element.style.height = `${17.7 * this.size}%`;
        element.style.left = `${Math.random() * (90.08-0) + 0}%`;
        element.style.top = `${Math.random() * (82.55-0) + 0}%`;
        element.style.backgroundImage = `url("./${assetsFolder}/images/${this.image}.png")`
        element.addEventListener("click", ()=> {
            this.Audio.volume = 0.4;
            this.Audio.play();
            this.isDead = true;
        })
        return element;
    }

    deleteDOM() {
        gameField.removeChild(this.element);
        clearInterval(this.jumpInter);
    }
};

const options = {
    monsterDelay: 0.8,    //Seconds
    timerCounter: 60.0,    //Seconds
    monsterCap: 5,
    pointsToWin: 45,
    monsterTypes: [
        {
            points: 2,
            jumpDelay: 1,   //Seconds
            image: "monster-medium",
            sound: "death-medium",
            size: 1,
            chance: 50      // %
        },
        {
            points: 4,
            jumpDelay: 0.7,   //Seconds
            image: "monster-fast",
            sound: "death-fast",
            size: 0.65,
            chance: 20        // %
        },
        {
            points: 1,
            jumpDelay: 1.5,   //Seconds
            image: "monster-low",
            sound: "death-low",
            size: 1,
            chance: 75        // %
        }
    ],
};

let timeOfGame = options.timerCounter;
userRecord.textContent = localStorage.getItem("record");

function func1() {
    document.body.removeChild(start);
    
    let spawnInter = setInterval(()=> {
        if (monsterArray.length == options.monsterCap) {

        }
        else {
            while (1) {
                let type = options.monsterTypes[Math.floor(Math.random() * (options.monsterTypes.length - 0)) + 0];
                if (Math.random() * 100 <= type.chance) {
                    let monsterVar = new Monster(type.points, type.jumpDelay, type.image, type.sound, type.size);
                    monsterArray.push(monsterVar);
                    break;
                }
            }
        }
    }, options.monsterDelay * 1000);

    let gameLoop = setInterval (() => {
        let i = 0;
        while (i < monsterArray.length) {
            if (monsterArray[i].isDead == true) {
                points += monsterArray[i].points;
                gamePoints.textContent = `Очки: ${points}`;
                monsterArray[i].deleteDOM();
                monsterArray.splice(i, 1);
                i--;
            }
            i++;
        }
        if (points >= options.pointsToWin) {
            let end = document.createElement("div");
            let endMessage = document.createElement("div");
            end.classList.add("end-back");
            endMessage.classList.add("end-message");
            endMessage.style.backgroundImage = `url("./${assetsFolder}/images/background-button-end.jpg")`;
            gameField.classList.add("gameEndArea");
            gameField.appendChild(end);
            gameField.appendChild(endMessage);
            endMessage.textContent = "Перемога!";
            clearInterval(timerInter);
            clearInterval(spawnInter);
            clearInterval(gameLoop);
            clearTimeout(gameTimeout);
            let record = (timeOfGame - gameTimer.textContent).toFixed(1);
            if (record < localStorage.getItem("record")) {
                localStorage.setItem("record", `${record}`);
                userRecord.textContent = localStorage.getItem("record");
            }
            for (let j = 0; j < monsterArray.length; j++) {
                monsterArray[j].deleteDOM();
            }
        }
    }, 1);

    let timerInter = setInterval(() => {
        gameTimer.textContent = (options.timerCounter - 0.1).toFixed(1);
        options.timerCounter -= 0.1;
    }, 100);    

    let gameTimeout = setTimeout(() => {
        let end = document.createElement("div");
        let endMessage = document.createElement("div");
        end.classList.add("end-back");
        endMessage.classList.add("end-message");
        endMessage.style.backgroundImage = `url("./${assetsFolder}/images/background-button-end.jpg")`;
        gameField.classList.add("gameEndArea");
        gameField.appendChild(end);
        gameField.appendChild(endMessage);
        endMessage.textContent = "Поразка...";
        for (let j = 0; j < monsterArray.length; j++) {
            monsterArray[j].deleteDOM();
        }
        clearInterval(timerInter);
        clearInterval(spawnInter);
        clearInterval(gameLoop);
        gameTimer.textContent = "0.0";
    }, `${(options.timerCounter) * 1000}`);
}

startButton.addEventListener("click", func1);
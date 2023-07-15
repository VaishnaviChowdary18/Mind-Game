const moves = document.getElementById("moves-count");

const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;
let highscoreval;

const items = [
    {name:"bee2", image:"bee2.jpg"},
    {name:"crocodile2", image:"crocodile2.jpg"},
    {name:"macaw2", image:"macaw2.jpg"},
    {name:"gorilla2", image:"gorilla2.jpg"},
    {name:"tiger2", image:"tiger2.jpg"},
    {name:"monkey2", image:"monkey2.jpg"},
    {name:"chameleon2", image:"chameleon2.jpg"},
    {name:"piranha2", image:"piranha2.jpg"}

];
let timer=0;
let movesCount = 0,
  winCount = 0;

let score=0;
const timeGenerator = () => {
    if(timer>60){
        alert("Times UP!! press ok to play again . your score is" + score);
    const  Time = document.getElementById('time');
    timer=0;
    Time.innerHTML = `<span>Time:</span>${60-timer}`;
stopGame();
score=0;
scoreBox.innerHTML="score:"+score;

    }
    else{
        const  Time = document.getElementById('time');
        Time.innerHTML = `<span>Time:</span>${60-timer}`;
timer++;
scoreBox.innerHTML="score:"+score;

    }
};


const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};


const generateRandom = (size = 4) => {

  let tempArray = [...items];
 
  let cardValues = [];
  
  size = (size * size) / 2;

  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
 
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];

  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
  
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">*</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      
      if (!card.classList.contains("matched")) {
        
        card.classList.add("flipped");
        
        if (!firstCard) {
          
          firstCard = card;
          
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          
          movesCounter();
         
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
           
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            score+=5;
            if((score>highscoreval)){
                highscoreval = score;
                localStorage.setItem("highscore",JSON.stringify(highscoreval))
                highscoreBox.innerHTML ="Highscore:"+highscoreval;
            }
            scoreBox.innerHTML="score:"+score;
            
            
            firstCard = false;
            
            winCount += 1;
            
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${movesCount}</h4>
            <h4>Score: ${score}</h4>`;
              stopGame();
              score=0;
              timer=0;
            }
          } else {
            
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};


startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
 
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  
  interval = setInterval(timeGenerator, 1000);
  
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});


stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);


const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};
let highscore = localStorage.getItem("highscore");
if(highscore ===null){
highscoreval = 0;
localStorage.setItem("highscore",JSON.stringify(highscoreval));
}
else{
    highscoreval = JSON.parse(highscore);
    highscoreBox.innerHTML ="Highscore:"+highscore;
    }
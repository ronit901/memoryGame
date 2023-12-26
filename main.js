const values = ["🐼"
// , "🦝", "🦄", "🐯", "🐶"
];
let cards = values.concat(values);

//ערבוב קלפים
function shuffle(arrayForShuffling) {
  for (let i = arrayForShuffling.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [arrayForShuffling[i], arrayForShuffling[randomIndex]] = [arrayForShuffling[randomIndex], arrayForShuffling[i]];
  }
  return arrayForShuffling;
}

cards = shuffle(cards);

//ספירת מספר מהלכים
let playerCountMistakes = 0;
const liveCount = document.querySelector(".liveCount");
liveCount.textContent = playerCountMistakes;

// הכנת קלפים
cards.forEach((value) => {
  let cardElement = document.createElement("div");
  cardElement.classList.add("card");

  let frontSide = document.createElement("div");
  frontSide.classList.add("front");
  frontSide.innerText = value;

  let backSide = document.createElement("div");
  backSide.classList.add("back");

  cardElement.appendChild(frontSide);
  cardElement.appendChild(backSide);



  document.querySelector(".board").appendChild(cardElement);
  cardElement.addEventListener("click", (e) => {
    const clickedCard = e.target.closest(".card");
    //בודק ששנלחצים רק שני קלפים
    if (clickedCard && !clickedCard.classList.contains("toggleCard")) {
      startTimer();
      clickedCard.classList.add("toggleCard");
      checkCards();

      const flippedCards = document.querySelectorAll(".toggleCard");

      if (flippedCards.length > 2) {

        flippedCards.forEach((card) => {
          card.classList.remove("toggleCard");
        });

      }
    }
  });
})

//בודק שקלף נלחץ
document.querySelector(".card").addEventListener("click", (e) => {
  cards.classList.toggle("toggleCard")
});

// בדיקה אם הקלפים זהים
const checkCards = () => {
  const flippedCards = document.querySelectorAll(".toggleCard");

  if (flippedCards.length === 2) {
    const [firstCard, secondCard] = flippedCards;
    // מה קורה אם קלפים תואמים
    if (firstCard.textContent === secondCard.textContent) {
      //אם כן
      flippedCards.forEach((cards) => {
        setTimeout(() => {
          flippedCards.forEach((card) => {
            cards.classList.remove("flipped", "toggleCard");
            card.classList.add("trueStyle");
          });
        }, 500);
      })
      console.log("mach");
      if (cheakAllMach()) {
        setTimeout(() => {
          stopTimer();
          const minutes = Math.floor(seconds / 60)
          const remainderSeconds = seconds % 60;
          const displaySeconds = remainderSeconds < 10 ? '0' + remainderSeconds : remainderSeconds;
          const message = `!הצלחת\nמצאת את כל הזוגות\n תוך ${minutes}:${displaySeconds} דקות\nו-${playerCountMistakes} מהלכים`;
          openModal(message);

          restart()
          
        },600);
      }

    } else {   //אם לא
      console.log("wrong");
      setTimeout(() => {
        flippedCards.forEach((card) => card.classList.remove("toggleCard"));
      }, 500);
    }
// הוספת מהלך לספירה
    playerCountMistakes++;
    liveCount.textContent = playerCountMistakes;

  }
};
//בדיקה אם כל הזוגות נמצאו
function cheakAllMach() {
  let a= document.querySelectorAll(".trueStyle").length+2
  let b= cards.length
  console.log(a,b);
  if (document.querySelectorAll(".trueStyle").length+2 === cards.length) {
    return true;
  }
  return false; 
}


// איפוס משחק
const restart = () => {
  cards = shuffle(cards);
  const allCards = document.querySelectorAll(".card"); 
  allCards.forEach((card) => {
    card.classList.remove("toggleCard", "flipped", "trueStyle");
  });

  playerCountMistakes = 0;
  liveCount.textContent = playerCountMistakes;
stopTimer()
  seconds = 0;
  document.getElementById('timer').innerHTML = "0:00 :זמן";
};


//טיימר
let timer;
let seconds = 0;
function startTimer() {
  if (!timer) {
    timer = setInterval(updateTimer, 1000);
  }
}
function updateTimer() {
  seconds++;
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  
  const displaySeconds = remainderSeconds < 10 ? '0' + remainderSeconds : remainderSeconds;
  
  document.getElementById('timer').innerHTML = ` ${ minutes }:${ displaySeconds } : זמן`;
}
function stopTimer() {
  clearInterval(timer);
  timer = null;
}
restart();

//לחיצה על איפוס
document.querySelector(".restart").addEventListener("click", () => {
  console.log("restart");
  restart();
});

//הודעת הצלחה
function openModal(message) {
  const modal = document.getElementById("myModal");
  const modalMessage = document.getElementById("modal-message");
  modalMessage.textContent = message;
  modal.style.display = "block";
}


function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}
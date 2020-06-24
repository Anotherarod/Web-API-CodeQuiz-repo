// Create a variable(const) to pull element(parent element) id from html

var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var scoreCountDisplay = document.getElementById('score-count-display')
var restartButton = document.getElementById('restart-btn')
var timerDisplay = document.getElementById ('timer-display')
var answersButtonElement= document.querySelector('btn')
var nameElement = document.getElementById("name")
var submitBtn = document.getElementById("submit")
var scorePage = document.getElementById("end-screen-scorepage")
// Create a variable(let) to make the questions(children elements) random from the choices created



var shuffledQuestions, currentQuestionIndex, scoreCount, timerCount, intervalId

startButton.addEventListener('click', startGame)


nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

// Create functions to start the game and cycle through the game
function myTimer() {

  
  timerCount -- 
  timerDisplay.innerText = timerCount
  if (timerCount <= 0){ 
    alert ("Times Up!");
   
    clearInterval(intervalId);
  }

  
} 
function run() {
  
  intervalId = setInterval(myTimer, 1000);
}

//set startGame function and use math.random to shufflequestions within a questions.sort element
function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  scoreCount = 0
  scoreCountDisplay.innerText = "score:  " + scoreCount;
  timerCount = 60
  timerDisplay.innerText = timerCount
  run()
  setNextQuestion()

}


// Set function for questions to be asked and move through quiz
function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}
//Created method to show the questions

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
     
  } 
   

  //Add eventlistener for answerbuttonselement

    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}
//Create a score counter with loss of time for incorrect answers and time gained for correct answers
function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  if (correct) {
    scoreCount ++
    scoreCountDisplay.innerText = "score:  " + scoreCount;
    timerCount += 5
    
  }
  else {
    timerCount -= 10
    
  
}setStatusClass(document.body, correct)
Array.from(answerButtonsElement.children).forEach(button => {
  setStatusClass(button, button.dataset.correct)
})
if (shuffledQuestions.length > currentQuestionIndex + 1) {
  nextButton.classList.remove('hide')
} else {
  scorePage.classList.remove('hide')
  clearInterval(intervalId)
  startButton.innerText = 'Restart'
  startButton.classList.remove('hide')
}
}

function setStatusClass(element, correct) {
clearStatusClass(element)
if (correct) {
  element.classList.add('correct')
} else {
  element.classList.add('wrong')
}
}

function clearStatusClass(element) {
element.classList.remove('correct')
element.classList.remove('wrong')
}
//Create a separate HTML and link
function saveHighScore(){
    var name = nameElement.value.trim();
  if (name !== ""){
    var highScore = JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newUserScore = {
      score: scoreCount,
      name:name

    }
    highScore.push(newUserScore)
    window.localStorage.setItem("highscores", JSON.stringify(highScore))
  
  }
  window.location.href = "scores.html"

}

submitBtn.onclick = saveHighScore;//links with submit in html

  function pressEnter(event){
    if (event.key === "enter"){
      saveHighScore()
    }

  }


//JSON with localStorage and highscore display
 function displayHighScore(){
  var highScore = JSON.parse(window.localStorage.getItem("highscores")) || [];
  highScore.sort(function(a, b){
  return b.newUserScore - a.newUserScore
  })
  highScore.forEach(function(newUserScore) {
    // create li tag for each high score
    var liTag = document.createElement("li");
    liTag.textContent = newUserScore.initials + " - " + newUserScore.score;
    // display on page
    var olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
  });
//need to call display high scores
  
 }



var questions = [
{
  question: 'What year was the federal reserve act signed?',
  answers: [
    { text: '1929', correct: false },
    { text: '1913', correct: true },
    { text: '1901', correct: false },
    { text: '1890', correct: false },
  ]
},
{
  question: 'How many ounces are in a pound?',
  answers: [
    { text: '8', correct: false },
    { text: '21', correct: false },
    { text: '16', correct: true },
    { text: '10', correct: false }
  ]
},
{
  question: 'When was citizens united signed into law?',
  answers: [
    { text: '2001', correct: false },
    { text: '1996', correct: false },
    { text: '2010', correct: true },
    { text: '1991', correct: false }
  ]
},
{
  question: 'Who invented the light bulb?',
  answers: [
    { text: 'Joseph Swan', correct: true },
    { text: 'Thomas Edison', correct: false },
    { text: 'Nikola Tesla', correct: false },
    { text: 'Benjamin Franklin', correct: false }
  ]
  
  
},
 {
  question: 'What country Alan Turing from?',
  answers: [
    { text: 'Egypt', correct: false },
    { text: 'United Kingdom', correct: true },
    { text: 'Germany', correct: false },
    { text: 'Australia', correct: false }
  ]
  
  
},
{
  question: 'What is the capital California?',
  answers: [
    { text: 'San Francisco', correct: false },
    { text: 'San Diego', correct: false },
    { text: 'Bakersfield', correct: false },
    { text: 'Sacramento', correct: true }
  ]
  
  
},
{
  question: 'Who did Wiley Coyote always try and capture?',
  answers: [
    { text: 'The Roadrunner', correct: true },
    { text: 'Daffy Duck', correct: false },
    { text: 'Pepe Le Pew', correct: false },
    { text: 'Bugs Bunny', correct: false }
  ]
  
  
}


    






]
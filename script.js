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
// Create a variable(let) to make the questions(children elements) random from the choices created



var shuffledQuestions, currentQuestionIndex, scoreCount, timerCount, intervalId

startButton.addEventListener('click', startGame)


nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

// Create a functions to start the game and cycle through the game
function myTimer() {
  timerCount -- 
  timerDisplay.innerText = timerCount
  if (timerCount <= 0){ 
    alert ("Times Up!");
    clearInterval(intervalId);
  }

  
} 
function run() {
  clearInterval(intervalId);
  intervalId = setInterval(myTimer, 1000);
}


function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  scoreCount = 0
  scoreCountDisplay.innerText = "score count:" + scoreCount;
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
    scoreCountDisplay.innerText = "score count:" + scoreCount;
    timerCount += 5
    
  }
  else {
    timerCount -= 10
    
  }
}
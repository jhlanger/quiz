

var startbtn = document.getElementById("start");
var question = document.getElementById("question");
var counter = document.getElementById("counter");
var quizBox = document.getElementById("quiz");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var scoreContainer = document.getElementById("scoreContainer");
var verifycorrect = document.getElementById("verifycorrect");
var userInitials = document.querySelector("#initials");
var highscorePage = document.getElementById("highscorePage");
var highscoreSubmit = document.getElementById("highscoreSubmit");
var currentHighScore = document.getElementById("currentHighScore");

var score = 0;
var highscore = 0;
var timer;

console.dir(currentHighScore);


var questions = [
    {
        question: "1 + 1 = ?", 
        choiceA: "1", 
        choiceB: "2",
        choiceC: "3",
        correct: "B"
       
    },

    {
        question: "2 + 2 = ?", 
        choiceA: "4", 
        choiceB: "5",
        choiceC: "6",
        correct: "A"
    },

    {
        question: "3 + 3 = ?", 
        choiceA: "3", 
        choiceB: "5",
        choiceC: "6",
        correct: "C"
    },

    {
        question: "4 + 4 = ?", 
        choiceA: "4", 
        choiceB: "8",
        choiceC: "16",
        correct: "B"
    }

];

var lastQuestionIndex = questions.length -1;
var runningQuestionIndex = 0

var quizTime = 30;

function renderQuestion () {
    var q = questions[runningQuestionIndex];
    question.innerHTML = "<p>" +q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
};

function counterRender () {
    counter.innerHTML = quizTime;
      quizTime --;
  
      if (quizTime < 0){
        quizTime = " ";
        clearInterval(timer);
        scoreRender();
      }
}



function checkAnswer (answer) {
    if (answer === questions[runningQuestionIndex].correct ){
        score ++;
        answerIsCorrect();
    } else {
        quizTime= quizTime -5;
        answerIsWrong();
    };

    if (runningQuestionIndex <lastQuestionIndex){
        runningQuestionIndex ++;
        renderQuestion();
    } else {
        clearInterval(timer)
        scoreRender();
    };

};

function answerIsCorrect () {
    verifycorrect.style.display = "flex";
    verifycorrect.innerHTML = "<p> Correct </p>"
}

function answerIsWrong () {
    verifycorrect.style.display = "flex";
    verifycorrect.innerHTML = "<p> Incorrect. 5 seconds subtracted </p>"
}
function startQuiz() {
    startbtn.style.display = "none";
    highscorePage.style.display = "none";
    currentHighScore.style.display= "none";
    scoreContainer.style.display = "none";
    runningQuestionIndex = 0
    quizTime = 30;
    score = 0;
    counterRender();
    renderQuestion();
    quizBox.style.display = "flex";
    timer = setInterval(counterRender,1000);

};

function scoreRender () {
    scoreContainer.style.display = "flex";
    verifycorrect.style.display = "none";
    quizBox.style.display = "none";
    
    var totalScore = score + quizTime;
    scoreContainer.innerHTML = "<p> You scored " + totalScore + "!</p>";


    if(totalScore > highscore){
        highscorePage.style.display = "flex";
        highscore = totalScore;
        scoreContainer.innerHTML = "<p> You scored " + totalScore + "! New highscore!</p>";
    } else {
        startbtn.style.display = "flex";
        scoreContainer.innerHTML = "<p> Current highscore is " +highscoreSaved + " by " + highscoreUserSaved + ". </p>";
    }
};

highscoreSubmit.addEventListener('click', function(event){
    event.preventDefault()
    var highscoreInitials = userInitials.value;
        if(highscoreInitials=== ""){
            alert("Initials cannot be blank");
        }

    


    localStorage.setItem("highscore",highscore);
    localStorage.setItem("highscoreUser", highscoreInitials);

    highscoreSaved = localStorage.getItem("highscore");
    highscoreUserSaved = localStorage.getItem("highscoreUser");

    currentHighScore.style.display = "flex"
    highscorePage.style.display = "none";
    startbtn.style.display = "flex";
    scoreContainer.style.display = "none";
    
    currentHighScore.innerHTML = "<p>" +highscoreUserSaved +" scored " + highscoreSaved + "! This is a new highscore!</p>";
   
    console.log(highscore);
});

startbtn.addEventListener("click", startQuiz);

const questions = [
    {
        question : "What is Manipal famous for?",
        answers: [
            {text : "Education" , correct : true},
            {text : "Alcohol" , correct : false},
            {text : "Skydiving" , correct : false},
            {text : "Nothing" , correct : false}
        ]
    },
    {
        question : "What degree is given in Manipal Institute of Technology?",
        answers: [
            {text : "BSc." , correct : false},
            {text : "BTech." , correct : true},
            {text : "BEd." , correct : false},
            {text : "Umemployement" , correct : false}
        ]
    },
    {
        question : "Which club is the best?",
        answers: [
            {text : "ACM" , correct : false},
            {text : "IEEE" , correct : false},
            {text : "ISTE" , correct : true},
            {text : "None" , correct : false}
        ]
    },
    {
        question : "Which is the best place to eat or drink in Manipal?",
        answers: [
            {text : "Hadiqa" , correct : false},
            {text : "Eye of Tiger" , correct : false},
            {text : "MLH" , correct : false},
            {text : "Bacchus" , correct : true}
        ]
    },
    {
        question : "Is this quiz any good?",
        answers: [
            {text : "Yes" , correct : true},
            {text : "No" , correct : false},
            {text : "Hell no" , correct : false},
            {text : "Who is this guy again?" , correct : false}
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    resetState();
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTMl = "Next";
    showQuestion();
}

function showQuestion(){
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct= answer.correct;
        }
        button.addEventListener('click', selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild); 
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }
    else{
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Play Again!";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        resetState();
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();


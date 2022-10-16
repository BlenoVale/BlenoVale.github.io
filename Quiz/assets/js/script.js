//Initializer
let warnMsg = document.querySelector('.question-button-area .warning-msg');
let currentQuestion = 0;
let correctAnswers = 0;
const maxTimer = 10;
let idInterval = null;

//Events
document.querySelector('.presentation button').addEventListener('click', startQuiz);
document.querySelector('.question-button-area button').addEventListener('click', nextQuestion);
document.querySelector('.score-area button').addEventListener('click', presentationQuiz);

//Functions
function startQuiz() {
    let widthQuizItem = document.querySelector('.quiz-item').clientWidth;
    document.querySelector('.quiz-width').style.marginLeft = `-${widthQuizItem}px`;
    showQuestions();
}

function finishQuiz() {
    caculateScore();
    let widthQuizItem = document.querySelector('.quiz-item').clientWidth * 2;
    document.querySelector('.quiz-width').style.marginLeft = `-${widthQuizItem}px`;
    document.querySelector('.progress-bar').style.width = '100%';
}

function presentationQuiz() {
    clearQuiz();
    document.querySelector('.quiz-width').style.marginLeft = `0px`;
}

function showQuestions() {
    clearTimer();
    questionTimer(maxTimer);
    warnMsg.style.opacity = 0;

    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];
        updateProgress();

        document.querySelector('.question').innerHTML = q.question;

        let optionsHTML = '';
        for (let i in q.options) {
            let op = parseInt(i) + 1
            optionsHTML += `<div data-op="${op}" class="option"><span>${op}</span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHTML;

        let options = document.querySelectorAll('.options .option');
        options.forEach(item => {
            item.addEventListener('click', () => {
                options.forEach(op => {
                    if (op.classList.contains('selected')) {
                        op.classList.remove('selected');
                    };
                });

                item.classList.add('selected');
            });
        });
    } else {
        finishQuiz();
    }
}

function nextQuestion() {
    try {
        let option = document.querySelector('.option.selected');
        let answerOption = parseInt(option.getAttribute('data-op'));
        if (questions[currentQuestion].answer === answerOption) {
            correctAnswers++;
        }
        currentQuestion++;
        showQuestions();
    } catch (error) {
        warnMsg.style.opacity = 1;
    }
}

function updateProgress() {
    document.querySelector('.progress').style.display = 'block';
    let pct = Math.floor((currentQuestion / questions.length) * 100);
    document.querySelector('.progress-bar').style.width = `${pct}%`;
    document.querySelector('.progress-count').innerHTML = `Pergunta ${currentQuestion + 1} de ${questions.length}`;
}

function clearQuiz() {
    clearTimer();
    document.querySelector('.progress').style.display = 'none';
    document.querySelector('.progress-count').innerHTML = '';
    currentQuestion = 0;
    correctAnswers = 0;
}

function caculateScore() {
    let points = Math.floor((correctAnswers / questions.length) * 100);
    if (points <= 30) {
        document.querySelector('.score-content img').src = 'assets/images/brain02-sad.png';
        document.querySelector('.scoreText1').innerHTML = 'Tá Ruim em?!';
        document.querySelector('.scorePct').style.color = 'red';
    } else if (points > 30 && points <= 50) {
        document.querySelector('.score-content img').src = 'assets/images/brain07-study.png';
        document.querySelector('.scoreText1').innerHTML = 'Não tá bom, mas podia ser pior!';
        document.querySelector('.scorePct').style.color = 'orange';
    } else if (points > 50 && points <= 70) {
        document.querySelector('.score-content img').src = 'assets/images/brain03-strength.png';
        document.querySelector('.scoreText1').innerHTML = 'Precisa de mais pratica!';
        document.querySelector('.scorePct').style.color = 'yellow';
    } else if (points > 70 && points < 100) {
        document.querySelector('.score-content img').src = 'assets/images/brain08-learning.png';
        document.querySelector('.scoreText1').innerHTML = 'Você foi muito bem!';
        document.querySelector('.scorePct').style.color = 'blue';
    } else if (points == 100) {
        document.querySelector('.score-content img').src = 'assets/images/brain09-happy.png';
        document.querySelector('.scoreText1').innerHTML = 'Vocês Zerou o Quiz';
        document.querySelector('.scorePct').style.color = '0D630D';
    }
    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;
}

function questionTimer(timer) {
    let displayTimer = document.querySelector('.timer');
    displayTimer.innerHTML = '--'
    idInterval = setInterval(() => {
        if (timer > 0) {
            displayTimer.innerHTML = timer < 10 ? '0' + timer : timer;
        } else {
            currentQuestion++;
            showQuestions();
        }

        if (timer <= 5) {
            displayTimer.classList.add('blink');
        } else {
            displayTimer.classList.remove('blink');
        }
        timer--;
    }, 1000);
}

function clearTimer() {
    clearInterval(idInterval);
}
let questions =[
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbi Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "Wes bedeutet das HTML Tag &lt;a&gt;?",
        "answer_1": "Text Fett",
        "answer_2": "Container",
        "answer_3": "Ein link",
        "answer_4": "Kursiv",
        "right_answer": 3
    },
    {
        "question": "Wie bindet man eine Website in eine Website ein",
        "answer_1": "&lt;iframe&gt;, &lt;frame&gt;, and &lt;frameset&gt;",
        "answer_2": "&lt;iframe&gt;",
        "answer_3": "&lt;frame&gt;",
        "answer_4": "&lt;frameset&gt;",
        "right_answer": 2
    },
    {
        "question": "Welches Attribut kann man NICHT für Textarea verwenden?",
        "answer_1": "readonly",
        "answer_2": "max",
        "answer_3": "from",
        "answer_4": "spellcheck",
        "right_answer": 1
    },
    {
        "question": "Wie wählst du alle Elemente vom Typ &lt;a&gt; mit dem attribut title aus?",
        "answer_1": "a[title]{...}",
        "answer_2": "a > title {...}",
        "answer_3": "a.title {...}",
        "answer_4": "a=title {...}",
        "right_answer": 1
    },
    {
        "question": "Wie definiert man in JavaScript eine Variable?",
        "answer_1": "let 100 = rate;",
        "answer_2": "100 = let rate;",
        "answer_3": "rate = 100;",
        "answer_4": "let rate =100;",
        "right_answer": 4
    },

];

let rightQuestions = 0;

let currentQuestion = 0;


function init(){
    document.getElementById('all-questions').innerHTML = questions.length;

    // Setze den Fortschritt auf 0%
    document.getElementById('progress-bar').innerHTML = `0%`;
    document.getElementById('progress-bar').style = `width: 0%;`;

    showQuestion();
}



function showQuestion() {

    if (currentQuestion >= questions.length) {
        document.getElementById('endScreen').style = '';
        document.getElementById('questionBody').style = 'display: none';

        document.getElementById('amount-of-questions').innerHTML = questions.length;
        document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
        document.getElementById('header-image').src = 'img/trophy.jpg';

        // Setze den Fortschritt auf 100% wenn alle Fragen beantwortet sind
        document.getElementById('progress-bar').innerHTML = `100%`;
        document.getElementById('progress-bar').style = `width: 100%`;

        // Spiele den Endspiel-Sound ab
        new Audio('img/gameEnd.mp3').play();

    } else {

        let percent = (currentQuestion) / questions.length; // Ändere hier zu (currentQuestion) anstatt (currentQuestion + 1)
        percent = Math.round(percent * 100);

        document.getElementById('progress-bar').innerHTML = `${percent} %`;
        document.getElementById('progress-bar').style = `width: ${percent}%;`;
        console.log('Fortschritt:', percent);
    
        let question = questions[currentQuestion];

        document.getElementById('question-number').innerHTML = currentQuestion + 1;
        document.getElementById('questiontext').innerHTML = question['question'];
        document.getElementById('answer_1').innerHTML = question['answer_1'];
        document.getElementById('answer_2').innerHTML = question['answer_2'];
        document.getElementById('answer_3').innerHTML = question['answer_3'];
        document.getElementById('answer_4').innerHTML = question['answer_4'];
    }
}





function answer(selection){
    let question = questions[currentQuestion];
    console.log('Selected answer is ',selection)
    let selectedQuestionNumber = selection.slice(-1);
    console.log('selectedQuestionNumber is ', selectedQuestionNumber);
    console.log('Current question is ', question['right_answer']);

    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if(selectedQuestionNumber == question['right_answer']) {
        console.log('Richtige Antwort!!');
        document.getElementById(selection).parentNode.classList.add('bg-success');
        rightQuestions++;

        // Spiele den Erfolgssound ab
        new Audio('img/success.mp3').play();

    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');

        // Spiele den Misserfolgssound ab
        new Audio('img/failure.mp3').play();
    }
    document.getElementById('next-button').disabled = false;
}


function playSound(soundPath) {
    let audio = new Audio(soundPath);
    audio.play();
}


function nextQuestion(){
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}
function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
    

}

function restartGame(){
    document.getElementById('header-image').src = 'img/quiz.jpg';
    document.getElementById('questionBody').style = '';
    document.getElementById('endScreen').style = 'display: none';

    rightQuestions = 0;
    currentQuestion = 0;
    init();

}
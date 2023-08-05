// Quiz questions and answers
const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        options: ["Mars", "Venus", "Jupiter", "Mercury"],
        correctAnswer: 0
    },
    {
        question: "What is the largest mammal?",
        options: ["Elephant", "Giraffe", "Blue Whale", "Hippopotamus"],
        correctAnswer: 2
    }
];

let score = 0;

// Function to display a question and get user input
function askQuestion(questionObj) {
    console.log(questionObj.question);
    questionObj.options.forEach((option, index) => {
        console.log(`${index + 1}. ${option}`);
    });

    const userAnswer = prompt("Enter the number of your answer:");
    if (parseInt(userAnswer) === questionObj.correctAnswer + 1) {
        console.log("Correct!\n");
        score++;
    } else {
        console.log("Incorrect!\n");
    }
}

// Function to start the quiz
function startQuiz() {
    console.log("Welcome to the Quiz Game!\n");
    for (let i = 0; i < questions.length; i++) {
        askQuestion(questions[i]);
    }
    console.log(`Quiz completed! Your score: ${score} out of ${questions.length}`);
}

// Start the quiz
startQuiz();

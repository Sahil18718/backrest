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


const x = 10;
let y = "hello";

function add(a, b) {
    return a + b;
}

for (let i = 0; i < 5; i++) {
    console.log("Loop iteration:", i);
}

if (x === 10) {
    console.log("x is equal to 10");
} else {
    console.log("x is not equal to 10");
}

while (y.length < 20) {
    y += "world";
}

const z = [1, 2, 3];
const doubled = z.map(item => item * 2);

const person = {
    name: "John",
    age: 30,
    city: "New York"
};

const result = add(5, 7);

function factorial(n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

console.log("Factorial of 5:", factorial(5));



document.addEventListener('DOMContentLoaded', function() {
    console.log('Document is ready!');

    const quizData = [
        {
            question: "According to the Background section, what is a major benefit of e-banking?",
            options: ["Increased security risks", "Convenience of access anytime, anywhere", "Technical challenges for users", "Limited service hours"],
            correctAnswer: "Convenience of access anytime, anywhere"
        },
        {
            question: "Which of the following is mentioned as a type of phishing attack in the Threats section?",
            options: ["Malware injection", "Denial-of-service", "SMS Phishing", "Password cracking"],
            correctAnswer: "SMS Phishing"
        },
        {
            question: "What is a significant risk associated with outdated encryption technology mentioned in the Threats section?",
            options: ["Improved system performance", "Easier access for legitimate users", "Inability to identify suspicious activity", "Automatic software updates"],
            correctAnswer: "Inability to identify suspicious activity"
        },
        {
            question: "What security measure, described in the Solutions section, requires users to provide two different authentication factors?",
            options: ["Firewall", "Encryption", "Two-Factor Authentication (2FA)", "Antivirus software"],
            correctAnswer: "Two-Factor Authentication (2FA)"
        },
        {
            question: "In the Case Study, what technology is suggested to deploy for detecting unusual spending patterns?",
            options: ["Basic password protection", "Manual transaction review", "AI-powered fraud monitoring systems", "Customer surveys"],
            correctAnswer: "AI-powered fraud monitoring systems"
        },
        {
            question: "Which electronic wallet software, mentioned in the Fun Fact section, faced issues with payment links being accidentally shared?",
            options: ["Alipay", "WeChat Pay", "PayMe", "Octopus Wallet"],
            correctAnswer: "PayMe"
        }
    ];

    const quizContainer = document.querySelector('.quiz-container');
    const questionNumberEl = document.getElementById('question-number');
    const questionTextEl = document.getElementById('question-text');
    const optionsEl = document.getElementById('options');
    const quizForm = document.getElementById('quiz-form');
    const submitButton = document.getElementById('submit-answer');
    const feedbackEl = document.getElementById('feedback');
    const nextButton = document.getElementById('next-question');
    const scoreContainer = document.getElementById('score-container');

    let currentQuestionIndex = 0;
    let score = 0;

    function loadQuestion() {
        feedbackEl.textContent = '';
        feedbackEl.className = 'feedback';
        optionsEl.innerHTML = '';
        submitButton.disabled = false;
        nextButton.style.display = 'none';
        scoreContainer.textContent = '';

        if (currentQuestionIndex >= quizData.length) {
            showFinalScore();
            return;
        }

        const currentQuestion = quizData[currentQuestionIndex];
        questionNumberEl.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
        questionTextEl.textContent = currentQuestion.question;

        currentQuestion.options.forEach((option, index) => {
            const label = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'answer';
            radio.value = option;
            radio.id = `option${index}`;
            radio.required = true;

            label.appendChild(radio);
            label.appendChild(document.createTextNode(option));
            optionsEl.appendChild(label);
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if (!selectedOption) {
            feedbackEl.textContent = 'Please select an answer.';
            feedbackEl.className = 'feedback incorrect';
            return;
        }

        const userAnswer = selectedOption.value;
        const correctAnswer = quizData[currentQuestionIndex].correctAnswer;

        document.querySelectorAll('input[name="answer"]').forEach(input => {
            input.disabled = true;
        });
        submitButton.disabled = true;

        if (userAnswer === correctAnswer) {
            feedbackEl.textContent = 'Correct!';
            feedbackEl.className = 'feedback correct';
            score++;
        } else {
            feedbackEl.textContent = `Incorrect. The correct answer was: ${correctAnswer}`;
            feedbackEl.className = 'feedback incorrect';
        }

        if (currentQuestionIndex < quizData.length - 1) {
            nextButton.textContent = 'Next Question';
        } else {
            nextButton.textContent = 'Show Results';
        }
        nextButton.style.display = 'block';
    }

    function handleNextQuestion() {
        currentQuestionIndex++;
        loadQuestion();
    }

    function showFinalScore() {
        quizForm.style.display = 'none';
        submitButton.style.display = 'none';
        nextButton.style.display = 'none';
        questionNumberEl.style.display = 'none';
        questionTextEl.textContent = 'Quiz Completed!';
        scoreContainer.textContent = `Your final score is: ${score} out of ${quizData.length}`;
    }

    if (quizContainer) {
        quizForm.addEventListener('submit', handleSubmit);
        nextButton.addEventListener('click', handleNextQuestion);
        loadQuestion();
    } else {
        console.log('Quiz container not found on this page.');
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // Plus tard, on sélectionnera dynamiquement le conteneur du quiz
    const quizPlaceholder = document.querySelector('.quiz-placeholder'); 
    const quizDataFile = quizPlaceholder ? quizPlaceholder.dataset.quizFile : null;

    if (quizPlaceholder && quizDataFile) {
        loadQuiz(quizDataFile, quizPlaceholder);
    }
});

async function loadQuiz(quizDataFile, container) {
    try {
        const response = await fetch(quizDataFile); // Suppose que le fichier quiz est dans le même dossier ou un sous-dossier relatif au fichier HTML ou à la racine.
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status} lors du chargement de ${quizDataFile}`);
        }
        const quizData = await response.json();
        
        if (quizData && quizData.length > 0) {
            startQuiz(quizData, container);
        } else {
            container.innerHTML = '<p>Quiz non disponible ou vide.</p>';
        }
    } catch (error) {
        console.error('Erreur lors du chargement du quiz :', error);
        container.innerHTML = '<p>Impossible de charger le quiz. Vérifiez la console pour plus de détails.</p>';
    }
}

function startQuiz(questions, container) {
    let currentQuestionIndex = 0;
    let score = 0;

    container.innerHTML = ''; // Vide le contenu du conteneur

    function displayQuestion() {
        if (currentQuestionIndex >= questions.length) {
            displayResults();
            return;
        }

        const questionData = questions[currentQuestionIndex];
        const questionElement = document.createElement('div');
        questionElement.classList.add('quiz-question-container');

        let choicesHTML = '';
        questionData.choices.forEach((choice, index) => {
            choicesHTML += `
                <div>
                    <input type="radio" name="choice" value="${index}" id="choice${index}">
                    <label for="choice${index}">${choice}</label>
                </div>
            `;
        });

        questionElement.innerHTML = `
            <h3>${questionData.question}</h3>
            <form id="quiz-form">
                ${choicesHTML}
                <button type="submit">Valider</button>
            </form>
            <div class="feedback" style="display:none; margin-top:10px;"></div>
        `;

        container.appendChild(questionElement);

        const form = container.querySelector('#quiz-form');
        form.addEventListener('submit', handleSubmit);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const selectedChoice = container.querySelector('input[name="choice"]:checked');
        const feedbackElement = container.querySelector('.feedback');

        if (!selectedChoice) {
            feedbackElement.textContent = 'Veuillez sélectionner une réponse.';
            feedbackElement.style.color = 'red';
            feedbackElement.style.display = 'block';
            return;
        }

        feedbackElement.style.display = 'none';
        const answerIndex = parseInt(selectedChoice.value);
        const questionData = questions[currentQuestionIndex];

        if (answerIndex === questionData.correctAnswer) {
            score++;
            feedbackElement.textContent = 'Correct ! ' + (questionData.explanation || '');
            feedbackElement.style.color = 'green';
        } else {
            const correctAnswerText = questionData.choices[questionData.correctAnswer];
            feedbackElement.textContent = `Incorrect. La bonne réponse était : "${correctAnswerText}". ` + (questionData.explanation || '');
            feedbackElement.style.color = 'red';
        }
        feedbackElement.style.display = 'block';

        // Désactive le formulaire et affiche le bouton suivant
        container.querySelectorAll('input[name="choice"]').forEach(input => input.disabled = true);
        container.querySelector('#quiz-form button[type="submit"]').style.display = 'none';
        
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Question Suivante';
        nextButton.classList.add('next-question-btn');
        nextButton.addEventListener('click', () => {
            currentQuestionIndex++;
            container.innerHTML = ''; // Vide la question courante
            displayQuestion();
        });
        container.querySelector('.quiz-question-container').appendChild(nextButton);
    }

    function displayResults() {
        const averageScore = questions.length / 2;
        const scoreColor = score > averageScore ? 'green' : '#ff6b6b'; // Vert si au-dessus de la moyenne, rouge sinon

        container.innerHTML = `
            <h2>Quiz Terminé !</h2>
            <p class="quiz-score-emphasis" style="color: ${scoreColor};">Votre score : ${score} / ${questions.length}</p>
            <button id="retake-quiz-btn">Recommencer le Quiz</button>
        `;
        container.querySelector('#retake-quiz-btn').addEventListener('click', () => {
            startQuiz(questions, container); // Relance le quiz avec les mêmes données
        });
    }

    displayQuestion();
} 
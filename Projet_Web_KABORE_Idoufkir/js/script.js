// Attend que le contenu du DOM soit entièrement chargé avant d'exécuter le script.
document.addEventListener('DOMContentLoaded', function() {
    // Gestion de la navigation mobile (menu hamburger)
    // Sélectionne la liste de navigation (ul)
    const nav = document.querySelector('nav ul');
    // Sélectionne le bouton hamburger existant
    const navToggle = document.querySelector('.nav-toggle'); 

    // Ajoute un écouteur d'événement au clic sur le bouton hamburger
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            if (nav) { // Ensure nav also exists
                nav.classList.toggle('active'); // Affiche ou cache le menu en ajoutant/supprimant la classe 'active'
                // Met à jour l'attribut ARIA 'aria-expanded' pour l'accessibilité
                const isExpanded = nav.classList.contains('active');
                navToggle.setAttribute('aria-expanded', isExpanded.toString()); // Convert boolean to string
            }
        });
    }

    // Gestion des menus déroulants pour mobile (clic au lieu de survol)
    // Sélectionne tous les éléments avec la classe 'dropdown' dans la navigation
    const dropdowns = document.querySelectorAll('nav .dropdown');
    // Vérifie si la largeur de la fenêtre est inférieure ou égale à 768px (mobile)
    if (window.innerWidth <= 768) {
        dropdowns.forEach(function(dropdown) {
            // Sélectionne le bouton du menu déroulant et son contenu
            const dropbtn = dropdown.querySelector('.dropbtn');
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            
            // Si le bouton du menu déroulant est un lien avec href="javascript:void(0)", on empêche le comportement par défaut
            if (dropbtn.tagName === 'A' && dropbtn.getAttribute('href') === 'javascript:void(0)') {
                dropbtn.addEventListener('click', function(event) {
                    event.preventDefault(); // Empêche la navigation
                    // Ferme les autres menus déroulants ouverts
                    dropdowns.forEach(dd => {
                        if (dd !== dropdown) { // Ne ferme pas le menu actuel
                            dd.classList.remove('active');
                            dd.querySelector('.dropdown-content').style.display = 'none';
                        }
                    });
                    // Affiche ou cache le menu déroulant actuel
                    dropdown.classList.toggle('active');
                    dropdownContent.style.display = dropdown.classList.contains('active') ? 'block' : 'none';
                });
            }
        });
    }

    // Met en surbrillance le lien de la page actuelle dans la navigation
    // Récupère le nom du fichier de la page actuelle depuis l'URL
    const currentPage = window.location.pathname.split('/').pop();
    // Sélectionne tous les liens de navigation
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        // Récupère le nom du fichier du lien
        const linkPage = link.getAttribute('href').split('/').pop();
        // Si le lien correspond à la page actuelle, ajoute la classe 'active'
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
        // Cas particulier pour les éléments parents de menus déroulants
        // Si le lien est dans un contenu de menu déroulant
        if (link.closest('.dropdown-content')) {
            // Sélectionne le bouton parent du menu déroulant
            const parentDropdownLink = link.closest('.dropdown').querySelector('.dropbtn');
            // Si le lien correspond à la page actuelle, ajoute la classe 'active' au bouton parent
            if (linkPage === currentPage) {
                parentDropdownLink.classList.add('active');
            }
        }
    });

    // Intersection Observer pour animer l'apparition des .overview-item
    const overviewItems = document.querySelectorAll('.overview-item');
    const observerOptions = {
        root: null, // par rapport à la fenêtre
        rootMargin: '0px',
        threshold: 0.1 // déclenche quand 10% de l'élément est visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // On n'observe qu'une fois
            }
        });
    };

    const overviewObserver = new IntersectionObserver(observerCallback, observerOptions);
    overviewItems.forEach(item => {
        overviewObserver.observe(item);
    });

    // Intersection Observer pour animer l'apparition des .content-article
    const contentArticles = document.querySelectorAll('.content-article');
    const contentArticleOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Déclenche quand 10% de l'élément est visible
    };

    const contentArticleCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Adds .visible class
                // Optionnel : animer les <li> à l'intérieur si la classe .visible est ajoutée
                const listItems = entry.target.querySelectorAll('ul > li');
                listItems.forEach((li, index) => {
                    // Appliquer un style de variable CSS pour le délai d'animation en cascade
                    li.style.setProperty('--li-index', index);
                });
                observer.unobserve(entry.target); // On n'observe qu'une fois pour cet effet
            }
        });
    };

    const contentArticleObserver = new IntersectionObserver(contentArticleCallback, contentArticleOptions);
    contentArticles.forEach(article => {
        contentArticleObserver.observe(article);
    });

    // Gestion du champ "Niveau d'étude/Poste" du formulaire de contact
    const niveauEtudeSelect = document.getElementById('niveau_etude');
    const autreNiveauEtudeDiv = document.getElementById('autre_niveau_etude_div');
    const autreNiveauEtudeInput = document.getElementById('autre_niveau_etude_specifie');

    if (niveauEtudeSelect && autreNiveauEtudeDiv && autreNiveauEtudeInput) {
        niveauEtudeSelect.addEventListener('change', function() {
            if (this.value === 'autre') {
                autreNiveauEtudeDiv.style.display = 'block';
                autreNiveauEtudeInput.setAttribute('required', ''); // Make it required if Other is selected
            } else {
                autreNiveauEtudeDiv.style.display = 'none';
                autreNiveauEtudeInput.removeAttribute('required');
                autreNiveauEtudeInput.value = ''; // Clear the input if another option is chosen
            }
        });
    }

    // --- Global Quiz Logic ---
    const globalQuizQuestions = [
        {
            question: "Qu\'est-ce que l\'Intelligence Artificielle (IA) ?",
            options: ["Une branche de l\'informatique simulant l\'intelligence humaine", "Un type de matériel informatique", "Un langage de programmation", "Un algorithme de tri"],
            answer: 0
        },
        {
            question: "Quel terme désigne la capacité d\'une machine à imiter un comportement humain intelligent au point qu\'un humain ne puisse pas le distinguer d\'un autre humain ?",
            options: ["Le Test de Turing", "L\'Apprentissage Profond", "Le Réseau de Neurones", "L\'Algorithme Génétique"],
            answer: 0
        },
        {
            question: "Lequel des domaines suivants est une application de l\'IA ?",
            options: ["La reconnaissance vocale", "La traduction automatique", "La vision par ordinateur", "Toutes ces réponses"],
            answer: 3
        },
        {
            question: "Qu\'est-ce que l\'apprentissage automatique (Machine Learning) ?",
            options: ["Une IA qui apprend sans être explicitement programmée", "Une base de données de faits", "Un robot physique", "Un logiciel de dessin"],
            answer: 0
        },
        {
            question: "Quel type d\'apprentissage automatique implique l\'utilisation de données étiquetées ?",
            options: ["Apprentissage supervisé", "Apprentissage non supervisé", "Apprentissage par renforcement", "Apprentissage profond"],
            answer: 0
        },
        {
            question: "Qu\'est-ce qu\'un réseau de neurones artificiels ?",
            options: ["Un modèle inspiré du cerveau humain", "Un circuit électronique", "Une structure de données", "Un type de capteur"],
            answer: 0
        },
        {
            question: "Quel est l\'objectif principal de l\'apprentissage par renforcement ?",
            options: ["Apprendre par essais et erreurs avec des récompenses/punitions", "Classifier des données", "Regrouper des données similaires", "Prédire une valeur continue"],
            answer: 0
        },
        {
            question: "Lequel de ces langages est couramment utilisé pour le développement en IA et Machine Learning ?",
            options: ["HTML", "CSS", "Java", "Python"],
            answer: 3
        },
        {
            question: "Qu\'est-ce que le \"Deep Learning\" (Apprentissage Profond) ?",
            options: ["Une méthode pour stocker beaucoup de données", "Une sous-catégorie du Machine Learning utilisant des réseaux de neurones profonds", "Une technique de cryptographie", "Une philosophie de l\'IA"],
            answer: 1
        },
        {
            question: "Lequel des éléments suivants est un défi éthique majeur de l\'IA ?",
            options: ["La vitesse de calcul des ordinateurs", "Le coût du matériel", "Les biais dans les données et les algorithmes", "La complexité des langages de programmation"],
            answer: 2
        }
    ];

    const startGlobalQuizButton = document.getElementById('start-quiz-global');
    const globalQuizContainer = document.getElementById('quiz-global-container');
    const globalQuizResultDiv = document.getElementById('quiz-global-result');

    let currentGlobalQuestionIndex = 0;
    let globalScore = 0;

    if (startGlobalQuizButton && globalQuizContainer && globalQuizResultDiv) {
        startGlobalQuizButton.addEventListener('click', startGlobalQuiz);
    }

    function startGlobalQuiz() {
        currentGlobalQuestionIndex = 0;
        globalScore = 0;
        globalQuizResultDiv.style.display = 'none';
        globalQuizResultDiv.innerHTML = '';
        startGlobalQuizButton.style.display = 'none'; // Hide start button immediately

        alert("Préparez-vous ! Le quiz va commencer.");

        let countdown = 5;
        globalQuizContainer.innerHTML = `<h4 class="quiz-countdown">Le quiz commence dans ${countdown} secondes...</h4>`;

        const countdownInterval = setInterval(() => {
            countdown--;
            if (countdown > 0) {
                globalQuizContainer.innerHTML = `<h4 class="quiz-countdown">Le quiz commence dans ${countdown} secondes...</h4>`;
            } else {
                clearInterval(countdownInterval);
                displayGlobalQuestion();
            }
        }, 1000);
    }

    function displayGlobalQuestion() {
        if (currentGlobalQuestionIndex < globalQuizQuestions.length) {
            const questionData = globalQuizQuestions[currentGlobalQuestionIndex];
            globalQuizContainer.innerHTML = `
                <h4>${questionData.question}</h4>
                <div class="options-container">
                    ${questionData.options.map((option, index) => `
                        <button class="option-btn" data-index="${index}">${option}</button>
                    `).join('')}
                </div>
                <div class="feedback-global" style="margin-top:10px;"></div>
            `;
            document.querySelectorAll('.option-btn').forEach(button => {
                button.addEventListener('click', selectGlobalAnswer);
            });
        } else {
            showGlobalQuizScore();
        }
    }

    function selectGlobalAnswer(event) {
        const selectedOptionIndex = parseInt(event.target.dataset.index);
        const correctAnswerIndex = globalQuizQuestions[currentGlobalQuestionIndex].answer;
        const feedbackDiv = globalQuizContainer.querySelector('.feedback-global');

        document.querySelectorAll('.option-btn').forEach(button => button.disabled = true); // Disable options after selection

        if (selectedOptionIndex === correctAnswerIndex) {
            globalScore++;
            event.target.style.backgroundColor = '#28a745'; // Green for correct
            feedbackDiv.innerHTML = '<p style="color: #28a745;">Bonne réponse !</p>';
        } else {
            event.target.style.backgroundColor = '#dc3545'; // Red for incorrect
            feedbackDiv.innerHTML = `<p style="color: #dc3545;">Mauvaise réponse. La bonne réponse était : ${globalQuizQuestions[currentGlobalQuestionIndex].options[correctAnswerIndex]}</p>`;
            // Highlight correct answer
            globalQuizContainer.querySelector(`.option-btn[data-index="${correctAnswerIndex}"]`).style.backgroundColor = '#17a2b8'; // Light blue for correct answer indication
        }

        currentGlobalQuestionIndex++;
        setTimeout(() => {
            displayGlobalQuestion();
        }, 2000); // Wait 2 seconds before next question
    }

    function showGlobalQuizScore() {
        globalQuizContainer.innerHTML = ''; // Clear question area
        globalQuizResultDiv.innerHTML = ''; // Clear previous results if any
        globalQuizResultDiv.style.display = 'block';
        startGlobalQuizButton.style.display = 'none'; // Keep start button hidden initially

        let countdown = 5;
        globalQuizResultDiv.innerHTML = `<h4 class="quiz-score-countdown">Veuillez patienter, votre score sera affiché dans ${countdown} secondes...</h4>`;

        const scoreCountdownInterval = setInterval(() => {
            countdown--;
            if (countdown > 0) {
                globalQuizResultDiv.innerHTML = `<h4 class="quiz-score-countdown">Veuillez patienter, votre score sera affiché dans ${countdown} secondes...</h4>`;
            } else {
                clearInterval(scoreCountdownInterval);
                
                const averageScore = globalQuizQuestions.length / 2;
                let scoreColorClass = globalScore < averageScore ? 'score-color-red' : 'score-color-green';

                globalQuizResultDiv.innerHTML = `
                    <h3>Quiz Terminé !</h3>
                    <p>Votre score final est de <span class="score-text-boom ${scoreColorClass}">${globalScore} sur ${globalQuizQuestions.length}</span>.</p>
                `;
                // Trigger reflow to ensure animation plays again on restart if class is re-added
                const scoreSpan = globalQuizResultDiv.querySelector('.score-text-boom');
                if (scoreSpan) {
                    scoreSpan.classList.remove('score-text-boom'); // Remove class
                    void scoreSpan.offsetWidth; // Trigger reflow
                    scoreSpan.classList.add('score-text-boom'); // Re-add class to replay animation
                }

                startGlobalQuizButton.textContent = 'Recommencer le Quiz'; 
                startGlobalQuizButton.style.display = 'block'; // Show button to restart
            }
        }, 1000);
    }
    // --- End Global Quiz Logic ---
}); 
# AI Explorer: Votre Portail sur l'Intelligence Artificielle

## Description

AI Explorer est un projet web éducatif conçu pour initier les utilisateurs aux concepts fondamentaux, à l'évolution, aux applications et aux aspects plus avancés de l'Intelligence Artificielle (IA). Le site propose un contenu structuré, des quiz interactifs pour tester les connaissances, et une interface utilisateur soignée pour une expérience d'apprentissage agréable.

## Table des Matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies Utilisées](#technologies-utilisées)
- [Structure du Projet](#structure-du-projet)
- [Installation et Lancement](#installation-et-lancement)
- [Comment Naviguer](#comment-naviguer)
- [Auteurs](#auteurs)
- [Objectif de Conformité](#objectif-de-conformité)
- [Maquette du Site](#maquette-du-site)

## Fonctionnalités

*   **Pages de Contenu Détaillées :**
    *   Les Bases de l'IA : Définitions, Machine Learning, Deep Learning.
    *   Évolution et Tendances : Histoire de l'IA, tendances actuelles et futures.
    *   IA pour les Experts : Concepts techniques, algorithmes, frameworks.
    *   Applications de l'IA : Sections dédiées à la Vision par Ordinateur, NLP, Machine Learning, Robotique, Systèmes Experts, et Technologies Vocales.
*   **Quiz Interactifs :**
    *   Quiz spécifiques à chaque section de contenu pour renforcer l'apprentissage.
    *   Un Quiz Global couvrant l'ensemble des sujets du site.
    *   Feedback immédiat sur les réponses.
    *   Countdown et affichage du score animé pour le quiz global.
*   **Jeu Interactif :** Un mini-jeu "Cette image est-elle réalisée par une IA ?" sur la page Quiz Central.
*   **Navigation Intuitive :**
    *   Menu de navigation clair avec un menu déroulant pour les applications.
    *   Design responsive pour une bonne expérience sur mobile et bureau.
*   **Page "À Propos" :** Informations sur le projet et les auteurs.
*   **Formulaire de Contact :** Permet aux utilisateurs d'envoyer des messages (avec une fonctionnalité de champ "Autre" dynamique pour le niveau d'étude/poste).
*   **Effets Visuels Modernes :**
    *   Animations de scroll pour l'apparition des sections de contenu.
    *   Effets de survol sur les images et les cartes.
    *   Fond parallax subtil.

## Technologies Utilisées

*   **HTML5 :** Pour la structure sémantique des pages web.
*   **CSS3 :** Pour le style, la mise en page, les animations et le design responsive.
    *   Utilisation de Flexbox et Grid pour la mise en page.
    *   Variables CSS, transitions, animations (keyframes).
*   **JavaScript (ES6+) :** Pour l'interactivité, la manipulation du DOM, et la logique des quiz et du formulaire.
    *   Gestionnaires d'événements.
    *   Intersection Observer API pour les animations au scroll.
    *   Logique de quiz (affichage des questions, évaluation des réponses, score).
    *   Fonctionnalité du formulaire de contact dynamique.

## Structure du Projet

```
Projet_Web_KABORE_Idoufkir/
├── applications/           # Pages HTML pour les différentes applications de l'IA
│   ├── machine_learning_app.html
│   ├── nlp.html
│   ├── robotique.html
│   ├── systemes_experts.html
│   ├── vision.html
│   └── voix.html
├── css/
│   └── style.css           # Feuille de style principale
├── data/                   # Fichiers JSON pour les données des quiz (hypothétique, non géré activement par l'assistant)
│   ├── quiz_bases.json
│   ├── ... (autres fichiers quiz JSON)
├── images/                 # Contient toutes les images utilisées dans le projet
│   ├── logo.jpeg
│   ├── icon1.png - icon4.png
│   ├── b0.png - b20.jpg (et autres images de contenu)
│   └── m1.png, n1.png, n2.png, r1.png, r2.png, r3.png, v1.png, v2.png
├── js/
│   ├── script.js           # Scripts JavaScript principaux (navigation, animations, quiz global, formulaire)
│   └── quiz.js             # Scripts pour la gestion des quiz spécifiques aux pages (chargement depuis JSON)
├── videos/
│   └── presentation.mp4    # Vidéo de présentation du projet
├── index.html              # Page d'accueil
├── a_propos.html           # Page "À Propos"
├── bases_ia.html           # Page sur les bases de l'IA
├── evolution_tendances.html # Page sur l'évolution et les tendances
├── ia_experts.html         # Page pour les experts en IA
├── quiz_central.html       # Page centrale des quiz
├── quiz-global.html        # Page pour le quiz global
└── README.md               # Ce fichier
```

## Installation et Lancement

Ce projet est un site web statique. Pour le visualiser :

1.  Clonez ou téléchargez le dépôt/dossier du projet sur votre machine locale.
2.  Ouvrez le dossier `Projet_Web_KABORE_Idoufkir`.
3.  Ouvrez le fichier `index.html` dans votre navigateur web préféré.

Aucune installation de serveur ou de dépendances complexes n'est nécessaire.

## Comment Naviguer

*   Utilisez la barre de navigation en haut de chaque page pour accéder aux différentes sections du site.
*   Le menu "Applications" est un menu déroulant qui donne accès aux pages détaillées sur les applications spécifiques de l'IA.
*   La page "Quiz Central" liste tous les quiz disponibles et permet d'accéder au Quiz Global.
*   Des liens "En savoir plus" ou "Commencer le quiz" vous guideront vers le contenu pertinent.

## Auteurs

*   **KABORE Juvénis**
*   **IDOUFKIR Marouane**

Projet réalisé dans le cadre d'un projet web.

## Objectif de Conformité

Un effort a été fait pour tendre vers la conformité avec les standards du W3C pour HTML et CSS, afin d'assurer une meilleure accessibilité et maintenabilité.

## Maquette du Site

La maquette initiale et le wireframing du site peuvent être consultés sur Miro :
[Voir la maquette sur Miro](https://miro.com/app/board/uXjVI1SDPFs=/?share_link_id=273045494969) 

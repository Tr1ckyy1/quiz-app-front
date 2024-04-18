# Quiz Wiz - Frontend

Welcome to the Quiz Wiz frontend repository! This repository contains the frontend codebase for the Quiz Wiz application, providing users with an interactive quiz-taking experience.

## Overview

Quiz Wiz is an interactive quiz application designed to offer users a fun and engaging way to test their knowledge across various categories and difficulty levels. Users can participate in quizzes either as guests or by creating an account. Registered users have the advantage of tracking their progress, viewing detailed quiz results, and the limitation of taking each quiz only once to ensure fairness. Guests, on the other hand, can take quizzes as many times as they like without their progress being saved.

## Features

- **User Authentication**: Register, login, forgot-password, and reset-password functionalities.
- **Quiz Filtering**: Users can filter quizzes by categories, difficulty levels.
- **Sorting Options**: Quizzes can be sorted by newest, oldest, popularity, alphabetical order (A-Z), and reverse alphabetical order (Z-A).
- **Performance Tracking**: Logged-in users can see their quiz attempts, including points scored and time spent on each quiz. Each quiz can only be taken once by registered users.
- **Guest Mode**: Guests can take quizzes multiple times without their progress being saved.

## Technologies Used

- **Vue.js (Options API)**: A progressive JavaScript framework for building user interfaces.
- **Vue Router**: The official router for Vue.js applications.
- **Vuex**: A state management pattern and library for Vue.js applications.
- **Axios**: A promise-based HTTP client for making HTTP requests from the browser.
- **VeeValidate**: A form validation library for Vue.js.
- **Yup**: A JavaScript schema builder for value parsing and validation.
- **Tailwind Scrollbar**: A custom scrollbar plugin for Tailwind CSS.

## Recommended IDE Setup

We recommend using Visual Studio Code (VSCode) with the Volar extension for an optimized Vue development experience. Please disable the Vetur extension if you have it installed.

## Project Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/RedberryInternship/front-quizwiz-omar-jangavadze
   ```

2. Install dependencies:

```sh
npm install
```

## Development

```sh
npm run dev
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### BACKEND

<a href="https://github.com/RedberryInternship/api-quizwiz-omar-jangavadze">Quizwiz Backend</a>

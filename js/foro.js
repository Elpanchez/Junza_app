document.addEventListener('DOMContentLoaded', () => {
    const questionForm = document.getElementById('questionForm');
    const questionsContainer = document.getElementById('questions');

    questionForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('questionTitle').value;
        const content = document.getElementById('questionContent').value;
        const author = document.getElementById('questionAuthor').value;

        const questionId = Date.now();  // Usar timestamp como ID único

        addQuestion(questionId, title, content, author);

        // Limpiar el formulario
        questionForm.reset();
    });

    function addQuestion(id, title, content, author) {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.setAttribute('data-id', id);

        const questionTitle = document.createElement('h2');
        questionTitle.textContent = title;

        const questionContent = document.createElement('p');
        questionContent.textContent = `${author}: ${content}`;

        const responsesDiv = document.createElement('div');
        responsesDiv.classList.add('responses');
        responsesDiv.setAttribute('id', `responses-${id}`);

        const responseForm = document.createElement('form');
        responseForm.classList.add('responseForm');
        responseForm.setAttribute('data-id', id);
        responseForm.innerHTML = `
            <input type="text" class="responseAuthor" placeholder="Tu nombre" required>
            <textarea class="responseContent" placeholder="Tu respuesta" required></textarea>
            <button type="submit">Responder</button>
        `;

        responseForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const responseAuthor = responseForm.querySelector('.responseAuthor').value;
            const responseContent = responseForm.querySelector('.responseContent').value;

            addResponse(id, responseAuthor, responseContent);

            responseForm.reset();
        });

        questionDiv.appendChild(questionTitle);
        questionDiv.appendChild(questionContent);
        questionDiv.appendChild(responsesDiv);
        questionDiv.appendChild(responseForm);

        questionsContainer.appendChild(questionDiv);

        saveQuestion(id, title, content, author);
    }

    function addResponse(questionId, author, content) {
        const responseDiv = document.createElement('div');
        responseDiv.classList.add('response');

        const responseContent = document.createElement('p');
        responseContent.textContent = `${author}: ${content}`;

        responseDiv.appendChild(responseContent);

        const responsesDiv = document.getElementById(`responses-${questionId}`);
        responsesDiv.appendChild(responseDiv);

        saveResponse(questionId, author, content);
    }

    function saveQuestion(id, title, content, author) {
        const questions = JSON.parse(localStorage.getItem('questions')) || [];
        questions.push({ id, title, content, author });
        localStorage.setItem('questions', JSON.stringify(questions));
    }

    function saveResponse(questionId, author, content) {
        const responses = JSON.parse(localStorage.getItem('responses')) || {};
        if (!responses[questionId]) {
            responses[questionId] = [];
        }
        responses[questionId].push({ author, content });
        localStorage.setItem('responses', JSON.stringify(responses));
    }

    function loadQuestions() {
        const questions = JSON.parse(localStorage.getItem('questions')) || [];
        questions.forEach(question => {
            addQuestion(question.id, question.title, question.content, question.author);
        });
    }

    function loadResponses() {
        const responses = JSON.parse(localStorage.getItem('responses')) || {};
        for (const questionId in responses) {
            responses[questionId].forEach(response => {
                addResponse(questionId, response.author, response.content);
            });
        }
    }

    loadQuestions();
    loadResponses();
});

document.getElementById('home').addEventListener('click', function() {
    window.location.href = 'interfaz.html';
});
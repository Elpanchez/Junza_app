function toggleAnswer(element) {
    const answer = element.nextElementSibling;
    const allAnswers = document.querySelectorAll('.faq-answer');
    
    allAnswers.forEach((ans) => {
        if (ans !== answer) {
            ans.style.display = 'none';
        }
    });

    answer.style.display = (answer.style.display === 'block') ? 'none' : 'block';
}
document.getElementById('home').addEventListener('click', function() {
    window.location.href = 'interfaz.html';
});

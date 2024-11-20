import { endScore } from './timer.js';

// Function to fetch and display scores
// Created by/with the help of OpenAI (2024)
function fetchScores() {
    fetch('/get_scores')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#scoreboard tbody');
            if (!tableBody) {
                console.error('Table body not found. Make sure the HTML structure is correct.');
                return;
            }
            tableBody.innerHTML = ''; // Clear existing scores
            data.forEach(score => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${score.ranking}</td><td>${score.name}</td><td>${score.score}</td>`;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching scores:', error));
}

// Function to handle form submission
// Created by/with the help of OpenAI (2024)
function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const score = endScore;

    fetch('/submit_name', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, score: score })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);

        // Clear the form fields and hide the form
        const form = document.getElementById('form');
        form.reset();
        form.style.display = 'none';

        // Hide the timer 
        // Show the play again button and scoreboard after submit
        const timer = document.getElementById('timer');
        const scoreboard = document.getElementById('scoreboard-container');
        const playagain = document.getElementById('playagain');
        
        timer.style.display = 'none';
        scoreboard.style.display = 'block'; 
        playagain.style.display = 'block';

        // Fetch and update the scoreboard
        fetchScores(); 
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    fetchScores(); // Fetch and fill scoreboard

    const form = document.getElementById('form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    } else {
        console.error('Form element not found.');
    }
});

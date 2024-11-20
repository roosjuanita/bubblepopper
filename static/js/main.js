// Initialization after DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {

    // Initialize needed DOM elements
    let startbutton = document.getElementById('startbutton');
    let infobutton = document.getElementById('infobutton');
    let infotext = document.getElementById('infotext');
    let scoreboard = document.getElementById('scoreboard-container');
    let footer = document.getElementById('footer');
    let playagain = document.getElementById('playagain');
    let highscores = document.getElementById('highscores');
    const audio = document.getElementById('audio');

    // When user hovers over infobutton show and unshow infotext
    infobutton.addEventListener('mousemove', () => {
        infotext.style.display = 'block'
    });

    infobutton.addEventListener('mouseout', () => {
        infotext.style.display = 'none'
    });

    // When user clicks on the highscores button, 
    // everything on the start screen is hidden and you see the scoreboard screen
    highscores.addEventListener('click', () => {
        audio.play(); // Play bubble sound
        startbutton.style.display = 'none';
        infobutton.style.display = 'none';
        infotext.style.display = 'none';
        footer.style.display = 'none';
        highscores.style.display= 'none';
        scoreboard.style.display= 'block';
        playagain.style.display= 'block';
    });

});

const button = document.getElementById('playagain');
const audio = document.getElementById('audio');

button.addEventListener('click', () => {
    audio.play(); // Play bubble sound
    setTimeout(() => {  // Play background sound with delay
        location.reload()
    }, 300); // Delay of 100 milliseconds
});
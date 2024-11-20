import { end } from './circles.js'

export var endScore;

document.addEventListener('DOMContentLoaded', function() {
const button = document.getElementById("startbutton");
const playagain = document.getElementById('playagain');
const container = document.getElementsByClassName("container");
const sound = document.getElementById("audio");
const gameover = document.getElementById("gameover");
const form = document.getElementById("form");
var timer = document.getElementById('timer');

button.addEventListener('click', () => {

    // Set the expiry time for 10 seconds from now
    var expires = +new Date() + 10000;

    // Define and immediately invoke the update function
    // Created by/with the help of OpenAI (2024)
    (function update() {
        var now = +new Date();
        var togo = expires - now;
        
        if (togo > 0 && !end) {
            timer.innerHTML = togo;
            window.requestAnimationFrame(update);
            if(togo < 3000 && togo > 2000){
                timer.style.fontSize = "1.8rem";
            }else if (togo < 2000 && togo > 1000){
                timer.style.fontSize = "2.2rem";
            }else if (togo < 1000){
                timer.style.fontSize = "3rem";
            };
        }else if(togo > 0 && end){
            timer.innerHTML = togo;
            endScore = togo;
            console.log('endscore is', endScore);
            timer.style.fontSize = "5rem";
            timer.style.top = '30%';
            form.style.display = "block";
        }else {
            timer.innerHTML = 0; 
            setTimeout(() => {
                sound.play();
                endScore = 0;
                console.log('game over');
                playagain.style.display = 'block';
                container[0].style.display = 'none';
                timer.style.display = 'none'
                gameover.style.display = 'block';
            }, 10);
        }
    })(); 
});

});

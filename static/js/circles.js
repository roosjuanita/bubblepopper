export var end = false;

document.addEventListener('DOMContentLoaded', function() {
    const startbutton = document.getElementById("startbutton");
    const audio = document.getElementById("audio");
    const circles = Array.from(document.getElementsByClassName("circle"));
    const backAud = document.getElementById("background-audio");
    const footer = document.getElementById("footer");
    const infobutton = document.getElementById("infobutton");
    const highscores = document.getElementById("highscores");
    
    let soundEnabled = false; // If the user clicked the first button, this will be true, and we can play sounds
    let circleCount = 0; // keeps track of the amount of hidden circles

    // Set volume to 30% (0.3)
    audio.volume = 0.3;

    // Animation for when the circles are hidden
    const circleAnimation = [
        { radius: 5, fill: "yellow" },
        { radius: 10, fill: "pink" }
    ];

    // Add event listener for enabling animation on start button click
    startbutton.addEventListener('click', () => {
        audio.play();
        footer.style.display = "none"; // Hide the footer when clicked
        startbutton.style.display = "none"; // Hide the start button when clicked
        infobutton.style.display = "none"; // Hide the info button when clicked
        highscores.style.display = "none"; // Hide the high scores when clicked
        soundEnabled = true;
        backAud.play();

        // THE CIRCLES APPEAR //

        // Function to calculate dynamic delay
        const calculateDelay = (index) => {
            // Adjust the factor (0.9) to control the speed increase
            return 1500 * Math.pow(0.9, index);
        };

        circles.forEach((circle, index) => {
            // Delay each circle's appearance with dynamically calculated delay
            setTimeout(() => {
                circle.style.display = "inline-block";
            }, calculateDelay(index));
        });

    });

    // THE GAME - THE CIRCLES ARE HIDDEN //

    // Add event listener for mouseover to start animation and sound for each circle
    circles.forEach(circle => {
        circle.addEventListener('mouseover', function() {
            if (soundEnabled) {
                playSound();
                playAnimation(circle);
            }
        });
    });

    // Play sound with a delay of 300 milliseconds
    function playSound() {
        audio.currentTime = 0; // Reset audio to beginning
        setTimeout(() => {
            audio.play()
        }, 300); // Delay of 300 milliseconds
    }

    // Play animation sequence once for each circle
    function playAnimation(circle) {
        let circleIndex = 0;

        function updateCircle() {
            if (circleIndex < circleAnimation.length) {
                const newCircleProps = circleAnimation[circleIndex];
                circle.setAttribute("fill", newCircleProps.fill);
                circle.setAttribute("r", newCircleProps.radius);
                circleIndex++;
                setTimeout(updateCircle, 150); // Continue updating circle with delay
            } else {
                // Reset circle animation index after completing sequence
                circleIndex = 0;
                circleCount++;
                circle.style.display = "none";
                checkEnd();
            };
        };
        updateCircle(); // Start the sequence
    };

    // Checks (when circleCount is more than 21) if all the circles are hidden
    function checkEnd () {
        if (circleCount >= circles.length) {
            for (let i = 0; i < 22; i++) {
                if (circles[i].style.display == 'none') {
                    if (i == 21) { // If so: the game is finished
                        end = true; 
                    };
                } else {
                    break; // If not: the game continues
                }
            };
        };
    }

});

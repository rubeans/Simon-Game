var buttonColours = ["red", "blue", "green", "yellow"]

var gamePattern = []
var userClickedPattern = []

var started = false
var level = 0

// when pressed a key on keyboard
$(document).keydown(function () {
    if (!started) { // MESMO QUE "started === false" 
        $("#level-title").text("Level " + level)
        nextSequence()
        started = true
    }
})

// when clicked
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id")

    userClickedPattern.push(userChosenColour)
    //console.log(userClickedPattern)

    playSound(userChosenColour)

    animatePress(userChosenColour)

    //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length - 1)
    //length começa contando a partir de 1 e o index começa a partir de 0, então length-1 é o equivale ao ultimo index da array já que o length sempre vai ser 1 a mais que o index.
})

// check answer
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {
        console.log("wrong")

        playSound("wrong")

        $("body").addClass("game-over")

        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200)

        $("h1").text("Game Over, Press Any Key to Restart")

        startOver()
    }

}

// next sequence
function nextSequence() {

    //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = []

    level++

    $("#level-title").text("Level " + level)

    var randomNumber = Math.floor(Math.random() * buttonColours.length)

    var randomChosenColour = buttonColours[randomNumber]

    gamePattern.push(randomChosenColour)

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour)

    checkAnswer(randomChosenColour)
}

// start over 
function startOver() {
    level = 0
    gamePattern = []
    started = false
}

// sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play()
}

// animation
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    }, 100)
}

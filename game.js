const buttonColours = ["red", "blue", "green", "yellow"]

let gamePattern = []
let userClickedPattern = []

let started = false;
let level = 0

$(document).keypress(function () {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });


//--CLICKS--
$(".btn").click(function () {
    let userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)
 
    playSound(userChosenColour);
    animatePress(userChosenColour);

    let flashClass = $(this);
    flashClass.addClass("pressed");
    setTimeout(function () {
        flashClass.removeClass("pressed");
    }, 100);

    checkAnswer(userClickedPattern.length - 1)
})

//--CHECK ANSWER
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 500);
        }

    } else {
        console.log("wrong");
        const audio = new Audio(`sounds/wrong.mp3`)
        audio.play()

        let wrongClass = $("body");
        wrongClass.addClass("game-over");
        setTimeout(function () {
            wrongClass.removeClass("game-over ");
        }, 200);

        $("h1").text("Game Over! Press any Key to Restart.")

        startOver();
    }
}


//--RANDOM--
function nextSequence() {
    userClickedPattern = []

    level++;
    $("#level-title").text("Level " + level);

    let ranNum = Math.floor(Math.random() * 4)
    let randomChosenColour = buttonColours[ranNum]
    gamePattern.push(randomChosenColour);

    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour)
}

//--REFACTOR--
function playSound(name) {
    const audio = new Audio(`sounds/${name}.mp3`)
    return audio.play()
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

  function startOver(){

    level = 0;
    gamePattern = [];
    started = false;

  }











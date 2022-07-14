
var buttonColours = ['red','blue','green','yellow'];
var gamePattern = [];
var userClikedPattern = [];
var gameStarted = 0;
var level=0;
$(document).on('keydown',function(){
  if(!gameStarted){
    gameStarted=1;
    $("h1").text("level "+level);
    nextSequence();
  }
});

function nextSequence(){
  level=level+1;
  $("h1").text("level "+level);
  var randomNumber  = Math.floor(4*Math.random(4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
$(".btn").on("click",function(){
  var userChosenColour = $(this).attr("id");
  animatePress(userChosenColour);
  userClikedPattern.push(userChosenColour);
  playSound(userChosenColour);
  var latestIndex = userClikedPattern.length-1;
  checkAnswer(latestIndex);
});


function playSound(name){
  var audio = new Audio("sounds/" + name +".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  var delay = 100;
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },delay);
}


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]==userClikedPattern[currentLevel]){
    if(level-1 == currentLevel){
      userClikedPattern.length=0;
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{

      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
  }
}

function startOver(){
  level=0;
  gameStarted=0;
  userClikedPattern.length=0;
  gamePattern.length=0;

}

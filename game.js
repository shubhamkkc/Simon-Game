var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];
$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
   animatePress(userChosenColor);
   checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern=[];
    var randomNumber=Math.trunc(Math.random()*4);
var randomChosenColor=buttonColors[randomNumber];
gamePattern.push(randomChosenColor);
level++;
$("h1").text("Level "+(level));
$("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColor);

}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");},100);
    
}
var level=0;
var started=false;


$(document).on("keypress",function(){
    if(!started)
    {
        $("h1").text("Level "+(level));
        nextSequence();
        started=true;}
    });
    function startOver(){
        level=0;
        gamePattern=[];
        started=false;
    }
function checkAnswer(currentLevel){
if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
{
    console.log("true");
    if(gamePattern.length===userClickedPattern.length)
    {
    setTimeout(function(){
    nextSequence();},1000);
    }

}

    else
    {
    console.log("false");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");},200);
    
    $("h1").text("Game Over, Press Any Key TO Restart");
   startOver();

    }
}

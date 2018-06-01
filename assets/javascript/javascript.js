$(document).ready(function () {

/*     var questions = {
        Q1: ["question #1", ["option1","option2","option3"], 0],
        Q2: ["question #2", ["option1","option2","option3"], 1],
    }; */

    function timer () {
        var currentTime = 30;
        $("#timer").text("Time remaining: " + currentTime);

        setInterval(function() {
            currentTime--;
            $("#timer").text("Time remaining: " + currentTime);
        }, 1000);
    }

    $("#startButton").on("click", function() {

        /* kill the header and show the game board. */
        $("#gameArea").show();
        $("#header").hide();

        /* Start the timer */
        timer();



        console.log("test");
    });

});
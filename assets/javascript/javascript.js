$(document).ready(function () {

    var questions = {
        Q1: ["question #1", true],
        Q2: ["question #2", false],
    };

    function timer() {

        /* Set the timer at zero and print it in the appropriate div */
        var currentTime = 10;
        $("#timer").text("Time remaining: " + currentTime);

        /* Every second, decrement the time remaining by one, print to div. */
            timerInterval = setInterval(function () {

            currentTime--;
            $("#timer").text("Time remaining: " + currentTime);

            /* Stop the timer at zero */
            if (currentTime === 0) {
                answerScreen();
            }

        }, 1000);

    };

    function answerScreen(inputAnswer) {

        /* Stop the timer */
        clearInterval(timerInterval);

        /* Show the answer area */
        $("#gameArea").hide();
        $("#answerArea").show();

        if (questions[thisQuestion][1] === inputAnswer) {
            $("#correctOrIncorrect").text("Nice! You got it right!");
        } else {
            $("#correctOrIncorrect").text("Wrong!");
        }

        $("#correctAnswer").text(questions[thisQuestion][1]);

    };

    function nextQuestion() {
        $("#gameArea").show();
        $("#answerArea").hide();
        timer();
        $("#question").text(questions[randomQuestion()][0]);
    }


    var questionsAsked = [0];
    var qNumber = 0;
    var thisQuestion;

    function randomQuestion() {
        while (questionsAsked.length < Object.keys(questions).length + 1 && questionsAsked.includes(qNumber)) {
            console.log("test");
            qNumber = Math.ceil(Math.random() * Object.keys(questions).length);
        }
        questionsAsked.push(qNumber);
        thisQuestion = "Q" + qNumber;
        console.log(qNumber);
        return thisQuestion;
    }



    $("#startButton").on("click", function () {

        /* kill the header and show the game board. */
        $("#gameArea").show();
        $("#header").hide();

        /* Start the timer and add the first question */
        timer();
        $("#question").text(questions[randomQuestion()][0]);

    });

    $("#gameArea > .row > .col > #trueButton").on("click", function() {
        answerScreen(true);
    });

});
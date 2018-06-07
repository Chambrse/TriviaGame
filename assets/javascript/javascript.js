$(document).ready(function () {

    /* Number of correct and incorrect answers */
    var correctNumber = 0;
    var incorrectNumber = 0;

    /*  */
    var questionsAsked = [0];
    var qNumber = 0;
    var thisQuestion;

    function restart() {
        correctNumber = 0;
        incorrectNumber = 0;
        questionsAsked = [0];
        qNumber = 0;
        thisQuestion = '';

        $("#endArea").hide();
        $("#gameArea").show();

        timer();
        $(".question").html("<h3>" + questions[randomQuestion()][0] + "</h3>");

    };

    /* The questions */
    var questions = {
        Q1: ["'The Incredible Hulk' was the first official film in the Marvel Cinematic Universe.", true],
        Q2: ["Captain America's shield and Black Panther's suit are made of adamantium.", false],
        Q3: ["The power source of Iron Man's suit is called a tesseract.", false],
        Q4: ["The names of the infinity stones are as follows: Space Stone, Power Stone, Reality Stone, Time Stone, Mind Stone, Soul Stone.", true],
        Q5: ["The technology that allows Ant-Man to change size is called the PYM particle.", true],
        Q6: ["The Hulk gained his powers from a botched form of the super-soldier serum that was given to Captain America.", true],
        Q7: ["Thor's hammer, Mjolnir, can only be wielded by himself.", false],
        Q8: ["Star Lord is able to harness the power stone briefly without exploding because he is half celestial.", true],
        Q9: ["In the guardians of the galaxy, Rocket uses a prosthetic leg to help the team escape from prison.", false],
        Q10: ["At the end of The Avengers, the team gets some pizza together after the battle of New York.", false],
        Q11: ["'Knowhere' is a city built inside the giant head of a dead celestial being.", true],
        Q12: ["Nebula and Gamora have cybornetic enhancements provided to them by S.H.I.E.L.D. in order to save their lives.", false],
    };

    function timer() {

        /* Set the timer at zero and print it in the appropriate div */
        var currentTime = 10;
        $(".timer").html("<h4>" + "Time remaining: " + currentTime + "<h4>");

        /* Every second, decrement the time remaining by one, print to div. */
        timerInterval = setInterval(function () {

            currentTime--;
            $(".timer").html("<h4>" + "Time remaining: " + currentTime + "<h4>");

            /* Stop the timer at zero */
            if (currentTime === 0) {
                answerScreen(0);
            }

        }, 1000);

    };

    /* Pick a random question from the remaining questions */
    function randomQuestion() {

        /* Keep picking random numbers until you get one that has not already been used */
        while (questionsAsked.length < Object.keys(questions).length + 1 && questionsAsked.includes(qNumber)) {
            qNumber = Math.ceil(Math.random() * Object.keys(questions).length);
        }

        /* If there are no questions left return -1 */
        if (questionsAsked.length === Object.keys(questions).length + 1) {
            return -1;

            /* mark the question as used, and return the key to the appropriate question. */
        } else {
            questionsAsked.push(qNumber);
            thisQuestion = "Q" + qNumber;
            return thisQuestion;
        }
    };

    /* Get the new question and show it, resart timer */
    function nextQuestion() {
        questionNumber = randomQuestion();
        if (questionNumber === -1) {
            endScreen();
        } else {
            $("#gameArea").show();
            $("#answerArea").hide();
            timer();
            $(".question").html("<h3>" + questions[questionNumber][0] + "</h3>");
        };
    }

    /* Show the response to the user input */
    function answerScreen(inputAnswer) {

        /* Stop the timer */
        clearInterval(timerInterval);

        /* Show the answer area */
        $("#gameArea").hide();
        $("#answerArea").show();

        /* incorrect if the time is up */
        if (inputAnswer === 0) {
            $("#correctOrIncorrect").html("<h3>" + "Time's up!" + "</h3>");
            incorrectNumber++;
        }

        /* correct if you're right */
        else if (questions[thisQuestion][1] === inputAnswer) {
            $("#correctOrIncorrect").html("<h3>" + "Nice! You got it right!" + "</h3>");
            correctNumber++;

            /* incorrect if you're wrong */
        } else {
            $("#correctOrIncorrect").html("<h3>" + "Wrong!" + "</h3>");
            incorrectNumber++;
        }

        /* Show the right answer */
        $("#correctAnswer").html("<h4>" + "Correct answer: " + questions[thisQuestion][1] + "</h4>");

        /* wait 3 seconds, then go to the next question */
        setTimeout(function () {
            nextQuestion();
        }, 3000);

    };

    /* At the end of the game, display the number of questions correct and incorrect */
    function endScreen() {
        $("#correctNumber").html("<h3>" + "Correct Answers: " + correctNumber + "</h3>");
        $("#incorrectNumber").html("<h3>" + "Incorrect Answers: " + incorrectNumber + "</h3>");
        $("#answerArea").hide();
        $("#endArea").show();
    };

    $("#startButton").on("click", function () {

        /* kill the header and show the game board. */
        $("#gameArea").show();
        $("#header").hide();

        /* Start the timer and add the first question */
        timer();
        $(".question").html("<h3>" + questions[randomQuestion()][0] + "</h3>");

    });

    $("#gameArea > .row > .col > #trueButton").on("click", function () {
        answerScreen(true);
    });

    $("#gameArea > .row > .col > #falseButton").on("click", function () {
        answerScreen(false);
    });

    $("#restart").on("click",function() {
        restart();
    });

});
$(document).ready(function(){

    var questionList = [
        {
            question: 'What Country is directly North of Paraguay?',
            answer: ['Uruguay','Colombia','Bolivia','Guyana'],
            correctAnswer: 2,
            photo: 'assets/images/bolivias.jpg'
        },
        {
            question: 'What organization elects the 15 judges of the World Court?',
            answer: ['The United Nations','The Supreme Court','The European Union','The Soviet Union'],
            correctAnswer: 0,
            photo: 'assets/images/un.png'
        },
        {
            question: 'What is the largest city in the world?',
            answer: ['New York','Mumbai','Beijing','Tokyo'],
            correctAnswer: 3,
            photo: 'assets/images/tokyo.jpg'
        },
        {
            question: 'What country is Petra in?',
            answer: ['Iran','Jordan','Iraq','Saudi Arabia'],
            correctAnswer: 1,
            photo: 'assets/images/jordan.jpg'
        },
    ];
    var timer = 30;
    var playerGuess = '';
    var pickedQuestion;
    var totalCorrect = 0;
    var totalWrong = 0;
    var unanswered = 0;
    var count = questionList.length;
    var newList= [];
    var newArr = [];
    var index;
    var timerRunning = false;
    var intervalId;


    $("#restart").hide();
    // Start Button
    $('#start').on('click', function(){
        $('#start').hide();
        showQuestion();
        timerStart();
        for(var i = 0; i < questionList.length; i++) {
            newList.push(questionList[i]);
        } 
    })

    // Question randomly picked and posted to html
    function showQuestion() {
        index = Math.floor(Math.random() * questionList.length);
        pickedQuestion = questionList[index];

        //display answers
        $("#question").html(pickedQuestion.question);
        for(var i = 0; i < pickedQuestion.answer.length; i++) {
            var chosenAnswer = $("<div>");
            chosenAnswer.addClass('answerChoice');
            chosenAnswer.html(pickedQuestion.answer[i]);
            //assign array position
            chosenAnswer.attr("data-guessvalue", i);
            $("#answers").append(chosenAnswer);
        }
    
        // select answer
        $('.answerChoice').on('click', function(){
            playerGuess = parseInt($(this).attr('data-guessvalue'));
            //compares chosen answer to correct answer
            if (playerGuess === pickedQuestion.correctAnswer) {
                totalCorrect++;
                playerGuess='';
                $("#answers").html("Correct!" + "<br>");
                showPicture();
            } else {
                totalWrong++;
                playerGuess='';
                $("#answers").html("Wrong!" + "<br>");
                showPicture();
            }
        })
    }

    //Show Picture
    function showPicture() {
        // timer to show pic
        $('#answers').append('<img src=' + pickedQuestion.photo + '>');
        newArr.push(pickedQuestion);
        questionList.splice(index,1);
        var hide = setTimeout(() => {
            $('#answers').empty();
            timer = 30;

            //score screen
            if ((totalWrong + totalCorrect + unanswered) === count) {
                $("#question").empty();
                $("#question").html("Game Over!  Here's how you did: ");
                $("#answers").append("Correct: " + totalCorrect + '<br>');
                $("#answers").append("Incorrect: " + totalWrong + '<br>');
                $("#answers").append("Unanswered: " + unanswered + '<br>');
                $("#restart").show();
                totalCorrect = 0;
                totalCorrect = 0;
                unanswered = 0;
        
            } else {
                timerStart();
                showQuestion();
        
            }
            }, 3000);
    }

    // Timer counts down 30sec
   function timerStart() {
        if (!timerRunning) {
            intervalId = setInterval(decrement, 1000); 
            timerRunning = true;
        }
   }

   function decrement() {
	$("#timer").html("Time remaining: " + timer);
        timer--;

        //stop timer if reach 0
        if (timer === 0) {
            unanswered++;
            //stop();
            $("#answers").html("Time is up!"  + '<br>');
            showPicture();
        }
    }

    //reset game
    $("#restart").on("click", function() {
        $("#restart").hide();
        $("#answers").empty();
        $("#question").empty();
        for(var i = 0; i < newList.length; i++) {
            questionList.push(newList[i]);
        }
        timerStart();
        showQuestion();
    })
});
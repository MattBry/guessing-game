$(document).ready(function() {

	guessHistory = [];
	guessCount = -1;
	magicNumber = numberPicker();


    function numberPicker(){
    magicNumber = Math.floor((Math.random() * 100) + 1);
    return magicNumber;
	}

	function fail() {
		$('.guess').addClass('failure');
		$('.guess').children().eq(0).text(magicNumber);
		$('.guess').children().eq(1).text("failure");
		$('.guess').children().eq(0).addClass('failure-number');
		$('.guess').children().eq(1).addClass('failure-thermal');
		$('.guess').children().eq(0).removeClass('button-text');
		$('.guess').removeClass('guess');
	}

	function succeed() {
		$('.guess').addClass('success');
		$('.guess').children().eq(0).text(magicNumber);
		$('.guess').children().eq(1).text("success");
		$('.guess').children().eq(0).addClass('success-number');
		$('.guess').children().eq(1).addClass('success-thermal');
		$('.guess').children().eq(0).removeClass('button-text');
		$('.guess').removeClass('guess');
	}

	function validator(num) {
	guess = parseInt(num);
    if (guess % 1 !== 0 || guess < 1 || guess > 100 || isNaN(guess)) {
        alert("Invalid guess! Choose a whole number between 1 and 100.");
        return false;
        }   
    else if (guessHistory.indexOf(guess) !== -1 ){
        alert(guess + " has been guessed before. You are a bad guesser.");
        return false;
        }
    //if guess is valid, add it to history
    else {
    	guessHistory.push(guess);
    	guessCount += 1;
    	if (guessHistory.length === 5 && guess !== magicNumber) {
    		fail();
    	}
    }
}
	function temperatureTaker(num){
	guess = parseInt(num);
	if (guess == magicNumber) {
		return 'success'
	}
    else if (Math.abs(magicNumber - guess) > 80) {
        return 'frigid';
    }
    else if (Math.abs(magicNumber - guess) > 60) {
        return 'cold';
    }
    else if (Math.abs(magicNumber - guess) > 40) {
        return 'cool'
    }
    else if (Math.abs(magicNumber - guess) > 30) {
        return 'lukewarm'
    }
    else if (Math.abs(magicNumber - guess) > 20) {
        return 'warm'
    }
    else if (Math.abs(magicNumber - guess) > 7) {
        return 'hot'
    }
    else {
        return 'scorching'
    }
}

function directionTaker(num) {
    guess = parseInt(num);
    if (guess == magicNumber) {
    	return "";
    }
    else if (Math.abs(magicNumber - guess) === magicNumber - guess) {
        return "\u2227";
        }
    else {
        return "\u2228";
    }
}

	$('.guess').on('mouseenter', function(){
		$('.guess').removeClass('button');
		$('.guess').addClass('guess-lit');
	})
		$('.guess').on('mouseleave', function(){
		$('.guess').removeClass('guess-lit');
		$('.guess').addClass('button');
	})

	$('.fail').on('mouseenter', function(){
		$('.fail').removeClass('button');
		$('.fail').addClass('fail-lit');
	})
		$('.fail').on('mouseleave', function(){
		$('.fail').removeClass('fail-lit');
		$('.fail').addClass('button');
	})

	$('.reset').on('mouseenter', function(){
		$('.reset').removeClass('button');
		$('.reset').addClass('reset-lit');
	})
		$('.reset').on('mouseleave', function(){
		$('.reset').removeClass('reset-lit');
		$('.reset').addClass('button');
	})

	$('.guess').on('click', function() {
		theGuess = $('.box').val();
		validity = validator(theGuess);
		if (validity === false) {
			alert("this should halt function");
			return false;
		}
		directional = directionTaker(theGuess);
		thermal = temperatureTaker(theGuess);
		if (parseInt(theGuess) == magicNumber) {
			alert("correct");
			succeed();
		}
		else {
			alert("incorrect");
		$('.bubbles').children().eq(guessCount).addClass(thermal);
		$('.history-number').eq(guessCount).text(theGuess);
		$('.history-thermal').eq(guessCount).text(thermal + " " + directional);
		}
	})
	$('.reset').on('click', function() {
		magicNumber = numberPicker();
		theGuess = undefined;
		thermal = undefined;
		guessCount = -1;
		guessHistory = [];
		$('.bubbles').children().removeClass();
		$('.bubbles').children().addClass('bubble');
		$('.history-number').empty();
		$('.history-thermal').empty();
		$('.failure').addClass('guess');
		$('.success').addClass('guess');
		$('.guess').removeClass('success failure');
		$('.guess').removeClass('success failure');
		$('.guess').children().eq(0).text("Guess!");
		$('.guess').children().eq(0).addClass('button-text');
		$('.guess').children().eq(0).removeClass('success-number failure-number');
		$('.guess').children().eq(1).text("");
		$('.guess').children().eq(1).removeClass('success-thermal failure-thermal');
	})
	$('.fail').on('click', function() {
		fail();
	})
});
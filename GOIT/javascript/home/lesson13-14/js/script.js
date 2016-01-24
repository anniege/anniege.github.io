(function() {

var rightAnswers;
var createRightAnswersDB = function(test) {
		var answersObject = {};
		test.questions.forEach(function(question, index) {
			answersObject["question"+index] = question.trueValue;
		});
		return answersObject;
}

var checkAnswers = function(e) {
	var e = e&&event || event.srcElement;
	e.preventDefault();
	var userAnswers = {};
	var inputs = document.querySelectorAll('[type="checkbox"]:checked');
	console.log(inputs);
		var i;
		var arr;
	[].forEach.call(inputs, function(item){
		console.log(item);
		if (!userAnswers[item.name]) {
		i=0;
		arr= [];
		arr[i] = +item.value;
		// console.log(arr[i], ' --- ', i);
		userAnswers[item.name] = arr;
	} else {
		++i;
		arr[i] = +item.value;
		// console.log(arr[i], ' --- ', i);
		userAnswers[item.name] = arr;
	}
	});
	// console.log(arr);

	var flag = true;
	var errorMessage;
	var correctMessage = 'You won!';
	console.log(userAnswers);
	console.log(rightAnswers);

	for(var rightAnswer in rightAnswers) {

		if (rightAnswer in userAnswers) {
				console.log('rightAnswers[rightAnswer] ', rightAnswers[rightAnswer]);
				console.log('userAnswers[rightAnswer] ', userAnswers[rightAnswer]);
			if (!(rightAnswers[rightAnswer] === userAnswers[rightAnswer])) {
				flag = false;
				errorMessage = "Your answers were not all correct.";
			}
		} else {
			flag = false;
			errorMessage = "You didn't answer on all questions.";
		}
	}

(!flag) ? alert(errorMessage + '\nYou loose!') : alert(correctMessage);
	return false;
}

var render = function(test) {
	//render via template
	var target = document.getElementById("resultTest");
	var testFunc = _.template(document.getElementById("test").innerHTML);
	target.innerHTML = testFunc(test);
	return test;
}

var clearStorage = function() {
	localStorage.clear();
}


var doTest = function() {
	
	try {
		//parse from localStorage
		var test = JSON.parse(localStorage.test);

		render(test);

		//add event on submit
		rightAnswers = createRightAnswersDB(test);
		var sbmtButton = document.querySelector('[type="submit"]');
		sbmtButton.addEventListener('click', checkAnswers);
	} catch(e) {
		console.log('e = ', e);
	}
}

document.addEventListener('DOMContentLoaded', doTest);
document.addEventListener('beforeunload', clearStorage);

})();

(function() {


var answers;
var createAnswersDB = function() {
		var answersObject = {};
		testData.questions.forEach(function(question, index) {
			answersObject["question"+index] = question.trueValue;
		});
		console.log('', answersObject);
		return answersObject;
}

var checkAnswers = function(e) {
	var e = e&&event || event.srcElement;
	e.preventDefault();

	var form = document.querySelectorAll('[type="checkbox"]:checked');
	// ;
	console.log('checkbox = ', form);

	return false;
}

var loadTest = function() {
	var test = JSON.parse(localStorage.test);
	console.log('test = ', test);
			// answers = createAnswersDB();

		var target = document.getElementById("resultTest");
		// console.log('target ', target);
		var test = _.template(document.getElementById("test").innerHTML);
		// console.log('test ', test);
		target.innerHTML = test(testData);
		var sbmtButton = document.querySelector('[type="submit"]');
		// console.log(sbmtButton);
		sbmtButton.addEventListener('click', checkAnswers);
}

var clearStorage = function() {
	localStorage.clear();
}

document.addEventListener('DOMContentLoaded', loadTest);
document.addEventListener('beforeunload', clearStorage);

})();

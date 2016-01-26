(function() {
"use strict";

var body = document.querySelector('body');
var rightAnswers;


function render(test) {
	var target = document.getElementById("resultTest");
	var testFunc = _.template(document.getElementById("test_Id").innerHTML);
	target.innerHTML = testFunc(test);
	return test;
}


function createModal() {
	var modal = document.createElement('div');
	var modalInner = document.createElement('div');
	var modalClose = document.createElement('a');
	var modalTitle = document.createElement('h2');
	var modalResult = document.createElement('p');
	var btnClose = document.createElement('button');
		
		modal.classList.add('modal');
		modalInner.classList.add('modal-inner');
		modalTitle.classList.add('modal_title');
		modalResult.classList.add('modal_result');
		btnClose.classList.add('modal_button');
		modalClose.classList.add('modal_close');
		
		modalTitle.innerHTML = "Результат теста";
		modalResult.innerHTML = "Количество правильных ответов - ";
		btnClose.innerHTML = "Закрыть";
		modalClose.href ="#close";
		modalClose.title="Закрыть";
		modalClose.innerHTML = "X";

	var targetNode = document.querySelector('.test_list');
	var cloneItem = targetNode.cloneNode(true);
	var inputs = cloneItem.querySelectorAll('.wrapper .test_item_question');
	[].forEach.call(inputs, function(input) {
		input.setAttribute('disabled', 'disabled');
	});
	var liItems = cloneItem.querySelectorAll('.test_item');
	[].forEach.call(liItems, function(liItem) {
		liItem.classList.add('item--modified');
	});

	modalInner.appendChild(modalTitle);
	modalInner.appendChild(modalResult);
	modalInner.appendChild(cloneItem);
	modalInner.appendChild(btnClose);
	modalInner.appendChild(modalClose);
	modal.appendChild(modalInner);
	body.appendChild(modal);
	body.classList.add('hide');
	btnClose.addEventListener('click', closeModal);
	modalClose.addEventListener('click', closeModal);
}


function showModal() {
	var modal = document.querySelector('.modal');
	modal.setAttribute('style', 'display:block;');
}


function closeModal() {
	body.classList.remove('hide');

	var modal = document.querySelector('.modal');
	if (modal) body.removeChild(modal);

	var inputsChecked = document.querySelectorAll('.wrapper .test_item_question:checked');
	[].forEach.call(inputsChecked, function(inputChecked) {
		inputChecked.checked = false;
	});
}


function createRightAnswersDB(test) {
	var answersObject = {};
	test.questions.forEach(function(question, index) {
		answersObject["question"+index] = question.trueValue;
	});
	return answersObject;
}


function checkAnswers(e) {
	var e = e&&event || event.srcElement;
	e.preventDefault();

	//create the elements of modal
	createModal();

	//create user answers database
	var userAnswers = {};
	var inputsChecked = document.querySelectorAll('.wrapper .test_item_question:checked');
	var tempAnswerArr;
	[].forEach.call(inputsChecked, function(inputChecked) {
		if (!userAnswers[inputChecked.name]) {
		tempAnswerArr= [];
		tempAnswerArr.push(+inputChecked.value);
		userAnswers[inputChecked.name] = tempAnswerArr;
		} else {
			tempAnswerArr.push(+inputChecked.value);
			userAnswers[inputChecked.name] = tempAnswerArr;
		}
	});
	//compare the user answers with right answers
	var counterOfRightAnswers = 0; 
	var modal = document.querySelector('.modal');

	for (var rightQuestion in rightAnswers) {
		//array of right answers
		var rightList = rightAnswers[rightQuestion];
		//length of array of right answers
		var rightListLength = rightAnswers[rightQuestion].length;
		//select all checkboxes by key(question) from right answers database
		var inputsRightQuestion = modal.querySelectorAll('input[name="'+ rightQuestion +'"]');

		//if user answered on proper question
		if (rightQuestion in userAnswers) {
				//array of user answers
				var userList = userAnswers[rightQuestion];
				//length of array of user answers
				var userListLength = userAnswers[rightQuestion].length;
				var counterFlag = true;
				//loop through the 2 arrays of right and user answers with comparing 
				for (var j = 0; j < rightListLength; j++) {
					var flag = false;
					for (var i = 0; i < userListLength; i++) {
						if (rightList[j] === userList[i]) {
							inputsRightQuestion[userList[i]].parentNode.classList.add('correct');
							flag = true;
						} 
					}
					if (!flag) {	
						inputsRightQuestion[rightList[j]].parentNode.classList.add('correct--missed');
						counterFlag = false;
					} 
				}
				//if all answers were correct
				if (counterFlag) ++counterOfRightAnswers;
				//highlight the incorrect user answers
				for (var i = 0; i < userListLength; i++) {
					if (!inputsRightQuestion[userList[i]].parentNode.classList.contains('correct')) {
						inputsRightQuestion[userList[i]].parentNode.classList.add('incorrect');
					}	
				}
		} else {
			//highlight the correct answers missed by user
			for (var j=0; j<rightListLength; j++) {
				inputsRightQuestion[rightList[j]].parentNode.classList.add('correct--missed');
			}
		}
	}
	//add the result message in modal
	var result = document.querySelector('.modal_result');
	if (counterOfRightAnswers === 5) {
		result.classList.add('modal_result_success');
		result.innerHTML += counterOfRightAnswers + ". ТЕСТ ПРОЙДЕН."; 
	} else {
		result.innerHTML += counterOfRightAnswers + ". ТЕСТ НЕ ПРОЙДЕН."; 
	}
	//show the modal 
	showModal();
	return false;
}


function clearStorage() {
	window.localStorage.clear();
}


function doTest() {
	try {
		//parse from localStorage
		var test = JSON.parse(localStorage.test);

		//render data from localStorage
		render(test);

		//create right answers database
		rightAnswers = createRightAnswersDB(test);

		//add event on test submit
		var sbmtButton = document.querySelector('[type="submit"]');
		sbmtButton.addEventListener('click', checkAnswers);
	} catch(e) {
		console.log('error = ', e);
	}
}

document.addEventListener('DOMContentLoaded', doTest);
// document.addEventListener('beforeunload', clearStorage);
})();

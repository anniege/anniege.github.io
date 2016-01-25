(function() {
"use strict";

var body = document.querySelector('body');
var rightAnswers;

function render(test) {
	var target = document.getElementById("resultTest");
	var testFunc = _.template(document.getElementById("test").innerHTML);
	target.innerHTML = testFunc(test);
	return test;
}

function createModal() {
	var modal = document.createElement('div');
	var modalInner = document.createElement('div');
	var close = document.createElement('a');
	var modalTitle = document.createElement('h2');
	var modalResult = document.createElement('p');
	var btnClose = document.createElement('button');
		
		modal.classList.add('modal');
		modalInner.classList.add('modal-inner');
		modalTitle.classList.add('modalTitle');
		modalResult.classList.add('modalResult');
		btnClose.classList.add('modalButton');
		close.classList.add('modalClose');
		
		modalTitle.innerHTML = "Результаты теста";
		modalResult.innerHTML = "Количество правильных ответов - ";
		btnClose.innerHTML = "Закрыть";
		close.href ="#close";
		close.title="Закрыть";
		close.innerHTML = "X";

	var targetNode = document.querySelector('.content ul');
	var cloneItem = targetNode.cloneNode(true);
	var inputs = cloneItem.querySelectorAll('input');
	[].forEach.call(inputs, function(inpt) {
		inpt.setAttribute('disabled', 'disabled');
	});
	var lis = cloneItem.querySelectorAll('.test_item');
	[].forEach.call(lis, function(liItem) {
		liItem.classList.add('item--modified');
	});

	modalInner.appendChild(modalTitle);
	modalInner.appendChild(modalResult);
	modalInner.appendChild(cloneItem);
	modalInner.appendChild(close);
	modalInner.appendChild(btnClose);
	modal.appendChild(modalInner);
	body.appendChild(modal);
	body.classList.add('hide');
	btnClose.addEventListener('click', closeModal);
	close.addEventListener('click', closeModal);
}

function showModal() {
	var modal = document.querySelector('.modal');
	modal.setAttribute('style', 'display:block;');
}

function closeModal() {
	var modal = document.querySelector('.modal');
	if (modal) body.removeChild(modal);
	body.classList.remove('hide');
	var inputs = document.querySelectorAll('.wrapper [type="checkbox"]:checked');
	[].forEach.call(inputs, function(input) {
		input.checked = false;
	});
}

function clearStorage() {
	localStorage.clear();
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

	createModal();
	var userAnswers = {};
	var inputs = document.querySelectorAll('.wrapper [type="checkbox"]:checked');
		var arr;
	[].forEach.call(inputs, function(item){
		if (!userAnswers[item.name]) {
		arr= [];
		arr.push(+item.value);
		userAnswers[item.name] = arr;
	} else {
		arr.push(+item.value);
		userAnswers[item.name] = arr;
	}
	});

	var modal = document.querySelector('.modal');
	var counter = 0; 
	for (var rightQuestion in rightAnswers) {
		var rightList = rightAnswers[rightQuestion];
		var rightListLength = rightAnswers[rightQuestion].length;
		var questionNumber = +rightQuestion.slice(-1);
		var itemLi = modal.querySelectorAll('input[name="'+ rightQuestion +'"]');
		if (rightQuestion in userAnswers) {
				var userList = userAnswers[rightQuestion];
				var userListLength = userAnswers[rightQuestion].length;
				var counterFlag = true;
				for (var j=0; j<rightListLength; j++) {
				var flag = false;
						for (var i=0; i<userListLength; i++) {
							if (rightList[j] === userList[i]) {
								itemLi[userList[i]].parentNode.classList.add('correct');
								flag = true;
								continue;
							} 
						}
						if (!flag) {	
							itemLi[rightList[j]].parentNode.classList.add('correct--missed');
							counterFlag = false;
						} 
				}
				if (counterFlag) ++counter;
				for (var i=0; i<userListLength; i++) {
							if (!itemLi[userList[i]].parentNode.classList.contains('correct')) {
								itemLi[userList[i]].parentNode.classList.add('incorrect');
							}	
				}

		} else {
			for (var j=0; j<rightListLength; j++) {
			itemLi[rightList[j]].parentNode.classList.add('correct--missed');
		}
		}
	}

	var result = document.querySelector('.modalResult');
	result.innerHTML += counter; 
	showModal();
	return false;
}

function doTest() {
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

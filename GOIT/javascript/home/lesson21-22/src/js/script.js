var app = function() {

	var body = document.querySelector('body');
	var test;



	var render =  function (test) {
		var target = document.getElementById("resultTest");
		var testFunc = _.template(document.getElementById("test_Id").innerHTML);
		target.innerHTML = testFunc(test);
		return test;
	}



	var getUserAnswers = function (items) {
		var result = [];

		[].forEach.call(items, function (item) {
			var index = +item.name.slice(8);
			if (result[index]) {
				result[index].push(+item.value);
			} else {
				result[index] = [+item.value];
			}
		});
		return result;
	}



	var createModal = function() {
		var modal = document.createElement('div');
		var modalInner = document.createElement('div');
		var modalClose = document.createElement('a');
		var modalTitle = document.createElement('h2');
		var modalResult = document.createElement('p');
		var btnClose = document.createElement('button');
			
			modal.classList.add('modal');
			modalInner.classList.add('modal-inner');
			modalTitle.classList.add('modal__title');
			modalResult.classList.add('modal__result');
			btnClose.classList.add('modal__button');
			modalClose.classList.add('modal__close');
			
			modalTitle.innerHTML = "Результат теста";
			modalResult.innerHTML = "Количество правильных ответов - ";
			btnClose.innerHTML = "Закрыть";
			modalClose.href ="#close";
			modalClose.title="Закрыть";
			modalClose.innerHTML = "X";

		var targetNode = document.querySelector('.test__list');
		var cloneItem = targetNode.cloneNode(true);
		var liItems = cloneItem.querySelectorAll('.test__i');
		[].forEach.call(liItems, function(liItem) {
			liItem.classList.add('test__i--modified');
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



	var showModal = function () {
		var modal = document.querySelector('.modal');
		modal.setAttribute('style', 'display:block;');
	}



	var checkAnswers = function(e) {
		e.preventDefault();
		var flag;
		var counterRightAnswer = 0; 
		var userAnswers = getUserAnswers(document.querySelectorAll('.wrapper .test__i__question:checked'));
		var rightAnswers = test.questions;
		createModal();

		var modalQuestions = document.querySelectorAll('.modal .test__i');
		[].forEach.call(rightAnswers, function(answer, i) {
				var arrCorrect = answer.trueValue;
				var out = modalQuestions[i].querySelectorAll('label');

				var arrUser = userAnswers[i];
				if (arrUser) {
					flag = true;
					arrCorrect.forEach(function(elem){
						if (arrUser.indexOf(elem) >= 0) {
							out[+elem].classList.add('test__i__label--correct');
						} else {
							out[+elem].classList.add('test__i__label--correct-missed');
							flag = false;
						}
					});

					// modalQuestions[i].querySelectorAll('label:not([class ~= test__i__label]) input:checked').parentNode.classList.add('test__i__label--incorrect');
					if (flag && (arrUser.length === arrCorrect.length)) ++counterRightAnswer;
				}
		});

		var result = document.querySelector('.modal__result');
		if (counterRightAnswer === Object.keys(rightAnswers).length) {
			result.classList.add('modal__result__success');
			result.innerHTML += counterRightAnswer + ". ТЕСТ ПРОЙДЕН."; 
		} else {
			result.innerHTML += counterRightAnswer + ". ТЕСТ НЕ ПРОЙДЕН."; 
		}
		showModal();
	}



	function closeModal() {
		body.classList.remove('hide');

		var modal = document.querySelector('.modal');
		if (modal) body.removeChild(modal);

		var inputsChecked = document.querySelectorAll('.wrapper .test__item__question:checked');
		[].forEach.call(inputsChecked, function(inputChecked) {
			inputChecked.checked = false;
		});
	}



	var doTest = function () {

		//parse from localStorage
		test = JSON.parse(localStorage.test);

		//render data from localStorage
		render(test);

		//add event on test submit
		var sbmtButton = document.querySelector('[type="submit"]');
		if (sbmtButton) sbmtButton.addEventListener('click', checkAnswers);
	}



	return {
		getResult : doTest
	}

}();

module.exports = app;

document.addEventListener('DOMContentLoaded', app.getResult);


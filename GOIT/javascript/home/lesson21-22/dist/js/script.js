"use strict";

var app = {
	test: null,

	render: function render(test) {
		var target = document.getElementById("resultTest");
		var testFunc = _.template(document.getElementById("test_Id").innerHTML);
		target.innerHTML = testFunc(test);
		return test;
	},
	getUserAnswers: function getUserAnswers(items) {
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
	},
	createModal: function createModal(self) {
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
		modalClose.href = "#close";
		modalClose.title = "Закрыть";
		modalClose.innerHTML = "X";

		var targetNode = document.querySelector('.test__list');
		var cloneItem = targetNode.cloneNode(true);
		var liItems = cloneItem.querySelectorAll('.test__i');

		if (!NodeList.prototype[Symbol.iterator]) NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = liItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var liItem = _step.value;

				liItem.classList.add('test__i--modified');
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		modalInner.appendChild(modalTitle);
		modalInner.appendChild(modalResult);
		modalInner.appendChild(cloneItem);
		modalInner.appendChild(btnClose);
		modalInner.appendChild(modalClose);
		modal.appendChild(modalInner);
		document.body.appendChild(modal);
		document.body.classList.add('hide');
		btnClose.addEventListener('click', self.closeModal);
		modalClose.addEventListener('click', self.closeModal);
	},
	showModal: function showModal() {
		var modal = document.querySelector('.modal');
		modal.setAttribute('style', 'display:block;');
	},
	checkAnswers: function checkAnswers(e) {
		e.preventDefault();
		var flag = undefined;
		var counterRightAnswer = 0;
		var userAnswers = this.getUserAnswers(document.querySelectorAll('.wrapper .test__i__question:checked'));
		var rightAnswers = this.test.questions;
		var _this = this;
		this.createModal(_this);

		var modalQuestions = document.querySelectorAll('.modal .test__i');

		[].forEach.call(rightAnswers, function (answer, i) {
			var arrCorrect = answer.trueValue;
			var out = modalQuestions[i].querySelectorAll('label');

			var arrUser = userAnswers[i];
			if (arrUser) {
				flag = true;
				arrCorrect.forEach(function (elem) {
					if (arrUser.includes(elem)) {
						out[+elem].classList.add('test__i__label--correct');
					} else {
						out[+elem].classList.add('test__i__label--correct-missed');
						flag = false;
					}
				});

				if (flag && arrUser.length === arrCorrect.length) ++counterRightAnswer;
			}
		});

		var result = document.querySelector('.modal__result');
		if (counterRightAnswer === Object.keys(rightAnswers).length) {
			result.classList.add('modal__result__success');
			result.innerHTML += counterRightAnswer + ". ТЕСТ ПРОЙДЕН.";
		} else {
			result.innerHTML += counterRightAnswer + ". ТЕСТ НЕ ПРОЙДЕН.";
		}
		this.showModal();
	},
	closeModal: function closeModal() {
		document.body.classList.remove('hide');

		var modal = document.querySelector('.modal');
		if (modal) document.body.removeChild(modal);

		var inputsChecked = document.querySelectorAll('.wrapper .test__item__question:checked');
		[].forEach.call(inputsChecked, function (inputChecked) {
			inputChecked.checked = false;
		});
	},
	doTest: function doTest() {

		//parse from localStorage
		this.test = JSON.parse(localStorage.test);

		//render data from localStorage
		this.render(this.test);

		//add event on test submit
		var sbmtButton = document.querySelector('[type="submit"]');
		if (sbmtButton) sbmtButton.addEventListener('click', this.checkAnswers.bind(this));
	},
	init: function init() {
		document.addEventListener('DOMContentLoaded', this.doTest.bind(this));
	}
};

app.init();

try {
	module.exports = app;
} catch (e) {}
let app =  {
	test: null,

	render(test) {
		let target = document.getElementById("resultTest");
		let testFunc = _.template(document.getElementById("test_Id").innerHTML);
		target.innerHTML = testFunc(test);
		return test;
	},


	getUserAnswers(items) {
		let result = [];

		[].forEach.call(items, 
			(item) => 
			{
				let index = +item.name.slice(8);
				if (result[index]) {
					result[index].push(+item.value);
				} else {
					result[index] = [+item.value];
				}

			});
		return result;
	},


	createModal(self) {
		let modal = document.createElement('div');
		let modalInner = document.createElement('div');
		let modalClose = document.createElement('a');
		let modalTitle = document.createElement('h2');
		let modalResult = document.createElement('p');
		let btnClose = document.createElement('button');
			
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

		let targetNode = document.querySelector('.test__list');
		let cloneItem = targetNode.cloneNode(true);
		let liItems = cloneItem.querySelectorAll('.test__i');

		if (!NodeList.prototype[Symbol.iterator])
		NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

		for (let liItem of liItems) {
			liItem.classList.add('test__i--modified');
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


	showModal() {
		let modal = document.querySelector('.modal');
		modal.setAttribute('style', 'display:block;');
	},


	checkAnswers(e) {
		e.preventDefault();
		let flag;
		let counterRightAnswer = 0; 
		let userAnswers = this.getUserAnswers(document.querySelectorAll('.wrapper .test__i__question:checked'));
		let rightAnswers = this.test.questions;
		let _this = this;
		this.createModal(_this);

		let modalQuestions = document.querySelectorAll('.modal .test__i');

		[].forEach.call(rightAnswers, (answer, i) => {
				let arrCorrect = answer.trueValue;
				let out = modalQuestions[i].querySelectorAll('label');

				let arrUser = userAnswers[i];
				if (arrUser) {
					flag = true;
					arrCorrect.forEach( (elem) => {
						if (arrUser.includes(elem)) {
							out[+elem].classList.add('test__i__label--correct');
						} else {
							out[+elem].classList.add('test__i__label--correct-missed');
							flag = false;
						}
					});

					if (flag && (arrUser.length === arrCorrect.length)) ++counterRightAnswer;
				}
		});

		let result = document.querySelector('.modal__result');
		if (counterRightAnswer === Object.keys(rightAnswers).length) {
			result.classList.add('modal__result__success');
			result.innerHTML += counterRightAnswer + ". ТЕСТ ПРОЙДЕН."; 
		} else {
			result.innerHTML += counterRightAnswer + ". ТЕСТ НЕ ПРОЙДЕН."; 
		}
		this.showModal();
	},


	closeModal() {
		document.body.classList.remove('hide');

		let modal = document.querySelector('.modal');
		if (modal) document.body.removeChild(modal);

		let inputsChecked = document.querySelectorAll('.wrapper .test__item__question:checked');
		[].forEach.call(inputsChecked, (inputChecked) => {
			inputChecked.checked = false;
		});
	},


	doTest() {

		//parse from localStorage
		this.test = JSON.parse(localStorage.test);

		//render data from localStorage
		this.render(this.test);

		//add event on test submit
		let sbmtButton = document.querySelector('[type="submit"]');
		if (sbmtButton) sbmtButton.addEventListener('click', this.checkAnswers.bind(this));
	},

	init() {
		document.addEventListener('DOMContentLoaded', this.doTest.bind(this));
	}
}


app.init();

try {
	module.exports = app;
} catch (e) {

} 





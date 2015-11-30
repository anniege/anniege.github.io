( function() {
	do {
		var num = prompt('Введите число или нажмите ESC:');

		var myPow = function(number) {
			if (!isNaN(number)) {
				return number*number;
			} else return -1;
		}

		var number = myPow(+num);
		if ((num !== null)&&(num !== "")) {
			number>= 0 ? console.log("Результат " + num+ "x" + num + "=" + myPow(num)) : console.log("Вы ввели некорректные дааные.");
		}
	} while (((num !== null)&&(num !== "")));

	console.log('Вы вышли из программы.');

})();

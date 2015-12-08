( function() {
	var num,
			exp,
			result;

	do {
		num = prompt('Введите число или нажмите ESC:');
		exp = prompt('Введите степень или нажмите ESC:');

		var checkInput = function(inputValue) {
			if (inputValue !== null) {
				 return true;
			} else {
				 return false;
			}
		}

		var myPow = function(number, n) {
			var temp = 1;
				if (!isNaN(number) && !isNaN(n)) {
					for (var i = 0; i < Math.abs(n); i++) {
						temp = temp*number;
					}
					if (n >= 0) {
							return temp;
					} else {
							return 1/temp;
					}
				} else return -1;
		}

		if (checkInput(num) && checkInput(exp)) {
			result = myPow(parseInt(num), parseInt(exp));
			result >= 0 ? console.log("Результат " + parseInt(num) + " в степене " + parseInt(exp) + " = " + result) : console.log("Вы ввели некорректные дааные.");
		} else { break; }

		var conf = confirm('Хотите продолжить?');
	} while (conf);

	console.log('Вы вышли из программы.');

})();

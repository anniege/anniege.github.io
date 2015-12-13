(function(){

	var startButton = document.querySelector('.start'),
		stopButton = document.querySelector('.stop'),
		hours = document.querySelector('.hours'),
		min = document.querySelector('.minutes'),
		sec = document.querySelector('.sec'),
		millisec = document.querySelector('.millisec');


	var Timer =  function() {
		var timerId;
		var counter = {
				hours: 0,
				minutes: 0,
				seconds: 0,
				millisec: 0
		}

		var flag = true;

		function calc() {
			counter.millisec++;
			counter.millisec = counter.millisec % 1000;
			if ((counter.millisec%1000) === 0) {
				counter.seconds++;
				if (counter.seconds === 60) {
					counter.seconds = 0;
					counter.minutes++;
					if (counter.minutes === 60) {
						counter.minutes = 0;
						counter.hours++;
					}
				}
			}
			drawCounter();
		}

		function drawCounter () {
			millisec.innerHTML = counter.millisec;
			if (counter.seconds < 10) {
				sec.innerHTML = '0' + counter.seconds;
			} else {
				sec.innerHTML = counter.seconds;
			}

			if (counter.minutes < 10) {
				min.innerHTML ='0'+ counter.minutes;
			} else {
				min.innerHTML = counter.minutes;
			}
		}

		function clearCounter() {
			for (i in counter) {
				counter[i] = 0;
			}
			drawCounter ();
		}

		this.startTimer = function () {
			if (flag) {
				timerId = setInterval(calc, 1);
				flag = false;
				startButton.innerHTML = 'pause';
				if (startButton.classList.contains('button-warning')) {
					startButton.classList.remove('button-warning');
				}
				startButton.classList.add('button-success');
				
			} else {
				clearInterval(timerId);
				startButton.innerHTML = "cont..";
				startButton.classList.remove('button-success');
				startButton.classList.add('button-warning');
				flag = true;
			}
		};

		this.stopTimer = function () {
			clearInterval(timerId);
			clearCounter();
			startButton.innerHTML = "start";
			if (startButton.classList.contains('button-warning')) {
				startButton.classList.remove('button-warning');
			}
			if (startButton.classList.contains('button-success')) {
				startButton.classList.remove('button-success');
			}
			flag = true;
		}

	}

	var myTimer = new Timer();

	startButton.addEventListener('click', myTimer.startTimer);
	stopButton.addEventListener('click', myTimer.stopTimer);
})();

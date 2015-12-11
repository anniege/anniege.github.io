(function(){

	var startButton = document.querySelector('.start'),
		stopButton = document.querySelector('.stop'),
		hours = document.querySelector('.hours'),
		min = document.querySelector('.minutes'),
		sec = document.querySelector('.sec'),
		millisec = document.querySelector('.millisec');


	var Timer =  function() {
		var timerId;
		var j = 0;
		var counter = {
				hours: 0,
				minutes: 0,
				seconds: 0,
				millisec: 0
		}

		var flag = true;

		function calc() {
			j++;
			counter.millisec = j % 1000;
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
				timerId = setInterval(calc, 0);
				flag = false;
				startButton.innerHTML = 'pause';
			} else {
				clearInterval(timerId);
				startButton.innerHTML = "cont..";
				flag = true;
			}
		};

		this.stopTimer = function () {
			clearInterval(timerId);
			clearCounter();
			startButton.innerHTML = "start";
		}

	}

	var myTimer = new Timer();

	startButton.addEventListener('click', myTimer.startTimer);
	stopButton.addEventListener('click', myTimer.stopTimer);
})();
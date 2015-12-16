(function(){

	var startButton = document.querySelector('.start'),
		stopButton = document.querySelector('.stop'),
		time = document.querySelector('.time'),
		millisec = document.querySelector('.millisec');


	var Timer =  function() {
		var timerId,
			startDate,
			startflag,
			pauseflag,
			counterMs,
			currentDate,
			flag = true;

		function formatTime(msValue) {
			var timeStr = new Date(msValue).toUTCString().replace(/.*([0-9][0-9]:[0-9][0-9]:[0-9][0-9]).*/,'$1');
			var msStr = String(msValue%1000);
			while (msStr.length < 3) {
				msStr = '0' + msStr;
			}
			return {
						timeString: timeStr,
						millisecString: msStr 
					};
		}

		function calcMillisec() {
			counterMs = currentDate - startDate;
			return counterMs;
		}

		function drawTime() {
			var deltaMs = calcMillisec();
			var resultStr = formatTime(deltaMs);
			time.innerHTML = resultStr.timeString;
			millisec.innerHTML = resultStr.millisecString;
		}

		function clearCounter() {
			currentDate = startDate;
			drawTime();
		}


		this.startTimer = function () {
			if (flag) {
				if (!startflag) {
					startDate = new Date;
					startflag = true;
				} 

				if (pauseflag) {
					current = currentDate - new Date;
					startDate = new Date(startDate.getTime() - current);
				}

				timerId = setTimeout(function run() {
					currentDate = new Date;
					drawTime();
					timerId = setTimeout(run, 1);
				}, 1);

				flag = false;
				startButton.innerHTML = 'pause';

				if (startButton.classList.contains('button-warning')) {
					startButton.classList.remove('button-warning');
				}
				startButton.classList.add('button-success');
			} else {
				clearInterval(timerId);
				pauseflag = true;
				startButton.innerHTML = "cont..";
				startButton.classList.remove('button-success');
				startButton.classList.add('button-warning');
				flag = true;
			}
		};

		this.stopTimer = function () {
			clearInterval(timerId);
			clearCounter();
			startflag = pauseflag = false;
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

	document.addEventListener( "DOMContentLoaded", function() {
		startButton.addEventListener('click', myTimer.startTimer);
		stopButton.addEventListener('click', myTimer.stopTimer);
	});
})();

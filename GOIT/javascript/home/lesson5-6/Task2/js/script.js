(function(){

	var startstopButton = document.querySelector('.startstop'),
		splitButton = document.querySelector('.split'),
		resetButton = document.querySelector('.reset'),
		time = document.querySelector('.time'),
		parent = document.querySelector('.container');


	var Timer =  function() {
		var timerId,
			index = 1,
			startdate,
		    counter = {
				hours: 0,
				minutes: 0,
				seconds: 0,
				millisec: 0
		}

		var flag = true;

		function calc() {
				counter.millisec= counter.millisec+4;
				if ((counter.millisec%1000) === 0) {
				counter.millisec=0;
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
			time.innerHTML = drawCounter(counter);
		}

		function drawCounter (counter) {
			var timeToString = '';

			// [].forEach.call(counter, function(i) {
			// 	console.log(i);
			// 	if (counter[i]&&(counter[i]<10)) {
			// 		timeToString += '0' + counter[i];
			// 	} else if (counter[i]) {
			// 		timeToString += counter[i];
			// 	} else  {
			// 		timeToString += '00';
			// 	}
			// });

			// for (var i in counter) {
			// 	if (counter[i]&&(counter[i]<10)) {
			// 		timeToString += '0' + counter[i] + ':';
			// 	} else if (counter[i]) {
			// 		timeToString += counter[i] + ':';
			// 	} else  {
			// 		timeToString += '00'  + ':';
			// 	}
			// }

			if (counter.hours&&(counter.hours<10)) {
				timeToString = '0' + counter.hours;
			} else if (counter.hours) {
				timeToString = counter.hours;
			} else  {
				timeToString = '00';
			}

			if (counter.minutes&&(counter.minutes<10)) {
				timeToString += ':0' + counter.minutes;
			} else if (counter.minutes) {
				timeToString += ':'+ counter.minutes;
			} else  {
				timeToString += ':00';
			}

			if (counter.seconds&&(counter.seconds<10)) {
				timeToString += ':0' + counter.seconds;
			} else if (counter.seconds) {
				timeToString += ':'+ counter.seconds;
			} else  {
				timeToString += ':00';
			}

			if (counter.millisec&&(counter.millisec<10)) {
				timeToString += '.00' + counter.millisec;
			} else if (counter.millisec&&(counter.millisec<100)) {
				timeToString += '.0'+ counter.millisec;
			} else  if (counter.millisec) {
				timeToString += '.'+counter.millisec;
			} else {
				timeToString += '.000';
			}

			return timeToString;
		}

		function drawdate(msValue) {
			var t = {};
			t.millisec = (msValue%1000);

			t.seconds = (msValue  - t.millisec)/1000;

			t.minutes = t.seconds/60;
			t.minutes = t.minutes - t.minutes%1;

			t.seconds = t.seconds - t.minutes*60;

			t.hours = t.minutes/60;
			t.hours = t.hours - t.hours%1;

			return drawCounter(t);
		}

		function clearCounter(counter) {
			for (i in counter) {
				counter[i] = 0;
			}
			time.innerHTML = drawCounter(counter);
		}

		function addSplitMsg (text, ms) {
			var splitMsg = document.createElement('p');
			splitMsg.innerHTML = index + ' ' + text + ' ' + drawdate(ms);
			splitMsg.setAttribute('class','splitMsg');
			parent.appendChild(splitMsg);
		}

		this.startTimer = function () {
			if (flag) {
				startdate = new Date;
				timerId = setTimeout(function run() {
					calc();
					timerId = setTimeout(run, 1);
				}, 1);
				flag = false;
				startstopButton.innerHTML = 'stop';
				splitButton.disabled = false;
			} else {
				clearInterval(timerId);
				startstopButton.innerHTML = "start";
				var delta = new Date -startdate;
				addSplitMsg ('Stop:',delta);
				index++;
				splitButton.disabled = true;
				flag = true;
			}
		};

		this.splitTimer = function() {
			var delta = new Date -startdate;
			addSplitMsg ('Split:',delta);
			index++;
		},

		this.stopTimer = function () {
			clearInterval(timerId);
			clearCounter(counter);
			startstopButton.innerHTML = "start";
			index = 1;
			var msgs = document.querySelectorAll('.splitMsg');
			[].forEach.call(msgs, function(el) {
				el.parentNode.removeChild(el);
			});
			splitButton.disabled = true;
			flag = true;
		}

	}

	var myTimer = new Timer();

	document.addEventListener( "DOMContentLoaded", function() {
		startstopButton.addEventListener('click', myTimer.startTimer);
		splitButton.addEventListener('click', myTimer.splitTimer);
		resetButton.addEventListener('click', myTimer.stopTimer);
	});
})();

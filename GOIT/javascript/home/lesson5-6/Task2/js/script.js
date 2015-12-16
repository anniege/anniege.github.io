(function(){

	var startstopButton = document.querySelector('.startstop'),
		splitButton = document.querySelector('.split'),
		resetButton = document.querySelector('.reset'),
		time = document.querySelector('.time'),
		parent = document.querySelector('.container');


	var Timer =  function() {
		var timerId,
			globalDate,
			startDateSplit,
			deltaMsSplit,
			currentDate,
			currentMs = 0,
			index = 1,
			flag = true,
			stopflag = false;

		function calcTime (currentTime, obj) {
			var ms = currentTime - globalDate;
			obj.innerHTML = formatTime(ms);
			return currentTime;
		}

		function formatTime(msValue) {
			var dataStr = new Date(msValue).toUTCString().replace(/.*([0-9][0-9]:[0-9][0-9]:[0-9][0-9]).*/,'$1');
			var msStr = String(msValue%1000);
			while (msStr.length < 3) {
				msStr = '0' + msStr;
			}
			dataStr = dataStr + '.' + msStr;
			return dataStr;
		}

		function addSplitMsg (text, ms) {
			var splitMsg = document.createElement('p');
			splitMsg.innerHTML = index + ' ' + text + ' ' + formatTime(ms);
			splitMsg.setAttribute('class','splitMsg');
			parent.appendChild(splitMsg);
		}

		this.startTimer = function () {
			if (flag) {
				if (!globalDate) {
					globalDate = startDateSplit = new Date;
				} else {
					startDateSplit = new Date;
				}

				if (stopflag) {
					currentMs = currentDate - new Date;
					globalDate = new Date(globalDate.getTime() - currentMs);
				}
				timerId = setTimeout(function run() {
					currentDate = calcTime(new Date, time);
					timerId = setTimeout(run, 1);
				}, 1);

				flag = false;
				startstopButton.innerHTML = 'stop';
				splitButton.disabled = false;
			} else {
				clearInterval(timerId);
				startstopButton.innerHTML = "start";
				deltaMsSplit = currentDate-startDateSplit;
				addSplitMsg ('Stop:',deltaMsSplit);
				index++;
				splitButton.disabled = true;
				flag = true;
				stopflag = true;
			}
		};

		this.splitTimer = function() {
			var deltaMsSplit = new Date -startDateSplit;
			addSplitMsg ('Split:',deltaMsSplit);
			index++;
		},

		this.resetTimer = function () {
			clearInterval(timerId);
			globalDate = currentDate;
			calcTime(globalDate, time);
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
		resetButton.addEventListener('click', myTimer.resetTimer);
	});
})();

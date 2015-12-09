
var body = document.querySelector('body');
console.log(body);


var app = {
	createElement: function(params) {
		var elem = document.createElement(params.tagName);
		
		if (params.className) {
			elem.className = params.className;
		}

		if (params.text) {
			elem.innerHTML = params.text;
		}

		if (params.inputType) {
			elem.setAttribute('type', params.inputType);
			if (params.value) {
				elem.setAttribute('value', params.value);
			}
		}

		if (params.parentName) {
			params.parentName.appendChild(elem);
		} else {
			body.appendChild(elem);
		}

		return elem;
	},

	generateHeading : function (parent) {
		this.createElement({
		    tagName: 'h1',
		    text: 'Тест по программированию',
		    parentName: parent
		 });
	},

	generateQuestions: function(parent, questionQty, answerQty) {

		var list = this.createElement({
			tagName: 'ol',
			parentName: parent
		});

		// var parent = this.createElement({
		// 	tagName: 'div',
		// 	className: 'checkbox'
		// });


	},

	generateButton: function (parent) {
		this.createElement({
			tagName: 'input',
			inputType: 'submit',
			value: 'Проверить мои результаты',
			className: 'btn btn-primary',
			parentName: parent
		})
	},

	generateTest: function() {
		var parent = this.createElement({
			tagName: 'div',
			className: 'container'
		});

		this.generateHeading(parent);

		var form = this.createElement({
			tagName: 'form',
			parentName: parent
		});

		this.generateQuestions(form);

		this.generateButton(form);
	}
}


app.generateTest();

var body = document.querySelector('body');

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

			if (params.name) {
				elem.setAttribute('name', params.name);
			}

			if (params.value) {
				elem.setAttribute('value', params.value);
			}
		}

		if (params.parentName) {
			if (params.inputType === 'checkbox') {
				params.parentName.insertAdjacentElement('AfterBegin', elem);
			} else {
				params.parentName.appendChild(elem);
			}
		} else {
			body.appendChild(elem);
		}

		return elem;
	},

	generateHeading : function (parent) {
		this.createElement({
			tagName: 'h2',
			text: 'Тест по программированию',
			className: 'well well-sm text-info text-center',
			parentName: parent
		});
	},

	generateQuestions: function(parent, questionQty, answerQty) {

		var list = this.createElement({
			tagName: 'ol',
			className: 'list-group text-muted',
			parentName: parent
		});

		for (var i = questionQty-1; i >= 0; i--) {
			var listItem = this.createElement({
				tagName: 'li',
				className: 'list-group-item',
				parentName: list
			});

			this.createElement({
				tagName: 'h4',
				parentName: listItem,
				text: 'Вопрос №' + (questionQty - i)
			});

			for (var j = answerQty - 1; j >= 0; j--) {
				var wrapCheckbox = this.createElement({
					tagName: 'div',
					className: 'checkbox',
					parentName: listItem
				});

				var label = this.createElement({
					tagName: 'label',
					parentName: wrapCheckbox,
					text: 'Вариант ответа №' + (answerQty - j)
				});
				
				this.createElement({
					tagName:'input',
					inputType: 'checkbox',
					name: 'question'+ (questionQty - i),
					value: 'answer' + (answerQty - j),
					parentName: label
				});
			}
		}
	},

	generateButton: function (parent) {
		this.createElement({
			tagName: 'input',
			inputType: 'submit',
			value: 'Проверить мои результаты',
			className: 'btn btn-primary center-block',
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

		this.generateQuestions(form, 3, 3);

		this.generateButton(form);
	}
}


app.generateTest();
define(
	[
		'model',
		'view',
		'jquery'
	],
	function(model, view, $) {

		function Controller(model, view) {
			var self = this;


			var ENTER_KEY = 13;
			var ESCAPE_KEY = 27;


			view.elements.input.on('keydown', addItem);
			view.elements.list.on('click', '.data__delete', removeItem);
			view.elements.list.on('click', '.data__edit', editItem);


			function addItem(event) {
				if (event.which == ENTER_KEY) {
					var userInput = view.elements.input.val();
					model.addItem(userInput);
					view.render(model.data);
					view.elements.input.val('');
				}
			}


			function removeItem() {
				var attrVal = $(this).attr('data-value');
				model.removeItem(attrVal);
				view.render(model.data);
			}


			function editItem() {
				var attrVal = $(this).attr('data-value');
				var inputEdit = view.edit(this, attrVal); // this = .data__edit


				inputEdit.on('keydown', function(event) {
					if (event.which == ENTER_KEY) {
						var userText = $(this).val();
						$(this).val('');

						if ( !$.trim(userText).length )  return;

						model.editItem(attrVal, userText);
						view.render(model.data);
					}

					if (event.which == ESCAPE_KEY) { view.render(model.data); }
				});
			}
		}
		return Controller;
	}
);


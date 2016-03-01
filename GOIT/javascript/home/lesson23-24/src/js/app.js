function Model(data) {
	var self = this;

	self.data = data;


	self.addItem = function(item) {
		if ( !$.trim(item).length ) return;

		self.data.push(item);
		return self.data;
	}


	self.removeItem = function(item) {
		var index = self.data.indexOf(item);

		if (index === -1) return;

		self.data.splice(index, 1);
		return self.data;
	}

	self.editItem = function(item, newItem) {
		var index = self.data.indexOf(item);

		if (index === -1) return;

		self.data[index] = newItem;
		return self.data;
	}

	self.countItems = function () {
		return self.data.length;
	}
}




function View(model) {
	var self = this;

	var init = function() {
		var wrapperTmpl = _.template($('#wrapper-template').html());
		$('body').append(wrapperTmpl());

		self.elements = {
			input: $('.data__value'),
			list: $('.data__list'),
			// counterItem: $('.data__counter'),
			editInput: $('<input type="text" class="data__new-value"><div class="data__modal"></div>')
		}

		self.render(model.data);
	}


	self.render = function(data) {
		var listTmpl = _.template($('#list-template').html());
		self.elements.list.html(listTmpl({data: data}));

		$('.data__counter').html(model.countItems());
	}

	self.edit = function(_this, value) {
		var currentLi = $(_this).parent();
		currentLi.html('');
		$('.data__i').css("pointer-events", 'none');
		currentLi.css("pointer-events", 'auto'); 
		currentLi.append(self.elements.editInput);
		var inputEdit = currentLi.find('.data__new-value').val(value).focus();
		return inputEdit;
	}

	init();
}




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



$(function(){
	var initToDoList = ['learn Javascript', 'learn MVC', 'learn Angular'];

	var model = new Model(initToDoList);
	var view = new View(model);
	var controller = new Controller(model, view);
});
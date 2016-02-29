function Model(data) {
	var self = this;

	self.data = data;


	self.addItem = function(item) {
		if (item.length === 0) return;

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
}




function View(model) {
	var self = this;

	var init = function() {
		var wrapperTmpl = _.template($('#wrapper-template').html());
		$('body').append(wrapperTmpl());

		self.elements = {
			input: $('.data__value'),
			list: $('.data__list'),
			editInput: $('<input type="text" class="data__new-value">')
		}

		self.render(model.data);
	}


	self.render = function(data) {
		var listTmpl = _.template($('#list-template').html());
		self.elements.list.html(listTmpl({data: data}));
	}

	self.addEditInput = function(_this) {
		$(_this).parent().append(self.elements.editInput);
	}

	init();
}




function Controller(model, view) {
	var self = this;

	view.elements.input.on('keypress', function(event) {
		if (event.keyCode == 13) {
			var userInput = view.elements.input.val();
			model.addItem(userInput);
			view.render(model.data);
			view.elements.input.val('');
		}
	});

	view.elements.list.on('click', '.data__delete', function() {
		var attrVal = $(this).attr('data-value');
		model.removeItem(attrVal);
		view.render(model.data);
	});

	view.elements.list.on('click', '.data__edit', function() {
		var attrVal = $(this).attr('data-value');
		console.log('attrVal = ', attrVal);
		view.addEditInput(this);

		$('.data__new-value').attr('placeholder', attrVal);
		$('.data__new-value').on('keypress', function(event) {
			if (event.keyCode == 13) {
				model.editItem(attrVal, $(this).val());
				$(this).val('');
				view.render(model.data);
			}
		});
	});
}



$(function(){
	var initToDoList = ['learn Javascript', 'learn MVC', 'learn Angular'];

	var model = new Model(initToDoList);
	var view = new View(model);
	var controller = new Controller(model, view);
});
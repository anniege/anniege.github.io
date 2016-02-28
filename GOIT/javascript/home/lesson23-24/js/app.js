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
}

function View(model) {
	var self = this;

	var init = function() {
		var wrapperTmpl = _.template($(#wrapper-template).html());
		$('body').append(wrapperTmpl());

		self.controlls {
			input: $('.data__value'),
			addBtn: $('.data__add'),
			deleteBtn: $('.data__delete')
		}
	}

	self.render = function(data) {

	}

}

function Controller() {

}

$(function(){

});
define(
	[
		'model',
		'jquery'
	],
	function(model, $) {

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

		return View;
	}
);

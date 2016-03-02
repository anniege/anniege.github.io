requirejs.config({
	paths: {
		"jquery": "libs/jquery/jquery-1.7.1",
		"lodash": "libs/lodash/lodash"
	}
});

require(
	[
		'model',
		'view',
		'controller',
		'jquery',
		'lodash'
	],
	function(Model, View, Controller, $, _) {

		$(function(){
			var initToDoList = ['learn Javascript', 'learn MVC', 'learn Angular'];

			var modelInstance = new Model(initToDoList);
			var viewInstance = new View(modelInstance);
			var controller = new Controller(modelInstance, viewInstance);
		});
	}
);

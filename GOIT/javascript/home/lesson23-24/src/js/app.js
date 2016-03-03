requirejs.config({
	paths: {
		"jquery": "../../bower_components/jquery-1.7.7.min/index",
		"lodash": "../../bower_components/lodash/lodash"
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

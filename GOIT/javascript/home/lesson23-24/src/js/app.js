requirejs.config({
	paths: {
		'jquery': "https://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"
	},
	shim: {
		'jquery': {
			exports: 'jQuery'
		}
	}
});

require(
	[
		'model',
		'view',
		'controller',
		'jQuery'
	],
	function(model, view, controller, $) {
		
		$(function(){
			var initToDoList = ['learn Javascript', 'learn MVC', 'learn Angular'];

			var model = new Model(initToDoList);
			var view = new View(model);
			var controller = new Controller(model, view);
		});
	}
);

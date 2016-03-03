({
	baseUrl: "../src/js",
	paths: {
		jquery: "../../bower_components/jquery-1.7.1.min/index",
		"lodash": "../../bower_components/lodash/lodash",
		"requireLib": "require"
	},
	name: "app",
	include: [ 'requireLib' ],
	out: "../dist/js/app-built.js"
})
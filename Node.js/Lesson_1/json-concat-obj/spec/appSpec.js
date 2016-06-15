var fs = require('fs');
var JSONConcat = require('../index.js');

describe("json concat with any object", function() {
  it("should replace existing .json file adding the object", function(done) {
	var	path_toFile = './json/file.json',
		obj = 	{ 
				  c: 'success', 
				};


	JSONConcat(path_toFile, obj, function(obj) {
			// console.log(obj);
			expect(obj.c).toBeDefined();
			done();
	});

  });
});



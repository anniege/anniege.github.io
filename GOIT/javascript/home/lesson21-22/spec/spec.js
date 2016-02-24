var app = require('../dist/js/script.js');


describe("app", function() {
  it("not to be null", function() {

  	var items = [{
  		name: 'question0',
  		value: 4
  	},
  	{
  		name: 'question1',
  		value: 1

  	}]
  	var result = app.getUserAnswers(items);
    expect(result).not.toBe(null);
  });

});

// describe("app2", function(){
//  	loadFixtures("simple_form.html");
//   it ("la la", function() {
//   	expect($('.test__list')).toBe(true);

//   });
// });
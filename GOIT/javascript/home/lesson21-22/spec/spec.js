describe("app function test without DOM manipulating", function() {
	it("not to be null", function() {

		var items = [{
			name: 'question0',
			value: 4
		},
		{
			name: 'question1',
			value: 1

		}]
		var result = app.items;
		expect(result).not.toBe(null);
	});
});

describe("check the fixture", function(){
	it ("should be loaded matchers", function() {
		expect(loadFixtures).toBeDefined();
		expect(readFixtures).toBeDefined();
	});

	it ("should be li element exist", function() {
		loadFixtures("index.html");
		var elem = $('li');
		expect(elem).toExist();
	});

	it ("read the fixture", function() {
		var html = readFixtures("index.html");
		expect(html).toContain('script');
	});

});
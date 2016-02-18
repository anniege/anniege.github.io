(function() {
	var db = JSON.parse(data);

	console.log("JSON = ", db); 


	/*1. Массив скиллов (поле skills) всех людей, не должно быть повторяющихся скиллов, 
	так же они должны быть отсортированы по алфавиту */

	var skills =_.sortedUniq(_.sortBy(_.map(_.flatten(_.map(db, 'skills')), _.toLower)));
	console.log('\n1. Отсортированный массив скиллов (поле skills) всех людей (без повторений):', skills);



	/*2. Массив имен (поле name) людей, отсортированных в зависимости от количества их друзей (friends);*/

	// return an array of persons names and friens quantity
	var  persons = _.map(db, function(obj) {
		return { "name": obj.name, "friends": obj.friends.length }
	});

	//return the array of presons names ordered by friens quantity
	var personsNames  = _.map(_.sortBy(persons, "friends"), "name");

	console.log('\n2. Массив имен (поле name) людей, отсортированных в зависимости от количества их друзей (friends): \n', personsNames);



	/*3. Массив всех друзей всех пользователей, не должно быть повторяющихся людей*/

	var friends = _.sortedUniq(_.map(_.sortBy(_.flatten(_.map(db, "friends")), "name"), "name"));
	console.log('\n3. Массив всех друзей всех пользователей, не должно быть повторяющихся людей:', friends);

})();
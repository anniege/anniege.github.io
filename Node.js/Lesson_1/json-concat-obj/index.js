var fs = require('fs');

module.exports = function (filePath, data, callback) {
	fs.readFile(filePath, function(err, fileData){
		if (err) throw err;
		var obj = JSON.parse(fileData.toString());
		// console.log(obj);
		for (var key in data) {
			if (!obj.hasOwnProperty(key)) {
				obj[key] = data[key];
			}
		}

		fs.writeFile(filePath, JSON.stringify(obj), function (err) {
			if (err) throw err;
			console.log('Saved!');

			if (callback) {
				callback(obj);
			}
		});
	});
}
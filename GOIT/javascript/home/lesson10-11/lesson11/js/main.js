(function() {
  var db = [],
      currentName,
      index = 0,
      stringDb;

  String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
  }

  function testName(name) {
    var res = /^[a-zA-Zа-яА-ЯёЁіЇ]+$/.test(name);
      if (res) {
        return true;
       } else {
        alert("Некорректные данные. Для имени пользователя допустимы только из буквы!");
        return false;
      }
  }

  do {
    currentName = prompt('Введите имя для внесения в базу данных:');

    if ((currentName !== null)&&(currentName !== "")) {
        if (testName(currentName)) {
          db[index] = currentName.toLowerCase();
          index++;
        }
    }
  } while ((currentName !== null)&&(index < 5));


  console.log("Ваша база данных состоит из следующим имен:\n" + db.toString());

  currentName = prompt('Пожалуйста, введите имя пользователя:');
  if (testName(currentName)) {
    stringDb = db.join(" ");
    var reg = new RegExp('(^|\\s)('+currentName+')($|\\s)', 'ig');
      if (reg.test(stringDb)) {
        alert(currentName.capitalize() + ", вы успешно вошли!");
      } else {alert("Такого пользователя нет в базе данных")}
  } else {alert("Некорректное имя пользователя")}

})();
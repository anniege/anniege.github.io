(function() {
		var testData = { 
		logo: 'dist/img/logo.png',
		mainTitle: 'ТЕСТ AngularJS',
		questions: [
		{
			title: 'Каких директив не существует в Angular JS?',
			options: ['ng-click', 'ng-model', 'ng-send'],
			trueValue: [2]
		},
		{
			title: 'Укажите фильтры, которые существуют в AngularJS и применяются для изменения формата данных.',
			options: ['orderBy', 'sortBy', 'selectBy'],
			trueValue: [0]
		},
		{
			title: 'Какой(ие) метод(ы) можно использовать у объекта Module для создания сервиса?',
			options: ['service(name, type)', 'createService(name)', 'instance(name, type)', 'provider(name, type)'],
			trueValue: [0, 3]
		},
		{
			title: 'Какое значение параметра restrict необходимо указать, чтобы директива использовалась, как имя элемента:',
			options: ['E', 'A', 'D', 'Нет верных вариантов'],
			trueValue: [0]
		},
		{
			title: '$location сервис:',
			options: ['демонстрирует текущий URL в адресной строке браузера', 'перезагружает страницу', 'представляет объект URL в виде набора методов (protocol, host, port, path, search, hash)', 'синхронизируется с адресной строкой браузера'],
			trueValue: [0, 2, 3]
		}],
		submit: 'Проверить результат'
	}

	if (typeof(Storage) !== "undefined") {
		if (!localStorage.test) {
			localStorage.setItem("test", JSON.stringify(testData));
		}
	} else {
		alert ("The browser doesn't support local storage!");
	}
})();

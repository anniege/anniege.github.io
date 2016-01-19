(function() {
	document.addEventListener('DOMContentLoaded', loadContent);

	function loadContent() {
		var data = {
			name: "Гармашевская Анна Александровна",
			photo_url: "img/photo.jpg",
			job_title: "Менеджер по гарантиям в Автомоторс",
			motivation: "Хочу учить frontend потому что:",
			motive_list: ["возможность самореализовываться",
						  "найти интересную работу",
						  "работать по специальности",
						  "дает возможность все время учится и познавать новое"],
			phone_title: "Мой контактный телефон",
			phone_number:"+380 67 4990705",
			facebook_title: "Мой профиль в facebook",
			facebook_address: "https://www.facebook.com/Garmashevskaya",
			facebook_url: "facebook.com",
			feedback_title: "Мой feedback:",
			feedback_mail: "mailto:anniegemail@gmail.com",
			feedback: "mailto:anniegemail@gmail.com"
		};
		var target = document.getElementById("results");
		var profile = _.template(document.getElementById("profile").innerHTML);
		target.innerHTML = profile(data);
	}

})();
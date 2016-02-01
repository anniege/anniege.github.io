;(function(){
	
	// class Human
	function Human(name, age, gender, height, weight) {
		this.name = name || "Ivan";
		this.age = age || 25;
		this.gender = gender || "male";
		this.height = height || 180;
		this.weight = weight || 75;
	}

	// class Worker inherits class Human
	function Worker(name, age, gender, height, weight, job, wage) {
		Human.apply(this, arguments);
		this.job = job || "manager";
		this.wage = wage || 9000;
	}

	Worker.prototype = Object.create(Human.prototype);
	Worker.prototype.constructor = Worker;

	Worker.prototype.working = function() {
		var str = '';
		if (this.gender === 'male') {
			str = this.name +' is '+this.age+ ' years old and he is working as a ' + this.job;
		} else {
			str = this.name +' is '+this.age+ ' years old and she is working as a ' + this.job;			
		}
		return str;
	};
	
	// class Student inherits class Human
	function Student(name, age, gender, height, weight, studyPlace, scholarship) {
		Human.apply(this, arguments);
		this.studyPlace = studyPlace || "manager";
		this.scholarship = scholarship || 1500;
	}
	Student.prototype = Object.create(Human.prototype);
	Student.prototype.constructor = Student;

	Student.prototype.watchSeries = function() {
		return this.name +' is '+ this.age +' years old and is watching Fast\'N\'Loud and has average scholarship in amount of ' + this.scholarship;
	};

	var worker1 = new Worker("Victor");
	var worker2 = new Worker("Olga", undefined, "female", 156, 50, "teacher");
	var worker3 = new Worker("Kate", 44, "female", 172, 56, undefined, 15000);

	var student1 = new Student(undefined, 19);
	var student2 = new Student("Polina", 21, "female");
	var student3 = new Student("Inna", 23, "female", 167, 48, "KPI", 800);

	console.log("worker1: ", worker1);
	console.log(worker1.working());
	console.log("worker1: ", worker2);
	console.log(worker2.working());
	console.log("worker1: ", worker3);
	console.log(worker3.working());

	console.log("sudent1: ", student1);
	console.log(student1.watchSeries());
	console.log("sudent1: ", student2);
	console.log(student2.watchSeries());
	console.log("sudent1: ", student3);
	console.log(student3.watchSeries());
})();
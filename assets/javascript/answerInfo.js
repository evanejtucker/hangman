
var Answers = function(name, picture, sound, description, hint) {
	this.name = name;
	this.picture = picture;
	this.sound = sound;
	this.description = description;
	this.hint = hint;

	this.logInfo = function() {
		console.log(name +"\n" + picture + "\n" +sound + "\n" +description + "\n" + hint);
	}

}

// var Categories = function() {
// 	var _this = this;
// 	_this.all = [];

// 	_this.add = function(category) {
// 		_this.all.push(category);
// 	}
// }

// var categories = new Categories();

var batman = new Answers("Batman", "picture", "Sound", "description", "hint");

var superman = new Answers("Superman", "picture", "Sound", "description", "hint");

var greenArrow = new Answers("Green Arrow", "picture", "Sound", "description", "hint");

var Heroes = [batman, superman, greenArrow, ];
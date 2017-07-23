
var Answers = function(name, picture, sound, description, hint) {
	this.name = name;
	this.picture = picture;
	this.sound = sound;
	this.description = description;
	this.hint = hint;

	this.logInfo = function() {
		console.log(name +"\n"picture + "\n"sound + "\n"description + "\n"hint);
	}
}

var newAnswer = new Answers("Evan", "picture", "Sound", "description", "hint");

module.exports = Answers;
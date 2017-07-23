
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

var Categories = function() {
	var _this = this;
	_this.all = [];

	_this.add = function(category) {
		_this.all.push(category);
  }

  _this.get = function (name) {
    return _this.all.filter(function (v) {
      return v.name === name
    })[0]
  }
}

var categories = new Categories();

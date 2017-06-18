$(document).ready(function() {

// Global Variables
// ---------------------------------------------------------------------------------





// Functions
// ---------------------------------------------------------------------------------

var setCategory = function() {
	alert(selectedCategory);
	if(selectedCategory === "Countries") {
		$("body").addClass("countries");
	}
}




// Main Process
// ---------------------------------------------------------------------------------
$("#game").hide();

$("#submit").on("click", function(event) {
	event.preventDefault();
	selectedCategory = $("#category").val();
	setCategory();
	$(".jumbotron").hide();
	$("#game").show();

});


});
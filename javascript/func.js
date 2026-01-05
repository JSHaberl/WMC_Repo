let buttonPressed;
function redirect(buttonPressed) {
	if (buttonPressed == null) {
	}
	else {
		document.getElementById("redirect").content = "0; url=" + buttonPressed + "/index.html";
	}
}
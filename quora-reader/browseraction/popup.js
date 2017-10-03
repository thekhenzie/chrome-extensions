window.onload = function () {
	// document.getElementById("button").onclick = function() {
	// 	chrome.extension.sendMessage({
	//         type: "color-divs"
	//     });
	// }
	chrome.extension.sendMessage({
		type: "color-divs"
	});
}
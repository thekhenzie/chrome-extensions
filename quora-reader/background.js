window.onload = function () {
	// document.getElementById("button").onclick = function() {
	// 	chrome.extension.sendMessage({
	//         type: "color-divs"
	//     });
	// }
	// chrome.extension.sendMessage({
	// 	type: "color-divs"
	// });

	chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
		if (changeInfo.status == 'complete') {
			chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, { type: "remove-header" }, function (response) { });
			});
		}
	});
}

// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {          
// 	if (changeInfo.status == 'complete') {   
// 	   chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
// 		  chrome.tabs.sendMessage(tabs[0].id, {type: "color-divs"}, function(response) {});  
// 	   });
// 	}
//  });
// omnibox
chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
	suggest([
		{ content: "color-divs", description: "Make everything red" }
	]);
});
chrome.omnibox.onInputEntered.addListener(function (text) {
	if (text == "color-divs") colorDivs();
});

// listening for an event / one-time requests
// coming from the popup
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
	switch (request.type) {
		case "color-divs":
			colorDivs();
			break;
	}
	return true;
});

// listening for an event / long-lived connections
// coming from devtools
chrome.extension.onConnect.addListener(function (port) {
	port.onMessage.addListener(function (message) {
		switch (port.name) {
			case "color-divs-port":
				colorDivs();
				break;
		}
	});
});

// send a message to the content script
var colorDivs = function () {
	chrome.tabs.getSelected(null, function (tab) {
		chrome.tabs.sendMessage(tab.id, { type: "remove-header", color: "#F00" });
		// setting a badge
		// chrome.browserAction.setBadgeText({text: "nice"});
	});
}
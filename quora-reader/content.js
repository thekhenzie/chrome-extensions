chrome.extension.onMessage.addListener(function (message, sender, sendResponse) {
	switch (message.type) {
		case "remove-header":
			var divs = document.querySelectorAll('div.LoggedInSiteHeader, div.layout_3col_left, div.layout_3col_right,div.layout_2col_side');
			if (divs.length === 0) {
				
			} else {
				for (var i = 0; i < divs.length; i++) {
					divs[i].style.display = "none";
				}
			}

			var mainDiv = document.querySelectorAll('div.layout_2col_main');
			if (mainDiv.length === 0) {
				
			} else {
				for (var i = 0; i < divs.length; i++) {
				}
			}

			var centerDiv = document.querySelectorAll('div.layout_3col_center');
			if (centerDiv.length === 0) {
				
			} else {
				for (var i = 0; i < divs.length; i++) {
					divs[i].style.marginLeft = "0px";
				}
			}

			var temp = document.querySelectorAll("img.portrait,img.landscape");
			if (temp.length === 0) {
				
			} else {
				for (var i = 0; i < temp.length; i++) {
					temp[i].style.width = "30px";
				}
			}

			var spans = document.querySelectorAll('span.rendered_qtext');
			if (temp.length === 0) {
				
			} else {
				for (var i = 0; i < spans.length; i++) {
					spans[i].style.fontSize = "medium";
					spans[i].style.fontStyle = "normal";
				}
			}
			var footerDiv = document.querySelectorAll('div.action_bar_inner, div.u-flex');
			if (temp.length === 0) {
				
			} else {
				for (var i = 0; i < footerDiv.length; i++) {
					footerDiv[i].style.display = "none";
				}
			}
			var author = document.querySelectorAll('div.answer_user, div.answer_user_inline');
			if (temp.length === 0) {
				
			} else {
				for (var i = 0; i < author.length; i++) {
					author[i].style.display = "none";
				}
			}
			break;
	}
});
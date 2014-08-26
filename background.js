// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning ' + tab.url + ' red!');
  chrome.tabs.executeScript(null, { file: "jquery-1.11.1.min.js" }, function() {
      chrome.tabs.executeScript(null, { file: "content.js" });
  });
});
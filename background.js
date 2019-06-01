'use strict';

function startDownloading() {
    chrome.tabs.executeScript({ file: 'downloadVideos.js'});
};

chrome.browserAction.onClicked.addListener(startDownloading);

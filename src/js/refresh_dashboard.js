
var button = null;
var refreshInterval;

chrome.storage.sync.get({
    "refresh_interval": 5
}, function(items) {
    setRefreshDelay(items.refresh_interval);
});

var refreshDelay;

console.log("refresh_dashboards.js loaded");

getButton();

function getButton() {
    button = document.querySelector('.actionRibbon button[label=Refresh]');

    if(button == null) {
        setTimeout(getButton, 100);
    } else {
        refreshInterval = setInterval(refreshCharts, refreshDelay)
    }
}

function refreshCharts() {
    console.log('Refreshing charts.');
    button.click();
}

function setRefreshDelay(numberOfMinutes) {
    refreshDelay = numberOfMinutes * 60 * 1000;
    console.log("Setting dashboard refresh rate to %d minutes (%dms)", numberOfMinutes, refreshDelay);
}

chrome.storage.onChanged.addListener(function(changes) {
    if(changes.refresh_interval) {
        clearInterval(refreshInterval);
        setRefreshDelay(changes.refresh_interval.newValue);
        refreshInterval = setInterval(refreshCharts, refreshDelay)
    }
});

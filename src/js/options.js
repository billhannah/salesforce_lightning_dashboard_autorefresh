
function saveOptions() {
    var refreshInterval = document.getElementById('refresh_interval').value;
    chrome.storage.sync.set({
        "refresh_interval": parseInt(refreshInterval)
    });
    var statusNode = document.getElementById('status');
    statusNode.textContent = "Settings Saved";
    statusNode.className = "show";
    setTimeout(function() { statusNode.className = "hide"}, 1000);
}

function restoreOptions() {
    chrome.storage.sync.get({
        "refresh_interval": 5
    }, function(items) {
        document.getElementById('refresh_interval').value = items.refresh_interval;

    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save_btn').addEventListener('click', saveOptions);
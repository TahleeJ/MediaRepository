// Listen for new tabs being created
chrome.tabs.onCreated.addListener((tab) =>{
    if (tab.status = "complete") {
        if (tab.url != null) {
            console.log(`New tab created: ${tab.url}`);
        }
    }
});

// Listen for tabs being updated with respect to their url
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.status = "complete") {
        if (changeInfo.url != null) {
            console.log(`Tab has been updated: ${tab.url}`);
        }
    }
});